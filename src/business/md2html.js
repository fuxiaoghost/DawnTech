import marked from 'marked';
import highlight from 'highlight.js';
import Vue from 'vue';
const render = new marked.Renderer();
// 初始化基础参数
marked.setOptions({
    renderer: render,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});
// 配置高亮模块 use highlight.js
marked.setOptions({
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});
render.code = function (code, lang, escaped) {
    if (this.options.highlight) {
        var out = this.options.highlight(code, lang);
        if (out != null && out !== code) {
            escaped = true;
            code = out;
        }
    }

 return '<pre><code class="hljs">'
            + (escaped ? code : escape(code, true))
            + '\n</code></pre>';
};

export default {
    convertText: function (md, result) {
        marked(md, (err, content) => {
            result(err, content);
        });
    },
    convertSrc: function (src, result) {
        Vue.http.get(src).then((response) => {
            marked(response.data, (err, content) => {
                result(err, content);
            });
        }, (response) => {
            result(response.statusText, '');
        });
    }
}