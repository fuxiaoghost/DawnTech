import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const HOME = resolve => require(['./views/home.vue'], resolve);
const KNBRUSH = resolve => require(['./views/knbrush.vue'], resolve);
const NOTE = resolve => require(['./views/note.vue'], resolve);
const BLOG = resolve => require(['./views/blog.vue'], resolve);
const PHOTOS = resolve => require(['./views/photos.vue'], resolve);
const RESUME = resolve => require(['./views/resume.vue'], resolve);
const ARTICLE = resolve => require(['./views/article.vue'], resolve);
const PHOTO = resolve => require(['./views/photo.vue'], resolve);

var isMobile = function () {
    return !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
}

var router;
if (isMobile()) {
    router = new Router({
        mode: 'history',
        scrollBehavior: () => ({ y: 0 }),
        routes: [
            { path: '/', name: 'blog', component: BLOG },
            { path: '/knbrush', name: 'knbrush', component: KNBRUSH },
            { path: '/note', name: 'note', component: NOTE },
            { path: '/blog', name: 'blog', component: BLOG },
            { path: '/photos', name: 'photos', component: PHOTOS },
            { path: '/resume', name: 'resume', component: RESUME },
            { path: '/article', name: 'article', component: ARTICLE },
            { path: '/photo/:category', name: 'photo', component: PHOTO },
        ]
    });
} else {
    router = new Router({
        mode: 'history',
        scrollBehavior: () => ({ y: 0 }),
        routes: [
            { path: '/', name: 'home', component: HOME },
            { path: '/knbrush', name: 'knbrush', component: KNBRUSH },
            { path: '/note', name: 'note', component: NOTE },
            { path: '/blog', name: 'blog', component: BLOG },
            { path: '/photos', name: 'photos', component: PHOTOS },
            { path: '/resume', name: 'resume', component: RESUME },
            { path: '/article', name: 'article', component: ARTICLE },
            { path: '/photo/:category', name: 'photo', component: PHOTO },
        ]
    });
}


// router.beforeEach((to, from, next) => {
//     document.body.className = "router-before";
//     return next();

// });
// router.afterEach((to, from, next) => {
//     document.body.className = "router-after";
// });

export default router;