import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GeneralForm from './Components/GeneralForm';
import PortalForm from './Components/PortalForm';
import Register from './Components/Register';
import Login from './Components/Login';
import Predict from './Components/Predict';
import PredictionHistory from './Components/PredictionHistory';


function App() {
  return (
    <div className='App'>
      
      <Routes>
        <Route path='/' element={<GeneralForm />} />
        <Route path='portal' element={<PortalForm />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='predict' element={<Predict/>}/>
        <Route path='predictionHistory' element={<PredictionHistory/>}/>
      </Routes>
    </div>
  );
}

export default App;
