import Vue from 'vue';
import App from './app.vue';
import router from './router'; 
import VueLazyload from 'vue-lazyload';
import axios from 'axios';

Vue.use(VueLazyload, {
    loading: '/assets/images/loading.jpg'
})

let axiosInstance = axios.create({
    baseURL: process.BROWSER ? '/api/' : process.env.APP_API,
    timeout: process.BROWSER ? 10000 : 3000
});

Vue.prototype.$http = Vue.http = axiosInstance;

router.beforeEach((to, from, next) => {
    return next();
});

router.afterEach(route => {
    if(typeof window !="undefined") {
        document.body.className = "router-after";
    }
})

const app = {
    router,
    ...App
};
export { app, router};