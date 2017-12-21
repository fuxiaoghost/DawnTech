//https://www.khronos.org/opengl/wiki/Object_Mouse_Trackball
import { Matrix4, Matrix3, Vector4, Vector3, Vector2 } from './webgl/WebGLModelManager.js';
import { WebGLAnimation, AnimationValue} from './webgl/WebGLAnimation.js';

export class Trackball {
    epsilon = 1.0e-5; // 误差
    params = {
        startX: new Vector3(0, 0, 0),      // 手势起始位置三维坐标，以X坐标为准
        endX: new Vector3(0, 0, 0),        // 手势结束位置三维坐标，以X坐标为准
        startY: new Vector3(0, 0, 0),      // 手势起始位置三维坐标，以Y坐标为准
        endY: new Vector3(0, 0, 0),        // 手势结束位置三维坐标，以Y坐标为准
        adjustWidth: 0,             // 屏幕宽度
        adjustHeight: 0,            // 屏幕高度
        startPoint: new Vector2(0, 0),  // 起始位置二位坐标
        endPoint: new Vector2(0, 0),    // 结束位置二位坐标
        timestamp: 0,               // 时间戳
        move: new Vector2(0, 0),        // 位移
        timeinterval: 0,            // 时间间隔
        theta: 0,                   // 绕任意轴旋转角度
        fai: 0,                     // 绕X轴旋转角度
        startTheta: 0,              // 记录每次手势开始时的旋转角度
        startFai: 0,                // 记录每次手势开始时的旋转角度
        scale: 0,                   // 缩放比例
        startScale: 0,               // 记录开始缩放比例
        lastScale: 0                // 记录上一次缩放比例
    }
    projectionMatrix = new Matrix4();
    
    
    constructor() {
    }

    layoutSize(size) {
        this.params.startX = new Vector3(0, 0, 0);
        this.params.endX = new Vector3(0, 0, 0);
        this.params.startY = new Vector3(0, 0, 0);
        this.params.endY = new Vector3(0, 0, 0);
        this.params.adjustWidth = size.x;
        this.params.adjustHeight = size.y;
        this.params.theta = new AnimationValue(0);
        this.params.fai = new AnimationValue(0);
        this.params.startTheta = 0.0;
        this.params.startFai = 0.0;
        this.params.lastScale = 1.0;
        this.params.startScale = 1.0;
        this.params.scale = new AnimationValue(1.5);
    }

    mapToSphere(point) {
        var tempPoint = new Vector2(point.x, point.y);
        var r = 1.0;
        // 调整原点位置和坐标轴方向
        tempPoint.x = tempPoint.x - this.params.adjustWidth/2;
        tempPoint.y = this.params.adjustHeight/2 - tempPoint.y;

        // 坐标映射到[-1,1]
        var max = Math.max(this.params.adjustHeight, this.params.adjustWidth);
        // max = (this.params.scale.value * 3 - 2) * max * 2/3;

        tempPoint.x = tempPoint.x / this.params.adjustHeight;
        tempPoint.y = tempPoint.y / this.params.adjustHeight;

        // x * x + y * y
        var length = tempPoint.x * tempPoint.x + tempPoint.y * tempPoint.y; 

        var vector = null;
        if (length > r * r/2) {
            // 如果点超出球的边界
            vector = new Vector3(tempPoint.x , tempPoint.y, r * r/2/(Math.sqrt(length)));
        } else {
            // 点不超出边界
            vector = new Vector3(tempPoint.x, tempPoint.y, Math.sqrt(1.0 - length));
        }
        // var matrix = Matrix4.multiply(this.projectionMatrix, Matrix4.makeScale(scale, scale, scale));
        // var transVector = Matrix4.multiplyVector4(matrix, new Vector4(vector.x, vector.y, vector.z, 1.0));
        // vector.x = transVector.x;
        // vector.y = transVector.y;
        // vector.z = transVector.x;
        return vector.normalize();
    }

    touchDown(point) {
        this.params.startPoint = new Vector2(point.x, point.y);
        this.params.startX = this.mapToSphere(this.params.startPoint);
        this.params.startY = this.mapToSphere(this.params.startPoint);
        this.params.startTheta = this.params.theta.value;
        this.params.startFai = this.params.fai.value;
        this.params.move = new Vector2(0, 0);
        this.params.timeinterval = 1;
        this.params.endPoint = new Vector2(point.x, point.y);
        this.params.timestamp = new Date().getTime();
    }

