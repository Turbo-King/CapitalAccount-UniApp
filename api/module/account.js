import request from '../request.js';

// 接口
const Api = {
	deposit: '/api/account/deposit',
	withdrawal: '/api/account/withdrawal'
}

// 创建
const deposit = (data) => {
	return request.request({
		url: Api.deposit
			+ '?userId=' + data.userId
			+ '&money=' + data.money,
		method: 'POST'
	})
}

const withdrawal = (data) => {
	return request.request({
		url: Api.withdrawal
			+ '?userId=' + data.userId
			+ '&money=' + data.money,
		method: 'POST'
	})
}

export default {
	deposit,
	withdrawal
}
