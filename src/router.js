import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const HOME = process.BROWSER ? () => System.import('./views/home.vue') : require('./views/home.vue');
const KNBRUSH = process.BROWSER ? () => System.import('./views/knbrush.vue') : require('./views/knbrush.vue');
const NOTE = process.BROWSER ? () => System.import('./views/note.vue') : require('./views/note.vue');
const BLOG = process.BROWSER ? () => System.import('./views/blog.vue') : require('./views/blog.vue');
const PHOTOS = process.BROWSER ? () => System.import('./views/photos.vue') : require('./views/photos.vue');
const RESUME = process.BROWSER ? () => System.import('./views/resume.vue') : require('./views/resume.vue');
const ARTICLE = process.BROWSER ? () => System.import('./views/article.vue') : require('./views/article.vue');
const PHOTO = process.BROWSER ? () => System.import('./views/photo.vue') : require('./views/photo.vue');
const PANORAM = process.BROWSER ? () => System.import('./views/panoram.vue') : require('./views/panoram.vue'); 

var isMobile = function () {
    var userAgent = process.BROWSER ? navigator.userAgent : process.UA;
    return !!userAgent.match(/(iPhone|iPod|Android|ios)/i);
}

var router;
router = new Router({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    },
    routes: [
        { path: '/', name: 'blog', component: BLOG },
        { path: '/knbrush', name: 'knbrush', component: KNBRUSH },
        { path: '/note', name: 'note', component: NOTE },
        { path: '/panoram', name: 'panoram', component: PANORAM },
        { path: '/photos', name: 'photos', component: PHOTOS },
        { path: '/resume', name: 'resume', component: RESUME },
        { path: '/article/:id', name: 'article', component: ARTICLE },
        { path: '/photo/:category', name: 'photo', component: PHOTO },
    ]
});

export default router;