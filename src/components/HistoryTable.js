import React from 'react';

function HistoryTable() {
  const history = [
    { date: '15/04/2025', crop: 'Blé', area: '12.5 ha', predicted: '8.7 t/ha', actual: '-', status: 'En cours' },
    { date: '23/03/2025', crop: 'Maïs', area: '8.3 ha', predicted: '9.2 t/ha', actual: '9.4 t/ha', status: 'Complété' },
    { date: '12/02/2025', crop: 'Orge', area: '5.0 ha', predicted: '6.8 t/ha', actual: '6.5 t/ha', status: 'Complété' },
    { date: '05/01/2025', crop: 'Colza', area: '7.2 ha', predicted: '4.1 t/ha', actual: '3.9 t/ha', status: 'Complété' },
  ];

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left text-gray-600">
          <th className="p-3">Date</th>
          <th className="p-3">Culture</th>
          <th className="p-3">Surface</th>
          <th className="p-3">Rendement prédit</th>
          <th className="p-3">Rendement réel</th>
          <th className="p-3">Statut</th>
        </tr>
      </thead>
      <tbody>
        {history.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="p-3">{item.date}</td>
            <td className="p-3">{item.crop}</td>
            <td className="p-3">{item.area}</td>
            <td className="p-3">{item.predicted}</td>
            <td className="p-3">{item.actual}</td>
            <td className="p-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold ${
                  item.status === 'En cours' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}
              >
                {item.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default HistoryTable;