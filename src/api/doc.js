import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

const token = getToken()

export const createDoc = (data) => {
  return axios.request({
    url: '/doctor/create',
    headers: {
      Authorization: 'Bearer ' + token
    },
    data,
    method: 'post'
  })
}

export const getDocList = (data) => {
  return axios.request({
    url: '/doctor',
    headers: {
      Authorization: 'Bearer ' + token
    },
    params: data,
    method: 'get'
  })
}
