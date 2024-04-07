import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { basicSchema } from '../schemas';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  const handleSubmit = async (values,actions) => {
      try {      
        const response = await axios.post('http://127.0.0.1:8000/register', values);
        console.log(response.data); 

        alert('Kayıt başarılı!');
        actions.resetForm();
        navigate("/login");
      } catch (error) {
        console.error('Kayıt sırasında bir hata oluştu:', error);
        alert('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      }
   };
    
  return (
    <div>
      <h1>Kayıt Formu</h1>
      <Formik
        initialValues={{
          email: '',
          fullname: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={basicSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="name">İsim:</label>
            <Field type="text" id="name" name="fullname" />
            <ErrorMessage name="name" />
          </div>

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

          <div>
            <label htmlFor="confirmPassword">Şifreyi Onayla:</label>
            <Field type="password" id="confirmPassword" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" />
          </div>

          <button type="submit">Kayıt Ol</button>
          <Link className="formLink" to="/login">
             Giriş Yap
          </Link>
        </Form>
      </Formik>
    </div>
  )
}

export default Register

