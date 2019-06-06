import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './routes.js';
import axios from 'axios';
import Buefy from 'buefy'

import 'buefy/dist/buefy.css'

Vue.use(VueRouter);

Vue.use(Buefy, {
  defaultIconPack: 'fa'
});

const axiosConfig = {
  baseURL: 'http://localhost:7000'
};

Vue.prototype.$http = axios.create(axiosConfig);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
