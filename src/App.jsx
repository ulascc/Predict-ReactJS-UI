import PredictionHistory from './Components/PredictionHistory';
import { Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Predict from './Components/Predict';
import Login from './Components/Login';
import React from 'react';


function App() {
  return (
    <div className='App'>     
      <Routes>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='predict' element={<Predict/>}/>
        <Route path='predictionHistory' element={<PredictionHistory/>}/>
      </Routes>
    </div>
  );
}

export default App;
