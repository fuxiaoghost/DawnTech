webpackJsonp([3],{23:function(t,n,e){e(250);var o=e(8)(e(43),e(242),null,null);o.options.__file="/Users/Kirn/Documents/Projects/EcoTechWorkspace/dawntech.top/src/views/knbrush.vue",o.esModule&&Object.keys(o.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] knbrush.vue: functional components are not supported with templates, they should use render functions."),t.exports=o.exports},242:function(t,n,e){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"knbrush"},[e("nav-bar",{attrs:{index:t.index}}),t._v(" "),e("div",{staticClass:"container"},[e("div",{staticClass:"text"},[e("a",{staticClass:"name",attrs:{href:"https://itunes.apple.com/cn/app/freehand-sketch-draw-note-doodle-masters/id1105305111?l=cn&mt=8"}},[t._v("信手涂鸦 - 素描.涂色.P图.手绘大师")]),t._v(" "),e("a",{staticClass:"subname",attrs:{href:"https://itunes.apple.com/cn/app/freehand-sketch-draw-note-doodle-masters/id1105305111?l=en&mt=8"}},[t._v("Freehand - Sketch.Draw.Note.Doodle.Masters")]),t._v(" "),t.mobile?t._e():e("img",{staticClass:"qrcode",attrs:{src:"/assets/images/qrcode.png",alt:"https://itunes.apple.com/cn/app/id1105305111"}}),t._v(" "),e("span",{staticClass:"abstract-tips"},[t._v("内容提要")]),t._v(" "),e("div",{staticClass:"abstract-content"},t._l(t.cns,function(n){return e("span",{staticClass:"abstract-item"},[t._v(t._s(n))])})),t._v(" "),e("div",{staticClass:"abstract-content-en"},t._l(t.ens,function(n){return e("span",{staticClass:"abstract-item"},[t._v(t._s(n))])})),t._v(" "),e("span",{staticClass:"abstract-tips"},[t._v("应用预览")]),t._v(" "),e("div",{staticClass:"preview"},t._l(t.previews,function(n){return e("div",{staticClass:"item"},[e("a",{staticClass:"boarder",attrs:{href:n,target:t.linkTarget}},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n,expression:"item"}],attrs:{alt:""}})])])})),t._v(" "),e("span",{staticClass:"abstract-tips"},[t._v("作品展示")]),t._v(" "),e("div",{staticClass:"works"},t._l(t.works,function(n){return e("a",{staticClass:"image-item",attrs:{href:n,target:t.linkTarget}},[e("span",{staticClass:"image-cover"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n,expression:"item"}]})])])}))])]),t._v(" "),e("foot")],1)},staticRenderFns:[]},t.exports.render._withStripped=!0},250:function(t,n,e){var o=e(55);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e(9)("0c108a0d",o,!1)},28:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={isMobile:function(){return!!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)},linkTarget:function(){return this.isMobile()?"":"_blank"}}},29:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={data:function(){return{}},methods:{}}},30:function(t,n,e){n=t.exports=e(7)(void 0),n.push([t.i,"\n.footer {\n  padding: 40px 0px 40px 0px;\n  text-align: center;\n  background-color: #fff;\n  color: #999999 !important;\n  font-size: 13px;\n}\n.footer .copyright {\n    height: 20px;\n    display: block;\n}\n.footer .icp {\n    height: 20px;\n    display: block;\n    color: #999999 !important;\n}\n.footer .icon {\n    width: 100px;\n    display: block;\n    margin: 0px auto;\n    padding: 6px 0px;\n    font-size: 30px;\n    color: #999;\n}\n",""])},31:function(t,n,e){e(33);var o=e(8)(e(29),e(32),null,null);o.options.__file="/Users/Kirn/Documents/Projects/EcoTechWorkspace/dawntech.top/src/components/foot.vue",o.esModule&&Object.keys(o.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] foot.vue: functional components are not supported with templates, they should use render functions."),t.exports=o.exports},32:function(t,n,e){t.exports={render:function(){var t=this,n=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"footer"},[e("span",{staticClass:"copyright"},[t._v("2017 dawntech.top. All rights reserved.")]),t._v(" "),e("a",{staticClass:"icp",attrs:{target:"_blank",href:"http://www.miitbeian.gov.cn"}},[t._v("京ICP备17056676号")]),t._v(" "),e("a",{staticClass:"icon iconfont icon-yinzhang",attrs:{href:"/blog"}})])}]},t.exports.render._withStripped=!0},33:function(t,n,e){var o=e(30);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e(9)("7745b4ce",o,!1)},34:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=e(28),i=function(t){return t&&t.__esModule?t:{default:t}}(o);n.default={props:["index"],data:function(){return{navs:[]}},created:function(){i.default.isMobile()?this.navs=[{title:"随笔",url:"/blog"},{title:"摄影集",url:"/photos"},{title:"信手涂鸦",url:"/knbrush"},{title:"手记",url:"/note"}]:this.navs=[{title:"主页",url:"/"},{title:"随笔",url:"/blog"},{title:"摄影集",url:"/photos"},{title:"信手涂鸦",url:"/knbrush"},{title:"手记",url:"/note"}],window.onscroll=function(){}},methods:{}}},35:function(t,n,e){n=t.exports=e(7)(void 0),n.push([t.i,"\n.nav-bar {\n  height: 60px;\n  line-height: 60px;\n  background-color: #24292e;\n  color: #fff;\n  position: absolute;\n  width: 100%;\n  z-index: 100;\n  top: 0;\n  transition: all 1s ease;\n}\n.nav-bar .nav-left {\n    float: left;\n    margin-left: 20px;\n}\n.nav-bar .nav-item {\n    display: block;\n    float: left;\n    padding: 0 20px;\n    text-align: center;\n    position: relative;\n    font-size: 16px;\n    font-weight: bold;\n    color: rgba(255, 255, 255, 0.75) !important;\n}\n.nav-bar .nav-item:after {\n      content: '';\n      position: absolute;\n      width: 100%;\n      height: 2px;\n      bottom: 0;\n      left: 0;\n      background-color: #000;\n      transition: all 0.5s ease;\n}\n.nav-bar .nav-item.active, .nav-bar .nav-item:hover {\n      color: white !important;\n}\n.nav-bar .nav-item.active:after, .nav-bar .nav-item:hover:after {\n        background-color: #fff;\n}\n@media screen and (max-width: 500px) {\n.nav-bar .nav-item {\n      padding: 0px;\n      width: 25%;\n}\n}\n",""])},36:function(t,n,e){e(38);var o=e(8)(e(34),e(37),null,null);o.options.__file="/Users/Kirn/Documents/Projects/EcoTechWorkspace/dawntech.top/src/components/nav-bar.vue",o.esModule&&Object.keys(o.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] nav-bar.vue: functional components are not supported with templates, they should use render functions."),t.exports=o.exports},37:function(t,n,e){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"nav-bar"},[e("div",{staticClass:"container"},[e("div",{staticClass:"nav-right"},t._l(t.navs,function(n,o){return e("a",{staticClass:"nav-item",class:{active:t.index==o},attrs:{href:n.url}},[t._v("\n                "+t._s(n.title)+"\n            ")])}))])])},staticRenderFns:[]},t.exports.render._withStripped=!0},38:function(t,n,e){var o=e(35);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e(9)("9d25e86c",o,!1)},39:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={wxShare:function(t,n,e,o){var i=encodeURIComponent(location.href),a="/api/signature?url="+i;o.get(a).then(function(o){o&&o.body&&(wx.config({appId:o.body.appid,nonceStr:o.body.nonceStr,timestamp:o.body.timestamp,signature:o.body.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"]}),wx.ready(function(){wx.onMenuShareAppMessage({title:t,desc:n,link:location.href,imgUrl:e}),wx.onMenuShareTimeline({title:t,link:location.href,imgUrl:e})}))},function(){})}}},43:function(t,n,e){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(n,"__esModule",{value:!0});var i=e(36),a=o(i),s=e(31),r=o(s),l=e(28),c=o(l),p=e(39),d=o(p);n.default={components:{navBar:a.default,foot:r.default},data:function(){return{ens:[],cns:[],previews:[],works:[]}},computed:{mobile:function(){return c.default.isMobile()},linkTarget:function(){return c.default.linkTarget()},index:function(){return c.default.isMobile()?2:3}},created:function(){this.init(),d.default.wxShare("信手涂鸦 - 素描.涂色.P图.手绘大师","这是一款适合所有用户的非常高效的绘画工具，快速打开，易学易用。虽然采用了简约的设计手法但是软件仍然可以提供丰富的功能","http://dawntech.top/assets/images/knbrush.png",this.$http)},methods:{init:function(){var t=this;this.$http.get("/api/knbrush",{params:{}}).then(function(n){n&&n.body&&n.body.abstract&&(t.ens=n.body.abstract.ens,t.cns=n.body.abstract.cns,t.previews=n.body.abstract.previews,t.works=n.body.abstract.works)})}}}},55:function(t,n,e){n=t.exports=e(7)(void 0),n.push([t.i,"\n.text {\n  background-color: #fff;\n}\n.text .name {\n    padding: 0px 18px;\n    height: 40px;\n    line-height: 40px;\n    padding-top: 20px;\n    font-size: 20px;\n    font-weight: bold;\n    display: block;\n    color: #298cda;\n}\n.text .name:hover {\n      text-decoration: underline;\n}\n.text .subname {\n    padding: 0px 18px;\n    height: 20px;\n    line-height: 20px;\n    font-size: 14px;\n    color: #298cda;\n}\n.text .subname:hover {\n      text-decoration: underline;\n}\n.text .qrcode {\n    position: absolute;\n    top: 20px;\n    right: 18px;\n    width: 140px;\n    height: 140px;\n}\n.text .abstract-tips {\n    padding: 0px 18px;\n    height: 20px;\n    line-height: 20px;\n    font-size: 16px;\n    font-weight: bold;\n    display: block;\n    margin-top: 60px;\n}\n.text .abstract-content {\n    padding: 0px 18px;\n}\n.text .abstract-content .abstract-item {\n      display: block;\n      font-size: 14px;\n      color: #666;\n      min-height: 24px;\n      line-height: 24px;\n}\n.text .abstract-content-en {\n    padding: 0px 18px;\n    padding-top: 20px;\n}\n.text .abstract-content-en .abstract-item {\n      display: block;\n      font-size: 14px;\n      color: #999;\n      min-height: 24px;\n      line-height: 24px;\n}\n.text .preview {\n    padding: 0px 18px;\n    margin-top: 10px;\n    overflow: hidden;\n    overflow-x: auto;\n    white-space: nowrap;\n    overflow: hidden;\n    overflow-x: scroll;\n    -webkit-overflow-scrolling: touch;\n    text-align: justify;\n}\n.text .preview .item {\n      width: 400px;\n      padding: 5px 30px 0px 0px;\n      display: inline-block;\n}\n.text .preview .item .boarder {\n        background-color: #fff;\n        width: 100%;\n        display: block;\n}\n.text .preview .item .boarder img {\n          width: 100%;\n}\n.text .works {\n    padding-bottom: 40px;\n}\n.text .works .image-item {\n      margin: 20px 0px;\n      width: 100%;\n      display: inline-block;\n      background-color: #fff;\n      transition: all 0.5s ease;\n      box-shadow: 0px 0px 10px 2px #ccc;\n}\n.text .works .image-item .image-cover {\n        padding: 20px 20px 20px 20px;\n        width: auto;\n        display: block;\n        background-color: #fff;\n}\n.text .works .image-item .image-cover img {\n          width: 100%;\n          height: 100%;\n          display: block;\n}\n@media screen and (max-width: 500px) {\n.text .preview {\n      padding: 0px !important;\n      margin-top: 10px;\n}\n.text .preview .item {\n        padding: 5px 10px;\n        width: 80%;\n}\n.text .preview .item .boarder {\n          padding: 0px;\n}\n.text .works {\n      padding-bottom: 12px;\n}\n.text .works .image-item {\n        width: auto;\n        display: block;\n        margin: 0px;\n        box-shadow: none;\n}\n.text .works .image-item .image-cover {\n          padding: 12px 12px 0px 12px;\n}\n}\n",""])}});