import request from '../request.js';

// 接口
const Api = {
	create: '/system/captcha/generate'
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
