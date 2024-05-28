import { useNavigate } from 'react-router-dom';
import PredictionLogs from './PredictionLogs';
import React, { useEffect, useState  } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navbar } from './Navbar';


function PredictionHistory() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
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
            const full_name = decodedToken.name;
            setFullname(full_name);
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
      <Navbar fullname={fullname} />
      <PredictionLogs />
    </div>
  );
}

export default PredictionHistory;
