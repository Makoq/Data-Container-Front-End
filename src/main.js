import Vue from 'vue'
import './plugins/vuetify'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css' 
import 'bootstrap'
import $ from 'jquery'

Vue.use(ElementUI);
Vue.config.productionTip = false
 
Vue.prototype.$axios = axios

//请求头加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
 
    return config;
  },
  error => {
    return Promise.reject(error);
  });



new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
