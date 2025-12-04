import pandas as pd
import numpy as np
import os

# Function to load and process the CSV data
def process_crop_data():
    """
    Process the crop yield dataset and save it to a clean CSV format
    for use with the chatbot and prediction models.
    """
    # Load the data
    try:
        # The column names from the dataset
        column_names = [
            'Area', 'Item', 'Year', 'hg/ha_yield', 
            'average_rain_fall_mm_per_year', 
            'pesticides_tonnes', 'avg_temp'
        ]
        
        # Load the data with the appropriate column names
        df = pd.read_csv('raw_crop_data.csv', header=0, names=column_names)
        
        # Basic data cleaning
        # Remove any rows with NaN values
        df = df.dropna()
        
        # Ensure numeric columns are numeric
        numeric_cols = ['Year', 'hg/ha_yield', 'average_rain_fall_mm_per_year', 
                        'pesticides_tonnes', 'avg_temp']
        for col in numeric_cols:
            df[col] = pd.to_numeric(df[col], errors='coerce')
        
        # Drop rows with invalid numeric values
        df = df.dropna()
        
        # Create additional features that might be useful for the chatbot
        # Year as categorical for time period analysis
        df['decade'] = (df['Year'] // 10) * 10
        
        # Calculate crop-specific statistics
        crop_stats = df.groupby('Item')['hg/ha_yield'].agg(['mean', 'min', 'max']).reset_index()
        crop_stats.columns = ['Item', 'avg_yield', 'min_yield', 'max_yield']
        
        # Calculate country-specific statistics
        country_stats = df.groupby('Area')['hg/ha_yield'].agg(['mean']).reset_index()
        country_stats.columns = ['Area', 'avg_country_yield']
        
        # Merge the statistics back to the main dataframe
        df = pd.merge(df, crop_stats, on='Item', how='left')
        df = pd.merge(df, country_stats, on='Area', how='left')
        
        # Save the processed data
        df.to_csv('crop_yield_data.csv', index=False)
        print(f"Data processed successfully. Shape: {df.shape}")
        
        # Create a summary file with key statistics for the chatbot
        create_summary_file(df)
        
        return df
        
    except Exception as e:
        print(f"Error processing data: {str(e)}")
        return None

def create_summary_file(df):
    """
    Create a summary file with key statistics for the chatbot to reference
    """
    # Overall statistics
    overall_stats = {
        'total_records': len(df),
        'year_range': f"{df['Year'].min()} - {df['Year'].max()}",
        'avg_yield_all_crops': df['hg/ha_yield'].mean(),
        'avg_rainfall': df['average_rain_fall_mm_per_year'].mean(),
        'avg_temperature': df['avg_temp'].mean()
    }
    
    # Crop-specific statistics
    crop_stats = df.groupby('Item').agg({
        'hg/ha_yield': ['mean', 'min', 'max'],
        'average_rain_fall_mm_per_year': 'mean',
        'pesticides_tonnes': 'mean',
        'avg_temp': 'mean'
    }).reset_index()
    
    # Flatten the multi-index columns
    crop_stats.columns = ['_'.join(col).strip('_') for col in crop_stats.columns.values]
    
    # Year-over-year trends
    year_trends = df.groupby('Year')['hg/ha_yield'].mean().reset_index()
    
    # Save all statistics to a JSON file
    import json
    
    summary = {
        'overall_stats': overall_stats,
        'crop_stats': crop_stats.to_dict('records'),
        'year_trends': year_trends.to_dict('records')
    }
    
    with open('crop_data_summary.json', 'w') as f:
        json.dump(summary, f, indent=4)
    
    print("Summary file created successfully.")

if __name__ == "__main__":
    # Check if raw data exists
    if not os.path.exists('raw_crop_data.csv'):
        print("Error: raw_crop_data.csv not found. Please make sure the file exists.")
    else:
        process_crop_data()