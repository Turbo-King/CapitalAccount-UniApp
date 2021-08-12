export const newsRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url:  options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				if (res.statusCode !== 200) {
					return uni.showToast({
						title: "获取数据失败"
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: "网络异常,请稍后重试！"
				})
				reject(err)

			}
		})
	})
}
// export default {
// 	myRequest
// }
