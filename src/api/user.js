import axios from '@/libs/api.request'

export const login = (data) => {
  return axios.request({
    url: '/oauth/access_token',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: '/user/info',
    headers: {
      Authorization: 'Bearer ' + token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
