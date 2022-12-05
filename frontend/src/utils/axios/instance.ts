import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

const setupConfig = (config: AxiosRequestConfig) => {
  try {
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  } catch (error) {
    return config
  }
}

instance.interceptors.request.use(setupConfig)
