import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';


function Login() {
  const navigate = useNavigate();

  async function handleSubmit(values) {
    try {
      const response = await axios.post('http://127.0.0.1:8001/login', values);
      console.log(response.data);
  
      
      const { access_token } = response.data;
      if (access_token) {
        localStorage.setItem('accessToken', access_token); // Token'ı localStorage'e saklama
      }
  
      alert('Giriş başarılı!');
      navigate("/predict");
  
    } catch (error) {
      console.error('Giriş sırasında bir hata oluştu:', error);
      alert('Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    }
  }

  return (
    <div>
      <h1>Giriş Yap</h1>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" />
          </div>

          <div>
            <label htmlFor="password">Şifre:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" />
          </div>

          <button type="submit">Giriş Yap</button>

          <Link className="formLink" to="/register">
            Hesabın yok mu? Kayıt Ol
          </Link>

        </Form>
      </Formik>
    </div>
  );
}

export default Login;
