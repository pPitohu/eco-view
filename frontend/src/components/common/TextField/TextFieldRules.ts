import * as yup from 'yup'

export const passwordRules = yup
  .string()
  .required('Обязательное поле')
  .min(8, 'Минимум 8 символов')
  .nullable()

export const emailRules = yup
  .string()
  .required('Обязательное поле')
  .email('Некорректный email')
  .nullable()

export const userNameRules = yup
  .string()
  .required('Обязательное поле')
  .min(3, 'Минимум 3 символа')
  .max(20, 'Максимум 20 символов')
  .matches(/^[a-zA-Z0-9_]+$/, 'Только латинские буквы, цифры и "_"')
  .nullable()

export const loginFormValidator = yup.object({
  email: emailRules,
  password: passwordRules,
})

export const registerFormValidator = yup.object({
  email: emailRules,
  username: userNameRules,
  password: passwordRules,
  confirmPassword: yup.string().required('Обязательное поле').when('password', (password, field) =>
    password ? field.required().oneOf([yup.ref('password')], 'Пароли не совпадают') : field),
})
