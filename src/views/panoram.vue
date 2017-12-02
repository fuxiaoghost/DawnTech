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
import {Matrix4, Matrix3, WebGLModelManager} from "../business/webgl/WebGLModelManager.js";
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
            pic: "/assets/images/IRIS360.jpg",
            texture: null,
            verticesSizes: null
        };
    },
    mounted: function() {
        if(process.BROWSER) {
            var self = this;
            let canvas = this.$refs.webgl;
            System.import('../business/webgl/WebGL.js').then(function(modulel){
                self.webgl = new modulel.WebGL();
                self.gl = self.webgl.getWebGLContext(canvas);
                if (!self.gl) {
                    console.log('Faild to get the rendering context for WebGL');
                    return;
                }
                self.panoram();
            });
           
        }else {
            console.log('Faild to get the rendering context for WebGL');
        }
    },
    methods: {
        panoram: function () {
            var webgl = this.webgl;
            var gl = this.gl;
            var self = this;
            this.loadMatrix();
            this.loadShaderFile(gl, function (vs, fs) {
                if (webgl.initShaders(gl, vs, fs)) {
                    // clear canvas
                    self.clearCanvas(gl);
                    // get sphere model
                    self.verticesSizes = self.createSphere(20, 40);
                    // get texture
                    self.loadImageTexture(gl, self.pic, function(texture) {   
                        self.texture = texture;
                        self.draw(gl);
                    });
                };
            });
        },
        loadMatrix: function() {
            var scale = 1;
            let canvas = this.$refs.webgl;
            var width = canvas.clientWidth;
            var height = canvas.clientHeight;
            var ratio = width/height;
            WebGLModelManager.projectionMatrix = Matrix4.makePerspective((50.0 - 40 * (scale -1)) * (Math.PI / 180), ratio, 1.0, 1000);
        },
        loadShaderFile: function (gl, callback) {
            var VSHADER_SOURCE = null;
            var FSHADER_SOURCE = null;
            var state = this.$store.state;
            this.$store.dispatch("getPanoram").then(() => {
                callback(state.panoram.vsh, state.panoram.fsh);
            });
        },
        clearCanvas: function (gl) {
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        },
        draw: function (gl) {
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
            // 配置纹理参数
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            // 绘图
            gl.uniform1i(colorMap, 0);
            gl.uniformMatrix4fv(modelViewProjectionMatrix, false, new Float32Array(WebGLModelManager.modelViewProjectionMatrix().m));
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 5);
            gl.deleteBuffer(vertexBuffer);
        },
        loadImageTexture: function(gl, url, callback) {
            var image = new Image();
            image.onload = function() {
                var texture = gl.createTexture();
                // 绑定纹理
                gl.bindTexture(gl.TEXTURE_2D, texture)
                // 对纹理图像进行y轴翻转
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
                // 配置纹理参数
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                // 配置纹理图像
                gl.bindTexture(gl.TEXTURE_2D, null);
                callback(texture);
            }
            image.src = url;
        },
        createSphere: function(hslice, vslice) {
            var verticesSizes = new Float32Array(hslice * vslice * 3 * 2 * 5);
            var theta ,fai;
            var hstep = Math.PI/hslice;
            var vstep = Math.PI/vslice;
            var index = 0;
            for (var i = 0; i < hslice; i++) {
                theta = hstep * i;
                for (var j = 0; j < vslice; j++) {
                    fai = -Math.PI + vstep * j;
                    // 点坐标
                    var p1 = this.getPointTheta(theta, fai);
                    var p2 = this.getPointTheta(theta + hstep, fai);
                    var p3 = this.getPointTheta(theta, fai + vstep);
                    var p4 = this.getPointTheta(theta + hstep, fai + vstep);
                    // 纹理坐标
                    var st1 = this.getPointTheta(theta, fai);
                    var st2 = this.getPointTheta(theta + hstep, fai);
                    var st3 = this.getPointTheta(theta, fai + vstep);
                    var st4 = this.getPointTheta(theta + hstep, fai + vstep);

                    // 上三角
                    index = this.getVertice(verticesSizes, p1, st1, index);
                    index = this.getVertice(verticesSizes, p2, st2, index);
                    index = this.getVertice(verticesSizes, p3, st3, index);
                    // 下三角
                    index = this.getVertice(verticesSizes, p3, st3, index);
                    index = this.getVertice(verticesSizes, p2, st2, index);
                    index = this.getVertice(verticesSizes, p4, st4, index);
                }
            }
            return verticesSizes;
        },
        getVertice: function(verticesSizes, p, st, index) {
            verticesSizes.set([p.x, p.y, p.z, st.s, st.t], index);
            return index + 5;
        },
        getPointTheta: function(theta, fai) {
            /*
            x = sinθ.sinψ
            y = cosθ
            z = sinθ.cosψ
            (θ[0,π] ψ[-π,π])
            */
            var x = Math.sin(theta) * Math.sin(fai);
            var y = Math.cos(theta);
            var z = Math.sin(theta) * Math.cos(fai);
            return {x: x, y: y, z: z};
        },
        getSTTheta: function(theta, fai) {
            var s = 0.5 - (fai)/(2 * Math.PI);
            var t = 1 - (theta)/ Math.PI;
            return {s: s, t: t};
        }

    }
};
</script>
<style lang="sass">
.panoram {
    position: relative;
    text-align: center;
    .canvas {
        margin: 100px auto;
        width: 800px;
        height: 800px;
        text-align: center;
    }
    @media screen and (max-width: 500px) {
        width: 100%;
        height: 100%;
        margin: 0px;
    }
}
</style>
