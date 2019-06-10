import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./components/Home.vue";
import Redirect from "./components/Redirect.vue";
import Login from "./components/auth/Login.vue";
import Register from "./components/auth/Register.vue";
import Forgot from "./components/auth/Forgot.vue";
import ResetPassword from "./components/auth/ResetPassword.vue";

Vue.use(VueRouter);

let routes = [
    { path: '/', component: Home, name: 'Home' },
    {
        path: '/login',
        component: Login,
        meta: {
            permissions: [{
                role: 'registered',
                access: false,
                redirect: 'Home'
            }]
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            permissions: [{
                role: 'registered',
                access: false,
                redirect: 'Home'
            }]
        }
    },
    {
        path: '/forgot',
        component: Forgot,
        meta: {
            permissions: [{
                role: 'registered',
                access: false,
                redirect: 'Home'
            }]
        }
    },
    {
        path: '/resetPassword/:token',
        component: ResetPassword
    },
    
    { path: '/:shortCode', component: Redirect }
];

let router = new VueRouter({
    mode: 'history',
    routes
});

export default router;