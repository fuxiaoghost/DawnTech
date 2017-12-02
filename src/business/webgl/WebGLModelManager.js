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
        var m3 = Matrix3();
        return m3;
    }

    static makePerspective(fovyRadians, aspect, nearZ, farZ) {
        var cotan = 1.0 / Math.tan(fovyRadians / 2.0);
        var m = new Matrix4();
        m.m = [ cotan/aspect, 0.0, 0.0, 0.0,0.0, cotan, 0.0, 0.0,0.0, 0.0, (farZ + nearZ) / (nearZ - farZ), -1.0,0.0, 0.0, (2.0 * farZ * nearZ) / (nearZ - farZ), 0.0 ];
        
        return m;
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

let WebGLModelManager = function() {
    var projectionMatrix = new Matrix4();
    var modelViewMatrix = new Matrix4();

    var modelViewProjectionMatrix = function() {
        return Matrix4.multiply(WebGLModelManager.projectionMatrix, WebGLModelManager.modelViewMatrix);
    }

    var normalMatrix = function() {
        return WebGLModelManager.modelViewMatrix.matrix4GetMatrix3().getInverse().transpose();
    }
    return {
        projectionMatrix: projectionMatrix,
        modelViewMatrix: modelViewMatrix,
        modelViewProjectionMatrix: modelViewProjectionMatrix,
        normalMatrix: normalMatrix
    }
}();

export {Matrix4, Matrix3, WebGLModelManager};