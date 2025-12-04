from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from groq import Groq
import os
from flask_cors import CORS
from dotenv import load_dotenv
import joblib
import re
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

load_dotenv()
try:
    crop_data = pd.read_csv('crop_yield_data.csv')
    logger.info("Crop yield data loaded successfully")
except Exception as e:
    logger.error(f"Failed to load crop_yield_data.csv: {str(e)}")
    crop_data = pd.DataFrame()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3001"}})

groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    logger.error("GROQ_API_KEY not found in environment variables")
else:
    logger.info("GROQ_API_KEY loaded successfully")
client = Groq(api_key=groq_api_key)

rf_model = None
model_path = 'Model/random_forest_model.pkl'
if os.path.exists(model_path):
    rf_model = joblib.load(model_path)
    logger.info("Random Forest model loaded successfully")
else:
    logger.warning("Random Forest model file not found at 'Model/random_forest_model.pkl'")

SYSTEM_PROMPT = """
You are an agricultural assistant specialized in crop yield predictions. You have access to a dataset with the following columns:
- Area (country/region)
- Item (crop type: Maize, Potatoes, Rice paddy, Sorghum, Soybeans, Wheat)
- Year
- Yield (hg/ha)
- Average rainfall (mm per year)
- Pesticides used (tonnes)
- Average temperature

The model used for prediction is Random Forest, which takes into account multiple factors including:
- Historical crop yields
- Weather conditions (rainfall, temperature)
- Agricultural inputs (pesticides, fertilizers)
- Soil conditions
- Crop rotation practices

Please provide accurate and helpful responses to questions about agricultural predictions, practices, and data analysis.
Respond in the same language as the user's question.
"""

@app.route('/api/chat', methods=['POST'])
def chat():
    logger.info("Chat endpoint called")
    data = request.json
    if not data or 'message' not in data:
        logger.warning("No message provided in chat request")
        return jsonify({"error": "No message provided"}), 400
    
    user_message = data.get('message', '')
    if not user_message:
        logger.warning("Empty message provided in chat request")
        return jsonify({"error": "No message provided"}), 400
    
    try:
        context = add_context_from_data(user_message)
        logger.info(f"Generated context: {context}")
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT + context},
                {"role": "user", "content": user_message}
            ],
            model="llama-3.1-8b-versatile",  # Updated to a newer supported model
            temperature=0.5,
            max_tokens=1024
        )
        response = chat_completion.choices[0].message.content
        logger.info("Chat response generated successfully")
        return jsonify({"response": response})
    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        return jsonify({"error": str(e)}), 500

def add_context_from_data(query):
    if crop_data.empty:
        logger.warning("Crop data is empty, skipping context generation")
        return ""
    
    context = "\n\nHere is some additional context from our dataset:"
    crops = ["maize", "potatoes", "rice", "sorghum", "soybeans", "wheat"]
    mentioned_crops = [crop for crop in crops if crop in query.lower()]
    
    if mentioned_crops:
        context += "\n\nCrop specific data:"
        for crop in mentioned_crops:
            crop_name = crop.capitalize()
            if crop == "rice":
                crop_name = "Rice, paddy"
            crop_data_filtered = crop_data[crop_data['Item'].str.contains(crop_name, case=False)]
            if not crop_data_filtered.empty:
                avg_yield = crop_data_filtered['hg/ha_yield'].mean()
                context += f"\n- {crop_name} average yield: {avg_yield:.2f} hg/ha"
    
    year_match = re.search(r'\b(19\d{2}|20\d{2})\b', query)
    if year_match:
        year = year_match.group(1)
        year_data = crop_data[crop_data['Year'] == int(year)]
        if not year_data.empty:
            context += f"\n\nData for year {year}:"
            context += f"\n- Average yield across all crops: {year_data['hg/ha_yield'].mean():.2f} hg/ha"
            context += f"\n- Average rainfall: {year_data['average_rain_fall_mm_per_year'].mean():.2f} mm"
            context += f"\n- Average temperature: {year_data['avg_temp'].mean():.2f}°C"
    
    if context == "\n\nHere is some additional context from our dataset:":
        return ""
    return context

@app.route('/api/prediction', methods=['POST'])
def prediction():
    logger.info("Prediction endpoint called")
    
    if rf_model is None:
        logger.warning("Prediction model is unavailable")
        return jsonify({"error": "Prediction model is unavailable at this time. Please try again later."}), 503
    
    data = request.json
    required_fields = ['cropType', 'areaSize', 'soilType', 'plantingDate', 'irrigation', 'fertilizer', 'pesticide', 'previousCrop']
    
    if not all(field in data for field in required_fields):
        logger.warning(f"Missing required fields in prediction request: {data}")
        return jsonify({"error": "Missing required fields"}), 400
    
    try:
        logger.info(f"Received prediction data: {data}")
        
        crop_mapping = {
            'wheat': 'Wheat',
            'corn': 'Maize',
            'barley': 'Barley',
            'soybean': 'Soybeans',
            'rapeseed': 'Rapeseed'
        }
        
        input_data = {
            'Area': 'Unknown',
            'Item': crop_mapping.get(data['cropType'], data['cropType']),
            'Year': pd.Timestamp(data['plantingDate']).year,
            'average_rain_fall_mm_per_year': 500.0,
            'pesticides_tonnes': 100.0 if data['pesticide'] != 'none' else 0.0,
            'avg_temp': 20.0,
        }
        
        logger.info(f"Input data for model: {input_data}")
        input_df = pd.DataFrame([input_data])
        prediction = rf_model.predict(input_df)[0]
        
        result = {
            'yield': f"{prediction:.2f} hg/ha",
            'confidence': '0.95',
            'date': pd.Timestamp.now().strftime('%Y-%m-%d')
        }
        logger.info(f"Prediction result: {result}")
        return jsonify(result)
    
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({"error": "An error occurred during prediction. Please try again."}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)