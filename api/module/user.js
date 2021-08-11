import request from '../request.js'

// 接口
const Api = {
	login: '/login',
	logout: '/logout'
}

// 登录
const login = (data) => {
	// console.log(data)
	return request.request({
		url: Api.login ,
		data:data,
		method: 'POST'
	})
}

// 注销
const logout = data => {
	return request.request({
		url: Api.logout,
		data: data,
		method: 'GET'
	})
}

export default {
	login,
	logout
}
