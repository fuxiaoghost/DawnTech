webpackJsonp([3],{22:function(n,t,e){e(241);var o=e(7)(e(41),e(233),null,null);o.options.__file="/Users/kirn/Documents/Workspace/Dawn/dawntech.top/src/views/note.vue",o.esModule&&Object.keys(o.esModule).some(function(n){return"default"!==n&&"__esModule"!==n})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] note.vue: functional components are not supported with templates, they should use render functions."),n.exports=o.exports},233:function(n,t,e){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"note"},[e("nav-bar",{attrs:{index:n.index}}),n._v(" "),e("div",{staticClass:"container"},[e("div",{staticClass:"text"},[e("a",{staticClass:"name",attrs:{href:"https://itunes.apple.com/cn/app/id1247102147"}},[n._v("手记")]),n._v(" "),n.mobile?n._e():e("img",{staticClass:"qrcode",attrs:{src:"/assets/images/qrcode2.png",alt:"https://itunes.apple.com/cn/app/id1247102147"}}),n._v(" "),e("span",{staticClass:"abstract-tips"},[n._v("内容提要")]),n._v(" "),e("div",{staticClass:"abstract-content"},n._l(n.cns,function(t){return e("span",{staticClass:"abstract-item"},[n._v(n._s(t))])})),n._v(" "),e("span",{staticClass:"abstract-tips"},[n._v("应用预览")]),n._v(" "),e("div",{staticClass:"preview"},n._l(n.previews,function(t){return e("div",{staticClass:"item"},[e("a",{staticClass:"boarder",attrs:{href:t,target:n.linkTarget}},[e("img",{attrs:{src:t,alt:""}})])])})),n._v(" "),e("span",{staticClass:"abstract-tips"},[n._v("作品展示")]),n._v(" "),e("div",{staticClass:"works"},n._l(n.works,function(t){return e("a",{staticClass:"image-item",attrs:{href:t,target:n.linkTarget}},[e("span",{staticClass:"image-cover"},[e("img",{attrs:{src:t}})])])}))])]),n._v(" "),e("foot")],1)},staticRenderFns:[]},n.exports.render._withStripped=!0},241:function(n,t,e){var o=e(46);"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);e(8)("5defb2c1",o,!1)},26:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={isMobile:function(){return!!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)},linkTarget:function(){return this.isMobile()?"":"_blank"}}},27:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{}},methods:{}}},28:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e(26),i=function(n){return n&&n.__esModule?n:{default:n}}(o);t.default={props:["index"],data:function(){return{navs:[],navClass:""}},created:function(){var n=this;i.default.isMobile()?this.navs=[{title:"随笔",url:"/blog"},{title:"信手涂鸦",url:"/knbrush"},{title:"手记",url:"/note"},{title:"摄影集",url:"/photos"}]:this.navs=[{title:"主页",url:"/"},{title:"随笔",url:"/blog"},{title:"信手涂鸦",url:"/knbrush"},{title:"手记",url:"/note"},{title:"摄影集",url:"/photos"}],window.onscroll=function(){window.scrollY>160?n.navClass="light":n.navClass=""}},methods:{}}},29:function(n,t,e){t=n.exports=e(6)(void 0),t.push([n.i,"\n.nav-bar {\n  height: 60px;\n  line-height: 60px;\n  background-color: #333;\n  color: #fff;\n  position: fixed;\n  width: 100%;\n  z-index: 100;\n  top: 0;\n  transition: all 1s ease;\n}\n.nav-bar.light {\n    background-color: #fff;\n    color: #000;\n    opacity: .95;\n    border-bottom: 1px solid #f2f2f2;\n}\n.nav-bar.light .brand {\n      color: #000;\n}\n.nav-bar.light .nav-item {\n      color: #000 !important;\n}\n.nav-bar.light .nav-item:after {\n        background-color: #fff;\n}\n.nav-bar.light .nav-item.active:after, .nav-bar.light .nav-item:hover:after {\n        background-color: #000;\n}\n.nav-bar .nav-left {\n    float: left;\n    margin-left: 20px;\n}\n.nav-bar .nav-item {\n    display: block;\n    float: left;\n    padding: 0 20px;\n    text-align: center;\n    position: relative;\n    color: #fff !important;\n}\n.nav-bar .nav-item:after {\n      content: '';\n      position: absolute;\n      width: 100%;\n      height: 2px;\n      bottom: 0;\n      left: 0;\n      background-color: #000;\n      transition: all 0.5s ease;\n}\n.nav-bar .nav-item.active:after, .nav-bar .nav-item:hover:after {\n      background-color: #fff;\n}\n",""])},30:function(n,t,e){t=n.exports=e(6)(void 0),t.push([n.i,"\n.footer {\n  padding: 10px 0px 10px 0px;\n  text-align: center;\n  background-color: #333;\n  color: #fff;\n  font-size: 13px;\n}\n.footer .copyright {\n    height: 20px;\n    display: block;\n    color: #888;\n}\n.footer .icp {\n    height: 20px;\n    display: block;\n    color: #888;\n}\n",""])},31:function(n,t,e){e(36);var o=e(7)(e(27),e(34),null,null);o.options.__file="/Users/kirn/Documents/Workspace/Dawn/dawntech.top/src/components/foot.vue",o.esModule&&Object.keys(o.esModule).some(function(n){return"default"!==n&&"__esModule"!==n})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] foot.vue: functional components are not supported with templates, they should use render functions."),n.exports=o.exports},32:function(n,t,e){e(35);var o=e(7)(e(28),e(33),null,null);o.options.__file="/Users/kirn/Documents/Workspace/Dawn/dawntech.top/src/components/nav-bar.vue",o.esModule&&Object.keys(o.esModule).some(function(n){return"default"!==n&&"__esModule"!==n})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] nav-bar.vue: functional components are not supported with templates, they should use render functions."),n.exports=o.exports},33:function(n,t,e){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"nav-bar",class:n.navClass},[e("div",{staticClass:"container"},[e("div",{staticClass:"nav-right"},n._l(n.navs,function(t,o){return e("a",{staticClass:"nav-item",class:{active:n.index==o},attrs:{href:t.url}},[n._v("\n                "+n._s(t.title)+"\n            ")])}))])])},staticRenderFns:[]},n.exports.render._withStripped=!0},34:function(n,t,e){n.exports={render:function(){var n=this,t=n.$createElement;n._self._c;return n._m(0)},staticRenderFns:[function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"footer"},[e("span",{staticClass:"copyright"},[n._v("2017 dawntech.top. All rights reserved.")]),n._v(" "),e("a",{staticClass:"icp",attrs:{target:"_blank",href:"http://www.miitbeian.gov.cn"}},[n._v("京ICP备17056676号")])])}]},n.exports.render._withStripped=!0},35:function(n,t,e){var o=e(29);"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);e(8)("9d25e86c",o,!1)},36:function(n,t,e){var o=e(30);"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);e(8)("7745b4ce",o,!1)},41:function(n,t,e){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}Object.defineProperty(t,"__esModule",{value:!0});var i=e(32),a=o(i),r=e(31),s=o(r),l=e(26),c=o(l);t.default={components:{navBar:a.default,foot:s.default},data:function(){return{ens:[],cns:[],previews:[],works:[]}},computed:{mobile:function(){return c.default.isMobile()},linkTarget:function(){return c.default.linkTarget()},index:function(){return c.default.isMobile()?2:3}},created:function(){this.init()},methods:{init:function(){var n=this;this.$http.get("/api/note",{params:{}}).then(function(t){t&&t.body&&t.body.abstract&&(n.cns=t.body.abstract.cns,n.previews=t.body.abstract.previews,n.works=t.body.abstract.works)})}}}},46:function(n,t,e){t=n.exports=e(6)(void 0),t.push([n.i,"\n.text .name {\n  padding: 0px 18px;\n  height: 40px;\n  line-height: 40px;\n  padding-top: 20px;\n  font-size: 20px;\n  font-weight: bold;\n  display: block;\n  color: #298cda;\n}\n.text .name:hover {\n    text-decoration: underline;\n}\n.text .name:after {\n    display: inline-block;\n    content: '';\n    width: 12px;\n    height: 20px;\n    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAVklEQVR4Xn3PgQkAMQhDUXfqTu7kTtkpd5RA8AInfArtQ2iRXFWT2QedAfttj2FsPIOE1eCOlEuoWWjgzYaB/IkeGOrxXhqB+uA9Bfcm0lAZuh+YIeAD+cAqSz4kCMUAAAAASUVORK5CYII=) center right no-repeat;\n}\n.text .subname {\n  padding: 0px 18px;\n  height: 20px;\n  line-height: 20px;\n  font-size: 14px;\n  color: #298cda;\n}\n.text .subname:hover {\n    text-decoration: underline;\n}\n.text .subname:after {\n    display: inline-block;\n    content: '';\n    width: 12px;\n    height: 10px;\n    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAVklEQVR4Xn3PgQkAMQhDUXfqTu7kTtkpd5RA8AInfArtQ2iRXFWT2QedAfttj2FsPIOE1eCOlEuoWWjgzYaB/IkeGOrxXhqB+uA9Bfcm0lAZuh+YIeAD+cAqSz4kCMUAAAAASUVORK5CYII=) center right no-repeat;\n}\n.text .qrcode {\n  position: absolute;\n  top: 20px;\n  right: 18px;\n  width: 140px;\n  height: 140px;\n}\n.text .abstract-tips {\n  padding: 0px 18px;\n  height: 20px;\n  line-height: 20px;\n  font-size: 16px;\n  font-weight: bold;\n  display: block;\n  margin-top: 60px;\n}\n.text .abstract-content {\n  padding: 0px 18px;\n}\n.text .abstract-content .abstract-item {\n    display: block;\n    font-size: 14px;\n    color: #666;\n    min-height: 24px;\n    line-height: 24px;\n}\n.text .abstract-content-en {\n  padding: 0px 18px;\n  padding-top: 20px;\n}\n.text .abstract-content-en .abstract-item {\n    display: block;\n    font-size: 14px;\n    color: #999;\n    min-height: 24px;\n    line-height: 24px;\n}\n.text .preview {\n  padding: 0px 18px;\n  margin-top: 10px;\n  overflow: hidden;\n  overflow-x: auto;\n  white-space: nowrap;\n  overflow: hidden;\n  overflow-x: scroll;\n  /* 1 */\n  text-align: justify;\n  /* 3 */\n}\n.text .preview .item {\n    width: 240px;\n    padding: 5px 30px 0px 0px;\n    display: inline-block;\n}\n.text .preview .item .boarder {\n      background-color: #fff;\n      width: 100%;\n      display: block;\n      padding: 10px;\n}\n.text .preview .item .boarder img {\n        width: 100%;\n}\n.text .image-item {\n  margin: 20px 0px;\n  width: 100%;\n  display: inline-block;\n  background-color: #fff;\n  transition: all 0.5s ease;\n  box-shadow: 0px 0px 10px 2px #ccc;\n}\n.text .image-item .image-cover {\n    padding: 20px 20px 20px 20px;\n    width: auto;\n    display: block;\n    background-color: #fff;\n}\n.text .image-item .image-cover img {\n      width: 100%;\n      height: 100%;\n      display: block;\n}\n@media screen and (max-width: 500px) {\n.text .preview {\n    padding: 0px !important;\n    margin-top: 10px;\n}\n.text .preview .item {\n      padding: 5px 0px;\n      width: 100%;\n}\n.text .preview .item .boarder {\n        padding: 0px;\n}\n.text .works {\n    padding-bottom: 12px;\n}\n.text .works .image-item {\n      width: auto;\n      margin: 0px;\n      display: block;\n      box-shadow: none;\n}\n.text .works .image-item .image-cover {\n        padding: 12px 12px 0px 12px;\n}\n}\n",""])}});