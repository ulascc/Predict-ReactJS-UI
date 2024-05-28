import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export const Navbar = ({ fullname }) => {
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    console.log("Oturum kapatıldı.");
  };

  return (
    <div className="navbar">
      <div className="main">
        <div className="mainLink">
          <span>Hello {fullname}</span> 
          <span className="separator">|</span>
          <Link to="/predict">Predict</Link>
          <span className="separator">|</span> 
          <Link to="/predictionHistory">Prediction History</Link>
          <button type="button" onClick={handleLogout}>
              Log Out
          </button>
        </div>
      </div>
    </div>
  );
};
