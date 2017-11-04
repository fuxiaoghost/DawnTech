<template>
    <div class="nav-bar">
        <div class="container">
            <div class="nav-right">
                <a class="nav-item" :class="{'active':index==idx}" v-for="(item, idx) in navs" :href="item.url">
                    {{item.title}}
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import adjust from "../business/adjust.js";
export default {
  props: ["index"],
  data: function() {
    return {
      navs: []
    };
  },
  created: function() {
    if (adjust.isMobile()) {
      this.navs = [
        {
          title: "随笔",
          url: "/blog"
        },
        {
          title: "摄影集",
          url: "/photos"
        },
        {
          title: "信手涂鸦",
          url: "/knbrush"
        },
        {
          title: "手记",
          url: "/note"
        }
      ];
    } else {
      this.navs = [
        {
          title: "主页",
          url: "/"
        },
        {
          title: "随笔",
          url: "/blog"
        },
        {
          title: "摄影集",
          url: "/photos"
        },
        {
          title: "信手涂鸦",
          url: "/knbrush"
        },
        {
          title: "手记",
          url: "/note"
        }
      ];
    }

    window.onscroll = () => {
    //   if (window.scrollY > 160) {
    //     this.navClass = "light";
    //   } else {
    //     this.navClass = "";
    //   }
    };
  },
  methods: {}
};
</script>
<style lang="sass">
    .nav-bar {
        height: 60px;
        line-height: 60px;
        background-color: #24292e;
        color: #fff;
        position: absolute;
        width: 100%;
        z-index: 100;
        top:0;
        transition: all 1s ease;
        .nav-left {
            float: left;
            margin-left: 20px;
        }
        .nav-item {
            display: block;
            float: left;
            padding: 0 20px;
            text-align: center;
            position: relative;
            font-size: 16px;
            font-weight: bold;
            color: rgba(255,255,255,0.75) !important;
            &:after {
                content: '';
                position: absolute;
                width: 100%;
                height: 2px;
                bottom: 0;
                left: 0;
                background-color: #000;
                transition: all 0.5s ease;
            }
            &.active,&:hover {
                &:after {
                    background-color: #fff;
                }
                color: rgba(255,255,255,1.0) !important;
            }
        }
        @media screen and (max-width: 500px) {
            .nav-item {
                padding: 0px;
                width: 25%;
            }
        }
    }
</style>