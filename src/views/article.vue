<template>
	<div class="article">
		<div class="container">
			<div class="article-content" v-html="htmlContent"></div>
		</div>
		<foot></foot>
	</div>
</template>
<script>
import md2html from "../business/md2html.js";
import navBar from "../components/nav-bar.vue";
import foot from "../components/foot.vue";
import weixin from "../business/weixin";
export default {
  components: { navBar, foot },
  data: function() {
    return {
      htmlContent: "",
      title: "",
      desc: ""
    };
  },
  created: function() {
    this.convert(this.$route.params.id);
  },
  methods: {
    convert: function(id) {
      this.$http.get("blog/" + id).then(resp => {
        if (resp && resp.data && resp.data.id) {
          md2html.convertSrc(resp.data.target.replace("/api/",""), (err, result) => {
            this.htmlContent = result;
          });
          this.title = resp.data.title;
          this.desc = resp.data.desc;
          weixin.wxShare(
            this.title,
            this.desc,
            "http://dawntech.top/assets/images/favicon.jpg",
            this.$http
          );
          if(typeof window !="undefined") {
              if(typeof window !="undefined") {
              document.title = this.title;
          }
          }
        }
      });
    }
  }
};
</script>
<style lang="sass">
.article-content {
		min-height: 800px;
    margin: 0px;
		blockquote {
			-webkit-margin-before: 0px;
    	-webkit-margin-after: 0px;
    	-webkit-margin-start: 0px;
    	-webkit-margin-end: 0px;
			border-left: 2px solid #298cda;
			padding: 10px 10px;
			margin-left: 20px;
			background-color: #efefef;
			p {
				-webkit-margin-before: 0px;
				-webkit-margin-after: 0px;
				-webkit-margin-start: 0px;
				-webkit-margin-end: 0px;
			}
		}
		a {
			color: #298cda !important;
			&:hover {
				text-decoration: underline;
			}
		}
}
@media screen and (min-width: 500px) {
	.article-content {
		padding: 0 16px;
		font-size: 16px;
		word-break: break-all;
		img {
			max-width: 800px;
			margin: 0 auto;
		}
		h1 {
			font-size: 34px;
		}
		h2 {
			font-size: 28px;
		}
		h3 {
			font-size: 22px;
		}
		h4 {
			font-size: 20px;
		}
	}
}
@media screen and (max-width: 500px) {
	.article-content {
		padding: 0 16px;
		font-size: 14px;
		word-break: break-all;
		img {
			width: 100%;
		}
		h1 {
			font-size: 30px;
		}
		h2 {
			font-size: 24px;
		}
		h3 {
			font-size: 18px;
		}
		h4 {
			font-size: 16px;
		}
	}
}


/*

Railscasts-like style (c) Visoft, Inc. (Damien White)

*/
code {
			background: #efefef;
			font-style: italic;
			font-size: 14px;
			padding: 4px 10px;
		}
.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #232323 !important;
  color: #e6e1dc;
	font-style: normal !important;
}

.hljs-comment,
.hljs-quote {
  color: #bc9458;
  font-style: italic !important;
}

.hljs-keyword,
.hljs-selector-tag {
  color: #c26230;
}

.hljs-string,
.hljs-number,
.hljs-regexp,
.hljs-variable,
.hljs-template-variable {
  color: #a5c261;
}

.hljs-subst {
  color: #519f50;
}

.hljs-tag,
.hljs-name {
  color: #e8bf6a;
}

.hljs-type {
  color: #da4939;
}


.hljs-symbol,
.hljs-bullet,
.hljs-built_in,
.hljs-builtin-name,
.hljs-attr,
.hljs-link {
  color: #6d9cbe;
}

.hljs-params {
  color: #d0d0ff;
}

.hljs-attribute {
  color: #cda869;
}

.hljs-meta {
  color: #9b859d;
}

.hljs-title,
.hljs-section {
  color: #ffc66d;
}

.hljs-addition {
  background-color: #144212;
  color: #e6e1dc;
  display: inline-block;
  width: 100%;
}

.hljs-deletion {
  background-color: #600;
  color: #e6e1dc;
  display: inline-block;
  width: 100%;
}

.hljs-selector-class {
  color: #9b703f;
}

.hljs-selector-id {
  color: #8b98ab;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-link {
  text-decoration: underline;
}


</style>