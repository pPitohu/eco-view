import type { AxiosResponse } from 'axios'
import { TYPE } from 'vue-toastification'
import { fireToast } from '@/plugins/toast'
import router from '@/router'

interface HandleResponse {
  handleSuccessStatus?: (arg0: any) => any;
  response: AxiosResponse<any>;
  successStatus: number;
}

export const handleResponse = ({
  handleSuccessStatus,
  response,
  successStatus,
}: HandleResponse) => {
  const { data, status } = response
  switch (status) {
  case successStatus:
    return handleSuccessStatus
        && handleSuccessStatus(data)
  case 401:
    // router.push({ name: 'login' })
    break
  case 404:
    router.replace({ name: 'not-found' })
    break
  case 500:
    fireToast(TYPE.ERROR, 'Произошла внутренняя ошибка')
    break
  default:
    fireToast(TYPE.ERROR, data)
  }
}
