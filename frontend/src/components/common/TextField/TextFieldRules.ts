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
  .max(30, 'Максимум 30 символов')
  .nullable()
