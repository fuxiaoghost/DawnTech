import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './app.vue';
import router from './router'; 
import VueLazyload from 'vue-lazyload';

Vue.use(VueResource);

Vue.use(VueLazyload, {
    loading: '/assets/images/loading.jpg'
})

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});