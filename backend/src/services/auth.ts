import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ApiError } from '../helpers/apiError'
import User from '../models/User'

enum ResponseTexts {
  UserAlreadyExists = 'Пользователь с такими данными уже существует',
  UnknownError = 'Неизвестная ошибка',
  UserNotFound = 'Пользователь не найден',
  PasswordIsInvalid = 'Неверный пароль',
}

const generateLifeTime = (days: number) => {
  const hoursInDay = 24
  const milisecondsInHour = 3600000
  return milisecondsInHour * hoursInDay * days
}

export class AuthService {
  public static register = async ({ email, password, username }: {
    email: string;
    password: string;
    username: string;
   }) => {
    const isUserExists = await User.findOne({ $or: [{ email }, { username }]})
    if (isUserExists)
      throw ApiError.BadRequest(ResponseTexts.UserAlreadyExists)
      
    const passwordSalt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, passwordSalt)
    const user = await User.create({ email, password: hashedPassword, username })
    return user
  }

  public static login = async ({ email, password }: {
    email: string;
    password: string;
  }) => {
    const user = await User.findOne({ email })
    if (!user)
      throw ApiError.NotFound(ResponseTexts.UserNotFound)
      
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid)
      throw ApiError.UnprocessableEntity(ResponseTexts.PasswordIsInvalid)
      
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: generateLifeTime(100) }
    )
    return { token }
  }
} 
