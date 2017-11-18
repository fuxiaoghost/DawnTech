import Vue from 'vue';
import App from './app.vue';
import router from './router'; 
import VueLazyload from 'vue-lazyload';
import store from './store';
import { sync } from 'vuex-router-sync';

Vue.use(VueLazyload, {
    loading: '/assets/images/loading.jpg'
});

router.beforeEach((to, from, next) => {
    return next();
});

router.afterEach(route => {
    if(typeof window !="undefined") {
        document.body.className = "router-after";
    }
});

sync(store, router);

const app = {
    router,
    store,
    ...App
};
export { app, router, store};