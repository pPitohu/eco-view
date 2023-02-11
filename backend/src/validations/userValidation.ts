import * as yup from 'yup'

export const passwordRules = yup
  .string().trim('Нельзя использовать пробелы')
  .required('Обязательное поле')
  .min(8, 'Минимум 8 символов')
  .nullable()

export const emailRules = yup
  .string().trim('Нельзя использовать пробелы')
  .required('Обязательное поле')
  .email('Некорректный email')
  .nullable()

export const userNameRules = yup
  .string().trim('Нельзя использовать пробелы')
  .required('Обязательное поле')
  .min(3, 'Минимум 3 символа')
  .max(20, 'Максимум 20 символов')
  .matches(/^[a-zA-Z0-9_]+$/, 'Только латинские буквы, цифры и "_"')
  .nullable()

export const loginSchema = yup.object({
  email: emailRules,
  password: passwordRules,
})

export const registerSchema = yup.object({
  email: emailRules,
  password: passwordRules,
  username: userNameRules,
})

export const updateSchema = yup.object({
  email: emailRules.notRequired(),
  password: passwordRules.notRequired(),
  username: userNameRules.notRequired(),
})
