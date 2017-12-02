import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import md2html from "./business/md2html.js";
import { Promise } from 'es6-promise';

let axiosInstance = axios.create({
    baseURL: process.BROWSER ? '/api/' : process.env.APP_API,
    timeout: process.BROWSER ? 10000 : 3000
});

let axiosInstance2 = axios.create({
    timeout: process.BROWSER ? 10000 : 3000
});

Vue.prototype.$http = Vue.http = axiosInstance;

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        htmlHead: {
            title: "Dawn's Story",
            keyword: "dawntech,dawn,曙光,黎明,王曙光",
            desc: "向晚收云，黎明见日——王曙光的个人网站"
        },
        blogs: [],
        article: {
            title: "",
            desc: "",
            content: ""
        },
        knbrush: {
            ens: [],
            cns: [],
            previews: [],
            works: []
        },
        note: {
            cns: [],
            previews: [],
            works: []
        },
        photo: {
            title: "",
            photos: []
        },
        photos: [],
        panoram: {
            fsh: "",
            vsh: ""
        }
    },
    actions: {
        header: (context, query) => {
            context.commit("initHeader", query);
        },
        getBlogs: (context, query) => {
            return Vue.http.get("blogs").then(resp => {
                if (resp && resp.data && resp.data.items) {
                    context.commit("initBlogs", resp.data.items);
                }
            });
        },
        getArticle: (context, query) => {
            return Vue.http.get("blog/" + query.id).then(resp => {
                if (resp && resp.data && resp.data.id) {
                    var data = resp.data;
                    return new Promise((resolve,reject) => {
                        md2html.convertSrc(
                            data.target.replace("/api/", ""),
                            (err, result) => {
                                if(err) {
                                    reject(err);
                                }else {
                                    var article = {title: data.title, desc: data.desc, content: result};
                                    resolve(article);
                                }
                            }
                        );
                    });
                }
            }).then(article => {
                context.commit("initArticle", article);
                return "";
            });
        },
        getKNBrush: (context, query) => {
            return Vue.http.get("knbrush").then(resp => {
                if (resp && resp.data && resp.data.abstract) {
                    var knbrush = {
                        ens: resp.data.abstract.ens, 
                        cns: resp.data.abstract.cns, 
                        previews: resp.data.abstract.previews, 
                        works: resp.data.abstract.works
                    };
                    context.commit("initKNBrush", knbrush);
                }
            });
        },
        getNote: (context, query) => {
            return Vue.http.get("note").then(resp => {
                if (resp && resp.data && resp.data.abstract) {
                    var note = {
                        cns: resp.data.abstract.cns, 
                        previews: resp.data.abstract.previews, 
                        works: resp.data.abstract.works
                    };
                    context.commit("initNote", note);
                }
            });
        },
        getPhoto: (context, query) => {
            return Vue.http.get("photo/" + query.category).then(resp => {
                if (resp && resp.data && resp.data.items) {
                    context.commit("initPhoto", {title: resp.data.title, photos: resp.data.items});
                }
            });
        },
        getPhotos: (context, query) => {
            return Vue.http.get("photos").then(resp => {
                if (resp && resp.data && resp.data.items) {
                    var photos = resp.data.items;
                    context.commit("initPhotos", photos);
                }
            });
        },
        getPanoram: (context, query) => {
            return new Promise((resolve,reject) => {
                axiosInstance2.get('/assets/shaders/panoram.fsh').then(fsh => {
                    if (fsh && fsh.data) {
                        axiosInstance2.get('/assets/shaders/panoram.vsh').then(vsh => {
                            if(vsh && vsh.data) {
                                resolve({fsh: fsh.data, vsh: vsh.data});                
                            }
                        });
                    }
                });
            }).then (result => {
                context.commit("initPanoram", result);
                return "";
            });
        }
    },
    mutations: {
        initBlogs: (state, blogs) => {
            state.blogs = blogs;
        },
        initArticle: (state, article) => {
            state.article.title = article.title;
            state.article.desc = article.desc;
            state.article.content = article.content;
        },
        initKNBrush: (state, knbrush) => {
            state.knbrush.ens = knbrush.ens;
            state.knbrush.cns = knbrush.cns;
            state.knbrush.previews = knbrush.previews;
            state.knbrush.works = knbrush.works;
        },
        initNote: (state, note) => {
            state.note.cns = note.cns;
            state.note.previews = note.previews;
            state.note.works = note.works;
        },
        initPhoto: (state, photo) => {
            state.photo.title = photo.title;
            state.photo.photos = photo.photos;
        },
        initPhotos: (state, photos) => {
            state.photos = photos;
        },
        initHeader: (state, query) => {
            if(query.title) {
                state.htmlHead.title = query.title;
            }
            if(query.desc) {
                state.htmlHead.desc = query.desc;
            }
            if (query.keyword) {
                state.htmlHead.keyword = query.keyword;   
            }
        },
        initPanoram: (state, query) => {
            state.panoram.fsh = query.fsh;
            state.panoram.vsh = query.vsh;
        }
    }
});

export default store;