import axios from '@/libs/api.request'

export const createDoc = (data) => {
  return axios.request({
    url: '/doc/create',
    data,
    method: 'post'
  })
}

export const getDocList = (data) => {
	return axios.request({
		url: '/doc/list',
		params: data,
		method: 'get'
	})
}