module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 68);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var listToStyles = __webpack_require__(157)

module.exports = function (parentId, list, isProduction) {
  if (typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
    var context = __VUE_SSR_CONTEXT__
    var styles = context._styles

    if (!styles) {
      styles = context._styles = {}
      Object.defineProperty(context, 'styles', {
        enumberable: true,
        get : function() {
          return (
            context._renderedStyles ||
            (context._renderedStyles = renderStyles(styles))
          )
        }
      })
    }

    list = listToStyles(parentId, list)
    if (isProduction) {
      addStyleProd(styles, list)
    } else {
      addStyleDev(styles, list)
    }
  }
}

// In production, render as few style tags as possible.
// (mostly because IE9 has a limit on number of style tags)
function addStyleProd (styles, list) {
  for (var i = 0; i < list.length; i++) {
    var parts = list[i].parts
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j]
      // group style tags by media types.
      var id = part.media || 'default'
      var style = styles[id]
      if (style) {
        style.ids.push(part.id)
        style.css += '\n' + part.css
      } else {
        styles[id] = {
          ids: [part.id],
          css: part.css,
          media: part.media
        }
      }
    }
  }
}

// In dev we use individual style tag for each module for hot-reload
// and source maps.
function addStyleDev (styles, list) {
  for (var i = 0; i < list.length; i++) {
    var parts = list[i].parts
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j]
      styles[part.id] = {
        ids: [part.id],
        css: part.css,
        media: part.media
      }
    }
  }
}

function renderStyles (styles) {
  var css = ''
  for (var key in styles) {
    var style = styles[key]
    css += '<style data-vue-ssr-id="' + style.ids.join(' ') + '"' +
        (style.media ? ( ' media="' + style.media + '"' ) : '') + '>' +
        style.css + '</style>'
  }
  return css
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(44)('wks');
var uid = __webpack_require__(49);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(152)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(53),
  /* template */
  __webpack_require__(140),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    isMobile: function isMobile() {
        var userAgent =  false ? navigator.userAgent : process.UA;
        return !!userAgent.match(/(iPhone|iPod|Android|ios)/i);
    },
    linkTarget: function linkTarget() {
        return this.isMobile() ? '' : '_blank';
    }
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(149)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(54),
  /* template */
  __webpack_require__(137),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    wxShare: function wxShare(title, desc, imageUrl, http) {}
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(26)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(7);
var ctx = __webpack_require__(20);
var hide = __webpack_require__(14);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(17);
var createDesc = __webpack_require__(43);
module.exports = __webpack_require__(12) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(80);
var toPrimitive = __webpack_require__(100);
var dP = Object.defineProperty;

exports.f = __webpack_require__(12) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(18);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(71);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(18);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(17).f;
var has = __webpack_require__(21);
var TAG = __webpack_require__(4)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(44)('keys');
var uid = __webpack_require__(49);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(37);
var defined = __webpack_require__(24);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebGLAnimation = exports.AnimationValue = undefined;

var _createClass2 = __webpack_require__(23);

var _createClass3 = _interopRequireDefault(_createClass2);

var _classCallCheck2 = __webpack_require__(22);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AnimationValue = function AnimationValue(value) {
    (0, _classCallCheck3.default)(this, AnimationValue);
    this.value = 0.0;

    this.value = value;
};

var AnimatioinParam = function AnimatioinParam() {
    (0, _classCallCheck3.default)(this, AnimatioinParam);
    this.timeOffset = 0;
    this.timeEnd = 0;
    this.value = new AnimationValue();
    this.valueFrom = 0;
    this.valueTo = 0;
    this.cx = 0;
    this.bx = 0;
    this.ax = 0;
    this.cy = 0;
    this.by = 0;
    this.ay = 0;
    this.p1x = 0;
    this.p1y = 0;
    this.p2x = 0;
    this.p2y = 0;
};

var WebGLAnimation = function () {
    function WebGLAnimation() {
        (0, _classCallCheck3.default)(this, WebGLAnimation);
    }

    (0, _createClass3.default)(WebGLAnimation, null, [{
        key: "prepareInfo",
        value: function prepareInfo(valueFrom) {
            if (!WebGLAnimation.completions) {
                WebGLAnimation.completions = [];
                WebGLAnimation.params = [];
                for (var i = 0; i < WebGLAnimation.count; i++) {
                    WebGLAnimation.params.push(new AnimatioinParam());
                    WebGLAnimation.params[i].end = true;
                    WebGLAnimation.completions.push(null);
                }
            }
            for (var i = 0; i < WebGLAnimation.count; i++) {
                if (WebGLAnimation.params[i].value == valueFrom) {
                    WebGLAnimation.params[i].end = true;
                    WebGLAnimation.completions[i] = null;
                }
                if (WebGLAnimation.params[i].end) {
                    WebGLAnimation.pointer = i;
                    return true;
                }
            }
            return false;
        }
    }, {
        key: "stopAllAnimation",
        value: function stopAllAnimation() {
            if (WebGLAnimation.params == null) {
                return;
            }
            for (var i = 0; i < WebGLAnimation.count; i++) {
                WebGLAnimation.params[i].end = true;
            }
        }
    }, {
        key: "animateEaseInWithDuration",
        value: function animateEaseInWithDuration(time, valueFrom, valueTo) {
            if (!WebGLAnimation.prepareInfo(valueFrom)) {
                return false;
            }
            WebGLAnimation.params[WebGLAnimation.pointer].timeOffset = 0.0;
            WebGLAnimation.params[WebGLAnimation.pointer].timeEnd = time;
            WebGLAnimation.params[WebGLAnimation.pointer].value = valueFrom;
            WebGLAnimation.params[WebGLAnimation.pointer].valueFrom = valueFrom.value;
            WebGLAnimation.params[WebGLAnimation.pointer].valueTo = valueTo;
            WebGLAnimation.params[WebGLAnimation.pointer].p1x = 0.42;
            WebGLAnimation.params[WebGLAnimation.pointer].p1y = 0.00;
            WebGLAnimation.params[WebGLAnimation.pointer].p2x = 1.00;
            WebGLAnimation.params[WebGLAnimation.pointer].p2y = 1.00;
            WebGLAnimation.params[WebGLAnimation.pointer].end = false;
            WebGLAnimation.params[WebGLAnimation.pointer].next = false;
            WebGLAnimation.params[WebGLAnimation.pointer].delay = 0.0;
            return true;
        }
    }, {
        key: "animateEaseOutWithDuration",
        value: function animateEaseOutWithDuration(time, valueFrom, valueTo) {
            if (!WebGLAnimation.prepareInfo(valueFrom)) {
                return false;
            }
            WebGLAnimation.params[WebGLAnimation.pointer].timeOffset = 0.0;
            WebGLAnimation.params[WebGLAnimation.pointer].timeEnd = time;
            WebGLAnimation.params[WebGLAnimation.pointer].value = valueFrom;
            WebGLAnimation.params[WebGLAnimation.pointer].valueFrom = valueFrom.value;
            WebGLAnimation.params[WebGLAnimation.pointer].valueTo = valueTo;
            WebGLAnimation.params[WebGLAnimation.pointer].p1x = 0.00;
            WebGLAnimation.params[WebGLAnimation.pointer].p1y = 0.00;
            WebGLAnimation.params[WebGLAnimation.pointer].p2x = 0.58;
            WebGLAnimation.params[WebGLAnimation.pointer].p2y = 1.00;
            WebGLAnimation.params[WebGLAnimation.pointer].end = false;
            WebGLAnimation.params[WebGLAnimation.pointer].next = false;
            WebGLAnimation.params[WebGLAnimation.pointer].delay = 0.0;
            return true;
        }
    }, {
        key: "animateLinearWithDuration",
        value: function animateLinearWithDuration(time, valueFrom, valueTo) {
            if (!WebGLAnimation.prepareInfo(valueFrom)) {
                return false;
            }
            WebGLAnimation.params[WebGLAnimation.pointer].timeOffset = 0.0;
            WebGLAnimation.params[WebGLAnimation.pointer].timeEnd = time;
            WebGLAnimation.params[WebGLAnimation.pointer].value = valueFrom;
            WebGLAnimation.params[WebGLAnimation.pointer].valueFrom = valueFrom.value;
            WebGLAnimation.params[WebGLAnimation.pointer].valueTo = valueTo;
            WebGLAnimation.params[WebGLAnimation.pointer].p1x = 0.00;
            WebGLAnimation.params[WebGLAnimation.pointer].p1y = 0.00;
            WebGLAnimation.params[WebGLAnimation.pointer].p2x = 1.00;
            WebGLAnimation.params[WebGLAnimation.pointer].p2y = 1.00;
            WebGLAnimation.params[WebGLAnimation.pointer].end = false;
            WebGLAnimation.params[WebGLAnimation.pointer].next = false;
            WebGLAnimation.params[WebGLAnimation.pointer].delay = 0.0;
            return true;
        }
    }, {
        key: "animateEaseInOutWithDuration",
        value: function animateEaseInOutWithDuration(time, valueFrom, valueTo) {
            if (!WebGLAnimation.prepareInfo(valueFrom)) {
                return false;
            }
            WebGLAnimation.params[WebGLAnimation.pointer].timeOffset = 0.0;
            WebGLAnimation.params[WebGLAnimation.pointer].timeEnd = time;
            WebGLAnimation.params[WebGLAnimation.pointer].value = valueFrom;
            WebGLAnimation.params[WebGLAnimation.pointer].valueFrom = valueFrom.value;
            WebGLAnimation.params[WebGLAnimation.pointer].valueTo = valueTo;
            WebGLAnimation.params[WebGLAnimation.pointer].p1x = 0.42;
            WebGLAnimation.params[WebGLAnimation.pointer].p1y = 0.00;
            WebGLAnimation.params[WebGLAnimation.pointer].p2x = 0.58;
            WebGLAnimation.params[WebGLAnimation.pointer].p2y = 1.00;
            WebGLAnimation.params[WebGLAnimation.pointer].end = false;
            WebGLAnimation.params[WebGLAnimation.pointer].next = false;
            WebGLAnimation.params[WebGLAnimation.pointer].delay = 0.0;
            return true;
        }
    }, {
        key: "animationTimerStep",
        value: function animationTimerStep(duration) {
            if (WebGLAnimation.params == null) {
                return;
            }
            for (var i = 0; i < WebGLAnimation.count; i++) {
                if (WebGLAnimation.params[i].end) {
                    continue;
                }
                if (WebGLAnimation.params[i].delay <= 0) {
                    WebGLAnimation.params[i].timeOffset += duration;
                    if (WebGLAnimation.params[i].timeOffset >= WebGLAnimation.params[i].timeEnd) {

                        WebGLAnimation.params[i].value.value = WebGLAnimation.params[i].valueTo;
                        if (WebGLAnimation.params[i].next) {
                            if (WebGLAnimation.completions[i]) {
                                WebGLAnimation.completions[i] = null;
                            }
                            WebGLAnimation.params[i].end = true;
                        } else {
                            WebGLAnimation.params[i].next = true;
                        }
                    } else {
                        var t = WebGLAnimation.params[i].timeOffset / WebGLAnimation.params[i].timeEnd;

                        WebGLAnimation.unitBezier(i);

                        WebGLAnimation.params[i].value.value = WebGLAnimation.params[i].valueFrom + (WebGLAnimation.params[i].valueTo - WebGLAnimation.params[i].valueFrom) * WebGLAnimation.solve(t, 1e-6, i);
                    }
                } else {
                    WebGLAnimation.params[i].delay -= duration;
                }
            }
        }
    }, {
        key: "exponentialEaseFrom",
        value: function exponentialEaseFrom(valueFrom, valueTo, a, t) {
            var y = (Math.exp(a * t) - 1) / (Math.exp(a) - 1);
            return valueFrom + (valueTo - valueFrom) * y;
        }
    }, {
        key: "unitBezier",
        value: function unitBezier(i) {
            WebGLAnimation.params[i].cx = 3.0 * WebGLAnimation.params[i].p1x;
            WebGLAnimation.params[i].bx = 3.0 * (WebGLAnimation.params[i].p2x - WebGLAnimation.params[i].p1x) - WebGLAnimation.params[i].cx;
            WebGLAnimation.params[i].ax = 1.0 - WebGLAnimation.params[i].cx - WebGLAnimation.params[i].bx;

            WebGLAnimation.params[i].cy = 3.0 * WebGLAnimation.params[i].p1y;
            WebGLAnimation.params[i].by = 3.0 * (WebGLAnimation.params[i].p2y - WebGLAnimation.params[i].p1y) - WebGLAnimation.params[i].cy;
            WebGLAnimation.params[i].ay = 1.0 - WebGLAnimation.params[i].cy - WebGLAnimation.params[i].by;
        }
    }, {
        key: "sampleCurveX",
        value: function sampleCurveX(t, i) {
            return ((WebGLAnimation.params[i].ax * t + WebGLAnimation.params[i].bx) * t + WebGLAnimation.params[i].cx) * t;
        }
    }, {
        key: "sampleCurveY",
        value: function sampleCurveY(t, i) {
            return ((WebGLAnimation.params[i].ay * t + WebGLAnimation.params[i].by) * t + WebGLAnimation.params[i].cy) * t;
        }
    }, {
        key: "sampleCurveDerivativeX",
        value: function sampleCurveDerivativeX(t, i) {
            return (3.0 * WebGLAnimation.params[i].ax * t + 2.0 * WebGLAnimation.params[i].bx) * t + WebGLAnimation.params[i].cx;
        }
    }, {
        key: "solveCurveX",
        value: function solveCurveX(x, epsilon, index) {
            var t0;
            var t1;
            var t2;
            var x2;
            var d2;
            var i;

            for (t2 = x, i = 0; i < 8; i++) {
                x2 = WebGLAnimation.sampleCurveX(t2, index) - x;
                if (Math.abs(x2) < epsilon) return t2;
                d2 = WebGLAnimation.sampleCurveDerivativeX(t2, index);
                if (Math.abs(d2) < epsilon) break;
                t2 = t2 - x2 / d2;
            }

            t0 = 0.0;
            t1 = 1.0;
            t2 = x;

            if (t2 < t0) return t0;
            if (t2 > t1) return t1;

            while (t0 < t1) {
                x2 = WebGLAnimation.sampleCurveX(t2, index);
                if (Math.abs(x2 - x) < epsilon) return t2;
                if (x > x2) t0 = t2;else t1 = t2;
                t2 = (t1 - t0) * .5 + t0;
            }

            return t2;
        }
    }, {
        key: "solve",
        value: function solve(x, epsilon, i) {
            var valuex = WebGLAnimation.solveCurveX(x, epsilon, i);
            return WebGLAnimation.sampleCurveY(valuex, i);
        }
    }]);
    return WebGLAnimation;
}();

WebGLAnimation.completions = null;
WebGLAnimation.count = 100;
WebGLAnimation.pointer = -1;
WebGLAnimation.params = null;
exports.AnimationValue = AnimationValue;
exports.WebGLAnimation = WebGLAnimation;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebGLModelManager = exports.Vector2 = exports.Vector3 = exports.Vector4 = exports.Matrix3 = exports.Matrix4 = undefined;

var _classCallCheck2 = __webpack_require__(22);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(23);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Matrix4 = function () {
    function Matrix4() {
        (0, _classCallCheck3.default)(this, Matrix4);
        this.m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }

    (0, _createClass3.default)(Matrix4, [{
        key: "matrix4GetMatrix3",
        value: function matrix4GetMatrix3() {
            var matrix = this;
            m3.m = [matrix.m[0], matrix.m[1], matrix.m[2], matrix.m[4], matrix.m[5], matrix.m[6], matrix.m[8], matrix.m[9], matrix.m[10]];
            var m3 = new Matrix3();
            return m3;
        }
    }, {
        key: "copy",
        value: function copy() {
            var m4 = new Matrix4();
            m4.m = [this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5], this.m[6], this.m[7], this.m[8], this.m[9], this.m[10], this.m[11], this.m[12], this.m[13], this.m[14], this.m[15]];
            return m4;
        }
    }], [{
        key: "multiply",
        value: function multiply(matrixLeft, matrixRight) {
            var m = new Matrix4();

            m.m[0] = matrixLeft.m[0] * matrixRight.m[0] + matrixLeft.m[4] * matrixRight.m[1] + matrixLeft.m[8] * matrixRight.m[2] + matrixLeft.m[12] * matrixRight.m[3];
            m.m[4] = matrixLeft.m[0] * matrixRight.m[4] + matrixLeft.m[4] * matrixRight.m[5] + matrixLeft.m[8] * matrixRight.m[6] + matrixLeft.m[12] * matrixRight.m[7];
            m.m[8] = matrixLeft.m[0] * matrixRight.m[8] + matrixLeft.m[4] * matrixRight.m[9] + matrixLeft.m[8] * matrixRight.m[10] + matrixLeft.m[12] * matrixRight.m[11];
            m.m[12] = matrixLeft.m[0] * matrixRight.m[12] + matrixLeft.m[4] * matrixRight.m[13] + matrixLeft.m[8] * matrixRight.m[14] + matrixLeft.m[12] * matrixRight.m[15];

            m.m[1] = matrixLeft.m[1] * matrixRight.m[0] + matrixLeft.m[5] * matrixRight.m[1] + matrixLeft.m[9] * matrixRight.m[2] + matrixLeft.m[13] * matrixRight.m[3];
            m.m[5] = matrixLeft.m[1] * matrixRight.m[4] + matrixLeft.m[5] * matrixRight.m[5] + matrixLeft.m[9] * matrixRight.m[6] + matrixLeft.m[13] * matrixRight.m[7];
            m.m[9] = matrixLeft.m[1] * matrixRight.m[8] + matrixLeft.m[5] * matrixRight.m[9] + matrixLeft.m[9] * matrixRight.m[10] + matrixLeft.m[13] * matrixRight.m[11];
            m.m[13] = matrixLeft.m[1] * matrixRight.m[12] + matrixLeft.m[5] * matrixRight.m[13] + matrixLeft.m[9] * matrixRight.m[14] + matrixLeft.m[13] * matrixRight.m[15];

            m.m[2] = matrixLeft.m[2] * matrixRight.m[0] + matrixLeft.m[6] * matrixRight.m[1] + matrixLeft.m[10] * matrixRight.m[2] + matrixLeft.m[14] * matrixRight.m[3];
            m.m[6] = matrixLeft.m[2] * matrixRight.m[4] + matrixLeft.m[6] * matrixRight.m[5] + matrixLeft.m[10] * matrixRight.m[6] + matrixLeft.m[14] * matrixRight.m[7];
            m.m[10] = matrixLeft.m[2] * matrixRight.m[8] + matrixLeft.m[6] * matrixRight.m[9] + matrixLeft.m[10] * matrixRight.m[10] + matrixLeft.m[14] * matrixRight.m[11];
            m.m[14] = matrixLeft.m[2] * matrixRight.m[12] + matrixLeft.m[6] * matrixRight.m[13] + matrixLeft.m[10] * matrixRight.m[14] + matrixLeft.m[14] * matrixRight.m[15];

            m.m[3] = matrixLeft.m[3] * matrixRight.m[0] + matrixLeft.m[7] * matrixRight.m[1] + matrixLeft.m[11] * matrixRight.m[2] + matrixLeft.m[15] * matrixRight.m[3];
            m.m[7] = matrixLeft.m[3] * matrixRight.m[4] + matrixLeft.m[7] * matrixRight.m[5] + matrixLeft.m[11] * matrixRight.m[6] + matrixLeft.m[15] * matrixRight.m[7];
            m.m[11] = matrixLeft.m[3] * matrixRight.m[8] + matrixLeft.m[7] * matrixRight.m[9] + matrixLeft.m[11] * matrixRight.m[10] + matrixLeft.m[15] * matrixRight.m[11];
            m.m[15] = matrixLeft.m[3] * matrixRight.m[12] + matrixLeft.m[7] * matrixRight.m[13] + matrixLeft.m[11] * matrixRight.m[14] + matrixLeft.m[15] * matrixRight.m[15];

            return m;
        }
    }, {
        key: "multiplyVector4",
        value: function multiplyVector4(matrixLeft, vectorRight) {
            return new Vector4(matrixLeft.m[0] * vectorRight.v[0] + matrixLeft.m[4] * vectorRight.v[1] + matrixLeft.m[8] * vectorRight.v[2] + matrixLeft.m[12] * vectorRight.v[3], matrixLeft.m[1] * vectorRight.v[0] + matrixLeft.m[5] * vectorRight.v[1] + matrixLeft.m[9] * vectorRight.v[2] + matrixLeft.m[13] * vectorRight.v[3], matrixLeft.m[2] * vectorRight.v[0] + matrixLeft.m[6] * vectorRight.v[1] + matrixLeft.m[10] * vectorRight.v[2] + matrixLeft.m[14] * vectorRight.v[3], matrixLeft.m[3] * vectorRight.v[0] + matrixLeft.m[7] * vectorRight.v[1] + matrixLeft.m[11] * vectorRight.v[2] + matrixLeft.m[15] * vectorRight.v[3]);
        }
    }, {
        key: "makePerspective",
        value: function makePerspective(fovyRadians, aspect, nearZ, farZ) {
            var cotan = 1.0 / Math.tan(fovyRadians / 2.0);
            var m = new Matrix4();
            m.m = [cotan / aspect, 0.0, 0.0, 0.0, 0.0, cotan, 0.0, 0.0, 0.0, 0.0, (farZ + nearZ) / (nearZ - farZ), -1.0, 0.0, 0.0, 2.0 * farZ * nearZ / (nearZ - farZ), 0.0];

            return m;
        }
    }, {
        key: "makeOrtho",
        value: function makeOrtho(left, right, bottom, top, nearZ, farZ) {
            var ral = right + left;
            var rsl = right - left;
            var tsb = top - bottom;
            var tab = top + bottom;
            var fan = farZ + nearZ;
            var fsn = farZ - nearZ;
            var m = new Matrix4();
            m.m = [2.0 / rsl, 0.0, 0.0, 0.0, 0.0, 2.0 / tsb, 0.0, 0.0, 0.0, 0.0, -2.0 / fsn, 0.0, -ral / rsl, -tab / tsb, -fan / fsn, 1.0];
            return m;
        }
    }, {
        key: "makeTranslation",
        value: function makeTranslation(tx, ty, tz) {
            var m4 = new Matrix4();
            m4.m[12] = tx;
            m4.m[13] = ty;
            m4.m[14] = tz;
            return m4;
        }
    }, {
        key: "makeScale",
        value: function makeScale(sx, sy, sz) {
            var m4 = new Matrix4();
            m4.m[0] = sx;
            m4.m[5] = sy;
            m4.m[10] = sz;
            return m4;
        }
    }, {
        key: "makeRotation",
        value: function makeRotation(radians, x, y, z) {
            var v = new Vector3(x, y, z).normalize();
            var cos = Math.cos(radians);
            var cosp = 1.0 - cos;
            var sin = Math.sin(radians);

            var m4 = new Matrix4();
            m4.m = [cos + cosp * v.v[0] * v.v[0], cosp * v.v[0] * v.v[1] + v.v[2] * sin, cosp * v.v[0] * v.v[2] - v.v[1] * sin, 0.0, cosp * v.v[0] * v.v[1] - v.v[2] * sin, cos + cosp * v.v[1] * v.v[1], cosp * v.v[1] * v.v[2] + v.v[0] * sin, 0.0, cosp * v.v[0] * v.v[2] + v.v[1] * sin, cosp * v.v[1] * v.v[2] - v.v[0] * sin, cos + cosp * v.v[2] * v.v[2], 0.0, 0.0, 0.0, 0.0, 1.0];

            return m4;
        }
    }]);
    return Matrix4;
}();

