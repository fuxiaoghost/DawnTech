<template>
    <div class="home">
        <nav-bar :index="index"></nav-bar>
        <div class="container">
            <a class="blog" v-for="item in items" :href="`/article?id=${encodeURI(item.target)}`">
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
export default {
  components: { navBar, foot },
  data: function() {
    return {
      items: []
    };
  },
  computed: {
    linkTarget: function() {
      return adjust.linkTarget();
    },
    index: function() {
      if (adjust.isMobile()) {
        return 0;
      } else {
        return 1;
      }
    }
  },
  created: function() {
    this.init();
  },
  methods: {
    init: function() {
      this.$http
        .get("/api/blogs", {
          params: {}
        })
        .then(resp => {
          if (resp && resp.body && resp.body.items) {
            this.items = resp.body.items;
          }
        });
    }
  }
};
</script>
<style lang="sass">
.blog {
    background-color: #fff;
    border-bottom:0.5px solid  #e8e8e8;
    width: auto;
    padding: 10px 0px;
    display: block;
    
    .title {
        display: block;
        font-size: 20px;
        height: 40px;
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
    @media screen and (max-width: 500px){
        padding: 10px 18px;
    }
}
</style>