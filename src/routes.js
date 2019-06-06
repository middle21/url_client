import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./components/Home.vue";
import Redirect from "./components/Redirect.vue";
import Login from "./components/auth/Login.vue";

Vue.use(VueRouter);

let routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    
    { path: '/:shortCode', component: Redirect }
];

let router = new VueRouter({
    routes
});

export default router;