import { useUserStore } from '.'
import jwt_decode from 'jwt-decode'
import accountPlugImage from '@/assets/images/account-plug.svg'

export const setUserByToken = (token: string) => {
  const userStore = useUserStore()
  const {
    _id: id,
    createdAt,
    email,
    image,
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
    updatedAt,
    image
  }
  userStore.user.image = image || accountPlugImage

  localStorage.setItem('token', token)
}
