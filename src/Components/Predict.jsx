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

function Predict() {

  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [responseData, setResponseData] = useState(null); 
  const navigate = useNavigate();


  const [userId, setUserId] = useState(0);
  //const { data, isError, isFetching } = useFetchLogsQuery(userId) 
  //console.log(data)
  

  const [addPrediction , results ] = useAddPredictionMutation()
  //const [ addNewPrediction , results ] = useAddNewPredictionMutation()

  const handlePredict = () => {
    const predictText = values.text;
    const myToken = localStorage.getItem('accessToken');
  
    const requestData = {
      text: predictText,
      token: myToken
    };
    console.log(requestData)
  
    addPrediction(requestData);
    resetForm()
    console.log(results.data)
    
  }

  useEffect(() => {
    if (results.isSuccess) {
      console.log(results.data);
      const response = results.data
      setResponseData(response);
    }
  }, [results.isSuccess, results.data]);



  const notificationSound = new Audio('/src/assets/token_notification_sound.mp3');

  const playNotificationSound = () => {
    notificationSound.play();
  };

  const onSubmit = async (values, actions) => {
    try {      
      //console.log(values)
      //console.log(values.text)
      
      const response = await axios.post('http://127.0.0.1:8001/predict', {
        text: values.text,
        token: localStorage.getItem('accessToken')
      });
      console.log(response.data); 
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
            console.log('Token expired');
            playNotificationSound();
            alert('Oturum süreniz doldu. Tekrar giriş yapınız');
            navigate("/login");
            return;
          }
          const userEmail = decodedToken.email;
          setEmail(userEmail);
          const full_name = decodedToken.name;
          setFullname(full_name);
          const user_id = decodedToken.user_id;
          setUserId(user_id)
        } catch (error) {
          console.error('Invalid token');
          navigate("/login");
        }
      } else {
        console.log('No token found'); 
        navigate("/login");
      }
    };
    
    // İlk sayfa açıldığında token kontrolü
    checkTokenValidity();

    // Her 2 saniyede bir token kontrolü
    const interval = setInterval(checkTokenValidity, 2000);

    // Component unmount edildiğinde interval'i temizle
    return () => clearInterval(interval);
  }, []);


  const { values, errors, isSubmitting, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        text: '',
      },
      validationSchema: predictSchema,
      onSubmit,
    });

    return (
      <>
      <div>
          <Navbar fullname={fullname} />
      </div>
      <div>
      <form onSubmit={handleSubmit}>
        <div className="inputDiv">
          <label>What Are You Thinking ?</label>
          <input
            type="text"
            value={values.text}
            onChange={handleChange}
            id="text"
            className={errors.text ? 'input-error' : ''}
        />
        {errors.text && <p className="error">{errors.text}</p>}
        </div>
        <button disabled={isSubmitting} type="submit">
          Predict 
        </button>
      </form>
      <button  onClick={handlePredict}>
          Predict 2
      </button>
      <Button variant="contained" color="success" onClick={handlePredict}>Success</Button>
        <div>
          {responseData && <div><h3>Your Message: {responseData.text}</h3></div>}
        </div>
        <div>
          {responseData && <div><h3>AI Answer: {responseData.class}</h3></div>}
        </div>
        <div>
          <h3>Prediction Logs</h3>
          <PredictionLogs user_id={userId}/>
        </div>
      </div>
      </>
    );
}

export default Predict;


