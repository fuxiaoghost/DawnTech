<template>
    <div class="home">
        <nav-bar :index="index"></nav-bar>
        <div class="container">
            <a class="blog" v-if="item.title" v-for="item in items" :href="`/article/${item.id}`">
                <span class="title">{{ item.title }}</span>
                <span class="desc">{{ item.desc }}</span>
                <span class="date">发布于 {{ item.date }}</span>
            </a>
        </div>
        <foot></foot>
    </div>
</template>
<script>
import navBar from "../components/nav-bar.vue";
import foot from "../components/foot.vue";
import adjust from "../business/adjust.js";
import weixin from "../business/weixin";
export default {
    components: {
        navBar,
        foot
    },
    data: function() {
        return {
            items: this.$store.state.blogs
        };
    },
    preFetch: function(store) {
        var id = store.state.route.params.id;
        return store.dispatch("getBlogs").then(() => {
            var header = {
                title: "随笔",
            }
            store.dispatch("header", header);
        });
    },
    computed: {
        linkTarget: function() {
            return adjust.linkTarget();
        },
        index: function() {
            if (adjust.isMobile()) {
                return 0;
            } else {
                return 0;
            }
        }
    },
    created: function() {
        this.init();
        weixin.wxShare(
            "王曙光的随笔",
            "这里有一些简单的记忆，平凡的知识，还有一点点小感悟",
            "http://dawntech.top/assets/images/favicon.jpg",
            this.$http
        );
    },
    methods: {
        init: function() {
            
        }
    }
};
</script>
<style lang="sass">
.blog {
    background-color: #fff;
    border-bottom: 0.5px solid #e8e8e8;
    width: auto;
    padding: 10px 0px;
    display: block;
    .title {
        display: block;
        font-size: 20px;
        min-height: 40px;
        line-height: 40px;
        color: #333;
    }
    .desc {
        display: block;
        font-size: 14px;
        line-height: 24px;
        color: #666;
    }
    .date {
        display: block;
        font-size: 12px;
        line-height: 24px;
        color: #999;
    }
    @media screen and (max-width: 500px) {
        padding: 10px 18px;
    }
}
</style>
