import 'es6-promise/auto'
import Vue from 'vue'
import {  app, router, store } from './app'

const path = getLocation(router.options.base)
const resolveComponents = flatMapComponents(router.match(path), (Component, _, match, key, index) => {
    if (typeof Component === 'function' && !Component.options) {
        return new Promise(function (resolve, reject) {
            const _resolve = (Component) => {
                match.components[key] = Component
                resolve(Component)
            }
            var res = Component(_resolve, reject)
            if (res && res.then) {
                res.then(_resolve).catch(reject)
            }
        })
    }
    return Component
})

Promise.all(resolveComponents)
    .then((Components) => {
        const _app = new Vue(app);
        store.replaceState(window.__INITIAL_STATE__);
        _app.$mount('#app');
    })
    .catch((err) => {
        console.error('Cannot load components', err)
    })

export function flatMapComponents(route, fn) {
    return Array.prototype.concat.apply([], route.matched.map(function (m, index) {
        return Object.keys(m.components).map(function (key) {
            return fn(m.components[key], m.instances[key], m, key, index)
        })
    }))
}

export function getLocation(base) {
    var path = window.location.pathname
    if (base && path.indexOf(base) === 0) {
        path = path.slice(base.length)
    }
    return (path || '/') + window.location.search + window.location.hash
}
