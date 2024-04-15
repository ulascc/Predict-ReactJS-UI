import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { jwtDecode } from 'jwt-decode';
import PredictionLogs from './PredictionLogs';

function PredictionHistory() {
  const navigate = useNavigate();
  const notificationSound = new Audio('/src/assets/token_notification_sound.mp3');

  const playNotificationSound = () => {
    notificationSound.play();
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
          }else{
            if(decodedToken.user_type!="admin"){
              alert("you don't have authority");
              navigate("/predict");
            }
          }
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

  return (
    <div>
      <Navbar />
      <div>
        PredictHistory
      </div>
      <PredictionLogs />
    </div>
  );
}

export default PredictionHistory;
