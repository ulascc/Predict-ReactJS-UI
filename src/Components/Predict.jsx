import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictSchema } from '../schemas';
import { jwtDecode } from 'jwt-decode';
import { useFormik } from 'formik';
import { Navbar } from './Navbar';
import axios from 'axios';
import {  useAddNewPredictionMutation, useAddPredictionMutation, useFetchLogsQuery } from '../store/store.jsx';
import PredictionLogs from './PredictionLogs';
import Button from '@mui/material/Button';
import '../styles/Predict.css'; 
import '../App.css'; 
import { TbMessageChatbot } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";

function Predict() {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [responseData, setResponseData] = useState(null); 
  const navigate = useNavigate();
  const [userId, setUserId] = useState(0);
  //const [addPrediction, results] = useAddPredictionMutation();
  const [ addNewPrediction , results ] = useAddNewPredictionMutation()


  const handlePredict = () => {
    const predictText = values.text;
    const myToken = localStorage.getItem('accessToken');
  
    const requestData = {
      text: predictText,
      token: myToken
    };
  
    addNewPrediction(requestData);
    resetForm();
  };

  useEffect(() => {
    if (results.isSuccess) {
      const response = results.data;
      setResponseData(response);
    }
  }, [results.isSuccess, results.data]);

  const notificationSound = new Audio('/src/assets/token_notification_sound.mp3');

  const playNotificationSound = () => {
    notificationSound.play();
  };

  const onSubmit = async (values, actions) => {
    try {      
      const response = await axios.post('http://127.0.0.1:8001/predict', {
        text: values.text,
        token: localStorage.getItem('accessToken')
      });
      setResponseData(response.data);
      alert('İşlem başarılıdır.');
      actions.resetForm();
    } catch (error) {
      console.error('İşlem sırasında bir hata oluştu:', error);
      alert('İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  useEffect(() => {
    const checkTokenValidity = () => {
      const Token = localStorage.getItem('accessToken');
      if (Token) {
        try {
          const decodedToken = jwtDecode(Token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            playNotificationSound();
            alert('Oturum süreniz doldu. Tekrar giriş yapınız');
            navigate("/login");
            return;
          }
          setEmail(decodedToken.email);
          setFullname(decodedToken.name);
          setUserId(decodedToken.user_id);
        } catch (error) {
          console.error('Invalid token');
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };
    
    checkTokenValidity();
    const interval = setInterval(checkTokenValidity, 2000);
    return () => clearInterval(interval);
  }, [navigate]);

  const { values, errors, isSubmitting, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema: predictSchema,
    onSubmit,
  });

  return (
    <>
  <Navbar fullname={fullname} />
  <div className="predict-container" style={{marginTop:'auto'}}>
    <form onSubmit={handleSubmit}>
      <div className="input-button-container">
        <div className="inputDiv" >
          <label>What Are You Thinking?</label>
          <input
            style={{ marginBottom: '20px' }}
            type="text"
            value={values.text}
            onChange={handleChange}
            id="text"
            className={errors.text ? 'input-error' : ''}
          />
          {errors.text && <p className="error">{errors.text}</p>}
          {responseData && (
            <>
            <div style={{ marginBottom: '10px' }}>
              <h3><FaRegUser /> Your Message: {responseData.text}</h3>
            </div>
            <div>
              <h3><TbMessageChatbot /> AI Answer: {responseData.class}</h3>
            </div>
          </>
          )}
        </div>
        <div>
          <Button variant="contained" color="success" style={{marginTop: '25px'}}onClick={handlePredict}>Predict</Button>
        </div>
      </div>
      
    </form>
    <div>
      <div>
        <h3>Prediction Logs</h3>
        <PredictionLogs user_id={userId} />
      </div>
    </div>
  </div>
</>
  );
}

export default Predict;

