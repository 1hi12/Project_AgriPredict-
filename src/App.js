import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Chat from './pages/chat';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Login from './pages/Login';
import Prediction from './pages/Prediction';
import Register from './pages/Register';
import './styles.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {isAuthenticated && <Navbar handleLogout={handleLogout} />}
        <div className="flex">
          {isAuthenticated && <Sidebar />}
          <main className={`${isAuthenticated ? 'ml-64 p-6' : 'w-full'}`}>
            <Routes>
              <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login handleLogin={handleLogin} />} />
              <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
              <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/prediction" element={isAuthenticated ? <Prediction /> : <Navigate to="/login" />} />
              <Route path="/history" element={isAuthenticated ? <History /> : <Navigate to="/login" />} />
              <Route path="/chat" element={isAuthenticated ? <Chat /> : <Navigate to="/login" />} />
              <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;