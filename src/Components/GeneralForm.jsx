import React from 'react';
import { useFormik } from 'formik';
import { basicSchema } from '../schemas';
import { Link } from 'react-router-dom';
import axios from 'axios';

const onSubmit = async (values, actions) => {
  console.log(values);
  console.log(actions);

  try {
    await axios.post('http://127.0.0.1:8000/register/', {
      fullname: values.name,
      email: values.email,
      password: values.password
    });

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    actions.resetForm();
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

function GeneralForm() {
  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        name:'',
        password: '',
        confirmPassword: '',
      },
      validationSchema: basicSchema,
      onSubmit,
    });

  return (
    <form onSubmit={handleSubmit}>
       <div className="inputDiv">
        <label>İsim</label>
        <input
          type="text"
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="İsminizi giriniz"
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div className="inputDiv">
        <label>Email</label>
        <input
          type="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="Mail adresinizi giriniz"
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="inputDiv">
        <label>Şifre</label>
        <input
          type="password"
          value={values.password}
          onChange={handleChange}
          id="password"
          placeholder="Şifrenizi giriniz"
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div className="inputDiv">
        <label>Şifre Tekrar</label>
        <input
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          id="confirmPassword"
          placeholder="Şifrenizi tekrar giriniz"
          className={errors.confirmPassword ? 'input-error' : ''}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
      </div>
      <button disabled={isSubmitting} type="submit">
        Kaydet
      </button>
      <Link className="formLink" to="/portal">
        Portala Git
      </Link>
    </form>
  );
}

export default GeneralForm;
