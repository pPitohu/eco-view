import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { ApiError } from '../helpers/apiError'
import { imagekit } from '../helpers/imagekit'
import User from '../models/User'

enum ResponseTexts {
  UserEmailAlreadyExists = 'Пользователь с таким email уже существует',
  UserUsernameAlreadyExists = 'Пользователь с таким логином уже существует',
  UnknownError = 'Неизвестная ошибка',
  UserNotFound = 'Пользователь не найден',
  PasswordIsInvalid = 'Неверный пароль',
  InvalidData = 'Неверные данные'
}

const generateLifeTime = (days: number) => {
  const hoursInDay = 24
  const millisecondsInHour = 3600000
  return millisecondsInHour * hoursInDay * days
}

const createToken = (payload: object) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: generateLifeTime(100) }
  )
}

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

export class UserService {
  public static register = async ({ email, password, username }: {
    email: string;
    password: string;
    username: string;
  }) => {
    if (!email || !password || !username)
      throw ApiError.BadRequest(ResponseTexts.InvalidData)
    const isUserEmailExists = await User.findOne({ email: email.toLowerCase() })
    if (isUserEmailExists)
      throw ApiError.BadRequest(ResponseTexts.UserEmailAlreadyExists)
    
    const isUserUsernameExists = await User.findOne({ username })
    if (isUserUsernameExists)
      throw ApiError.BadRequest(ResponseTexts.UserUsernameAlreadyExists)
      
    const hashedPassword = await hashPassword(password)

    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      username
    })

    const token = createToken(user.toJSON())

    return { token }
  }

  public static login = async ({ email, password }: {
    email: string;
    password: string;
  }) => {
    if (!email || !password)
      throw ApiError.BadRequest(ResponseTexts.InvalidData)
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user)
      throw ApiError.BadRequest(ResponseTexts.UserNotFound)
      
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid)
      throw ApiError.UnprocessableEntity(ResponseTexts.PasswordIsInvalid)
      
    const token = createToken(user.toJSON())

    return { token, user }
  }

  public static getMe = async (user: any) => {
    const token = createToken(user.toJSON())
    return { token }
  }

  public static updateImage = async (user, image) => {
    try {
      if (user.image.fileId)
        await imagekit.deleteFile(user.image.fileId)
    } catch { /* empty */ }

    const imageType = image.mimetype.split('/')[1]

    const { fileId, url } = await imagekit.upload({
      file: image.data,
      fileName: `${user._id}.${imageType}`,
      folder: 'users'
    })

    user.image = { fileId, imageLink: url },
    await user.save()
    
    return user.image
  }

  public static updateCredentials = async body => {
    const { email, password, user, username } = body

    if (username) {
      const isUserUsernameExists = await User.findOne({ username })
      if (isUserUsernameExists)
        throw ApiError.BadRequest(ResponseTexts.UserUsernameAlreadyExists)
      user.username = username.trim()
    }

    if (email) {
      const isUserEmailExists = await User.findOne({ email: email.toLowerCase() })
      if (isUserEmailExists)
        throw ApiError.BadRequest(ResponseTexts.UserEmailAlreadyExists)
      user.email = email.trim().toLowerCase()
    }
    
    if (password)
      user.password = await hashPassword(password)
    
    await user.save()

    const token = createToken(user.toJSON())
    return { token }
  }

  public static sendResetMessage = async body => {
    const { email } = body

    const user = await User.findOne({ email })
    if (!user)
      throw ApiError.BadRequest(ResponseTexts.UserNotFound)

    const resetCode = Math.random().toString(36).substring(2)

    const transporter = nodemailer.createTransport({
      auth: {
        pass: process.env.EMAIL_PASSWORD,
        user: process.env.EMAIL_USER
      },
      service: 'gmail'
    })

    await transporter.sendMail({
      html: `
        <div>
          <h1 style="color: #48D9A4;">Eco View</h1>
          <h2 style="font-weight: 400; font-size: 26px;">Ваш код для восстановления: <span style="font-weight: bold">${resetCode}</span></h2>
          <p style="color: #c8c8c8;">Если вы не оставляли заявку на восстановление аккаунта, то проигнорируйте данное сообщение.</p>
        </div>
      `,
      subject: 'Eco View | Восстановление пароля',
      to: email
    })

    return { resetCode }
  }

  public static resetPassword = async body => {
    const { email, password } = body
    const user = await User.findOne({ email })
    if (user)
      user.password = await hashPassword(password)
    return await user.save()
  }
} 
