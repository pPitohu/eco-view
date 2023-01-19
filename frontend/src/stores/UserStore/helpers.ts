import { useUserStore } from '.'
import jwt_decode from 'jwt-decode'

export const setUserByToken = (token: string) => {
  const userStore = useUserStore()
  const {
    _id: id,
    createdAt,
    email,
    role,
    updatedAt,
    username
  } = jwt_decode<any>(token)

  userStore.user = {
    email,
    username,
    id,
    role,
    createdAt,
    updatedAt
  }

  localStorage.setItem('token', token)
}
