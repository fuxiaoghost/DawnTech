<template>
    <div class="panoram">
        <span class="enter" v-if="!mobile" v-on:click="enterFullScreen">{{fullscreen}}</span>
        <canvas class="canvas" ref="webgl"
            
            v-on:touchmove='touchmove' 
            v-on:touchstart='touchdown'
            v-on:touchend='touchup'
            v-on:touchcancel='touchcancel'
            
            v-on:dblclick='touchdouble'
            v-on:mousedown='touchdown'
            v-on:mousemove='touchmove'
            v-on:mouseup='touchup'
            v-on:mouseout='touchcancel'

            >
            Please use the browser supporting "canvas"
        </canvas>
    </div>
</template>
<script>
import foot from "../components/foot.vue";
import Vue from 'vue';
import {Matrix4, Matrix3, Vector2, WebGLModelManager} from "../business/webgl/WebGLModelManager.js";
import { WebGLAnimation, AnimationValue} from '../business/webgl/WebGLAnimation.js';
import {sphere} from "../business/sphere.js"
import {Trackball} from "../business/trackball.js"
import adjust from "../business/adjust.js";
export default {
    components: {
        foot
    },
    data: function() {
        return {
            canvas: null,
            webgl: null,
            gl: null,
            fsh: "/assets/shaders/panoram.fsh",
            vsh: "/assets/shaders/panoram.vsh",
            pic: (adjust.isMobile() ? "/assets/images/thetav_s.jpg" : "/assets/images/thetav.jpg"),
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
    preFetch: function(store) {
        var header = {
            title: "全景模型",
            desc: "全景模型"
        }
        store.dispatch("header", header);
    },
    computed: {
        mobile: function() {
            return adjust.isMobile();
        }
    },
    mounted: function() {
        if(process.BROWSER) {
            var self = this;
            this.canvas = this.$refs.webgl;
            this.trackball = new Trackball();
            
            // WebGL
            System.import('../business/webgl/WebGL.js').then(function(modulel){
                self.webgl = new modulel.WebGL();
                self.gl = self.webgl.getWebGLContext(self.canvas, false);
                if (!self.gl) {
                    console.log('Faild to get the rendering context for WebGL');
                    return;
                }
                self.panoram();
            });  

            // event
            window.onresize = () => {
                self.resize();
                self.stepOnce();
            };

            if (this.isFullScreen()) {
                this.fullscreen = "退出全屏";
            }else {
                this.fullscreen = "全屏显示";
            }
        }
    },
    methods: {
        touchdown: function(ev) {
            this.startStep();
            this.isdown = true;
            var point = this.pointOf(ev, this.canvas);
            this.trackball.touchDown(point);
        },
        touchmove: function(ev) {
            event.preventDefault();
            if (this.isdown) {
                var point = this.pointOf(ev, this.canvas);
                this.trackball.touchMove(point);
            }
        },
        touchup: function(ev) {
            this.isdown = false;
            var point = this.pointOf(ev, this.canvas);
            this.trackball.touchEnd(point);
            this.stopStep();
        },
        touchcancel: function(ev) {
            if(this.isdown) {
                this.isdown = false;
                var point = this.pointOf(ev, this.canvas);
                this.trackball.touchEnd(point);
                this.stopStep();
            }
        },
        touchdouble: function(ev) {
            this.startStep();
            this.trackball.doscale();
            console.log(this.trackball.degreeScale());
            this.updateProjectionMatrix();
            this.stopStep();
        },
        //进入全屏
        enterFullScreen: function() {
            if(!this.isFullScreen()) {
                var de = document.documentElement;
                if (de.requestFullscreen) {
                    de.requestFullscreen();
                } else if (de.mozRequestFullScreen) {
                    de.mozRequestFullScreen();
                } else if (de.webkitRequestFullScreen) {
                    de.webkitRequestFullScreen();
                }
                this.fullscreen = "退出全屏";
            }else {
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
        isFullScreen: function() {
            if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) { 
                // 非全屏状态
                return false;
            } else { // 全屏状态
                return true;
            }
        },
        panoram: function () {
            var webgl = this.webgl;
            var gl = this.gl;
            var self = this;
            this.loadShaderFile(function (vs, fs) {
                if (webgl.initShaders(gl, vs, fs)) {
                    // clear canvas
                    self.clearCanvas();
                    // get sphere model
                    self.verticesSizes = sphere.create(50, 100);
                    // get texture
                    webgl.loadImageTexture(gl, self.pic, function(texture) {   
                        self.texture = texture;
                        self.resize();
                        self.animation = window.requestAnimationFrame(self.step);
                        self.stepOnce();
                    });
                };
            });
        },
        pointOf: function(ev, canvas) {
            var x = ev.offsetX == undefined ? ev.layerX : ev.offsetX;
            var y = ev.offsetY == undefined ? ev.layerY : ev.offsetY;
            return new Vector2(Math.max(0, Math.min(canvas.clientWidth, x)), Math.max(0, Math.min(canvas.clientHeight, y)));
        },
        resize: function() {
            this.webgl.resize(this.gl);
            this.trackball.layoutSize(new Vector2(this.gl.canvas.clientWidth, this.gl.canvas.clientHeight));
        },
        step: function(timestamp) {
            this.animation = window.requestAnimationFrame(this.step);
            if(this.timestamp > 0) {
                this.timestamp--;
            }
            if(this.timestamp === 0) {
                // this.start = null;
                return;
            }
            var duration = (timestamp - this.start)/1000;
            this.start = timestamp;
            WebGLAnimation.animationTimerStep(duration);
            this.updateProjectionMatrix();
            this.updateModelMatrix();
            this.draw();
        },
        stepOnce: function() {
            // WebGLAnimation.animationTimerStep(duration);
            this.timestamp = 5;
        },
        startStep: function() {
            this.timestamp = -1;
        },
        stopStep: function() {
            this.timestamp = 600;
        },
        updateProjectionMatrix: function() {
            var scale =  this.trackball.degreeScale();
            let canvas = this.$refs.webgl;
            var width = canvas.clientWidth;
            var height = canvas.clientHeight;
            var ratio = width/height;
            WebGLModelManager.projectionMatrix = Matrix4.makePerspective((50.0 - 40 * (scale -1)) * (Math.PI / 180), ratio, 1.0, 1000);
        },
        loadShaderFile: function (callback) {
            var gl = this.gl;
            var state = this.$store.state;
            this.$store.dispatch("getPanoram").then(() => {
                callback(state.panoram.vsh, state.panoram.fsh);
            });
        },
        clearCanvas: function () {
            var gl = this.gl;
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        },
        updateModelMatrix: function() {
            WebGLModelManager.push();
            WebGLModelManager.multiplyMatrix4(Matrix4.makeTranslation(0, 0, -1));
            WebGLModelManager.multiplyMatrix4(this.trackball.rotationMatrix4());
            WebGLModelManager.updateModelViewMatrix();
            WebGLModelManager.pop();
        },
        draw: function () {
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

            // 开启0号纹理单元
            gl.activeTexture(gl.TEXTURE0);
            // 绑定纹理
            gl.bindTexture(gl.TEXTURE_2D, this.texture);

            // 绘图
            gl.uniform1i(colorMap, 0);
            gl.uniformMatrix4fv(modelViewProjectionMatrix, false, new Float32Array(WebGLModelManager.modelViewProjectionMatrix().m));
            gl.disable(gl.BLEND);

            gl.drawArrays(gl.TRIANGLES, 0, this.verticesSizes.length/5);
            gl.deleteBuffer(vertexBuffer);
            
            // console.log("draw");
        }
    }
};
</script>
<style lang="sass">
body {
    overflow: hidden;
}
.page {
    padding: 0px;
    height: 100%;
    .panoram {
        width: 100%;
        height: 100%;
        .canvas {
            width: 100%;
            height: 100%;
            margin: 0px;
        }
        .enter {
            cursor: pointer;
            background-color: rgba(0, 0, 0, 0.6);
            display: block;
            height: 40px;
            font-size: 20px;
            line-height: 40px;
            text-align: center;
            color: white;
            position:absolute;
            width: 100%;
        }
    }
}

</style>
