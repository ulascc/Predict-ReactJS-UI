import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { predictSchema } from '../schemas';
import { jwtDecode } from 'jwt-decode';
import { useFormik } from 'formik';
import { Navbar } from './Navbar';
import axios from 'axios';


function Predict() {

  const [email, setEmail] = useState('');
  const [responseData, setResponseData] = useState(null); 
  const navigate = useNavigate();

  const notificationSound = new Audio('/src/assets/token_notification_sound.mp3');

  const playNotificationSound = () => {
    notificationSound.play();
  };

  const onSubmit = async (values, actions) => {
    try {      
      //console.log(values)
      //console.log(values.text)

      const response = await axios.post('http://127.0.0.1:8000/predict', {
        text: values.text
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


  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        text: '',
      },
      validationSchema: predictSchema,
      onSubmit,
    });

<div>
        <Navbar/>
      </div>
  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <Navbar/>
      </div>
      {email && <div>Merhaba {email}</div>}
      <div className="inputDiv">
        <label>Predict</label>
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
      <div>
        {responseData && <div><h3>{responseData.text}</h3></div>}
      </div>
      <div>
        {responseData && <div><h3>{responseData.class}</h3></div>}
      </div>
    </form>
    </>
  );
}

export default Predict;