var Matrix3 = function () {
    function Matrix3() {
        (0, _classCallCheck3.default)(this, Matrix3);
        this.m = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }

    (0, _createClass3.default)(Matrix3, [{
        key: "getInverse",
        value: function getInverse() {
            var matrix = this;
            var me = matrix.m;
            var te = m;

            var n11 = me[0],
                n21 = me[1],
                n31 = me[2];
            var n12 = me[3],
                n22 = me[4],
                n32 = me[5];
            var n13 = me[6],
                n23 = me[7],
                n33 = me[8];

            var t11 = n33 * n22 - n32 * n23;
            var t12 = n32 * n13 - n33 * n12;
            var t13 = n23 * n12 - n22 * n13;

            var det = n11 * t11 + n21 * t12 + n31 * t13;

            if (det == 0) {
                var msg = "THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0";
                console.warn(msg);
                m = [1, 0, 0, 0, 1, 0, 0, 0, 1];
                return this;
            }

            var detInv = 1 / det;

            te[0] = t11 * detInv;
            te[1] = (n31 * n23 - n33 * n21) * detInv;
            te[2] = (n32 * n21 - n31 * n22) * detInv;

            te[3] = t12 * detInv;
            te[4] = (n33 * n11 - n31 * n13) * detInv;
            te[5] = (n31 * n12 - n32 * n11) * detInv;

            te[6] = t13 * detInv;
            te[7] = (n21 * n13 - n23 * n11) * detInv;
            te[8] = (n22 * n11 - n21 * n12) * detInv;

            return this;
        }
    }, {
        key: "transpose",
        value: function transpose() {
            var tmp;
            tmp = m[1];
            m[1] = m[3];
            m[3] = tmp;
            tmp = m[2];
            m[2] = m[6];
            m[6] = tmp;
            tmp = m[5];
            m[5] = m[7];
            m[7] = tmp;
            return this;
        }
    }]);
    return Matrix3;
}();

;

var Vector4 = function () {
    function Vector4(x, y, z, w) {
        (0, _classCallCheck3.default)(this, Vector4);
        this.v = [0, 0, 0, 0];

        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    (0, _createClass3.default)(Vector4, [{
        key: "length",
        value: function length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z, this.w * this.w);
        }
    }, {
        key: "normalize",
        value: function normalize() {
            var scale = 1.0 / this.length();
            this.x = this.x * scale;
            this.y = this.y * scale;
            this.z = this.z * scale;
            this.w = this.w * scale;
            return this;
        }
    }, {
        key: "x",
        get: function get() {
            return this.v[0];
        },
        set: function set(value) {
            this.v[0] = value;
        }
    }, {
        key: "y",
        get: function get() {
            return this.v[1];
        },
        set: function set(value) {
            this.v[1] = value;
        }
    }, {
        key: "z",
        get: function get() {
            return this.v[2];
        },
        set: function set(value) {
            this.v[2] = value;
        }
    }, {
        key: "w",
        get: function get() {
            return this.v[3];
        },
        set: function set(value) {
            this.v[3] = value;
        }
    }], [{
        key: "dotProduct",
        value: function dotProduct(vectorLeft, vectorRight) {
            return vectorLeft.x * vectorRight.x + vectorLeft.y * vectorRight.y + vectorLeft.z * vectorRight.z + vectorLeft.w * vectorRight.w;
        }
    }, {
        key: "crossProduct",
        value: function crossProduct(vectorLeft, vectorRight) {
            return new Vector3(vectorLeft.v[1] * vectorRight.v[2] - vectorLeft.v[2] * vectorRight.v[1], vectorLeft.v[2] * vectorRight.v[0] - vectorLeft.v[0] * vectorRight.v[2], vectorLeft.v[0] * vectorRight.v[1] - vectorLeft.v[1] * vectorRight.v[0], 0.0);
        }
    }]);
    return Vector4;
}();

