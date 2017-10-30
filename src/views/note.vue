<template>
    <div class="note">
        <nav-bar :index="2"></nav-bar>
        <div class="container">
            <div class="text">
                <a class="name" href='https://itunes.apple.com/cn/app/id1247102147'>手记</a>
                <img class="qrcode" src="/assets/images/qrcode2.png" alt="https://itunes.apple.com/cn/app/id1247102147" v-if="!mobile">
                <span class="abstract-tips">内容提要</span>
                <div class="abstract-content">
                    <span v-for="item in cns" class="abstract-item">{{item}}</span>
                </div>
                <span class="abstract-tips">应用预览</span>
                <div class="preview">
                    <div v-for="item in previews" class="item">
                        <a class="boarder" :href="item" :target="linkTarget">
                            <img :src="item" alt="">
                        </a>
                    </div>
                </div>
                <span class="abstract-tips">作品展示</span>
                <div class="works">
                    <a class="image-item" v-for="item in works" :href="item" :target="linkTarget">
                        <span class="image-cover">
                            <img :src="item" />
                        </span>
                    </a>
                </div>
            </div>
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
      ens: [],
      cns: [],
      previews: [],
      works: []
    };
  },
  computed: {
    mobile: function() {
      return adjust.isMobile();
    },
    linkTarget: function() {
      return adjust.linkTarget();
    }
  },
  created: function() {
    this.init();
  },
  methods: {
    init: function() {
      this.$http
        .get("/api/note", {
          params: {}
        })
        .then(resp => {
          if (resp && resp.body && resp.body.abstract) {
            this.cns = resp.body.abstract.cns;
            this.previews = resp.body.abstract.previews;
            this.works = resp.body.abstract.works;
          }
        });
    }
  }
};
</script>
<style lang="sass">
    .text {
        .name {
            padding: 0px 18px;
            height: 40px;
            line-height: 40px;
            padding-top: 20px;
            font-size: 20px;
            font-weight: bold;
            display: block;
            color: #298cda;
            &:hover {
                text-decoration: underline;
            }
            &:after {
                display: inline-block;
                content: '';
                width: 12px;
                height: 20px;
                background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAVklEQVR4Xn3PgQkAMQhDUXfqTu7kTtkpd5RA8AInfArtQ2iRXFWT2QedAfttj2FsPIOE1eCOlEuoWWjgzYaB/IkeGOrxXhqB+uA9Bfcm0lAZuh+YIeAD+cAqSz4kCMUAAAAASUVORK5CYII=) center right no-repeat;
            }
        }
        .subname {
            padding: 0px 18px;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            color: #298cda;
            &:hover {
                text-decoration: underline;
            }
            &:after {
                display: inline-block;
                content: '';
                width: 12px;
                height: 10px;
                background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAVklEQVR4Xn3PgQkAMQhDUXfqTu7kTtkpd5RA8AInfArtQ2iRXFWT2QedAfttj2FsPIOE1eCOlEuoWWjgzYaB/IkeGOrxXhqB+uA9Bfcm0lAZuh+YIeAD+cAqSz4kCMUAAAAASUVORK5CYII=) center right no-repeat;
            }
        }
        .qrcode {
            position: absolute;
            top: 20px;
            right: 18px;
            width: 140px;
            height: 140px;
        }
        .abstract-tips {
            padding: 0px 18px;
            height: 20px;
            line-height: 20px;
            font-size: 16px;
            font-weight: bold;
            display: block;
            margin-top: 60px;
        }
        .abstract-content {
            padding: 0px 18px;
            .abstract-item {
                display: block;
                font-size: 14px;
                color: #666;
                min-height: 24px;
                line-height: 24px;
            }
        }
        .abstract-content-en {
            padding: 0px 18px;
            padding-top: 20px;
            .abstract-item {
                display: block;
                font-size: 14px;
                color: #999;
                min-height: 24px;
                line-height: 24px;
            }
        }

        .preview {
            padding: 0px 18px;
            margin-top: 10px;
            overflow: hidden;
            overflow-x:auto;
            white-space: nowrap;
            overflow: hidden;
            overflow-x: scroll; /* 1 */
            text-align: justify; /* 3 */
            .item {
                width: 240px;
                padding: 5px 30px 0px 0px;
                display: inline-block;
                .boarder {
                    background-color: #fff;
                    width: 100%;
                    display: block;
                    padding: 10px;
                    img {
                        width: 100%;
                    }
                }
            }
        }
        .image-item {
            margin: 20px 0px;
            width: 100%;
            display: inline-block;
            background-color: #fff;
            transition: all 0.5s ease;
            box-shadow: 0px 0px 10px 2px #ccc;
            .image-cover {
                padding: 20px 20px 20px 20px;
                width: auto;
                display: block;
                background-color: #fff;
                img {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
        }
        
        
        @media screen and (max-width: 500px) {
            .preview {
                padding: 0px !important;
                margin-top: 10px;
                .item {
                    padding: 5px 0px;
                    width: 100%;
                    .boarder {
                        padding: 0px;
                    }
                }
            }
            .works {
                .image-item {
                    margin: 20px 0px;
                    box-shadow: none;
                    .image-cover {
                        padding: 0px;
                    }
                }
            }
        }
    }
</style>