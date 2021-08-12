const BASE_URL = 'http://121.89.219.21:1010'
// const BASE_URL = 'http://127.0.0.1:1010'
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
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
