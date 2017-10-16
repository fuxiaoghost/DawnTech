<template>
    <div class="home">
        <nav-bar :index="2"></nav-bar>
        <a class="header" :target="linkTarget" :href="`/article/${banner.articleId}`" :style="{'background-image':`url(${banner.coverBanner})`}">
            <span class="title">
                {{banner.title}}
                <span class="author">作者：{{banner.author}}</span>
            </span>
        </a>
        <div class="articles">
            <a class="article-item" :target="linkTarget" :href="`/article/${item.articleId}`" v-if="!item.hidden" v-for="item in articles">
                <span class="article-cover">
                    <img :src="item.cover" />
                </span>
                <span class="article-info">
                    <span class="title">{{item.title}}</span>
                <span class="author">{{item.author}} {{item.date}}</span>
                </span>
            </a>
        </div>
        <foot></foot>
    </div>
</template>
<script>
import navBar from '../components/nav-bar.vue';
import foot from '../components/foot.vue';
export default {
    components: {
        navBar,
        foot
    },
    data: function() {
        return {
            articles: [],
            banner: {}
        }
    },
    computed: {
        isMobile: function() {
            return !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
        },
        linkTarget: function() {
            return this.isMobile ? '' : '_blank';
        }
    },
    created: function() {
        this.init();
    },
    methods: {
        init: function() {
            // this.$http.get('/api/metadataservice/metadata/{scope}/{key}', {
            //     params: {
            //         scope: 'promotion',
            //         key: 'articles'
            //     }
            // }).then((resp) => {
            //     if(resp && resp.body && resp.body.items) {
            //         this.articles = resp.body.items;
            //         this.banner = this.articles[0];
            //     }
            // });
        }
    }
}
</script>
<style lang="sass">
.home {
    .header {
        height: 332px;
        background-repeat: no-repeat;
        background-position: 50%;
        background-color: #eee;
        display: block;
        position: relative;
        .title {
            display: block;
            padding-top: 120px;
            font-size: 50px;
            text-align: center;
            color: #fff;
            .author {
                display: block;
                text-align: center;
                font-size: 20px;
                padding-top: 5px;
            }
        }
    }
    .articles {
        margin: 15px auto 20px;
        text-align: left;
        width: 1020px;
        transition: width 0.5s ease;
        .article-item {
            height: 300px;
            width: 310px;
            background-color: #fff;
            margin: 15px;
            display: inline-block;
            transition: all 0.5s ease;
            &:hover {
                box-shadow: #ccc 0px 6px 16px;
            }
            .article-cover {
                height: 200px;
                width: 100%;
                display: block;
                background-repeat: no-repeat;
                background-position: 50%;
                background-color: #eee;
                overflow: hidden;
                img {
                    transition: all 0.8s ease;
                    height: 200px;
                    &:hover {
                        height: 220px;
                    }
                }
            }
            .article-info {
                display: block;
                padding: 20px;
                text-align: left;
                .title {
                    font-size: 20px;
                    line-height: 20px;
                    display: block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .author {
                    font-size: 14px;
                    color: #666;
                    display: block;
                    margin-top: 15px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
    @media screen and (max-width: 500px) {
        .header {
            .title {
                font-size: 30px;
            }
        }
        .articles {
            width: auto;
            margin: 10px;
            text-align: center;
            .article-item {
                width: 100%;
                height: 270px;
                margin: 0 0 10px 0;
                img {
                    width: 100%;
                    height: auto !important;
                    ;
                }
                .article-info {
                    padding: 10px;
                    .author {
                        margin-top: 10px;
                    }
                }
            }
        }
    }
    @media screen and (min-width: 800px) {
        .articles {
            width: 680px;
        }
    }
    @media screen and (min-width: 1024px) {
        .articles {
            width: 1020px;
        }
    }
    @media screen and (min-width: 1360px) {
        .articles {
            width: 1360px;
        }
    }
}
</style>
