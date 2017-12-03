import {WebGLUtils} from './WebGLUtils.js'
import {WebGLDebugUtils} from './WebGLDebugUtils.js'
export class WebGL {
    constructor() {
    }

    // cuon-utils.js (c) 2012 kanda and matsuda
    /**
    * Create a program object and make current
    * @param gl GL context
    * @param vshader a vertex shader program (string)
    * @param fshader a fragment shader program (string)
    * @return true, if the program object was created and successfully made current 
    */
    initShaders(gl, vshader, fshader) {
        var program = this.createProgram(gl, vshader, fshader);
        if (!program) {
            console.log('Failed to create program');
            return false;
        }

        gl.useProgram(program);
        gl.program = program;

        return true;
    }

    /**
     * Create the linked program object
     * @param gl GL context
     * @param vshader a vertex shader program (string)
     * @param fshader a fragment shader program (string)
     * @return created program object, or null if the creation has failed
     */
    createProgram(gl, vshader, fshader) {
        // Create shader object
        var vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vshader);
        var fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fshader);
        if (!vertexShader || !fragmentShader) {
            return null;
        }

        // Create a program object
        var program = gl.createProgram();
        if (!program) {
            return null;
        }

        // Attach the shader objects
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        // Link the program object
        gl.linkProgram(program);

        // Check the result of linking
        var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
            var error = gl.getProgramInfoLog(program);
            console.log('Failed to link program: ' + error);
            gl.deleteProgram(program);
            gl.deleteShader(fragmentShader);
            gl.deleteShader(vertexShader);
            return null;
        }
        return program;
    }

    /**
     * Create a shader object
     * @param gl GL context
     * @param type the type of the shader object to be created
     * @param source shader program (string)
     * @return created shader object, or null if the creation has failed.
     */
    loadShader(gl, type, source) {
        // Create shader object
        var shader = gl.createShader(type);
        if (shader == null) {
            console.log('unable to create shader');
            return null;
        }

        // Set the shader program
        gl.shaderSource(shader, source);

        // Compile the shader
        gl.compileShader(shader);

        // Check the result of compilation
        var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            var error = gl.getShaderInfoLog(shader);
            console.log('Failed to compile shader: ' + error);
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    /** 
     * Initialize and get the rendering for WebGL
     * @param canvas <cavnas> element
     * @param opt_debug flag to initialize the context for debugging
     * @return the rendering context for WebGL
     */
    getWebGLContext(canvas, opt_debug) {
        // Get the rendering context for WebGL
        var gl = WebGLUtils.setupWebGL(canvas, {
            antialias: true,
            depth: false,
            alpha: false
        });
        if (!gl) return null;

        // if opt_debug is explicitly false, create the context for debugging
        if (arguments.length < 2 || opt_debug) {
            gl = WebGLDebugUtils.makeDebugContext(gl);
        }

        return gl;
    }

    loadImageTexture(gl, url, callback) {
        var image = new Image();
        var self = this;
        image.onload = function() {
            if (!self.isPowerOfTwo(image.width) || !self.isPowerOfTwo(image.height)) {
                // Scale up the texture to the next highest power of two dimensions.
                var canvas = document.createElement("canvas");
                canvas.width = self.nextHighestPowerOfTwo(image.width);
                canvas.height = self.nextHighestPowerOfTwo(image.height);
                var ctx = canvas.getContext("2d");
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                image = canvas;
            }
    
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
            // 生成mipmap
            gl.generateMipmap(gl.TEXTURE_2D);
            
            gl.bindTexture(gl.TEXTURE_2D, null);
            
            callback(texture);
        }
        image.src = url;
    }

    isPowerOfTwo(x) {
        return (x & (x - 1)) == 0;
    }

    nextHighestPowerOfTwo(x) {
        --x;
        for (var i = 1; i < 32; i <<= 1) {
            x = x | x >> i;
        }
        return x + 1;
    }

    resize(gl) {
        var realToCSSPixels = window.devicePixelRatio;

        // Lookup the size the browser is displaying the canvas in CSS pixels
        // and compute a size needed to make our drawingbuffer match it in
        // device pixels.
        var displayWidth  = Math.floor(gl.canvas.clientWidth  * realToCSSPixels);
        var displayHeight = Math.floor(gl.canvas.clientHeight * realToCSSPixels);

        // Check if the canvas is not the same size.
        if (gl.canvas.width  !== displayWidth ||
            gl.canvas.height !== displayHeight) {

            // Make the canvas the same size
            gl.canvas.width  = displayWidth;
            gl.canvas.height = displayHeight;
        }

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
}