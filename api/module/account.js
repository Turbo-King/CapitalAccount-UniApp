import request from '../request.js';

// 接口
const Api = {
	deposit: '/api/account/deposit',
	withdrawal: '/api/account/withdrawal',
	transfer: '/api/account/transfer',
	detail: '/api/account/detail'
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

const transfer = (data) => {
	return request.request({
		url: Api.transfer
			+ '?curUserId=' + data.curUserId
			+ '&account=' + data.account
			+ '&transferUsername=' + data.transferUsername
			+ '&money=' + data.money,
		method: 'POST'
	})
}

const detail = (data) => {
	return request.request({
		url: Api.detail + '?userId=' + data.userId
	})
}

export default {
	deposit,
	withdrawal,
	transfer,
	detail
}
