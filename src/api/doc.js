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

export const editDoc = (data) => {
  return axios.request({
    url: '/doctor/edit',
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

export const delDoc = (data) => {
  return axios.request({
    url: '/doctor/delete/' + data,
    headers: {
      Authorization: 'Bearer ' + token
    },
    method: 'post'
  })
}

export const getDocInfo = (data) => {
  return axios.request({
    url: '/doctor/' + data,
    headers: {
      Authorization: 'Bearer ' + token
    },
    method: 'get'
  })
}

export const getDocQrcode = (data) => {
  return axios.request({
    url: '/wechat/qrcode/' + data,
    headers: {
      Authorization: 'Bearer ' + token
    },
    method: 'get'
  })
}
