import { POSITION, TYPE, useToast } from 'vue-toastification'
import type { PluginOptions as ToastPluginOptions } from 'vue-toastification'

export const ToastOptions: ToastPluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 2500,
  closeOnClick: true,
  maxToasts: 5,
  transition: 'Vue-Toastification__slideBlurred',
}

export const fireToast = (
  type: TYPE = TYPE.INFO,
  text: string,
  options?: ToastPluginOptions
) => {
  const toast = useToast()
  return toast(text, { type, ...options })
}