var Vector3 = function () {
    function Vector3(x, y, z) {
        (0, _classCallCheck3.default)(this, Vector3);
        this.v = [0, 0, 0];

        this.x = x;
        this.y = y;
        this.z = z;
    }

    (0, _createClass3.default)(Vector3, [{
        key: "length",
        value: function length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
    }, {
        key: "normalize",
        value: function normalize() {
            var scale = 1.0 / this.length();
            this.x = this.x * scale;
            this.y = this.y * scale;
            this.z = this.z * scale;
            return this;
        }
    }, {
        key: "x",
        get: function get() {
            return this.v[0];
        },
        set: function set(value) {
            this.v[0] = value;
        }
    }, {
        key: "y",
        get: function get() {
            return this.v[1];
        },
        set: function set(value) {
            this.v[1] = value;
        }
    }, {
        key: "z",
        get: function get() {
            return this.v[2];
        },
        set: function set(value) {
            this.v[2] = value;
        }
    }], [{
        key: "dotProduct",
        value: function dotProduct(vectorLeft, vectorRight) {
            return vectorLeft.x * vectorRight.x + vectorLeft.y * vectorRight.y + vectorLeft.z * vectorRight.z;
        }
    }, {
        key: "crossProduct",
        value: function crossProduct(vectorLeft, vectorRight) {
            return new Vector3(vectorLeft.v[1] * vectorRight.v[2] - vectorLeft.v[2] * vectorRight.v[1], vectorLeft.v[2] * vectorRight.v[0] - vectorLeft.v[0] * vectorRight.v[2], vectorLeft.v[0] * vectorRight.v[1] - vectorLeft.v[1] * vectorRight.v[0]);
        }
    }]);
    return Vector3;
}();

var Vector2 = function () {
    function Vector2(x, y) {
        (0, _classCallCheck3.default)(this, Vector2);
        this.v = [0, 0];

        this.x = x;
        this.y = y;
    }

    (0, _createClass3.default)(Vector2, [{
        key: "length",
        value: function length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    }, {
        key: "x",
        get: function get() {
            return this.v[0];
        },
        set: function set(value) {
            this.v[0] = value;
        }
    }, {
        key: "y",
        get: function get() {
            return this.v[1];
        },
        set: function set(value) {
            this.v[1] = value;
        }
    }]);
    return Vector2;
}();

var WebGLModelManager = function () {
    var projectionMatrix = new Matrix4();
    var modelViewMatrix = new Matrix4();

    var modelViewStack = [];

    var modelViewProjectionMatrix = function modelViewProjectionMatrix() {
        return Matrix4.multiply(WebGLModelManager.projectionMatrix, modelViewMatrix);
    };

    var normalMatrix = function normalMatrix() {
        return modelViewMatrix.matrix4GetMatrix3().getInverse().transpose();
    };

    var push = function push() {
        modelViewStack.push(new Matrix4());
    };

    var pop = function pop() {
        modelViewStack.pop();
    };

    var multiplyMatrix4 = function multiplyMatrix4(matrix) {
        var m = modelViewStack[modelViewStack.length - 1];
        modelViewStack[modelViewStack.length - 1] = Matrix4.multiply(m, matrix);
    };

    var updateModelViewMatrix = function updateModelViewMatrix() {
        modelViewMatrix = modelViewStack[modelViewStack.length - 1].copy();
    };

    return {
        projectionMatrix: projectionMatrix,
        modelViewProjectionMatrix: modelViewProjectionMatrix,
        normalMatrix: normalMatrix,
        push: push,
        pop: pop,
        multiplyMatrix4: multiplyMatrix4,
        updateModelViewMatrix: updateModelViewMatrix
    };
}();

exports.Matrix4 = Matrix4;
exports.Matrix3 = Matrix3;
exports.Vector4 = Vector4;
exports.Vector3 = Vector3;
exports.Vector2 = Vector2;
exports.WebGLModelManager = WebGLModelManager;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(19);
var TAG = __webpack_require__(4)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(19);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(39);
var $export = __webpack_require__(13);
var redefine = __webpack_require__(96);
var hide = __webpack_require__(14);
var has = __webpack_require__(21);
var Iterators = __webpack_require__(16);
var $iterCreate = __webpack_require__(84);
var setToStringTag = __webpack_require__(28);
var getPrototypeOf = __webpack_require__(92);
var ITERATOR = __webpack_require__(4)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(93);
var enumBugKeys = __webpack_require__(35);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var isObject = __webpack_require__(15);
var newPromiseCapability = __webpack_require__(27);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(8);
var aFunction = __webpack_require__(18);
var SPECIES = __webpack_require__(4)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(20);
var invoke = __webpack_require__(81);
var html = __webpack_require__(36);
var cel = __webpack_require__(25);
var global = __webpack_require__(3);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(19)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(30);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(24);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.store = exports.router = exports.app = undefined;

var _extends2 = __webpack_require__(72);

var _extends3 = _interopRequireDefault(_extends2);

var _vue = __webpack_require__(10);

var _vue2 = _interopRequireDefault(_vue);

var _app = __webpack_require__(123);

var _app2 = _interopRequireDefault(_app);

var _router = __webpack_require__(67);

var _router2 = _interopRequireDefault(_router);

var _vueLazyload = __webpack_require__(162);

var _vueLazyload2 = _interopRequireDefault(_vueLazyload);

var _store = __webpack_require__(69);

var _store2 = _interopRequireDefault(_store);

var _vuexRouterSync = __webpack_require__(165);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueLazyload2.default, {
    loading: '/assets/images/loading.jpg'
});

_router2.default.beforeEach(function (to, from, next) {
    return next();
});

_router2.default.afterEach(function (route) {
    if (typeof window != "undefined") {
        document.body.className = "router-after";
    }
});

(0, _vuexRouterSync.sync)(_store2.default, _router2.default);

var app = (0, _extends3.default)({
    router: _router2.default,
    store: _store2.default
}, _app2.default);
exports.app = app;
exports.router = _router2.default;
exports.store = _store2.default;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(75), __esModule: true };

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  components: {}
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
    return {};
  },
  methods: {}
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adjust = __webpack_require__(6);

var _adjust2 = _interopRequireDefault(_adjust);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: ["index"],
  data: function data() {
    return {
      navs: []
    };
  },
  created: function created() {
    this.navs = [{
      title: "随笔",
      url: "/"
    }, {
      title: "摄影集",
      url: "/photos"
    }, {
      title: "信手涂鸦",
      url: "/knbrush"
    }, {
      title: "手记",
      url: "/note"
    }];
  },
  methods: {}
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _navBar = __webpack_require__(9);

var _navBar2 = _interopRequireDefault(_navBar);

var _foot = __webpack_require__(5);

var _foot2 = _interopRequireDefault(_foot);

var _weixin = __webpack_require__(11);

