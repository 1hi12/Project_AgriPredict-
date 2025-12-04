import React from 'react';
import StatCard from '../components/StatCard';
import ChartPlaceholder from '../components/ChartPlaceholder';

function Dashboard() {
  const stats = [
    { icon: '🌾', title: 'Rendement prévu', value: '8.7 t/ha', meta: '+12% vs année précédente' },
    { icon: '💰', title: 'Profit estimé', value: '5 280 €/ha', meta: 'Basé sur le prix du marché' },
    { icon: '🕒', title: 'Jours avant récolte', value: '45 jours', meta: 'Date prévue: 06/06/2025' },
    { icon: '⚠️', title: 'Niveau de risque', value: 'Faible', meta: '1 risque mineur identifié' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Tableau de bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span className="mr-2">📊</span> Tableau de bord Power BI
        </h2>
        {/* Placeholder for Power BI Embedded */}
        <div className="w-full h-96 bg-gray-200 rounded flex items-center justify-center">
          <p>Power BI Dashboard (Intégration via Power BI JavaScript API)</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartPlaceholder title="Analyse de rendement par année" />
        <ChartPlaceholder title="Facteurs d'influence" />
      </div>
    </div>
  );
}

export default Dashboard;