<template>
    <div class="knbrush">
        <nav-bar :index="1"></nav-bar>
        <div class="container">
            <div class="text">
                <a class="name" href='https://itunes.apple.com/cn/app/freehand-sketch-draw-note-doodle-masters/id1105305111?l=cn&mt=8'>信手涂鸦 - 素描.涂色.P图.手绘大师</a>
                <a class="subname" href='https://itunes.apple.com/cn/app/freehand-sketch-draw-note-doodle-masters/id1105305111?l=en&mt=8'>Freehand - Sketch.Draw.Note.Doodle.Masters</a>
                <img class="qrcode" src="/assets/images/qrcode.png" alt="https://itunes.apple.com/cn/app/id1105305111" v-if="!mobile">
                <span class="abstract-tips">内容提要</span>
                <div class="abstract-content">
                    <span class="abstract-item">这是一款适合所有用户的非常高效的绘画工具，快速打开，易学易用。虽然采用了简约的设计手法但是软件仍然可以提供丰富的功能：</span>
                    <span class="abstract-item">1、现已支持钢笔、记号笔、铅笔、中性笔、荧光笔、干水彩笔、湿水彩笔、蜡笔、刷子、毛笔10种画笔，后续还会不断的扩充画笔类型</span>
                    <span class="abstract-item">2、提供完整的调色盘，HSV色彩空间，并支持Alpha通道调整</span>
                    <span class="abstract-item">3、支持细腻的橡皮擦并可以实时对笔画进行重做和撤销</span>
                    <span class="abstract-item">4、可以直接导入图片到画布前景或者背景，进行再次编辑和绘制</span>
                    <span class="abstract-item">5、支持作品保存和分享</span>
                    <span class="abstract-item">6、提供绘图遮挡板，可以直接把手支撑在屏幕进行绘制</span>
                    <span class="abstract-item">7、支持灵活快速的手势交互操作，方便绘画过程中的颜色选择和画笔切换</span>
                    <span class="abstract-item"></span>
                    <span class="abstract-item">**高级功能**</span>
                    <span class="abstract-item">1、画笔笔尖大小随意调控，开启更加灵活的绘制模式</span>
                    <span class="abstract-item">2、随时随地唤起颜色拾色器，快速选择需要的颜色</span>
                    <span class="abstract-item">3、一把设计简约的尺子，可能会是你的画图好伴侣</span>
                    <span class="abstract-item">4、强大的分层绘制和保存模式，绘制复杂的作品成为可能</span>
                    <span class="abstract-item">5、一支神器的水彩笔，可以实现逼真的晕染效果</span>
                    <span class="abstract-item">6、多样的图层混色模式，可以实现更多的绘图效果</span>
                    <span class="abstract-item">7、专业的画笔自定义功能</span>
                    <span class="abstract-item"></span>
                    <span class="abstract-item">**笔迹算法**</span>
                    <span class="abstract-item">“信手涂鸦”采用了精细的笔迹采集和还原算法力求达到笔迹的真实呈现。绘画时可以更加精准快速的表达自己灵动的想法。</span>
                    <span class="abstract-item"></span>
                    <span class="abstract-item">**画布**</span>
                    <span class="abstract-item">提供透明和白色两种画布并自带暗格线，可以在绘画过程中进行标的和参考。画布还可以实时缩放，最精细的位置都可以灵活触控。</span>
                    <span class="abstract-item"></span>
                    <span class="abstract-item">简约但不简单，丰富不失灵活！</span>
                </div>
                <div class="abstract-content-en">
                    <span class="abstract-item">It is a very efficient drawing tools suitable for all users. Quickly open, easy to use. Although the use of minimalist design approach but the software still provides a wealth of features:</span>
                    <span class="abstract-item">1. Now supports pens,markers,pencils,gel pen,highlighter,dry watercolor,wet watercolor,pencil,crayon brush,brush,chinese brush and more brush types are comming on.</span>
                    <span class="abstract-item">2. Provide a complete palette, HSV color space, and support for Alpha channel adjustment</span>
                    <span class="abstract-item">3. Support delicate eraser strokes in real time and can be revoked and redo</span>
                    <span class="abstract-item">4.You can directly import pictures into canvas foreground or the background, edit and draw again</span>
                    <span class="abstract-item">5. Support save and share work</span>
                    <span class="abstract-item">6. Provide shelter drawing board, you can draw with your finger and keep your hand on the screen</span>
                    <span class="abstract-item">7. Supports flexible and rapid gesture interaction to facilitate the process of painting brush and color selection switch</span>
                    <span class="abstract-item"></span>
                    <span class="abstract-item">**Pro Mode**</span>
                    <span class="abstract-item">1.Random brush tip size regulation,more open and flexible drawing mode</span>
                    <span class="abstract-item">2.Evoke the color picker anytime and anywhere,quickly select desired color</span>
                    <span class="abstract-item">3.One ruler designed simplely,may be drawing good companion</span>
                    <span class="abstract-item">4.Powerful layered drawing mode to draw complex works possible</span>
                    <span class="abstract-item">5.One magic wet watercolour brush</span>
                    <span class="abstract-item">6.Various layer blending mode, you can achieve more graphics effects</span>
                    <span class="abstract-item">7.Professional brush customization</span>
                    <span class="abstract-item"></span>
                    <span class="abstract-item">**Handwriting algorithm**</span>
                    <span class="abstract-item">"Freehand" with a fine handwriting algorithms to achieve the real show. Can be more accurate quick to express their ideas when painting.</span>
                    <span class="abstract-item"></span>
                    <span class="abstract-item">**Canvas**</span>
                    <span class="abstract-item">Canvas(White & Transparent) carrying guides, and can be a reference in the painting process. Canvas can also be real-time zoom.</span>
                    <span class="abstract-item"></span>
                    <span class="abstract-item">Simple but not simple, yet rich and flexible!</span>
                </div>
                <span class="abstract-tips">应用预览</span>
                <div class="preview">
                    <div class="item">
                        <a class="boarder" href="/assets/images/previews/preview0.jpg" :target="linkTarget">
                            <img src="/assets/images/previews/preview0.jpg" alt="">
                        </a>
                    </div>
                    <div class="item">
                        <a class="boarder" href="/assets/images/previews/preview1.jpg" :target="linkTarget">
                            <img src="/assets/images/previews/preview1.jpg" alt="">
                        </a>
                    </div>
                    <div class="item">
                        <a class="boarder" href="/assets/images/previews/preview2.jpg" :target="linkTarget">
                            <img src="/assets/images/previews/preview2.jpg" alt="">
                        </a>
                    </div>
                    <div class="item">
                        <a class="boarder" href="/assets/images/previews/preview3.jpg" :target="linkTarget">
                            <img src="/assets/images/previews/preview3.jpg" alt="">
                        </a>
                    </div>
                    <div class="item">
                        <a class="boarder" href="/assets/images/previews/preview4.jpg" :target="linkTarget">
                            <img src="/assets/images/previews/preview4.jpg" alt="">
                        </a>
                    </div>
                </div>
                <span class="abstract-tips">作品展示</span>
                <div class="works">
                    <a class="image-item" href="/assets/images/works/works0.jpg" :target="linkTarget">
                        <span class="image-cover">
                            <img src="/assets/images/works/works0.jpg" />
                        </span>
                    </a>
                    <a class="image-item" href="/assets/images/works/works1.jpg" :target="linkTarget">
                        <span class="image-cover">
                            <img src="/assets/images/works/works1.jpg" />
                        </span>
                    </a>
                    <a class="image-item" href="/assets/images/works/works2.jpg" :target="linkTarget">
                        <span class="image-cover">
                            <img src="/assets/images/works/works2.jpg" />
                        </span>
                    </a>
                    <a class="image-item" href="/assets/images/works/works3.jpg" :target="linkTarget">
                        <span class="image-cover">
                            <img src="/assets/images/works/works3.jpg" />
                        </span>
                    </a>
                    <a class="image-item" href="/assets/images/works/works4.jpg" :target="linkTarget">
                        <span class="image-cover">
                            <img src="/assets/images/works/works4.jpg" />
                        </span>
                    </a>
                    <a class="image-item" href="/assets/images/works/works5.jpg" :target="linkTarget">
                        <span class="image-cover">
                            <img src="/assets/images/works/works5.jpg" />
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
import adjust from '../business/adjust.js';
export default {
  components: { navBar, foot },
  data: function() {
    return {
      articles: [],
      banner: {}
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
                width: 400px;
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