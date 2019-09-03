import axios from '@/libs/api.request'

import { getToken } from '@/libs/util'
const token = getToken()

export const getUserInfo = (data) => {
  return axios.request({
    url: '/user/' + data,
    headers: {
      Authorization: 'Bearer ' + token
    },
    method: 'get'
  })
}

export const getUserList = (data) => {
  return axios.request({
    url: '/user',
    headers: {
      Authorization: 'Bearer ' + token
    },
    params: data,
    method: 'get'
  })
}

export const delUser = (data) => {
  return axios.request({
    url: '/user/delete/' + data,
    headers: {
      Authorization: 'Bearer ' + token
    },
    method: 'post'
  })
}

export const createUser = (data) => {
  return axios.request({
    url: '/user/create',
    headers: {
      Authorization: 'Bearer ' + token
    },
    data,
    method: 'post'
  })
}

export const editUser = (data) => {
  return axios.request({
    url: '/user/edit',
    headers: {
      Authorization: 'Bearer ' + token
    },
    data,
    method: 'post'
  })
}