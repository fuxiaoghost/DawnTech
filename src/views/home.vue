<template>
    <div class="home">
        <nav-bar :index="0"></nav-bar>
        <div class="content">
            <div class="header">
                <div class="carousel-wrap" id="carousel">
                    <transition-group tag="ul" class='slide-ul' name="list">
                        <li v-for="(list,index) in slideList" :key="index" v-show="index===currentIndex" @mouseenter="stop" @mouseleave="go">
                            <a :href="list.clickUrl">
                                <img :src="list.image" :alt="list.desc">
                            </a>
                        </li>
                    </transition-group>
                    <div class="carousel-items">
                        <span v-for="(item,index) in slideList.length" :class="{'active':index===currentIndex}" @mouseover="change(index)"></span>
                    </div>
                </div>
            </div>
            <div class="item" v-for="item in items">
                <div class="title">{{item.title}}</div>
                <div class="content">
                    <div class="leftimage">
                        <div></div>
                    </div>
                    <div class="rightimage">
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
        <foot></foot>
    </div>
</template>
<script>
import navBar from '../components/nav-bar.vue';
import foot from '../components/foot.vue';
export default {
    components: { navBar, foot },
    data: function() {
        return {
            slideList: [{
                "clickUrl": "#",
                "desc": "nhwc",
                "image": "http://dummyimage.com/1745x492/f1d65b"
            }, {
                "clickUrl": "#",
                "desc": "hxrj",
                "image": "http://dummyimage.com/1745x492/40b7ea"
            }, {
                "clickUrl": "#",
                "desc": "rsdh",
                "image": "http://dummyimage.com/1745x492/e3c933"
            }],
            currentIndex: 0,
            items: [{
                "title": "信手涂鸦"
            },{
                "title": "手记"
            },{
                "title": "摄影集"
            }],
            timer: ''
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
            this.$nextTick(() => {
                this.timer = setInterval(() => {
                    this.autoPlay()
                }, 4000)
            })
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
    text-align: center; 
    .content {
        width: 100%;
        display: inline-block;
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
                li {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    padding: 0px;
                    img {
                        width: 100%;
                        height: 100%;
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
                    background-color: rgba(255, 255, 255, 0.6);
                    cursor: pointer;
                }
                .active {
                    background-color: rgb(255, 255, 255);
                }
            }
            .list-enter-active {
                transition: all 1s ease;
                transform: translateX(0);
            }
            .list-leave-active {
                transition: all 1s ease;
                transform: translateX(-100%);
            }
            .list-enter {
                transform: translateX(100%);
            }
            .list-leave {
                transform: translateX(0);
            }
        }
        .item {
            .title {
                margin-top: 20px;
                font-size: 20px;
                color: #333;
                text-align: left; 
                font-weight: bold;
                border-bottom: 1px solid #e9e9e9;
                width: 100%;
            }
            .content {
                margin-top: 10px;
                width: 100%;
                .leftimage {
                    width: 50%;
                    height: 400px;
                    float: left;
                    div {
                        margin: 0px 5px 0px 0px;
                        height: 100%;
                        background-color: #ccc;
                    }
                }
                .rightimage {
                    width: 50%;
                    height: 400px;
                    float: left;
                    div {
                        margin: 0px 0px 0px 5px;
                        height: 100%;
                        background-color: #ccc;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 500px) {
        .content {
            width: 100%;
        }
    }
    @media screen and (min-width: 800px) {
        .content {
            width: 680px;
        }
    }
    @media screen and (min-width: 1024px) {
        .content {
            width: 1020px;
        }
    }
    @media screen and (min-width: 1360px) {
        .content {
            width: 1360px;
        }
    }
}
</style>