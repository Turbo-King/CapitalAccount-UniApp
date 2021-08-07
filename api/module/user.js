import request from '../request.js'

// 接口
const Api = {
	login: '/api/login',
	logout: '/api/logout'
}

// 登录
const login = (data) => {
	return request.request({
		url: Api.login +
			'?username=' + data.username +
			'&password=' + data.password +
			'&captchaKey=' + data.captchaKey +
			'&captchaCode=' + data.captchaCode,
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
