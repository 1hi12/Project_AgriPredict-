import React from 'react';
import HistoryTable from '../components/HistoryTable';

function History() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Historique</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span className="mr-2">📜</span> Historique récent
        </h2>
        <HistoryTable />
      </div>
    </div>
  );
}

export default History;