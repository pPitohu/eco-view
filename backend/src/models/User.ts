import mongoose from 'mongoose'
import { UserRoles } from '../constants/userRoles'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    default: UserRoles.USER
  },
  image: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
  collection: 'users'
})

export default mongoose.model('User', UserSchema)
