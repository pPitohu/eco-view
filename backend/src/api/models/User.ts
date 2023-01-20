import mongoose from 'mongoose'
import { UserRoles } from '../constants/userRoles'

const UserSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  },
  role: {
    default: UserRoles.USER,
    type: String
  },
  username: {
    required: true,
    type: String,
    unique: true
  }
}, {
  collection: 'users',
  timestamps: true
})

export default mongoose.model('User', UserSchema)