var _weixin2 = _interopRequireDefault(_weixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: {
        navBar: _navBar2.default,
        foot: _foot2.default
    },
    data: function data() {
        return {
            htmlContent: this.$store.state.article.content,
            title: this.$store.state.article.title,
            desc: this.$store.state.article.desc
        };
    },
    created: function created() {},
    preFetch: function preFetch(store) {
        var id = store.state.route.params.id;
        return store.dispatch("getArticle", { id: id }).then(function () {
            var header = {
                title: store.state.article.title,
                desc: store.state.article.desc
            };
            store.dispatch("header", header);
        });
    },
    methods: {}
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _navBar = __webpack_require__(9);

var _navBar2 = _interopRequireDefault(_navBar);

var _foot = __webpack_require__(5);

var _foot2 = _interopRequireDefault(_foot);

var _adjust = __webpack_require__(6);

var _adjust2 = _interopRequireDefault(_adjust);

var _weixin = __webpack_require__(11);

var _weixin2 = _interopRequireDefault(_weixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: {
        navBar: _navBar2.default,
        foot: _foot2.default
    },
    data: function data() {
        return {
            items: this.$store.state.blogs
        };
    },
    preFetch: function preFetch(store) {
        var id = store.state.route.params.id;
        return store.dispatch("getBlogs").then(function () {
            var header = {
                title: "随笔"
            };
            store.dispatch("header", header);
        });
    },
    computed: {
        linkTarget: function linkTarget() {
            return _adjust2.default.linkTarget();
        },
        index: function index() {
            if (_adjust2.default.isMobile()) {
                return 0;
            } else {
                return 0;
            }
        }
    },
    created: function created() {
        this.init();
        _weixin2.default.wxShare("王曙光的随笔", "这里有一些简单的记忆，平凡的知识，还有一点点小感悟", "http://dawntech.top/assets/images/favicon.jpg", this.$http);
    },
    methods: {
        init: function init() {}
    }
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _navBar = __webpack_require__(9);

var _navBar2 = _interopRequireDefault(_navBar);

var _foot = __webpack_require__(5);

var _foot2 = _interopRequireDefault(_foot);

var _adjust = __webpack_require__(6);

var _adjust2 = _interopRequireDefault(_adjust);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: {
        navBar: _navBar2.default,
        foot: _foot2.default
    },
    data: function data() {
        return {
            slideList: [],
            currentIndex: 0,
            items: [],
            timer: ""
        };
    },
    created: function created() {
        this.init();
    },
    computed: {
        linkTarget: function linkTarget() {
            return _adjust2.default.linkTarget();
        }
    },
    methods: {
        init: function init() {
            var _this = this;

            this.$nextTick(function () {
                _this.timer = setInterval(function () {
                    _this.autoPlay();
                }, 4000);
            });

            this.$http.get("home/cycle", {
                params: {
                    isMobile: _adjust2.default.isMobile()
                }
            }).then(function (resp) {
                if (resp && resp.data && resp.data.items) {
                    _this.slideList = resp.data.items;
                }
            });

            this.$http.get("home/categories", {
                params: {}
            }).then(function (resp) {
                if (resp && resp.data && resp.data.items) {
                    _this.items = resp.data.items;
                }
            });
        },
        go: function go() {
            var _this2 = this;

            this.timer = setInterval(function () {
                _this2.autoPlay();
            }, 4000);
        },
        stop: function stop() {
            clearInterval(this.timer);
            this.timer = null;
        },
        change: function change(index) {
            this.currentIndex = index;
        },
        autoPlay: function autoPlay() {
            this.currentIndex++;
            if (this.currentIndex > this.slideList.length - 1) {
                this.currentIndex = 0;
            }
        }
    }
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _navBar = __webpack_require__(9);

var _navBar2 = _interopRequireDefault(_navBar);

var _foot = __webpack_require__(5);

var _foot2 = _interopRequireDefault(_foot);

var _adjust = __webpack_require__(6);

var _adjust2 = _interopRequireDefault(_adjust);

var _weixin = __webpack_require__(11);

var _weixin2 = _interopRequireDefault(_weixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: {
        navBar: _navBar2.default,
        foot: _foot2.default
    },
    data: function data() {
        return {
            ens: this.$store.state.knbrush.ens,
            cns: this.$store.state.knbrush.cns,
            previews: this.$store.state.knbrush.previews,
            works: this.$store.state.knbrush.works
        };
    },
    computed: {
        mobile: function mobile() {
            return _adjust2.default.isMobile();
        },
        linkTarget: function linkTarget() {
            return _adjust2.default.linkTarget();
        },
        index: function index() {
            if (_adjust2.default.isMobile()) {
                return 2;
            } else {
                return 2;
            }
        }
    },
    created: function created() {
        this.init();
    },
    preFetch: function preFetch(store) {
        return store.dispatch("getKNBrush").then(function () {
            return store.dispatch("getBlogs").then(function () {
                var header = {
                    title: "信手涂鸦",
                    desc: "这是一款适合所有用户的非常高效的绘画工具，快速打开，易学易用。虽然采用了简约的设计手法但是软件仍然可以提供丰富的功能",
                    keyword: "素描,涂色,P图,手绘大师,Sketch,Draw,Note,Doodle,Masters"
                };
                store.dispatch("header", header);
            });
        });
    },
    methods: {
        init: function init() {}
    }
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _navBar = __webpack_require__(9);

var _navBar2 = _interopRequireDefault(_navBar);

var _foot = __webpack_require__(5);

var _foot2 = _interopRequireDefault(_foot);

var _adjust = __webpack_require__(6);

var _adjust2 = _interopRequireDefault(_adjust);

var _weixin = __webpack_require__(11);

var _weixin2 = _interopRequireDefault(_weixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: {
        navBar: _navBar2.default,
        foot: _foot2.default
    },
    data: function data() {
        return {
            cns: this.$store.state.note.cns,
            previews: this.$store.state.note.previews,
            works: this.$store.state.note.works
        };
    },
    computed: {
        mobile: function mobile() {
            return _adjust2.default.isMobile();
        },
        linkTarget: function linkTarget() {
            return _adjust2.default.linkTarget();
        },
        index: function index() {
            if (_adjust2.default.isMobile()) {
                return 3;
            } else {
                return 3;
            }
        }
    },
    preFetch: function preFetch(store) {
        return store.dispatch("getNote").then(function () {
            return store.dispatch("getBlogs").then(function () {
                var header = {
                    title: "手记",
                    desc: "简单.好玩.有趣.实用的画板，随时随地记录你的想法和灵感",
                    keyword: "素描,涂色,P图,手绘大师,Sketch,Draw,Note,Doodle,Masters"
                };
                store.dispatch("header", header);
            });
        });
    },
    created: function created() {
        this.init();
    },
    methods: {
        init: function init() {}
    }
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _foot = __webpack_require__(5);

var _foot2 = _interopRequireDefault(_foot);

var _vue = __webpack_require__(10);

var _vue2 = _interopRequireDefault(_vue);

var _WebGLModelManager = __webpack_require__(33);

var _WebGLAnimation = __webpack_require__(32);

var _sphere = __webpack_require__(65);

var _trackball = __webpack_require__(66);

var _adjust = __webpack_require__(6);

var _adjust2 = _interopRequireDefault(_adjust);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: {
        foot: _foot2.default
    },
    data: function data() {
        return {
            canvas: null,
            webgl: null,
            gl: null,
            fsh: "/assets/shaders/panoram.fsh",
            vsh: "/assets/shaders/panoram.vsh",
            pic: _adjust2.default.isMobile() ? "/assets/images/thetav_s.jpg" : "/assets/images/thetav.jpg",
            texture: null,
            verticesSizes: null,
            start: null,
            trackball: null,
            isdown: false,
            animation: null,
            stoptimes: 0,
            fullscreen: "全屏"
        };
    },
    preFetch: function preFetch(store) {
        var header = {
            title: "全景模型",
            desc: "全景模型"
        };
        store.dispatch("header", header);
    },
    computed: {
        mobile: function mobile() {
            return _adjust2.default.isMobile();
        }
    },
    mounted: function mounted() {
        if (false) {
            var self = this;
            this.canvas = this.$refs.webgl;
            this.trackball = new _trackball.Trackball();
            this.pic = "/assets/images/panorama/large/" + this.$route.params.url;

            System.import('../business/webgl/WebGL.js').then(function (modulel) {
                self.webgl = new modulel.WebGL();
                self.gl = self.webgl.getWebGLContext(self.canvas, false);
                if (!self.gl) {
                    console.log('Faild to get the rendering context for WebGL');
                    return;
                }
                self.panoram();
            });

            window.onresize = function () {
                self.resize();
                self.stepOnce();
            };

            if (this.isFullScreen()) {
                this.fullscreen = "退出全屏";
            } else {
                this.fullscreen = "全屏显示";
            }
        }
    },
    methods: {
        touchdown: function touchdown(ev) {
            this.startStep();
            this.isdown = true;
            var point = this.pointOf(ev, this.canvas);
            this.trackball.touchDown(point);
        },
        touchmove: function touchmove(ev) {
            event.preventDefault();
            if (this.isdown) {
                var point = this.pointOf(ev, this.canvas);
                this.trackball.touchMove(point);
            }
        },
        touchup: function touchup(ev) {
            this.isdown = false;
            var point = this.pointOf(ev, this.canvas);
            this.trackball.touchEnd(point);
            this.stopStep();
        },
        touchcancel: function touchcancel(ev) {
            if (this.isdown) {
                this.isdown = false;
                var point = this.pointOf(ev, this.canvas);
                this.trackball.touchEnd(point);
                this.stopStep();
            }
        },
        touchdouble: function touchdouble(ev) {
            this.startStep();
            this.trackball.doscale();
            console.log(this.trackball.degreeScale());
            this.updateProjectionMatrix();
            this.stopStep();
        },

        enterFullScreen: function enterFullScreen() {
            if (!this.isFullScreen()) {
                var de = document.documentElement;
                if (de.requestFullscreen) {
                    de.requestFullscreen();
                } else if (de.mozRequestFullScreen) {
                    de.mozRequestFullScreen();
                } else if (de.webkitRequestFullScreen) {
                    de.webkitRequestFullScreen();
                }
                this.fullscreen = "退出全屏";
            } else {
                var de = document;
                if (de.exitFullscreen) {
                    de.exitFullscreen();
                } else if (de.mozCancelFullScreen) {
                    de.mozCancelFullScreen();
                } else if (de.webkitCancelFullScreen) {
                    de.webkitCancelFullScreen();
                }
                this.fullscreen = "全屏显示";
            }
        },
        isFullScreen: function isFullScreen() {
            if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                return false;
            } else {
                return true;
            }
        },
        panoram: function panoram() {
            var webgl = this.webgl;
            var gl = this.gl;
            var self = this;
            this.loadShaderFile(function (vs, fs) {
                if (webgl.initShaders(gl, vs, fs)) {
                    self.clearCanvas();

                    self.verticesSizes = _sphere.sphere.create(50, 100);

                    webgl.loadImageTexture(gl, self.pic, function (texture) {
                        self.texture = texture;
                        self.resize();
                        self.animation = window.requestAnimationFrame(self.step);
                        self.stepOnce();
                    });
                };
            });
        },
        pointOf: function pointOf(ev, canvas) {
            var x = ev.offsetX == undefined ? ev.layerX : ev.offsetX;
            var y = ev.offsetY == undefined ? ev.layerY : ev.offsetY;
            return new _WebGLModelManager.Vector2(Math.max(0, Math.min(canvas.clientWidth, x)), Math.max(0, Math.min(canvas.clientHeight, y)));
        },
        resize: function resize() {
            this.webgl.resize(this.gl);
            this.trackball.layoutSize(new _WebGLModelManager.Vector2(this.gl.canvas.clientWidth, this.gl.canvas.clientHeight));
        },
        step: function step(timestamp) {
            this.animation = window.requestAnimationFrame(this.step);
            if (this.timestamp > 0) {
                this.timestamp--;
            }
            if (this.timestamp === 0) {
                return;
            }
            var duration = (timestamp - this.start) / 1000;
            this.start = timestamp;
            _WebGLAnimation.WebGLAnimation.animationTimerStep(duration);
            this.updateProjectionMatrix();
            this.updateModelMatrix();
            this.draw();
        },
        stepOnce: function stepOnce() {
            this.timestamp = 5;
        },
        startStep: function startStep() {
            this.timestamp = -1;
        },
        stopStep: function stopStep() {
            this.timestamp = 600;
        },
        updateProjectionMatrix: function updateProjectionMatrix() {
            var canvas = this.$refs.webgl;
            var width = canvas.clientWidth;
            var height = canvas.clientHeight;
            var ratio = width / height;
            _WebGLModelManager.WebGLModelManager.projectionMatrix = _WebGLModelManager.Matrix4.makePerspective(50.0 * (Math.PI / 180), ratio, 1.0, 1000);
            this.trackball.modelViewProjectionMatrix = _WebGLModelManager.WebGLModelManager.modelViewProjectionMatrix();
        },
        loadShaderFile: function loadShaderFile(callback) {
            var gl = this.gl;
            var state = this.$store.state;
            this.$store.dispatch("getPanoram").then(function () {
                callback(state.panoram.vsh, state.panoram.fsh);
            });
        },
        clearCanvas: function clearCanvas() {
            var gl = this.gl;
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        },
        updateModelMatrix: function updateModelMatrix() {
            var scale = this.trackball.degreeScale();
            _WebGLModelManager.WebGLModelManager.push();
            _WebGLModelManager.WebGLModelManager.multiplyMatrix4(_WebGLModelManager.Matrix4.makeTranslation(0, 0, -1));
            _WebGLModelManager.WebGLModelManager.multiplyMatrix4(_WebGLModelManager.Matrix4.makeScale(scale, scale, scale));
            _WebGLModelManager.WebGLModelManager.multiplyMatrix4(this.trackball.rotationMatrix4());
            _WebGLModelManager.WebGLModelManager.updateModelViewMatrix();
            _WebGLModelManager.WebGLModelManager.pop();
            this.trackball.projectionMatrix = _WebGLModelManager.WebGLModelManager.projectionMatrix;
        },
        draw: function draw() {
            var gl = this.gl;
            var position = gl.getAttribLocation(gl.program, 'position');
            var texcoord = gl.getAttribLocation(gl.program, 'texcoord');
            var colorMap = gl.getUniformLocation(gl.program, 'colorMap');
            var modelViewProjectionMatrix = gl.getUniformLocation(gl.program, 'modelViewProjectionMatrix');
            var vertexBuffer = gl.createBuffer();
            if (!vertexBuffer) {
                return;
            };
            var FSIZE = this.verticesSizes.BYTES_PER_ELEMENT;
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.verticesSizes, gl.STATIC_DRAW);

            gl.vertexAttribPointer(position, 3, gl.FLOAT, false, FSIZE * 5, 0);
            gl.enableVertexAttribArray(position);
            gl.vertexAttribPointer(texcoord, 2, gl.FLOAT, false, FSIZE * 5, FSIZE * 3);
            gl.enableVertexAttribArray(texcoord);

            gl.activeTexture(gl.TEXTURE0);

            gl.bindTexture(gl.TEXTURE_2D, this.texture);

            gl.uniform1i(colorMap, 0);
            gl.uniformMatrix4fv(modelViewProjectionMatrix, false, new Float32Array(_WebGLModelManager.WebGLModelManager.modelViewProjectionMatrix().m));
            gl.disable(gl.BLEND);

            gl.drawArrays(gl.TRIANGLES, 0, this.verticesSizes.length / 5);
            gl.deleteBuffer(vertexBuffer);
        }
    }
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _adjust = __webpack_require__(6);

var _adjust2 = _interopRequireDefault(_adjust);

var _foot = __webpack_require__(5);

var _foot2 = _interopRequireDefault(_foot);

var _weixin = __webpack_require__(11);

var _weixin2 = _interopRequireDefault(_weixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: {
        foot: _foot2.default
    },
    data: function data() {
        return {
            photos: this.$store.state.photo.photos,
            title: this.$store.state.photo.title
        };
    },
    created: function created() {
        this.init();
    },
    computed: {
        linkTarget: function linkTarget() {
            return _adjust2.default.linkTarget();
        }
    },
    preFetch: function preFetch(store) {
        var category = store.state.route.params.category;
        return store.dispatch("getPhoto", { category: category }).then(function () {
            store.dispatch("header", { title: store.state.photo.title });
        });
    },
    methods: {
        init: function init() {},
        notnull: function notnull(s) {
            return typeof s != "undefined" && s != null && s.length > 0;
        }
    }
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _navBar = __webpack_require__(9);

var _navBar2 = _interopRequireDefault(_navBar);

var _foot = __webpack_require__(5);

var _foot2 = _interopRequireDefault(_foot);

var _adjust = __webpack_require__(6);

var _adjust2 = _interopRequireDefault(_adjust);

var _weixin = __webpack_require__(11);

var _weixin2 = _interopRequireDefault(_weixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: {
        navBar: _navBar2.default,
        foot: _foot2.default
    },
    data: function data() {
        return {
            photos: this.$store.state.photos
        };
    },
    created: function created() {
        this.init();
    },
    computed: {
        linkTarget: function linkTarget() {
            return _adjust2.default.linkTarget();
        },
        index: function index() {
            if (_adjust2.default.isMobile()) {
                return 1;
            } else {
                return 1;
            }
        }
    },
    preFetch: function preFetch(store) {
        var _this = this;

        var category = store.state.route.params.category;
        return store.dispatch("getPhotos").then(function () {
            var keywords = [];
            store.state.photos.forEach(function (photo) {
                keywords.push(photo.title);
            }, _this);
            store.dispatch("header", {
                title: "摄影集",
                keyword: keywords.join(',')
            });
        });
    },
    methods: {
        init: function init() {}
    }
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _navBar = __webpack_require__(9);

var _navBar2 = _interopRequireDefault(_navBar);

var _foot = __webpack_require__(5);

var _foot2 = _interopRequireDefault(_foot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: {
        navBar: _navBar2.default,
        foot: _foot2.default
    },
    data: function data() {
        return {
            articles: [],
            banner: {}
        };
    },
    computed: {
        isMobile: function isMobile() {
            var userAgent =  false ? navigator.userAgent : process.UA;
            return !!userAgent.match(/(iPhone|iPod|Android|ios)/i);
        },
        linkTarget: function linkTarget() {
            return this.isMobile ? '' : '_blank';
        }
    },
    created: function created() {
        this.init();
    },
    methods: {
        init: function init() {}
    }
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _marked = __webpack_require__(161);

var _marked2 = _interopRequireDefault(_marked);

var _highlight2 = __webpack_require__(160);

var _highlight3 = _interopRequireDefault(_highlight2);

var _vue = __webpack_require__(10);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = new _marked2.default.Renderer();

_marked2.default.setOptions({
    renderer: render,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

_marked2.default.setOptions({
    highlight: function highlight(code) {
        return _highlight3.default.highlightAuto(code).value;
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

    return '<pre><code class="hljs">' + (escaped ? code : escape(code, true)) + '\n</code></pre>';
};

exports.default = {
    convertText: function convertText(md, result) {
        (0, _marked2.default)(md, function (err, content) {
            result(err, content);
        });
    },
    convertSrc: function convertSrc(src, result) {
        _vue2.default.http.get(src).then(function (response) {
            (0, _marked2.default)(response.data, function (err, content) {
                result(err, content);
            });
        }, function (response) {
            result(response.statusText, '');
        });
    }
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var sphere = exports.sphere = function () {
    var epsilon = Math.PI * 10 / 180;
    var mmax = Math.PI / 2 - epsilon;
    var mmaxvalue = Math.log(Math.tan(mmax) + 1.0 / Math.cos(mmax));
    var ts = (Math.PI / 2 - epsilon) / (Math.PI / 2);
    var createSphere = function createSphere(hslice, vslice) {
        var verticesSizes = new Float32Array(hslice * vslice * 3 * 2 * 5);
        var theta, fai;
        var hstep = Math.PI / hslice;
        var vstep = 2 * Math.PI / vslice;
        var index = 0;
        for (var i = 0; i < hslice; i++) {
            theta = hstep * i;
            for (var j = 0; j < vslice; j++) {
                fai = -Math.PI + vstep * j;

                var p1 = getPointTheta(theta, fai);
                var p2 = getPointTheta(theta + hstep, fai);
                var p3 = getPointTheta(theta, fai + vstep);
                var p4 = getPointTheta(theta + hstep, fai + vstep);

                var st1 = getSTTheta(theta, fai);
                var st2 = getSTTheta(theta + hstep, fai);
                var st3 = getSTTheta(theta, fai + vstep);
                var st4 = getSTTheta(theta + hstep, fai + vstep);

                index = getVertice(verticesSizes, p1, st1, index);
                index = getVertice(verticesSizes, p2, st2, index);
                index = getVertice(verticesSizes, p3, st3, index);

                index = getVertice(verticesSizes, p3, st3, index);
                index = getVertice(verticesSizes, p2, st2, index);
                index = getVertice(verticesSizes, p4, st4, index);
            }
        }
        return verticesSizes;
    };
    var getVertice = function getVertice(verticesSizes, p, st, index) {
        verticesSizes.set([p.x, p.y, p.z, st.s, st.t], index);
        return index + 5;
    };
    var getPointTheta = function getPointTheta(theta, fai) {
        var x = Math.sin(theta) * Math.sin(fai);
        var y = Math.cos(theta);
        var z = Math.sin(theta) * Math.cos(fai);
        return { x: x, y: y, z: z };
    };
    var getSTTheta = function getSTTheta(theta, fai) {
        var s = 0.5 - fai / (2 * Math.PI);
        var t = 1 - theta / Math.PI;
        return { s: s, t: t };
    };
    return {
        create: createSphere
    };
}();

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Trackball = undefined;

var _classCallCheck2 = __webpack_require__(22);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(23);

var _createClass3 = _interopRequireDefault(_createClass2);

var _WebGLModelManager = __webpack_require__(33);

var _WebGLAnimation = __webpack_require__(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Trackball = exports.Trackball = function () {
    function Trackball() {
        (0, _classCallCheck3.default)(this, Trackball);
        this.epsilon = 1.0e-5;
        this.params = {
            startX: new _WebGLModelManager.Vector3(0, 0, 0),
            endX: new _WebGLModelManager.Vector3(0, 0, 0),
            startY: new _WebGLModelManager.Vector3(0, 0, 0),
            endY: new _WebGLModelManager.Vector3(0, 0, 0),
            adjustWidth: 0,
            adjustHeight: 0,
            startPoint: new _WebGLModelManager.Vector2(0, 0),
            endPoint: new _WebGLModelManager.Vector2(0, 0),
            timestamp: 0,
            move: new _WebGLModelManager.Vector2(0, 0),
            timeinterval: 0,
            theta: 0,
            fai: 0,
            startTheta: 0,
            startFai: 0,
            scale: 0,
            startScale: 0,
            lastScale: 0 };
        this.projectionMatrix = new _WebGLModelManager.Matrix4();
    }

    (0, _createClass3.default)(Trackball, [{
        key: 'layoutSize',
        value: function layoutSize(size) {
            this.params.startX = new _WebGLModelManager.Vector3(0, 0, 0);
            this.params.endX = new _WebGLModelManager.Vector3(0, 0, 0);
            this.params.startY = new _WebGLModelManager.Vector3(0, 0, 0);
            this.params.endY = new _WebGLModelManager.Vector3(0, 0, 0);
            this.params.adjustWidth = size.x;
            this.params.adjustHeight = size.y;
            this.params.theta = new _WebGLAnimation.AnimationValue(0);
            this.params.fai = new _WebGLAnimation.AnimationValue(0);
            this.params.startTheta = 0.0;
            this.params.startFai = 0.0;
            this.params.lastScale = 1.0;
            this.params.startScale = 1.0;
            this.params.scale = new _WebGLAnimation.AnimationValue(1.5);
        }
    }, {
        key: 'mapToSphere',
        value: function mapToSphere(point) {
            var tempPoint = new _WebGLModelManager.Vector2(point.x, point.y);
            var r = 1.0;

            tempPoint.x = tempPoint.x - this.params.adjustWidth / 2;
            tempPoint.y = this.params.adjustHeight / 2 - tempPoint.y;

            var max = Math.max(this.params.adjustHeight, this.params.adjustWidth);


            tempPoint.x = tempPoint.x / this.params.adjustHeight;
            tempPoint.y = tempPoint.y / this.params.adjustHeight;

            var length = tempPoint.x * tempPoint.x + tempPoint.y * tempPoint.y;

            var vector = null;
            if (length > r * r / 2) {
                vector = new _WebGLModelManager.Vector3(tempPoint.x, tempPoint.y, r * r / 2 / Math.sqrt(length));
            } else {
                vector = new _WebGLModelManager.Vector3(tempPoint.x, tempPoint.y, Math.sqrt(1.0 - length));
            }

            return vector.normalize();
        }
    }, {
        key: 'touchDown',
        value: function touchDown(point) {
            this.params.startPoint = new _WebGLModelManager.Vector2(point.x, point.y);
            this.params.startX = this.mapToSphere(this.params.startPoint);
            this.params.startY = this.mapToSphere(this.params.startPoint);
            this.params.startTheta = this.params.theta.value;
            this.params.startFai = this.params.fai.value;
            this.params.move = new _WebGLModelManager.Vector2(0, 0);
            this.params.timeinterval = 1;
            this.params.endPoint = new _WebGLModelManager.Vector2(point.x, point.y);
            this.params.timestamp = new Date().getTime();
        }
    }, {
        key: 'touchMove',
        value: function touchMove(point) {
            this.params.timeinterval = new Date().getTime() - this.params.timestamp;
            this.params.timestamp = new Date().getTime();
            this.params.move = new _WebGLModelManager.Vector2(point.x - this.params.endPoint.x, point.y - this.params.endPoint.y);
            this.params.endPoint = new _WebGLModelManager.Vector2(point.x, point.y);
            this.params.endX = this.mapToSphere(new _WebGLModelManager.Vector2(this.params.endPoint.x, this.params.startPoint.y));
            this.params.endY = this.mapToSphere(new _WebGLModelManager.Vector2(this.params.startPoint.x, this.params.endPoint.y));

            var theta, fai;

            if (Math.abs(this.params.endY.y - this.params.startY.y) < this.epsilon) {
                fai = 0;
            } else {
                fai = 2 * Math.acos(_WebGLModelManager.Vector3.dotProduct(this.params.startY, this.params.endY) / this.params.startY.length() / this.params.endY.length());
                if (this.params.endY.y - this.params.startY.y < 0) {
                    fai = -fai;
                }
            }
            var tempFai = this.params.startFai + fai;

            if (tempFai > Math.PI / 2) {
                tempFai = Math.PI / 2;
            } else if (tempFai < -Math.PI / 2) {
                tempFai = -Math.PI / 2;
            }

            _WebGLAnimation.WebGLAnimation.animateEaseOutWithDuration(0.1, this.params.fai, tempFai);

            if (Math.abs(this.params.endX.x - this.params.startX.x) < this.epsilon) {
                theta = 0;
            } else {
                theta = 2 * Math.acos(_WebGLModelManager.Vector3.dotProduct(this.params.startX, this.params.endX) / this.params.startX.length() / this.params.endX.length());
                if (this.params.endX.x - this.params.startX.x > 0) {
                    theta = -theta;
                }
            }
            var tempTheta = this.params.startTheta + theta;
            _WebGLAnimation.WebGLAnimation.animateEaseOutWithDuration(0.1, this.params.theta, tempTheta);
        }
    }, {
        key: 'touchEnd',
        value: function touchEnd(point, velocity) {
            if (velocity == null) {
                velocity = new _WebGLModelManager.Vector2(800 * this.params.move.x / this.params.timeinterval, 800 * this.params.move.y / this.params.timeinterval);
            }
            if (velocity.x > 10000) {
                velocity.x = 10000;
            } else if (velocity.x < -10000) {
                velocity.x = -10000;
            }

            if (velocity.y > 10000) {
                velocity.y = 10000;
            } else if (velocity.y < -10000) {
                velocity.y = -10000;
            }

            var magnitudeX = Math.abs(velocity.x);
            var magnitudeY = Math.abs(velocity.y);

            var slideMultX = magnitudeX / 200;
            var slideMultY = magnitudeY / 200;
            var slideFactorX = 0.1 * slideMultX;
            var slideFactorY = 0.1 * slideMultY;

            var tempFai = this.params.fai.value - velocity.y * slideFactorY * (Math.PI / 2) / this.params.adjustHeight / this.params.scale.value;
            if (tempFai > Math.PI / 2) {
                tempFai = Math.PI / 2;
            } else if (tempFai < -Math.PI / 2) {
                tempFai = -Math.PI / 2;
            }

            var tempTheta = this.params.theta.value - velocity.x * slideFactorX * (Math.PI / 2) / this.params.adjustWidth / this.params.scale.value;

            if (velocity.x == 0) {
                slideFactorX = 0.0;
            }
            if (velocity.y == 0) {
                slideFactorY = 0.0;
            } else {
                slideFactorY = (this.params.fai.value - tempFai) * this.params.adjustHeight * this.params.scale.value / velocity.y / (Math.PI / 2);
            }
            _WebGLAnimation.WebGLAnimation.animateEaseOutWithDuration(slideFactorY * 2, this.params.fai, tempFai);
            _WebGLAnimation.WebGLAnimation.animateEaseOutWithDuration(slideFactorX * 2, this.params.theta, tempTheta);
        }
    }, {
        key: 'pinchDown',
        value: function pinchDown(scale) {
            this.params.startScale = this.params.scale.value;
            this.params.lastScale = scale;
        }
    }, {
        key: 'pinchMove',
        value: function pinchMove(scale) {
            var tempScale;
            if (scale < 1.0) {
                tempScale = this.params.startScale - (this.params.lastScale - scale);
            } else {
                tempScale = this.params.startScale + scale * 0.1;
            }

            if (tempScale > 2) {
                tempScale = 2;
            } else if (tempScale < 1.0) {
                tempScale = 1.0;
            }
            this.params.scale.value = tempScale;
        }
    }, {
        key: 'doscale',
        value: function doscale() {
            if (this.params.scale.value > 1.5) {
                _WebGLAnimation.WebGLAnimation.animateEaseOutWithDuration(0.3, this.params.scale, 1.5);
            } else {
                _WebGLAnimation.WebGLAnimation.animateEaseOutWithDuration(0.3, this.params.scale, 3.0);
            }
        }
    }, {
        key: 'rotationMatrix4',
        value: function rotationMatrix4() {
            var axis = new _WebGLModelManager.Vector3(0, Math.cos(this.params.fai.value), Math.sin(this.params.fai.value));

            var rotationAxis = this.rotateArbitraryAxis(axis, this.params.theta.value);

            var rotaionX = _WebGLModelManager.Matrix4.makeRotation(this.params.fai.value, 1, 0, 0);

            return _WebGLModelManager.Matrix4.multiply(rotationAxis, rotaionX);
        }
    }, {
        key: 'degreeScale',
        value: function degreeScale() {
            return this.params.scale.value;
        }
    }, {
        key: 'rotateArbitraryAxis',
        value: function rotateArbitraryAxis(axis, theta) {
            axis = axis.normalize();
            var u = axis.x;
            var v = axis.y;
            var w = axis.z;

            var rotation = new _WebGLModelManager.Matrix4();
            rotation.m[0] = Math.cos(theta) + u * u * (1 - Math.cos(theta));
            rotation.m[1] = u * v * (1 - Math.cos(theta)) + w * Math.sin(theta);
            rotation.m[2] = u * w * (1 - Math.cos(theta)) - v * Math.sin(theta);
            rotation.m[3] = 0;

            rotation.m[4] = u * v * (1 - Math.cos(theta)) - w * Math.sin(theta);
            rotation.m[5] = Math.cos(theta) + v * v * (1 - Math.cos(theta));
            rotation.m[6] = w * v * (1 - Math.cos(theta)) + u * Math.sin(theta);
            rotation.m[7] = 0;

            rotation.m[8] = u * w * (1 - Math.cos(theta)) + v * Math.sin(theta);
            rotation.m[9] = v * w * (1 - Math.cos(theta)) - u * Math.sin(theta);
            rotation.m[10] = Math.cos(theta) + w * w * (1 - Math.cos(theta));
            rotation.m[11] = 0;

            rotation.m[12] = 0;
            rotation.m[13] = 0;
            rotation.m[14] = 0;
            rotation.m[15] = 1;
            return rotation;
        }
    }]);
    return Trackball;
}();

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(10);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(163);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);
var HOME =  false ? function () {
    return System.import('./views/home.vue');
} : __webpack_require__(126);
var KNBRUSH =  false ? function () {
    return System.import('./views/knbrush.vue');
} : __webpack_require__(127);
var NOTE =  false ? function () {
    return System.import('./views/note.vue');
} : __webpack_require__(128);
var BLOG =  false ? function () {
    return System.import('./views/blog.vue');
} : __webpack_require__(125);
var PHOTOS =  false ? function () {
    return System.import('./views/photos.vue');
} : __webpack_require__(131);
var RESUME =  false ? function () {
    return System.import('./views/resume.vue');
} : __webpack_require__(132);
var ARTICLE =  false ? function () {
    return System.import('./views/article.vue');
} : __webpack_require__(124);
var PHOTO =  false ? function () {
    return System.import('./views/photo.vue');
} : __webpack_require__(130);
var PANORAM =  false ? function () {
    return System.import('./views/panoram.vue');
} : __webpack_require__(129);

var isMobile = function isMobile() {
    var userAgent =  false ? navigator.userAgent : process.UA;
    return !!userAgent.match(/(iPhone|iPod|Android|ios)/i);
};

var router;
router = new _vueRouter2.default({
    mode: 'history',
    scrollBehavior: function scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            };
        }
    },

    routes: [{ path: '/', name: 'blog', component: BLOG }, { path: '/knbrush', name: 'knbrush', component: KNBRUSH }, { path: '/note', name: 'note', component: NOTE }, { path: '/panoram', name: 'panoram', component: PANORAM }, { path: '/photos', name: 'photos', component: PHOTOS }, { path: '/resume', name: 'resume', component: RESUME }, { path: '/article/:id', name: 'article', component: ARTICLE }, { path: '/photo/:category', name: 'photo', component: PHOTO }]
});

exports.default = router;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(51);

var _promise2 = _interopRequireDefault(_promise);

var _app2 = __webpack_require__(50);

var _vue = __webpack_require__(10);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDev = process.env.NODE_ENV !== 'production';

var _app = new _vue2.default(_app2.app);

exports.default = function (context) {
    var s = isDev && Date.now();

    _app2.router.push(context.url);

    var matchedComponents = _app2.router.getMatchedComponents();

    if (!matchedComponents.length) {
        return _promise2.default.reject({ code: '404' });
    }


    return _promise2.default.all(matchedComponents.map(function (component) {
        if (component.preFetch) {
            return component.preFetch(_app2.store);
        }
    })).then(function () {
        isDev && console.log('data pre-fetch: ' + (Date.now() - s) + 'ms');
        context.initialState = _app2.store.state;
        return _app;
    });
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(10);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(164);

var _vuex2 = _interopRequireDefault(_vuex);

var _axios = __webpack_require__(158);

var _axios2 = _interopRequireDefault(_axios);

var _md2html = __webpack_require__(64);

var _md2html2 = _interopRequireDefault(_md2html);

var _es6Promise = __webpack_require__(159);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axiosInstance = _axios2.default.create({
    baseURL:  false ? '/api/' : process.env.APP_API,
    timeout:  false ? 10000 : 3000
});

var axiosInstance2 = _axios2.default.create({
    timeout:  false ? 10000 : 3000
});

_vue2.default.prototype.$http = _vue2.default.http = axiosInstance;

_vue2.default.use(_vuex2.default);
var store = new _vuex2.default.Store({
    state: {
        htmlHead: {
            title: "Dawn's Story",
            keyword: "dawntech,dawn,曙光,黎明,王曙光",
            desc: "向晚收云，黎明见日——王曙光的个人网站"
        },
        blogs: [],
        article: {
            title: "",
            desc: "",
            content: ""
        },
        knbrush: {
            ens: [],
            cns: [],
            previews: [],
            works: []
        },
        note: {
            cns: [],
            previews: [],
            works: []
        },
        photo: {
            title: "",
            photos: []
        },
        photos: [],
        panoram: {
            fsh: "",
            vsh: ""
        }
    },
    actions: {
        header: function header(context, query) {
            context.commit("initHeader", query);
        },
        getBlogs: function getBlogs(context, query) {
            return _vue2.default.http.get("blogs").then(function (resp) {
                if (resp && resp.data && resp.data.items) {
                    context.commit("initBlogs", resp.data.items);
                }
            });
        },
        getArticle: function getArticle(context, query) {
            return _vue2.default.http.get("blog/" + query.id).then(function (resp) {
                if (resp && resp.data && resp.data.id) {
                    var data = resp.data;
                    return new _es6Promise.Promise(function (resolve, reject) {
                        _md2html2.default.convertSrc(data.target.replace("/api/", ""), function (err, result) {
                            if (err) {
                                reject(err);
                            } else {
                                var article = { title: data.title, desc: data.desc, content: result };
                                resolve(article);
                            }
                        });
                    });
                }
            }).then(function (article) {
                context.commit("initArticle", article);
                return "";
            });
        },
        getKNBrush: function getKNBrush(context, query) {
            return _vue2.default.http.get("knbrush").then(function (resp) {
                if (resp && resp.data && resp.data.abstract) {
                    var knbrush = {
                        ens: resp.data.abstract.ens,
                        cns: resp.data.abstract.cns,
                        previews: resp.data.abstract.previews,
                        works: resp.data.abstract.works
                    };
                    context.commit("initKNBrush", knbrush);
                }
            });
        },
        getNote: function getNote(context, query) {
            return _vue2.default.http.get("note").then(function (resp) {
                if (resp && resp.data && resp.data.abstract) {
                    var note = {
                        cns: resp.data.abstract.cns,
                        previews: resp.data.abstract.previews,
                        works: resp.data.abstract.works
                    };
                    context.commit("initNote", note);
                }
            });
        },
        getPhoto: function getPhoto(context, query) {
            return _vue2.default.http.get("photo/" + query.category).then(function (resp) {
                if (resp && resp.data && resp.data.items) {
                    context.commit("initPhoto", { title: resp.data.title, photos: resp.data.items });
                }
            });
        },
        getPhotos: function getPhotos(context, query) {
            return _vue2.default.http.get("photos").then(function (resp) {
                if (resp && resp.data && resp.data.items) {
                    var photos = resp.data.items;
                    context.commit("initPhotos", photos);
                }
            });
        },
        getPanoram: function getPanoram(context, query) {
            return new _es6Promise.Promise(function (resolve, reject) {
                axiosInstance2.get('/assets/shaders/panoram.fsh').then(function (fsh) {
                    if (fsh && fsh.data) {
                        axiosInstance2.get('/assets/shaders/panoram.vsh').then(function (vsh) {
                            if (vsh && vsh.data) {
                                resolve({ fsh: fsh.data, vsh: vsh.data });
                            }
                        });
                    }
                });
            }).then(function (result) {
                context.commit("initPanoram", result);
                return "";
            });
        }
    },
    mutations: {
        initBlogs: function initBlogs(state, blogs) {
            state.blogs = blogs;
        },
        initArticle: function initArticle(state, article) {
            state.article.title = article.title;
            state.article.desc = article.desc;
            state.article.content = article.content;
        },
        initKNBrush: function initKNBrush(state, knbrush) {
            state.knbrush.ens = knbrush.ens;
            state.knbrush.cns = knbrush.cns;
            state.knbrush.previews = knbrush.previews;
            state.knbrush.works = knbrush.works;
        },
        initNote: function initNote(state, note) {
            state.note.cns = note.cns;
            state.note.previews = note.previews;
            state.note.works = note.works;
        },
        initPhoto: function initPhoto(state, photo) {
            state.photo.title = photo.title;
            state.photo.photos = photo.photos;
        },
        initPhotos: function initPhotos(state, photos) {
            state.photos = photos;
        },
        initHeader: function initHeader(state, query) {
            if (query.title) {
                state.htmlHead.title = query.title;
            }
            if (query.desc) {
                state.htmlHead.desc = query.desc;
            }
            if (query.keyword) {
                state.htmlHead.keyword = query.keyword;
            }
        },
        initPanoram: function initPanoram(state, query) {
            state.panoram.fsh = query.fsh;
            state.panoram.vsh = query.vsh;
        }
    }
});

exports.default = store;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(70);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(103);
module.exports = __webpack_require__(7).Object.assign;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(104);
var $Object = __webpack_require__(7).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(105);
__webpack_require__(107);
__webpack_require__(110);
__webpack_require__(106);
__webpack_require__(108);
__webpack_require__(109);
module.exports = __webpack_require__(7).Promise;


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(31);
var toLength = __webpack_require__(47);
var toAbsoluteIndex = __webpack_require__(99);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(20);
var call = __webpack_require__(83);
var isArrayIter = __webpack_require__(82);
var anObject = __webpack_require__(8);
var toLength = __webpack_require__(47);
var getIterFn = __webpack_require__(101);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(12) && !__webpack_require__(26)(function () {
  return Object.defineProperty(__webpack_require__(25)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 81 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(16);
var ITERATOR = __webpack_require__(4)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(8);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(89);
var descriptor = __webpack_require__(43);
var setToStringTag = __webpack_require__(28);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(14)(IteratorPrototype, __webpack_require__(4)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(4)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var macrotask = __webpack_require__(46).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(19)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(40);
var gOPS = __webpack_require__(91);
var pIE = __webpack_require__(94);
var toObject = __webpack_require__(48);
var IObject = __webpack_require__(37);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(26)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(8);
var dPs = __webpack_require__(90);
var enumBugKeys = __webpack_require__(35);
var IE_PROTO = __webpack_require__(29)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(25)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(36).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(17);
var anObject = __webpack_require__(8);
var getKeys = __webpack_require__(40);

module.exports = __webpack_require__(12) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 91 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(21);
var toObject = __webpack_require__(48);
var IE_PROTO = __webpack_require__(29)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(21);
var toIObject = __webpack_require__(31);
var arrayIndexOf = __webpack_require__(78)(false);
var IE_PROTO = __webpack_require__(29)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 94 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(14);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var core = __webpack_require__(7);
var dP = __webpack_require__(17);
var DESCRIPTORS = __webpack_require__(12);
var SPECIES = __webpack_require__(4)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(30);
var defined = __webpack_require__(24);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(30);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(15);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(34);
var ITERATOR = __webpack_require__(4)('iterator');
var Iterators = __webpack_require__(16);
module.exports = __webpack_require__(7).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(76);
var step = __webpack_require__(86);
var Iterators = __webpack_require__(16);
var toIObject = __webpack_require__(31);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(38)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(13);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(88) });


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(13);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(12), 'Object', { defineProperty: __webpack_require__(17).f });


/***/ }),
/* 105 */
/***/ (function(module, exports) {



/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(39);
var global = __webpack_require__(3);
var ctx = __webpack_require__(20);
var classof = __webpack_require__(34);
var $export = __webpack_require__(13);
var isObject = __webpack_require__(15);
var aFunction = __webpack_require__(18);
var anInstance = __webpack_require__(77);
var forOf = __webpack_require__(79);
var speciesConstructor = __webpack_require__(45);
var task = __webpack_require__(46).set;
var microtask = __webpack_require__(87)();
var newPromiseCapabilityModule = __webpack_require__(27);
var perform = __webpack_require__(41);
var promiseResolve = __webpack_require__(42);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(4)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(95)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(28)($Promise, PROMISE);
__webpack_require__(97)(PROMISE);
Wrapper = __webpack_require__(7)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(85)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(98)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(38)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(13);
var core = __webpack_require__(7);
var global = __webpack_require__(3);
var speciesConstructor = __webpack_require__(45);
var promiseResolve = __webpack_require__(42);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(13);
var newPromiseCapability = __webpack_require__(27);
var perform = __webpack_require__(41);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(102);
var global = __webpack_require__(3);
var hide = __webpack_require__(14);
var Iterators = __webpack_require__(16);
var TO_STRING_TAG = __webpack_require__(4)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".text .name{padding:0 18px;height:40px;line-height:40px;padding-top:20px;font-size:20px;font-weight:700;display:block;color:#298cda}.text .name:hover{text-decoration:underline}.text .subname{padding:0 18px;height:20px;line-height:20px;font-size:14px;color:#298cda}.text .subname:hover{text-decoration:underline}.text .qrcode{position:absolute;top:20px;right:18px;width:140px;height:140px}.text .abstract-tips{padding:0 18px;height:20px;line-height:20px;font-size:16px;font-weight:700;display:block;margin-top:60px}.text .abstract-content{padding:0 18px}.text .abstract-content .abstract-item{display:block;font-size:14px;color:#666;min-height:24px;line-height:24px}.text .abstract-content-en{padding:0 18px;padding-top:20px}.text .abstract-content-en .abstract-item{display:block;font-size:14px;color:#999;min-height:24px;line-height:24px}.text .preview{padding:0 18px;margin-top:10px;overflow-x:auto;white-space:nowrap;overflow:hidden;overflow-x:scroll;text-align:justify;-webkit-overflow-scrolling:touch}.text .preview .item{width:240px;padding:5px 30px 0 0;display:inline-block}.text .preview .item .boarder{background-color:#fff;width:100%;display:block}.text .preview .item .boarder img{width:100%}.text .image-item{margin:20px 0;width:100%;display:inline-block;background-color:#fff;transition:all .5s ease;box-shadow:0 0 10px 2px #ccc}.text .image-item .image-cover{padding:20px;width:auto;display:block;background-color:#fff}.text .image-item .image-cover img{width:100%;height:100%;display:block}@media screen and (max-width:500px){.text .preview{padding:0!important;margin-top:10px}.text .preview .item{padding:5px 10px;width:50%}.text .preview .item .boarder{padding:0}.text .works{padding-bottom:12px}.text .works .image-item{width:auto;margin:0;display:block;box-shadow:none}.text .works .image-item .image-cover{padding:12px 12px 0}}", ""]);

// exports


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".photo .container .photo-header{margin-bottom:20px;text-align:center}.photo .container .photo-header .photo-category{font-size:30px;color:#333;font-weight:700;height:60px;line-height:60px;text-align:center;width:100%;display:block}.photo .container .photo-header span{display:block;font-size:14px}.photo .container .image-item{margin:20px 0;width:100%;display:inline-block;background-color:#fff;transition:all .5s ease;box-shadow:0 0 10px 2px #ccc}.photo .container .image-item .image-cover{padding:20px 20px 0;width:auto;display:block;background-color:#fff}.photo .container .image-item .image-cover img{width:100%;height:100%;display:block}.photo .container .image-item .image-cover .image-camera,.photo .container .image-item .image-cover .image-exif{display:block;text-align:left;font-size:14px;height:30px;line-height:30px;text-overflow:ellipsis;white-space:nowrap;color:#666}@media screen and (max-width:500px){.photo .container .image-item{width:auto;padding:0 12px;margin:0;box-shadow:none}.photo .container .image-item .image-cover{padding:0}}", ""]);

// exports


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "html,html body{height:100%}html body{margin:0;padding:0;font-size:14px;color:#333;background-color:#fff;font-family:PingFang SC,Microsoft YaHei,simhei,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;text-size-adjust:100%;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}html a,html a:link{-webkit-appearance:none;text-decoration:none;color:#333;cursor:pointer}.router-before .router-after{background-repeat:no-repeat;background-position:50%;background-size:70px;min-height:400px;background-color:#fff;height:100%}.page{height:100%;padding-top:60px}.page .container{width:70%!important;min-width:1024px;position:relative;margin:0 auto}@media screen and (max-width:500px){.page .container{width:100%;min-width:100%}}@media screen and (min-width:800px){.page .container{width:680px}}@media screen and (min-width:1024px){.page .container{width:1020px}}@media screen and (min-width:1360px){.page .container{width:1360px}}", ""]);

// exports


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "body{overflow:hidden}.page{padding:0;height:100%}.page .panoram{width:100%;height:100%}.page .panoram .canvas{width:100%;height:100%;margin:0}.page .panoram .enter{cursor:pointer;background-color:rgba(0,0,0,.6);display:block;height:40px;font-size:20px;line-height:40px;text-align:center;color:#fff;position:absolute;width:100%}", ""]);

// exports


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".nav-bar{height:60px;line-height:60px;background-color:#24292e;color:#fff;position:absolute;width:100%;z-index:100;top:0}.nav-bar .nav-left{float:left;margin-left:20px}.nav-bar .nav-item{display:block;float:left;padding:0 20px;text-align:center;position:relative;font-size:16px;font-weight:700;color:hsla(0,0%,100%,.75)!important}.nav-bar .nav-item:after{content:\"\";position:absolute;width:100%;height:2px;bottom:0;left:0;background-color:#000;transition:all .5s ease}.nav-bar .nav-item.active,.nav-bar .nav-item:hover{color:#fff!important}.nav-bar .nav-item.active:after,.nav-bar .nav-item:hover:after{background-color:#fff}@media screen and (max-width:500px){.nav-bar .nav-item{padding:0;width:25%}}", ""]);

