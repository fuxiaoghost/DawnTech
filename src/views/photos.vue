<template>
    <div class="photos">
        <nav-bar :index="index"></nav-bar>
        <div class="container">
            <div class="work">
                <a class="image-item" v-for="photo in photos" :href="`/photo/${photo.category}`" :target="linkTarget">
                    <span class="image-cover">
                            <img v-lazy="photo.url" />
                        </span>
                    <span class="image-title">{{photo.title}}</span>
                    <span class="image-date">{{photo.date}}</span>
                </a>
            </div>
        </div>
        <foot></foot>
    </div>
</template>
<script>
import navBar from "../components/nav-bar.vue";
import foot from "../components/foot.vue";
import adjust from "../business/adjust.js";
import weixin from '../business/weixin';
export default {
    components: {
        navBar,
        foot
    },
    data: function() {
        return {
            photos: this.$store.state.photos
        };
    },
    created: function() {
        this.init();
    },
    computed: {
        linkTarget: function() {
            return adjust.linkTarget();
        },
        index: function() {
            if (adjust.isMobile()) {
                return 1;
            } else {
                return 1;
            }
        }
    },
    preFetch: function(store) {
        var category = store.state.route.params.category;
        return store.dispatch("getPhotos").then(() => {

        });
    },
    methods: {
        init: function() {
           
        }
    }
};
</script>
<style lang="sass">
.photos {
    .container {
        .work {
            margin: 40px 0px;
            .image-item {
                width: 310px;
                height: 260px;
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
                    width: 100%;
                    display: block;
                    background-color: #fff;
                    overflow: hidden;
                    img {
                        width: 100%;
                    }
                }
                .image-title {
                    display: block;
                    text-align: left;
                    background-color: #fff;
                    font-size: 18px;
                    height: 30px;
                    line-height: 30px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #333;
                }
                .image-date {
                    display: block;
                    text-align: left;
                    background-color: #fff;
                    font-size: 14px;
                    height: 30px;
                    line-height: 30px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #999;
                }
            }
        }
        @media screen and (max-width: 500px) {
            .work {
                margin: 12px 0px 0px 0px;
                width: 100%;
                .image-item {
                    width: auto;
                    height: auto;
                    padding: 0px 12px 0px 12px;
                    margin: 0px;
                    display: block;
                    .image-cover {
                        height: auto;
                    }
                    &:hover {
                        box-shadow: none;
                    }
                }
            }
        }
    }
}
</style>
