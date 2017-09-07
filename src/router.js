import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const HOME = resolve => require(['./views/home.vue'], resolve);
const ARTICLE = resolve => require(['./views/article.vue'], resolve);

var router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        { path: '/article/:id', name: 'article',component: ARTICLE },
        { path: '/', name: 'home',component: HOME }
    ]
});

// router.beforeEach((to, from, next) => {
//     document.body.className = "router-before";
//     return next();
    
// });
// router.afterEach((to, from, next) => {
//     document.body.className = "router-after";
// });

export default router;