// exports


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".home .header{height:332px;background-repeat:no-repeat;background-position:50%;background-color:#eee;display:block;position:relative}.home .header .title{display:block;padding-top:120px;font-size:50px;text-align:center;color:#fff}.home .header .title .author{display:block;text-align:center;font-size:20px;padding-top:5px}.home .articles{margin:15px auto 20px;text-align:left;width:1020px;transition:width .5s ease}.home .articles .article-item{height:300px;width:310px;background-color:#fff;margin:15px;display:inline-block;transition:all .5s ease}.home .articles .article-item:hover{box-shadow:0 6px 16px #ccc}.home .articles .article-item .article-cover{height:200px;width:100%;display:block;background-repeat:no-repeat;background-position:50%;background-color:#eee;overflow:hidden}.home .articles .article-item .article-cover img{transition:all .8s ease;height:200px}.home .articles .article-item .article-cover img:hover{height:220px}.home .articles .article-item .article-info{display:block;padding:20px;text-align:left}.home .articles .article-item .article-info .title{font-size:20px;line-height:20px;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.home .articles .article-item .article-info .author{font-size:14px;color:#666;display:block;margin-top:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}@media screen and (max-width:500px){.home .header .title{font-size:30px}.home .articles{width:auto;margin:10px;text-align:center}.home .articles .article-item{width:100%;height:270px;margin:0 0 10px}.home .articles .article-item img{width:100%;height:auto!important}.home .articles .article-item .article-info{padding:10px}.home .articles .article-item .article-info .author{margin-top:10px}}@media screen and (min-width:800px){.home .articles{width:680px}}@media screen and (min-width:1024px){.home .articles{width:1020px}}@media screen and (min-width:1360px){.home .articles{width:1360px}}", ""]);

