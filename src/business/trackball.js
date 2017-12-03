import { Matrix4, Matrix3, Vector3, Vector2 } from './webgl/WebGLModelManager.js'
export class Trackball {
    epsilon = 1.0e-5; // 误差
    params = {
        startX: new Vector3(),      // 手势起始位置三维坐标，以X坐标为准
        endX: new Vector3(),        // 手势结束位置三维坐标，以X坐标为准
        startY: new Vector3(),      // 手势起始位置三维坐标，以Y坐标为准
        endY: new Vector3(),        // 手势结束位置三维坐标，以Y坐标为准
        adjustWidth: 0,             // 屏幕宽度
        adjustHeight: 0,            // 屏幕高度
        startPoint: new Vector2(),  // 起始位置二位坐标
        endPoint: new Vector2(),    // 结束位置二位坐标
        theta: 0,                   // 绕任意轴旋转角度
        fai: 0,                     // 绕X轴旋转角度
        startTheta: 0,              // 记录每次手势开始时的旋转角度
        startFai: 0,                // 记录每次手势开始时的旋转角度
        scale: 0,                   // 缩放比例
        startScale: 0,               // 记录开始缩放比例
        lastScale: 0                // 记录上一次缩放比例
    }
    
    constructor() {
    }

    layoutSize(size) {
        this.params.startX = new Vector3();
        this.params.endX = new Vector3();
        this.params.startY = new Vector3();
        this.params.endY = new Vector3();
        this.params.adjustWidth = size.x;
        this.params.adjustHeight = size.y;
        this.params.theta = 0.0;
        this.params.fai = 0.0;
        this.params.startTheta = 0.0;
        this.params.startFai = 0.0;
        this.params.lastScale = 1.0;
        this.params.startScale = 1.0;
        this.params.scale = 1.0;
    }

    mapToSphere(point) {
        var tempPoint = new Vector2(point.x, point.y);

        // 调整原点位置和坐标轴方向
        tempPoint.x = tempPoint.x - this.params.adjustWidth/2;
        tempPoint.y = this.params.adjustHeight/2 - tempPoint.y;

        // 坐标映射到[-1,1]
        var max = Math.max(this.params.adjustHeight, this.params.adjustWidth);
        max = (this.params.scale * 3 - 2) * max * 2/3;

        tempPoint.x = tempPoint.x / max;
        tempPoint.y = tempPoint.y / max;

        // x * x + y * y
        var length = tempPoint.x * tempPoint.x + tempPoint.y * tempPoint.y; 

        // 如果点超出球的边界
        if (length > 1.0) {
            // 强制限定到边界
            var vector = new Vector3(tempPoint.x, tempPoint.y, 0.0);
            // 单位化
            return vector.normalize();
        } else {
            // 点不超出边界
            return new Vector3(tempPoint.x, tempPoint.y, Math.sqrt(1.0 - length));
        }
    }

    touchDown(point) {
        this.params.startPoint = new Vector2(point.x, point.y);
        this.params.startX = this.mapToSphere(this.params.startPoint);
        this.params.startY = this.mapToSphere(this.params.startPoint);
        this.params.startTheta = this.params.theta;
        this.params.startFai = this.params.fai;
    }

    touchMove(point) {
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

        // [GLAnimationManager animateEaseOutWithDuration:0.2 valueFrom:&params.fai valueTo:tempFai];
        this.params.fai = tempFai;

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
        // [GLAnimationManager animateEaseOutWithDuration:0.3 valueFrom:&params.theta valueTo:tempTheta];
        this.params.theta = tempTheta;
    }

    touchEnd(point, velocity) {
        if(velocity == null) {
            velocity = new Vector2(0, 0);
        }
        var magnitudeX = Math.abs(velocity.x);
        var magnitudeY = Math.abs(velocity.y);
        // 如果长度小于200，则减少基本速度，否则增加它
        var slideMultX = magnitudeX / 200;
        var slideMultY = magnitudeY / 200;
        var slideFactorX = 0.1 * slideMultX;
        var slideFactorY = 0.1 * slideMultY;

        var tempFai = this.params.fai - velocity.y * slideFactorY * (Math.PI/2) / this.params.adjustHeight / (this.params.scale * 3 - 2);
        if (tempFai > Math.PI/2) {
            tempFai = Math.PI/2;
        } else if (tempFai < -Math.PI/2) {
            tempFai = -Math.PI/2;
        }

        var tempTheta = this.params.theta - velocity.x * slideFactorX * (Math.PI/2) / this.params.adjustWidth / (this.params.scale * 3 - 2);

        // 剔除nan
        if (velocity.x == 0) {
            slideFactorX = 0.0;
        }
        if (velocity.y == 0) {
            slideFactorY = 0.0;
        } else {
            slideFactorY = (this.params.fai - tempFai) * this.params.adjustHeight * (this.params.scale * 3 - 2) / velocity.y / (Math.PI/2);
        }
        // [GLAnimationManager animateEaseOutWithDuration:slideFactorY * 2 valueFrom:&params.fai valueTo:tempFai];
        this.params.fai = tempFai;
        // [GLAnimationManager animateEaseOutWithDuration:slideFactorX * 2 valueFrom:&params.theta valueTo:tempTheta];
        this.params.theta = tempTheta;
    }

    pinchDown(scale) {
        this.params.startScale = this.params.scale;
        this.params.lastScale = scale;
        //[GLAnimationManager stopAllAnimation];
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

        // [GLAnimationManager animateEaseOutWithDuration:0.3 valueFrom:&params.scale valueTo:tempScale];
        this.params.scale = tempScale;
    }

    doscale() {
        if(this.params.scale > 1) {
            this.params.scale = 1;
        }else {
            this.params.scale = 1.5;
        }
    }

    rotationMatrix4() {
        // 任意轴
        var axis = new Vector3(0, Math.cos(this.params.fai), Math.sin(this.params.fai));

        // 绕任意轴旋转矩阵
        var rotationAxis = this.rotateArbitraryAxis(axis, this.params.theta);

        // 绕X轴旋转
        var rotaionX = Matrix4.makeRotation(this.params.fai, 1, 0, 0);

        // 组合变化
        return Matrix4.multiply(rotationAxis, rotaionX);
    }

    degreeScale() {
        return this.params.scale;
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
