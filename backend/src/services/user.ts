import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
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
      user.username = username
    }

    if (email) {
      const isUserEmailExists = await User.findOne({ email: email.toLowerCase() })
      if (isUserEmailExists)
        throw ApiError.BadRequest(ResponseTexts.UserEmailAlreadyExists)
      user.email = email.toLowerCase()
    }
    
    if (password)
      user.password = await hashPassword(password)
    
    await user.save()

    const token = createToken(user.toJSON())
    return { token }
  }
} 
