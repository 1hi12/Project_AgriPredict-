import React from 'react';
import Chatbot from '../components/Chatbot';

function Chat() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Assistant IA pour l'Agriculture</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Chatbot />
        </div>
        
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Questions suggérées</h3>
            <ul className="space-y-2">
              <li className="p-2 bg-gray-100 rounded hover:bg-green-100 cursor-pointer transition">
                Quel est le rendement prévu pour le maïs en 2025?
              </li>
              <li className="p-2 bg-gray-100 rounded hover:bg-green-100 cursor-pointer transition">
                Comment la pluviométrie affecte-t-elle le rendement du blé?
              </li>
              <li className="p-2 bg-gray-100 rounded hover:bg-green-100 cursor-pointer transition">
                Quelle culture a le meilleur rendement avec peu d'eau?
              </li>
              <li className="p-2 bg-gray-100 rounded hover:bg-green-100 cursor-pointer transition">
                Comment optimiser l'utilisation des pesticides?
              </li>
              <li className="p-2 bg-gray-100 rounded hover:bg-green-100 cursor-pointer transition">
                Quel est l'impact de la température sur le rendement du riz?
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4 text-gray-800">À propos de l'assistant</h3>
            <p className="mb-4">
              Notre assistant IA est conçu pour répondre à vos questions sur les prédictions de rendement 
              agricole en utilisant des modèles d'apprentissage automatique avancés, dont Random Forest.
            </p>
            <p>
              Il peut vous aider à comprendre les facteurs qui influencent le rendement des cultures, 
              à interpréter les prévisions et à optimiser vos pratiques agricoles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;