// exports


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".photos .container .work{margin:40px 0}.photos .container .work .image-item{width:310px;height:260px;display:inline-block;background-color:#fff;margin:7px;padding:8px 8px 0}.photos .container .work .image-item:hover{box-shadow:0 0 10px 2px #ccc}.photos .container .work .image-item .image-cover{height:200px;width:100%;display:block;background-color:#fff;overflow:hidden}.photos .container .work .image-item .image-cover img{width:100%}.photos .container .work .image-item .image-title{font-size:18px;color:#333}.photos .container .work .image-item .image-date,.photos .container .work .image-item .image-title{display:block;text-align:left;background-color:#fff;height:30px;line-height:30px;text-overflow:ellipsis;white-space:nowrap}.photos .container .work .image-item .image-date{font-size:14px;color:#999}@media screen and (max-width:500px){.photos .container .work{margin:12px 0 0;width:100%}.photos .container .work .image-item{width:auto;height:auto;padding:0 12px;margin:0;display:block}.photos .container .work .image-item .image-cover{height:auto}.photos .container .work .image-item:hover{box-shadow:none}}", ""]);

// exports


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".footer{padding:40px 0;text-align:center;background-color:#fff;color:#999!important;font-size:13px}.footer .copyright{height:20px;display:block;color:#999}.footer .icp{height:20px;display:block;color:#999!important}.footer .icon{width:100px;display:block;margin:0 auto;padding:6px 0;font-size:30px;color:#999}.footer .mail{height:20px;display:block;color:#999}", ""]);

