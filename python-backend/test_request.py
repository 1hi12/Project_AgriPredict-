import requests

# URL de l'API Flask
url = "http://127.0.0.1:5000/api/prediction"

# Données que tu veux envoyer (match PredictionForm.js fields)
data = {
    "cropType": "corn",
    "areaSize": "12.5",
    "soilType": "loam",
    "plantingDate": "2023-04-15",
    "irrigation": "drip",
    "fertilizer": "250",
    "pesticide": "minimal",
    "previousCrop": "wheat"
}

# Envoie de la requête POST à l'API Flask
try:
    response = requests.post(url, json=data)
    response.raise_for_status()  # Vérifie si une erreur HTTP s'est produite
    print("✅ Réponse de l'API :", response.json())
except requests.exceptions.RequestException as e:
    print("❌ Erreur lors de la requête :", e)