// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import axios from 'axios'
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';

Vue.config.productionTip = false;
Vue.use(YDUI);
// Vue.use(axios);
Vue.prototype.$ajax = axios;
axios.defaults.withCredentials=true;//用axios发送post请求去登录，能成功返回数据，但是用作权限验证的cookie就是没有保存,经查阅，axios 默认不发送cookie，跨域也是一个原因，需要全局设置

// Vue.prototype.baseurl='http://api.fjtygs.com/xiuxiu/';//设置全局的url
Vue.prototype.baseurl='http://120.76.163.131:8082/xiuxiu/';//设置全局的url
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
