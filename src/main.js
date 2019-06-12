import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './routes.js';
import axios from 'axios';
import Buefy from 'buefy'
import VueRouterUserRoles from "vue-router-user-roles";
import VueScrollTo from "vue-scrollto";

import 'buefy/dist/buefy.css'


Vue.use(VueScrollTo);

Vue.use(VueRouterUserRoles, { router });

Vue.use(VueRouter);

Vue.use(Buefy, {
  defaultIconPack: 'fa'
});

const axiosConfig = {
  baseURL: 'http://localhost:7000'
};

Vue.prototype.$http = axios.create(axiosConfig);

Vue.config.productionTip = false


let getUser = new Promise(function(resolve, reject){
  const token = localStorage.getItem('access-token')
  if (token) {
    Vue.prototype.$http.defaults.headers.common['access-token'] = token
    Vue.prototype.$http.get('/api/users/details').then(response => {
      let user = {
        role: "registered",
        email: response.data.email,
        username: response.data.username,
        id: response.data._id
      };
      resolve(user)
    })
  }else{
    let user = {
      role: "guest"
    }
    resolve(user)
  }
});


getUser.then(user => {
  Vue.prototype.$user.set(user);
  new Vue({
    render: h => h(App),
    router
  }).$mount('#app')
});
