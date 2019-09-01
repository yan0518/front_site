import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

const token = getToken()

export const getPatientList = (data) => {
  return axios.request({
    url: '/patient/list',
    headers: {
      Authorization: 'Bearer ' + token
    },
    params: data,
    method: 'get'
  })
}
