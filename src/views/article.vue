<template>
	<div class="article">
		<nav-bar></nav-bar>
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
export default {
  components: { navBar, foot },
  data: function() {
    return {
      articles: [],
      article: {},
      htmlContent: ""
    };
  },
  created: function() {
    this.convert(this.$route.query.id);
  },
  methods: {
    convert: function(aid) {
      console.log(aid);
      md2html.convertSrc(aid, (err, result) => {
        this.htmlContent = result;
      });
    }
  }
};
</script>
<style lang="sass">
.article-content {
	// background-color: #fff;
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
			color: #298cda;
			&:hover {
				text-decoration: underline;
			}
      &:after {
				display: inline-block;
				content: '';
				width: 12px;
				height: 12px;
				background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAVklEQVR4Xn3PgQkAMQhDUXfqTu7kTtkpd5RA8AInfArtQ2iRXFWT2QedAfttj2FsPIOE1eCOlEuoWWjgzYaB/IkeGOrxXhqB+uA9Bfcm0lAZuh+YIeAD+cAqSz4kCMUAAAAASUVORK5CYII=) center right no-repeat;
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