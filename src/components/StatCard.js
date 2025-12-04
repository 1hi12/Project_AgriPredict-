import React from 'react';

function StatCard({ icon, title, value, meta }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center hover:-translate-y-1 transition-transform">
      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mr-4">
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-600">{title}</div>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        <div className="text-xs text-green-600">{meta}</div>
      </div>
    </div>
  );
}

export default StatCard;