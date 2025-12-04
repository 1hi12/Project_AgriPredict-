import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib

# Charger le jeu de données
data = pd.read_csv('crop_yield_data.csv')

# Définir les caractéristiques (features) et la cible (target)
X = data[['Area', 'Item', 'Year', 'average_rain_fall_mm_per_year', 'pesticides_tonnes', 'avg_temp']]
y = data['hg/ha_yield']

# Définir les colonnes catégoriques et numériques
categorical_cols = ['Area', 'Item']
numerical_cols = ['Year', 'average_rain_fall_mm_per_year', 'pesticides_tonnes', 'avg_temp']

# Créer un pipeline de prétraitement
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols),
        ('num', 'passthrough', numerical_cols)
    ])
rf_model = joblib.load('Model/random_forest_model.pkl')

# Créer un pipeline complet avec prétraitement et modèle
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
])

# Diviser les données en ensembles d'entraînement et de test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Entraîner le modèle
model.fit(X_train, y_train)

# Sauvegarder le modèle dans le dossier Model
joblib.dump(model, 'Model/random_forest_model.pkl')
joblib.dump(X_train.columns, 'Model/training_columns.pkl')

print("Model and columns saved successfully")