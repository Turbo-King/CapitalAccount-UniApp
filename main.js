import Vue from 'vue';
import App from './App';

// 引入uview依赖
import uView from "uview-ui";
Vue.use(uView);

// 引入API请求
import {
	myRequest
} from './util/api.js'

//封装请求
Vue.config.productionTip = false

Vue.prototype.$myRequest = myRequest

// 时间格式化
Vue.filter('formatDate', (date) => {
	const newDate = new Date(date)
	const year = newDate.getFullYear()
	const month = newDate.getMonth().toString().padStart(2, 0)
	const day = newDate.getDay().toString().padStart(2, 0)
	return year + '-' + month + '-' + day
})

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
