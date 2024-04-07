import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export const Navbar = () => {
  const handleLogout = () => {

    localStorage.removeItem('accessToken');
    console.log("Oturum kapatıldı.");
  };

  return (
    <div className="navbar">
      <div className="main">
        <div className="mainLink">
          <Link to="/predict">Predict</Link>
          <Link to="/predictionHistory">Predict History</Link>
          <button type="button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};