    touchMove(point) {
        this.params.timeinterval = new Date().getTime() - this.params.timestamp;
        this.params.timestamp = new Date().getTime();
        this.params.move = new Vector2(point.x - this.params.endPoint.x, point.y - this.params.endPoint.y);
        this.params.endPoint = new Vector2(point.x, point.y);
        this.params.endX = this.mapToSphere(new Vector2(this.params.endPoint.x, this.params.startPoint.y));
        this.params.endY = this.mapToSphere(new Vector2(this.params.startPoint.x, this.params.endPoint.y));

        var theta, fai;

        // x轴旋转角度
        if (Math.abs(this.params.endY.y - this.params.startY.y) < this.epsilon) {
            fai = 0;
        } else {
            fai = 2 * Math.acos(Vector3.dotProduct(this.params.startY, this.params.endY) / this.params.startY.length() / this.params.endY.length());
            if (this.params.endY.y - this.params.startY.y < 0) {
                fai = -fai;
            }
        }
        var tempFai = this.params.startFai + fai;
        // 限定边界[-pi/2,pi/2]
        if (tempFai > Math.PI/2) {
            tempFai = Math.PI/2;
        } else if (tempFai < -Math.PI/2) {
            tempFai = -Math.PI/2;
        }

        WebGLAnimation.animateEaseOutWithDuration(0.1, this.params.fai, tempFai);

        // 变动轴旋转角度
        if (Math.abs(this.params.endX.x - this.params.startX.x) < this.epsilon) {
            theta = 0;
        } else {
            theta = 2 * Math.acos(Vector3.dotProduct(this.params.startX, this.params.endX) / this.params.startX.length() / this.params.endX.length());
            if (this.params.endX.x - this.params.startX.x > 0) {
                theta = -theta;
            }
        }
        var tempTheta = this.params.startTheta + theta;
        WebGLAnimation.animateEaseOutWithDuration(0.1, this.params.theta, tempTheta);
    }

    touchEnd(point, velocity) {
        if(velocity == null) {
            velocity = new Vector2(800 * this.params.move.x/this.params.timeinterval, 800 *this.params.move.y/this.params.timeinterval);
        }
        if(velocity.x > 10000) {
            velocity.x = 10000;
        }else if(velocity.x < -10000) {
            velocity.x = -10000;
        }

        if(velocity.y > 10000) {
            velocity.y = 10000;
        }else if(velocity.y < -10000) {
            velocity.y = -10000;
        }

        var magnitudeX = Math.abs(velocity.x);
        var magnitudeY = Math.abs(velocity.y);
        // 如果长度小于200，则减少基本速度，否则增加它
        var slideMultX = magnitudeX / 200;
        var slideMultY = magnitudeY / 200;
        var slideFactorX = 0.1 * slideMultX;
        var slideFactorY = 0.1 * slideMultY;

        var tempFai = this.params.fai.value - velocity.y * slideFactorY * (Math.PI/2) / this.params.adjustHeight / this.params.scale.value;
        if (tempFai > Math.PI/2) {
            tempFai = Math.PI/2;
        } else if (tempFai < -Math.PI/2) {
            tempFai = -Math.PI/2;
        }

        var tempTheta = this.params.theta.value - velocity.x * slideFactorX * (Math.PI/2) / this.params.adjustWidth / this.params.scale.value;

        // 剔除nan
        if (velocity.x == 0) {
            slideFactorX = 0.0;
        }
        if (velocity.y == 0) {
            slideFactorY = 0.0;
        } else {
            slideFactorY = (this.params.fai.value - tempFai) * this.params.adjustHeight * (this.params.scale.value) / velocity.y / (Math.PI/2);
        }
        WebGLAnimation.animateEaseOutWithDuration(slideFactorY * 2, this.params.fai, tempFai);
        WebGLAnimation.animateEaseOutWithDuration(slideFactorX * 2, this.params.theta, tempTheta);
    }

    pinchDown(scale) {
        this.params.startScale = this.params.scale.value;
        this.params.lastScale = scale;
    }

    pinchMove(scale) {
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

    doscale() {
        if(this.params.scale.value > 1.5) {
            WebGLAnimation.animateEaseOutWithDuration(0.3, this.params.scale, 1.5);
        }else {
            WebGLAnimation.animateEaseOutWithDuration(0.3, this.params.scale, 3.0);
        }
    }

    rotationMatrix4() {
        // 任意轴
        var axis = new Vector3(0, Math.cos(this.params.fai.value), Math.sin(this.params.fai.value));

        // 绕任意轴旋转矩阵
        var rotationAxis = this.rotateArbitraryAxis(axis, this.params.theta.value);

        // 绕X轴旋转
        var rotaionX = Matrix4.makeRotation(this.params.fai.value, 1, 0, 0);

        // 组合变化
        return Matrix4.multiply(rotationAxis, rotaionX);
    }

    degreeScale() {
        return this.params.scale.value;
    }

    // 绕任意轴旋转
    rotateArbitraryAxis(axis, theta) {
        axis = axis.normalize();
        var u = axis.x;
        var v = axis.y;
        var w = axis.z;

        var rotation = new Matrix4();
        rotation.m[0] = Math.cos(theta) + (u * u) * (1 - Math.cos(theta));
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
}
