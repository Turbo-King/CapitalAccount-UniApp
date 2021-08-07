import request from '../request.js';

// 接口
const Api = {
	create: '/api/captcha/create'
}

// 创建
const create = () => {
	// console.log(request);
	return request.request({
		url: Api.create
	})
}

export default {
	create
}
