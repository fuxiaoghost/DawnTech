<template>
    <div class="home">
        <nav-bar :index="index"></nav-bar>
        <div class="container">
          <a class="blog" v-for="item in items" :href="`/article?id=${encodeURI(item.target)}`">
            <span class="title">{{ item.title }}</span>
            <span class="desc">{{ item.desc }}</span>
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
      }else {
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
  width: 100%;
  padding: 10px 0px;
  display: block;
  .title {
    display: block;
    padding: 0px 18px;
    font-size: 20px;
    height: 40px;
    line-height: 40px;
    color: #333;
  }
  .desc {
    display: block;
    padding: 0px 18px;
    font-size: 14px;
    line-height: 24px;
    color: #666;
  }
}
</style>