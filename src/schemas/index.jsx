import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const basicSchema = yup.object().shape({
    email: yup
    .string()
    .email('Geçerli bir Email giriniz')
    .required('Email girmek zorunludur'),
    fullname: yup
    .string()
    .required('İsim girmek zorunludur'),
    password: yup
    .string()
    .min(5, 'Şifre en az 5 karakter olmalıdır')
    .matches(passwordRules, {message:'En az bir büyük harf, bir küçük harf ve bir sayı giriniz'})
    .required('Şifre girmek zorunludur'),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Şifreler Eşleşmiyor')
    .required('Tekrar şifre girmek zorunludur')
})

export const predictSchema = yup.object().shape({
  text: yup
  .string()
  .required('Bu alan boş olamaz'),
})


export const advancedSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, 'Kullanıcı adı minunmum 3 karakter uzunluğunda olmadılır')
      .required('Kullanıcı adı zorunludur'),
    university: yup
      .string()
      .oneOf(['bogazici', 'gsu', 'odtü', 'itü'], 'Lütfen üniversitenizi seçiniz')
      .required('Lütfen üniversitenizi seçiniz'),
    isAccepted: yup.boolean().oneOf([true], 'Kullanım koşullarını kabul ediniz'),
  });