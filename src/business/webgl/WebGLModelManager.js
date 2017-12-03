class Matrix4  {
    m = [ 1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0, 
          0, 0, 0, 1];
    static multiply(matrixLeft, matrixRight) {
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
    matrix4GetMatrix3() {
        var matrix = this;
        m3.m = [ matrix.m[0], matrix.m[1], matrix.m[2], matrix.m[4], matrix.m[5], matrix.m[6], matrix.m[8], matrix.m[9], matrix.m[10] ];
        var m3 = new Matrix3();
        return m3;
    }

    copy() {
        var m4 = new Matrix4();
        m4.m = [this.m[0], this.m[1], this.m[2], this.m[3],
                this.m[4], this.m[5], this.m[6], this.m[7],
                this.m[8], this.m[9], this.m[10], this.m[11],
                this.m[12], this.m[13], this.m[14], this.m[15],
                ];
        return m4;
    }

    static makePerspective(fovyRadians, aspect, nearZ, farZ) {
        var cotan = 1.0 / Math.tan(fovyRadians / 2.0);
        var m = new Matrix4();
        m.m = [ cotan/aspect, 0.0, 0.0, 0.0,0.0, cotan, 0.0, 0.0,0.0, 0.0, (farZ + nearZ) / (nearZ - farZ), -1.0,0.0, 0.0, (2.0 * farZ * nearZ) / (nearZ - farZ), 0.0 ];
        
        return m;
    }

    static makeTranslation(tx, ty, tz) {
        var m4 = new Matrix4();
        m4.m[12] = tx;
        m4.m[13] = ty;
        m4.m[14] = tz;
        return m4;
    }

    static makeRotation(radians, x, y, z) {
        var v = (new Vector3(x, y, z)).normalize();
        var cos = Math.cos(radians);
        var cosp = 1.0 - cos;
        var sin = Math.sin(radians);
        
        var m4 = new Matrix4();
        m4.m = [cos + cosp * v.v[0] * v.v[0],   
                cosp * v.v[0] * v.v[1] + v.v[2] * sin,
                cosp * v.v[0] * v.v[2] - v.v[1] * sin,
                0.0,
                cosp * v.v[0] * v.v[1] - v.v[2] * sin,
                cos + cosp * v.v[1] * v.v[1],
                cosp * v.v[1] * v.v[2] + v.v[0] * sin,
                0.0,
                cosp * v.v[0] * v.v[2] + v.v[1] * sin,
                cosp * v.v[1] * v.v[2] - v.v[0] * sin,
                cos + cosp * v.v[2] * v.v[2],
                0.0,
                0.0,
                0.0,
                0.0,
                1.0];
    
        return m4;
    }
}

class Matrix3 {
    m = [1, 0, 0,
         0, 1, 0,
         0, 0, 1];
    getInverse() {
        var matrix = this;
        var me = matrix.m;
        var te = m;

        var n11 = me[0], n21 = me[1], n31 = me[2];
        var n12 = me[3], n22 = me[4], n32 = me[5];
        var n13 = me[6], n23 = me[7], n33 = me[8];

        var t11 = n33 * n22 - n32 * n23;
        var t12 = n32 * n13 - n33 * n12;
        var t13 = n23* n12 - n22* n13;

        var det = n11 * t11 + n21 * t12 + n31 * t13;

        if (det == 0) {
            var msg = "THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0";
            console.warn(msg);
            m = [ 1, 0, 0,
                0, 1, 0,
                0, 0, 1 ];
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
    transpose() {
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
};

class Vector3 {
    v = [0, 0, 0];
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    get x() {
        return this.v[0];
    }
    
    set x(value) {
        this.v[0] = value;
    }

    get y() {
        return this.v[1];
    }

    set y(value) {
        this.v[1] = value;
    }

    get z() {
        return this.v[2];
    }

    set z(value) {
        this.v[2] = value;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    normalize() {
        var scale = 1.0 / this.length();
        this.x = this.x * scale;
        this.y = this.y * scale;
        this.z = this.z * scale;
        return this;
    }

    static dotProduct(vectorLeft, vectorRight) {
        return vectorLeft.x * vectorRight.x + vectorLeft.y * vectorRight.y + vectorLeft.z * vectorRight.z;
    }
}

class Vector2 {
    v = [0, 0];
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get x() {
        return this.v[0];
    }
    
    set x(value) {
        this.v[0] = value;
    }

    get y() {
        return this.v[1];
    }

    set y(value) {
        this.v[1] = value;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

let WebGLModelManager = function() {
    var projectionMatrix = new Matrix4();
    var modelViewMatrix = new Matrix4();

    var modelViewStack = [];

    var modelViewProjectionMatrix = function() {
        return Matrix4.multiply(WebGLModelManager.projectionMatrix, modelViewMatrix);
    }

    var normalMatrix = function() {
        return modelViewMatrix.matrix4GetMatrix3().getInverse().transpose();
    }

    var push = function() {
        modelViewStack.push(new Matrix4());
    }

    var pop = function() {
        modelViewStack.pop();
    }

    var multiplyMatrix4 = function(matrix) {
        var m = modelViewStack[modelViewStack.length - 1];
        modelViewStack[modelViewStack.length - 1] = Matrix4.multiply(m, matrix);
    }

    var updateModelViewMatrix = function() {
        modelViewMatrix = modelViewStack[modelViewStack.length - 1].copy();
    }

    return {
        projectionMatrix: projectionMatrix,
        modelViewProjectionMatrix: modelViewProjectionMatrix,
        normalMatrix: normalMatrix,
        push: push,
        pop: pop,
        multiplyMatrix4: multiplyMatrix4,
        updateModelViewMatrix: updateModelViewMatrix
    }
}();

export {Matrix4, Matrix3, Vector3, Vector2, WebGLModelManager};