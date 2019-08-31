import axios from '@/libs/api.request'

export const getPatientList = (data) => {
	return axios.request({
		url: '/patient/list',
		params: data,
		method: 'get'
	})
}