// exports


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".blog{background-color:#fff;border-bottom:.5px solid #e8e8e8;width:auto;padding:10px 0;display:block}.blog .title{display:block;font-size:20px;min-height:40px;line-height:40px;color:#333}.blog .desc{font-size:14px;color:#666}.blog .date,.blog .desc{display:block;line-height:24px}.blog .date{font-size:12px;color:#999}@media screen and (max-width:500px){.blog{padding:10px 18px}}", ""]);

// exports


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".article-content{min-height:800px;margin:0}.article-content blockquote{border-left:2px solid #298cda;padding:10px;margin-left:20px;background-color:#efefef}.article-content blockquote,.article-content blockquote p{-webkit-margin-before:0;-webkit-margin-after:0;-webkit-margin-start:0;-webkit-margin-end:0}.article-content a{color:#298cda!important}.article-content a:hover{text-decoration:underline}@media screen and (min-width:500px){.article-content{padding:0 16px;font-size:16px;word-break:break-all}.article-content img{max-width:800px;margin:0 auto}.article-content h1{font-size:34px}.article-content h2{font-size:28px}.article-content h3{font-size:22px}.article-content h4{font-size:20px}}@media screen and (max-width:500px){.article-content{padding:0 16px;font-size:14px;word-break:break-all}.article-content img{width:100%}.article-content h1{font-size:30px}.article-content h2{font-size:24px}.article-content h3{font-size:18px}.article-content h4{font-size:16px}}code{background:#efefef;font-style:italic;font-size:14px;padding:4px 10px}.hljs{display:block;overflow-x:auto;padding:.5em;background:#232323!important;color:#e6e1dc;font-style:normal!important}.hljs-comment,.hljs-quote{color:#bc9458;font-style:italic!important}.hljs-keyword,.hljs-selector-tag{color:#c26230}.hljs-number,.hljs-regexp,.hljs-string,.hljs-template-variable,.hljs-variable{color:#a5c261}.hljs-subst{color:#519f50}.hljs-name,.hljs-tag{color:#e8bf6a}.hljs-type{color:#da4939}.hljs-attr,.hljs-built_in,.hljs-builtin-name,.hljs-bullet,.hljs-link,.hljs-symbol{color:#6d9cbe}.hljs-params{color:#d0d0ff}.hljs-attribute{color:#cda869}.hljs-meta{color:#9b859d}.hljs-section,.hljs-title{color:#ffc66d}.hljs-addition{background-color:#144212}.hljs-addition,.hljs-deletion{color:#e6e1dc;display:inline-block;width:100%}.hljs-deletion{background-color:#600}.hljs-selector-class{color:#9b703f}.hljs-selector-id{color:#8b98ab}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}", ""]);

// exports


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".text{background-color:#fff}.text .name{padding:0 18px;height:40px;line-height:40px;padding-top:20px;font-size:20px;font-weight:700;display:block;color:#298cda}.text .name:hover{text-decoration:underline}.text .subname{padding:0 18px;height:20px;line-height:20px;font-size:14px;color:#298cda}.text .subname:hover{text-decoration:underline}.text .qrcode{position:absolute;top:20px;right:18px;width:140px;height:140px}.text .abstract-tips{padding:0 18px;height:20px;line-height:20px;font-size:16px;font-weight:700;display:block;margin-top:60px}.text .abstract-content{padding:0 18px}.text .abstract-content .abstract-item{display:block;font-size:14px;color:#666;min-height:24px;line-height:24px}.text .abstract-content-en{padding:0 18px;padding-top:20px}.text .abstract-content-en .abstract-item{display:block;font-size:14px;color:#999;min-height:24px;line-height:24px}.text .preview{padding:0 18px;margin-top:10px;overflow-x:auto;white-space:nowrap;overflow:hidden;overflow-x:scroll;-webkit-overflow-scrolling:touch;text-align:justify}.text .preview .item{width:400px;padding:5px 30px 0 0;display:inline-block}.text .preview .item .boarder{background-color:#fff;width:100%;display:block}.text .preview .item .boarder img{width:100%}.text .works{padding-bottom:40px}.text .works .image-item{margin:20px 0;width:100%;display:inline-block;background-color:#fff;transition:all .5s ease;box-shadow:0 0 10px 2px #ccc}.text .works .image-item .image-cover{padding:20px;width:auto;display:block;background-color:#fff}.text .works .image-item .image-cover img{width:100%;height:100%;display:block}@media screen and (max-width:500px){.text .preview{padding:0!important;margin-top:10px}.text .preview .item{padding:5px 10px;width:80%}.text .preview .item .boarder{padding:0}.text .works{padding-bottom:12px}.text .works .image-item{width:auto;display:block;margin:0;box-shadow:none}.text .works .image-item .image-cover{padding:12px 12px 0}}", ""]);

// exports


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".home .container .header{height:332px;width:100%}.home .container .header .carousel-wrap{position:relative;height:100%;width:100%;overflow:hidden}.home .container .header .slide-ul{height:100%;padding:0;margin:0;list-style:none}.home .container .header .slide-ul li{position:absolute;width:100%;height:100%;padding:0}.home .container .header .slide-ul li img{width:100%}.home .container .header .carousel-items{position:absolute;z-index:10;top:302px;width:100%;margin:0 auto;text-align:center;font-size:0}.home .container .header .carousel-items span{display:inline-block;height:6px;width:30px;margin:0 3px;background-color:rgba(0,0,0,.1);cursor:pointer;border-radius:3px}.home .container .header .carousel-items .active{background-color:#222}.home .container .header .list-enter-active{transition:all 2s ease;opacity:1}.home .container .header .list-leave-active{transition:all 2s ease;opacity:0}.home .container .header .list-enter{opacity:0}.home .container .header .list-leave{opacity:1}.home .container .item .title{margin-top:20px;padding-bottom:10px;padding-left:15px;font-size:20px;color:#333;text-align:left;font-weight:700;border-bottom:1px solid #e9e9e9;width:auto}.home .container .item .content{margin-top:10px;width:100%;text-align:left}.home .container .item .content .image-item{width:310px;height:240px;display:inline-block;background-color:#fff;margin:7px;transition:all .5s ease;padding:8px 8px 0}.home .container .item .content .image-item:hover{box-shadow:0 0 10px 2px #ccc}.home .container .item .content .image-item .image-cover{height:200px;width:auto;display:block;overflow:hidden}.home .container .item .content .image-item .image-cover img{width:100%}.home .container .item .content .image-item .image-title{width:auto;display:block;text-align:center;background-color:#fff;font-size:18px;line-height:40px;height:40px;text-overflow:ellipsis;white-space:nowrap}@media screen and (max-width:500px){.home .container .item .title{border-bottom:none}.home .container .item .content{margin-top:0}.home .container .item .content .image-item{width:100%;padding:0;margin:0}}@media screen and (max-width:500px){.home .container .header{height:250px}.home .container .header .carousel-items{top:230px}}", ""]);

// exports


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(147)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(52),
  /* template */
  __webpack_require__(135),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(154)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(55),
  /* template */
  __webpack_require__(142),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(153)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(56),
  /* template */
  __webpack_require__(141),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(156)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(57),
  /* template */
  __webpack_require__(144),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(155)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(58),
  /* template */
  __webpack_require__(143),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(145)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(59),
  /* template */
  __webpack_require__(133),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(148)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(60),
  /* template */
  __webpack_require__(136),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(146)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(61),
  /* template */
  __webpack_require__(134),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(151)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(62),
  /* template */
  __webpack_require__(139),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(150)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(63),
  /* template */
  __webpack_require__(138),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 133 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "note"
  }, [_c('nav-bar', {
    attrs: {
      "index": _vm.index
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "text"
  }, [_c('a', {
    staticClass: "name",
    attrs: {
      "href": "https://itunes.apple.com/cn/app/id1247102147"
    }
  }, [_vm._v("手记")]), _vm._v(" "), (!_vm.mobile) ? _c('img', {
    staticClass: "qrcode",
    attrs: {
      "src": "/assets/images/qrcode2.png",
      "alt": "https://itunes.apple.com/cn/app/id1247102147"
    }
  }) : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "abstract-tips"
  }, [_vm._v("内容提要")]), _vm._v(" "), _c('div', {
    staticClass: "abstract-content"
  }, _vm._l((_vm.cns), function(item) {
    return _c('span', {
      staticClass: "abstract-item"
    }, [_vm._v(_vm._s(item))])
  })), _vm._v(" "), _c('span', {
    staticClass: "abstract-tips"
  }, [_vm._v("应用预览")]), _vm._v(" "), _c('div', {
    staticClass: "preview"
  }, _vm._l((_vm.previews), function(item) {
    return _c('div', {
      staticClass: "item"
    }, [_c('a', {
      staticClass: "boarder",
      attrs: {
        "href": item,
        "title": "应用预览",
        "target": _vm.linkTarget
      }
    }, [_c('img', {
      directives: [{
        name: "lazy",
        rawName: "v-lazy",
        value: (item),
        expression: "item"
      }],
      attrs: {
        "alt": ""
      }
    })])])
  })), _vm._v(" "), _c('span', {
    staticClass: "abstract-tips"
  }, [_vm._v("作品展示")]), _vm._v(" "), _c('div', {
    staticClass: "works"
  }, _vm._l((_vm.works), function(item) {
    return _c('a', {
      staticClass: "image-item",
      attrs: {
        "title": "作品",
        "href": item,
        "target": _vm.linkTarget
      }
    }, [_c('span', {
      staticClass: "image-cover"
    }, [_c('img', {
      directives: [{
        name: "lazy",
        rawName: "v-lazy",
        value: (item),
        expression: "item"
      }]
    })])])
  }))])]), _vm._v(" "), _c('foot')], 1)
},staticRenderFns: []}

