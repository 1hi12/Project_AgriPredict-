import React from 'react';

function Navbar({ handleLogout }) {
  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center fixed top-0 w-full z-10 shadow-md">
      <div className="flex items-center">
        <span className="text-2xl mr-2">🌱</span>
        <span className="text-xl font-bold">AgriPredict</span>
      </div>
      <div className="flex items-center">
        <div className="mr-4 text-right">
          <div className="font-bold">Thomas Dupont</div>
          <div className="text-sm">Agriculteur Premium</div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white text-green-600 px-4 py-2 rounded font-bold hover:bg-gray-200 transition"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}

export default Navbar;