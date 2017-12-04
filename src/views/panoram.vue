<template>
    <div class="panoram">
        <canvas class="canvas" ref="webgl">
            Please use the browser supporting "canvas"
        </canvas>
        <foot></foot>
    </div>
</template>
<script>
import foot from "../components/foot.vue";
import Vue from 'vue';
import {Matrix4, Matrix3, Vector2, WebGLModelManager} from "../business/webgl/WebGLModelManager.js";
import {sphere} from "../business/sphere.js"
import {Trackball} from "../business/trackball.js"
export default {
    components: {
        foot
    },
    data: function() {
        return {
            webgl: null,
            gl: null,
            fsh: "/assets/shaders/panoram.fsh",
            vsh: "/assets/shaders/panoram.vsh",
            pic: "/assets/images/thetav.jpg",
            texture: null,
            verticesSizes: null,
            start: null,
            trackball: null,
            isdown: false
        };
    },
    mounted: function() {
        if(process.BROWSER) {
            var self = this;
            let canvas = this.$refs.webgl;
            this.trackball = new Trackball();
            
            // WebGL
            System.import('../business/webgl/WebGL.js').then(function(modulel){
                self.webgl = new modulel.WebGL();
                self.gl = self.webgl.getWebGLContext(canvas, false);
                if (!self.gl) {
                    console.log('Faild to get the rendering context for WebGL');
                    return;
                }
                self.panoram();
            });  

            // event
            window.onresize = () => {
                self.resize();
                self.step();
            };

            canvas.onmousedown = function (ev) {
                if (ev.button !== 0) {
                    return;
                }
                self.isdown = true;
                var point = self.pointOf(ev, canvas);
                self.trackball.touchDown(point);
                self.step();
            }
            canvas.onmousemove = function (ev) {
                if (ev.button !== 0) {
                    return;
                }
                if (self.isdown) {
                    var point = self.pointOf(ev, canvas);
                    self.trackball.touchMove(point);
                    self.step();
                }
            }
            canvas.onmouseup = function (ev) {
                if (ev.button !== 0) {
                    return;
                }
                self.isdown = false;
                var point = self.pointOf(ev, canvas);
                self.trackball.touchEnd(point);
                self.step();
            }
            canvas.onmouseout = function(ev) {
                if (ev.button !== 0) {
                    return;
                }
                self.isdown = false;
                var point = self.pointOf(ev, canvas);
                self.trackball.touchEnd(point);
                self.step();
            }
            canvas.ondblclick = function() {
                self.trackball.doscale();
                console.log(self.trackball.degreeScale());
                self.updateProjectionMatrix();
                self.step();
            }
        }
    },
    methods: {
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
                        self.step();
                    });
                };
            });
        },
        pointOf: function(ev, canvas) {
            var rect = ev.target.getBoundingClientRect();
            // var x = ((ev.clientX - rect.left) - canvas.width / 2) / (canvas.width / 2);
            // var y = (canvas.height / 2 - (ev.clientY - rect.top)) / (canvas.height / 2);
            return new Vector2(Math.max(0, Math.min(canvas.width, ev.offsetX)), Math.max(0, Math.min(canvas.height, ev.offsetY)));
        },
        resize: function() {
            this.webgl.resize(this.gl);
            this.trackball.layoutSize(new Vector2(this.gl.canvas.width, this.gl.canvas.height));
            this.updateProjectionMatrix();
        },
        step: function(timestamp) {
            // console.log(timestamp - this.start);
            this.start = timestamp;
            this.updateModelMatrix();
            this.draw();
            // window.requestAnimationFrame(this.step);
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
.panoram {
    width: 100%;
    height: 100%;
    .canvas {
        width: 100%;
        height: 100%;
        margin: 0px;
    }
}
</style>
