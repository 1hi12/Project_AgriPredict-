import axios from 'axios';
import React, { useState } from 'react';
import ChartPlaceholder from '../components/ChartPlaceholder';
import PredictionForm from '../components/PredictionForm';

function Prediction() {
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePrediction = async (data) => {
    // Log the form data being sent to the backend
    console.log('Form Data Sent to Backend:', data);

    setLoading(true);
    setError(null);
    setPredictionResult(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/prediction', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Log the response from the backend
      console.log('Prediction Response:', response.data);
      setPredictionResult(response.data);
    } catch (err) {
      console.error('Prediction Error:', err);
      const errorMessage = err.response?.data?.error || 'Failed to get prediction from the server';
      console.log('Error Details:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Prédiction de rendement</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span className="mr-2">🔍</span> Nouvelle prédiction
        </h2>
        <PredictionForm onSubmit={handlePrediction} />
        {loading && (
          <div className="mt-6 p-4 bg-blue-50 rounded">
            <h3 className="text-lg font-bold">Chargement...</h3>
          </div>
        )}
        {error && (
          <div className="mt-6 p-4 bg-red-50 rounded">
            <h3 className="text-lg font-bold">Erreur</h3>
            <p>{error}</p>
          </div>
        )}
        {predictionResult && (
          <div className="mt-6 p-4 bg-green-50 rounded">
            <h3 className="text-lg font-bold">Résultat de la prédiction</h3>
            <p>Rendement prévu: {predictionResult.yield}</p>
            <p>Confiance: {predictionResult.confidence}</p>
            <p>Date: {predictionResult.date}</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartPlaceholder title="Analyse de rendement par année" />
        <ChartPlaceholder title="Facteurs d'influence" />
      </div>
    </div>
  );
}

export default Prediction;