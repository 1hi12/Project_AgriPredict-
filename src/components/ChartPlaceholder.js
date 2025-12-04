import React from 'react';

function ChartPlaceholder({ title }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4 text-gray-800">{title}</h3>
      <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center">
        <p>Graphique (Intégration via Chart.js ou Power BI)</p>
      </div>
    </div>
  );
}

export default ChartPlaceholder;