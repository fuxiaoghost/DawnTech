<template>
    <div class="home">
        <nav-bar :index="0">
        </nav-bar>
        <div class="container">
            <div class="header">
                <div class="carousel-wrap" id="carousel">
                    <transition-group tag="ul" class='slide-ul' name="list">
                        <li v-for="(item,index) in slideList" :key="index" v-show="index===currentIndex" @mouseenter="stop" @mouseleave="go">
                            <a :href="item.target" :target="linkTarget">
                                <img :src="item.url" :alt="item.desc">
                            </a>
                        </li>
                    </transition-group>
                    <div class="carousel-items">
                        <span v-for="(item,index) in slideList.length" :class="{'active':index===currentIndex}" @mouseover="change(index)"></span>
                    </div>
                </div>
            </div>
            <div class="item" v-for="item in items">
                <div class="title">{{item.category}}</div>
                <div class="content">
                    <a class="image-item" v-for="subitem in item.items" :href="subitem.target" :target="linkTarget">
                        <span class="image-cover">
                            <img :src="subitem.url" />
                        </span>
                        <span class="image-title">{{subitem.title}}</span>
                    </a>
                </div>
            </div>
        </div>
        <foot></foot>
    </div>
</template>
<script>
import navBar from '../components/nav-bar.vue';
import foot from '../components/foot.vue';
import adjust from '../business/adjust.js';
export default {
    components: { navBar, foot },
    data: function() {
        return {
            slideList: [],
            currentIndex: 0,
            items: [],
            timer: ''
        }
    },
    created: function() {
        this.init();
    },
    computed: {
        linkTarget: function() {
            return adjust.linkTarget();
        }
    },
    methods: {
        init: function() {
            this.$nextTick(() => {
                this.timer = setInterval(() => {
                    this.autoPlay()
                }, 4000)
            });

            this.$http.get('/api/home/cycle', {
                params: {
                    isMobile: adjust.isMobile
                }
            }).then((resp) => {
                if (resp && resp.body && resp.body.items) {
                    this.slideList = resp.body.items;
                }
            });

            this.$http.get('/api/home/categories', {
                params: {}
            }).then((resp) => {
                if (resp && resp.body && resp.body.items) {
                    this.items = resp.body.items;
                }
            });
        },
        go: function() {
            this.timer = setInterval(() => {
                this.autoPlay()
            }, 4000)
        },
        stop: function() {
            clearInterval(this.timer)
            this.timer = null
        },
        change: function(index) {
            this.currentIndex = index
        },
        autoPlay: function() {
            this.currentIndex++
            if (this.currentIndex > this.slideList.length - 1) {
                this.currentIndex = 0
            }
        }
    }
}
</script>
<style lang="sass">
.home {
    .container {
        .header {
            height: 332px;
            width: 100%;
            .carousel-wrap {
                position: relative;
                height: 100%;
                width: 100%;
                overflow: hidden;
            }
            .slide-ul {
                height: 100%;
                padding: 0px;
                margin: 0px;
                list-style: none;
                li {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    padding: 0px;
                    img {
                        width: 100%;
                    }
                }
            }
            .carousel-items {
                position: absolute;
                z-index: 10;
                top: 302px;
                width: 100%;
                margin: 0 auto;
                text-align: center;
                font-size: 0;
                span {
                    display: inline-block;
                    height: 6px;
                    width: 30px;
                    margin: 0 3px;
                    background-color: rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                    border-radius: 3px
                }
                .active {
                    background-color: rgb(34, 34, 34);
                }
            }
            .list-enter-active {
                transition: all 2s ease;
                // transform: translateX(0);
                opacity: 1.0;
            }
            .list-leave-active {
                transition: all 2s ease;
                // transform: translateX(-100%);
                opacity: 0.0;
            }
            .list-enter {
                // transform: translateX(100%);
                opacity: 0.0;
            }
            .list-leave {
                // transform: translateX(0);
                opacity: 1.0;
            }
        }
        .item {
            .title {
                margin-top: 20px;
                padding-bottom: 10px;
                padding-left: 15px;
                font-size: 20px;
                color: #333;
                text-align: left;
                font-weight: bold;
                border-bottom: 1px solid #e9e9e9;
                width: auto;
            }
            .content {
                margin-top: 10px;
                width: 100%;
                text-align: left;
                .image-item {
                    width: 310px;
                    height: 240px;
                    display: inline-block;
                    background-color: #fff;
                    margin: 7px;
                    transition: all 0.5s ease;
                    padding: 8px 8px 0px 8px;
                    &:hover {
                        box-shadow: 0px 0px 10px 2px #ccc;
                    }
                    .image-cover {
                        height: 200px;
                        width: auto;
                        display: block;
                        background-color: #ccc;
                        overflow: hidden;
                        img {
                            width: 100%;
                        }
                    }
                    .image-title {
                        width: auto;
                        display: block;
                        text-align: center;
                        background-color: #fff;
                        font-size: 18px;
                        line-height: 40px;
                        height: 40px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
            @media screen and (max-width: 500px) {
                .title {
                    border-bottom: none;
                }
                .content {
                    margin-top: 0px;
                    .image-item {
                        width: 100%;
                        padding: 0px;
                        margin: 0px;
                    }
                }
            }
        }
        @media screen and (max-width: 500px) {
            .header {
                height: 250px;
                .carousel-items {
                    top: 230px;
                }
            }
        }
    }
}
</style>