/***/ }),
/* 134 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "photo"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "photo-header"
  }, [_c('span', {
    staticClass: "photo-category"
  }, [_vm._v(_vm._s(this.title))]), _vm._v(" "), _c('span', [_vm._v("◇")]), _vm._v(" "), _c('span', [_vm._v("◇")]), _vm._v(" "), _c('span', [_vm._v("◇")]), _vm._v(" "), _c('span', [_vm._v(".")])]), _vm._v(" "), _vm._l((_vm.photos), function(photo) {
    return _c('a', {
      staticClass: "image-item",
      attrs: {
        "href": ("" + (photo.url)),
        "target": _vm.linkTarget,
        "title": _vm.title
      }
    }, [_c('span', {
      staticClass: "image-cover"
    }, [_c('img', {
      directives: [{
        name: "lazy",
        rawName: "v-lazy",
        value: (photo.url),
        expression: "photo.url"
      }]
    }), _vm._v(" "), (_vm.notnull(photo.camera)) ? _c('span', {
      staticClass: "image-camera"
    }, [_vm._v(_vm._s(photo.camera))]) : _vm._e(), _vm._v(" "), _c('span', {
      staticClass: "image-exif"
    }, [_vm._v(_vm._s(photo.exif))])])])
  })], 2), _vm._v(" "), _c('foot')], 1)
},staticRenderFns: []}

/***/ }),
/* 135 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "page",
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panoram"
  }, [(!_vm.mobile) ? _c('span', {
    staticClass: "enter",
    on: {
      "click": _vm.enterFullScreen
    }
  }, [_vm._v(_vm._s(_vm.fullscreen))]) : _vm._e(), _vm._v(" "), _c('canvas', {
    ref: "webgl",
    staticClass: "canvas",
    on: {
      "touchmove": _vm.touchmove,
      "touchstart": _vm.touchdown,
      "touchend": _vm.touchup,
      "touchcancel": _vm.touchcancel,
      "dblclick": _vm.touchdouble,
      "mousedown": _vm.touchdown,
      "mousemove": _vm.touchmove,
      "mouseup": _vm.touchup,
      "mouseout": _vm.touchcancel
    }
  }, [_vm._v("\n        Please use the browser supporting \"canvas\"\n    ")])])
},staticRenderFns: []}

/***/ }),
/* 137 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "nav-bar"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "nav-right"
  }, _vm._l((_vm.navs), function(item, idx) {
    return _c('a', {
      staticClass: "nav-item",
      class: {
        'active': _vm.index == idx
      },
      attrs: {
        "href": item.url
      }
    }, [_vm._v("\n                " + _vm._s(item.title) + "\n            ")])
  }))])])
},staticRenderFns: []}

/***/ }),
/* 138 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home"
  }, [_c('nav-bar', {
    attrs: {
      "index": 4
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "header",
    style: ({
      'background-image': ("url(" + (_vm.banner.coverBanner) + ")")
    }),
    attrs: {
      "target": _vm.linkTarget,
      "href": ("/article/" + (_vm.banner.articleId))
    }
  }, [_c('span', {
    staticClass: "title"
  }, [_vm._v("\n            " + _vm._s(_vm.banner.title) + "\n            "), _c('span', {
    staticClass: "author"
  }, [_vm._v("作者：" + _vm._s(_vm.banner.author))])])]), _vm._v(" "), _c('div', {
    staticClass: "articles"
  }, _vm._l((_vm.articles), function(item) {
    return (!item.hidden) ? _c('a', {
      staticClass: "article-item",
      attrs: {
        "target": _vm.linkTarget,
        "href": ("/article/" + (item.articleId))
      }
    }, [_c('span', {
      staticClass: "article-cover"
    }, [_c('img', {
      directives: [{
        name: "lazy",
        rawName: "v-lazy",
        value: (item.cover),
        expression: "item.cover"
      }]
    })]), _vm._v(" "), _c('span', {
      staticClass: "article-info"
    }, [_c('span', {
      staticClass: "title"
    }, [_vm._v(_vm._s(item.title))]), _vm._v(" "), _c('span', {
      staticClass: "author"
    }, [_vm._v(_vm._s(item.author) + " " + _vm._s(item.date))])])]) : _vm._e()
  })), _vm._v(" "), _c('foot')], 1)
},staticRenderFns: []}

/***/ }),
/* 139 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "photos"
  }, [_c('nav-bar', {
    attrs: {
      "index": _vm.index
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "work"
  }, _vm._l((_vm.photos), function(photo) {
    return _c('a', {
      staticClass: "image-item",
      attrs: {
        "title": photo.title,
        "href": ("/photo/" + (photo.category)),
        "target": _vm.linkTarget
      }
    }, [_c('span', {
      staticClass: "image-cover"
    }, [_c('img', {
      directives: [{
        name: "lazy",
        rawName: "v-lazy",
        value: (photo.url),
        expression: "photo.url"
      }]
    })]), _vm._v(" "), _c('span', {
      staticClass: "image-title"
    }, [_vm._v(_vm._s(photo.title))]), _vm._v(" "), _c('span', {
      staticClass: "image-date"
    }, [_vm._v(_vm._s(photo.date))])])
  }))]), _vm._v(" "), _c('foot')], 1)
},staticRenderFns: []}

/***/ }),
/* 140 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0, false, false)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "footer"
  }, [_c('span', {
    staticClass: "copyright"
  }, [_vm._v("2017 dawntech.top. All rights reserved.")]), _vm._v(" "), _c('a', {
    staticClass: "mail",
    attrs: {
      "href": "mailto:wangsguang@gmail.com"
    }
  }, [_vm._v("wangsguang@gmail.com")]), _vm._v(" "), _c('span', {
    staticClass: "icp"
  }, [_vm._v("京ICP备17056676号")]), _vm._v(" "), _c('a', {
    staticClass: "icon iconfont icon-yinzhang",
    attrs: {
      "href": "/"
    }
  })])
}]}

/***/ }),
/* 141 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home"
  }, [_c('nav-bar', {
    attrs: {
      "index": _vm.index
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "container"
  }, _vm._l((_vm.items), function(item) {
    return (item.title) ? _c('a', {
      staticClass: "blog",
      attrs: {
        "href": ("/article/" + (item.id))
      }
    }, [_c('span', {
      staticClass: "title"
    }, [_vm._v(_vm._s(item.title))]), _vm._v(" "), _c('span', {
      staticClass: "desc"
    }, [_vm._v(_vm._s(item.desc))]), _vm._v(" "), _c('span', {
      staticClass: "date"
    }, [_vm._v("发布于 " + _vm._s(item.date))])]) : _vm._e()
  })), _vm._v(" "), _c('foot')], 1)
},staticRenderFns: []}

/***/ }),
/* 142 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "article"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "article-content",
    domProps: {
      "innerHTML": _vm._s(_vm.htmlContent)
    }
  })]), _vm._v(" "), _c('foot')], 1)
},staticRenderFns: []}

/***/ }),
/* 143 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "knbrush"
  }, [_c('nav-bar', {
    attrs: {
      "index": _vm.index
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "text"
  }, [_c('a', {
    staticClass: "name",
    attrs: {
      "href": "https://itunes.apple.com/cn/app/freehand-sketch-draw-note-doodle-masters/id1105305111?l=cn&mt=8"
    }
  }, [_vm._v("信手涂鸦 - 素描.涂色.P图.手绘大师")]), _vm._v(" "), _c('a', {
    staticClass: "subname",
    attrs: {
      "href": "https://itunes.apple.com/cn/app/freehand-sketch-draw-note-doodle-masters/id1105305111?l=en&mt=8"
    }
  }, [_vm._v("Freehand - Sketch.Draw.Note.Doodle.Masters")]), _vm._v(" "), (!_vm.mobile) ? _c('img', {
    staticClass: "qrcode",
    attrs: {
      "src": "/assets/images/qrcode.png",
      "alt": "https://itunes.apple.com/cn/app/id1105305111"
    }
  }) : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "abstract-tips"
  }, [_vm._v("内容提要")]), _vm._v(" "), _c('div', {
    staticClass: "abstract-content"
  }, _vm._l((_vm.cns), function(item) {
    return _c('span', {
      staticClass: "abstract-item"
    }, [_vm._v(_vm._s(item))])
  })), _vm._v(" "), _c('div', {
    staticClass: "abstract-content-en"
  }, _vm._l((_vm.ens), function(item) {
    return _c('span', {
      staticClass: "abstract-item"
    }, [_vm._v(_vm._s(item))])
  })), _vm._v(" "), _c('span', {
    staticClass: "abstract-tips"
  }, [_vm._v("应用预览")]), _vm._v(" "), _c('div', {
    staticClass: "preview"
  }, _vm._l((_vm.previews), function(item) {
    return _c('div', {
      staticClass: "item"
    }, [_c('a', {
      staticClass: "boarder",
      attrs: {
        "title": "应用预览",
        "href": item,
        "target": _vm.linkTarget
      }
    }, [_c('img', {
      directives: [{
        name: "lazy",
        rawName: "v-lazy",
        value: (item),
        expression: "item"
      }],
      attrs: {
        "alt": ""
      }
    })])])
  })), _vm._v(" "), _c('span', {
    staticClass: "abstract-tips"
  }, [_vm._v("作品展示")]), _vm._v(" "), _c('div', {
    staticClass: "works"
  }, _vm._l((_vm.works), function(item) {
    return _c('a', {
      staticClass: "image-item",
      attrs: {
        "title": "作品",
        "href": item,
        "target": _vm.linkTarget
      }
    }, [_c('span', {
      staticClass: "image-cover"
    }, [_c('img', {
      directives: [{
        name: "lazy",
        rawName: "v-lazy",
        value: (item),
        expression: "item"
      }]
    })])])
  }))])]), _vm._v(" "), _c('foot')], 1)
},staticRenderFns: []}

/***/ }),
/* 144 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home"
  }, [_c('nav-bar', {
    attrs: {
      "index": 0
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "header"
  }, [_c('div', {
    staticClass: "carousel-wrap",
    attrs: {
      "id": "carousel"
    }
  }, [_c('transition-group', {
    staticClass: "slide-ul",
    attrs: {
      "tag": "ul",
      "name": "list"
    }
  }, _vm._l((_vm.slideList), function(item, index) {
    return _c('li', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (index === _vm.currentIndex),
        expression: "index===currentIndex"
      }],
      key: index,
      on: {
        "mouseenter": _vm.stop,
        "mouseleave": _vm.go
      }
    }, [_c('a', {
      attrs: {
        "href": item.target,
        "target": _vm.linkTarget
      }
    }, [_c('img', {
      directives: [{
        name: "lazy",
        rawName: "v-lazy",
        value: (item.url),
        expression: "item.url"
      }],
      attrs: {
        "alt": item.desc
      }
    })])])
  })), _vm._v(" "), _c('div', {
    staticClass: "carousel-items"
  }, _vm._l((_vm.slideList.length), function(item, index) {
    return _c('span', {
      class: {
        'active': index === _vm.currentIndex
      },
      on: {
        "mouseover": function($event) {
          _vm.change(index)
        }
      }
    })
  }))], 1)]), _vm._v(" "), _vm._l((_vm.items), function(item) {
    return _c('div', {
      staticClass: "item"
    }, [_c('div', {
      staticClass: "title"
    }, [_vm._v(_vm._s(item.category))]), _vm._v(" "), _c('div', {
      staticClass: "content"
    }, _vm._l((item.items), function(subitem) {
      return _c('a', {
        staticClass: "image-item",
        attrs: {
          "href": subitem.target,
          "target": _vm.linkTarget
        }
      }, [_c('span', {
        staticClass: "image-cover"
      }, [_c('img', {
        directives: [{
          name: "lazy",
          rawName: "v-lazy",
          value: (subitem.url),
          expression: "subitem.url"
        }]
      })]), _vm._v(" "), _c('span', {
        staticClass: "image-title"
      }, [_vm._v(_vm._s(subitem.title))])])
    }))])
  })], 2), _vm._v(" "), _c('foot')], 1)
},staticRenderFns: []}

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(111);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("7bf028c0", content, true);

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(112);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("6bfbc660", content, true);

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(113);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("6916a868", content, true);

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(114);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("a8d6a52e", content, true);

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(115);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("0910616b", content, true);

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(116);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("52032d3a", content, true);

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(117);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("bdcce876", content, true);

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(118);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("3b44c8d0", content, true);

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(119);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("cc4a2cdc", content, true);

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(120);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("1975cb99", content, true);

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(121);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("63b3dfae", content, true);

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(122);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("c502301c", content, true);

/***/ }),
/* 157 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 158 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 159 */
/***/ (function(module, exports) {

module.exports = require("es6-promise");

/***/ }),
/* 160 */
/***/ (function(module, exports) {

module.exports = require("highlight.js");

/***/ }),
/* 161 */
/***/ (function(module, exports) {

module.exports = require("marked");

/***/ }),
/* 162 */
/***/ (function(module, exports) {

module.exports = require("vue-lazyload");

/***/ }),
/* 163 */
/***/ (function(module, exports) {

module.exports = require("vue-router");

/***/ }),
/* 164 */
/***/ (function(module, exports) {

module.exports = require("vuex");

/***/ }),
/* 165 */
/***/ (function(module, exports) {

module.exports = require("vuex-router-sync");

/***/ })
/******/ ]);