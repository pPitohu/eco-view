import axios from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')

    if (token)
      config.headers!.Authorization = `Bearer ${token}`
    else delete instance.defaults.headers.common.Authorization

    return config
  },
  error => Promise.reject(error)
)
