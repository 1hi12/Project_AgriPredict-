import joblib

# Charger le fichier training_columns.pkl
try:
    training_columns = joblib.load('Model/training_columns.pkl')
    print("Contenu de training_columns.pkl :")
    print(training_columns)
except FileNotFoundError:
    print("Erreur : Le fichier 'Model/training_columns.pkl' n'a pas été trouvé.")
except Exception as e:
    print(f"Erreur lors du chargement du fichier : {e}")