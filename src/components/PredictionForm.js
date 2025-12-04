import React, { useState } from 'react';

function PredictionForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    cropType: '',
    areaSize: '',
    soilType: '',
    plantingDate: '',
    irrigation: '',
    fertilizer: '',
    pesticide: '',
    previousCrop: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="cropType">Type de culture</label>
        <select
          name="cropType"
          value={formData.cropType}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">Sélectionnez...</option>
          <option value="wheat">Blé</option>
          <option value="corn">Maïs</option>
          <option value="barley">Orge</option>
          <option value="soybean">Soja</option>
          <option value="rapeseed">Colza</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="areaSize">Surface (hectares)</label>
        <input
          type="number"
          name="areaSize"
          value={formData.areaSize}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="Ex: 12.5"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="soilType">Type de sol</label>
        <select
          name="soilType"
          value={formData.soilType}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">Sélectionnez...</option>
          <option value="clay">Argileux</option>
          <option value="silt">Limoneux</option>
          <option value="sandy">Sableux</option>
          <option value="loam">Limon argileux</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="plantingDate">Date de semis</label>
        <input
          type="date"
          name="plantingDate"
          value={formData.plantingDate}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="irrigation">Irrigation</label>
        <select
          name="irrigation"
          value={formData.irrigation}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">Sélectionnez...</option>
          <option value="none">Aucune</option>
          <option value="drip">Goutte à goutte</option>
          <option value="sprinkler">Aspersion</option>
          <option value="flood">Irrigation par inondation</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="fertilizer">Engrais (kg/ha)</label>
        <input
          type="number"
          name="fertilizer"
          value={formData.fertilizer}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="Ex: 250"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="pesticide">Utilisation de pesticides</label>
        <select
          name="pesticide"
          value={formData.pesticide}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">Sélectionnez...</option>
          <option value="none">Aucune</option>
          <option value="minimal">Minimale</option>
          <option value="moderate">Modérée</option>
          <option value="intensive">Intensive</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="previousCrop">Culture précédente</label>
        <select
          name="previousCrop"
          value={formData.previousCrop}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">Sélectionnez...</option>
          <option value="wheat">Blé</option>
          <option value="corn">Maïs</option>
          <option value="barley">Orge</option>
          <option value="fallow">Jachère</option>
        </select>
      </div>
      <div className="col-span-full">
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700 transition"
        >
          Générer la prédiction
        </button>
      </div>
    </form>
  );
}

export default PredictionForm;