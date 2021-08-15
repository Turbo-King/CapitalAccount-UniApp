'use strict';
exports.main = async (event, context) => {
	// event里包含着客户端提交的参数
	const res = await uniCloud.getPhoneNumber({
		appid: '__UNI__EB00571', // 替换成自己开通一键登录的应用的DCloud appid，使用callFunction方式调用时可以不传（会自动取当前客户端的appid），如果使用云函数URL化的方式访问必须传此参数
		provider: 'univerify',
		apiKey: '7843936441d833c7377b9b3471b66601', // 在开发者中心开通服务并获取apiKey
		apiSecret: 'd711ed3580917fd78a8c50f4e625c5dd', // 在开发者中心开通服务并获取apiSecret
		access_token: event.access_token,
		openid: event.openid
	})

	console.log("手机号：" + res.phoneNumber); // res里包含手机号
	// 执行用户信息入库等操作，正常情况下不要把完整手机号返回给前端
	// 如果数据库在uniCloud上，可以直接入库
	// 如果数据库不在uniCloud上，可以通过 uniCloud.httpclient API，将手机号通过http方式传递给其他服务器的接口，详见：https://uniapp.dcloud.net.cn/uniCloud/cf-functions?id=httpclient
	return {
		code: 200,
		message: '获取手机号成功',
		data: res.phoneNumber
	}
}
