export let sphere = function() {
    var epsilon = Math.PI * 10/180; // 误差
    var mmax = Math.PI/2 - epsilon;
    var mmaxvalue = Math.log(Math.tan(mmax) + 1.0/Math.cos(mmax))
    var ts = (Math.PI/2 - epsilon)/(Math.PI/2);
    var createSphere = function(hslice, vslice) {
        // return  new Float32Array([
        //     // 顶点坐标， 纹理坐标
        //     -1.0, 1.0, 0.0, 0.0, 1.0,
        //     -1.0, -1.0, 0.0, 0.0, 0.0,
        //     1.0, 1.0, 0.0, 1.0, 1.0,
        //     1.0, -1.0, 0.0, 1.0, 0.0
        // ]);
        var verticesSizes = new Float32Array(hslice * vslice * 3 * 2 * 5);
        var theta ,fai;
        var hstep = Math.PI/hslice;
        var vstep = 2 * Math.PI/vslice;
        var index = 0;
        for (var i = 0; i < hslice; i++) {
            theta = hstep * i;
            for (var j = 0; j < vslice; j++) {
                fai = -Math.PI + vstep * j;
                // 点坐标
                var p1 = getPointTheta(theta, fai);
                var p2 = getPointTheta(theta + hstep, fai);
                var p3 = getPointTheta(theta, fai + vstep);
                var p4 = getPointTheta(theta + hstep, fai + vstep);
                // 纹理坐标
                var st1 = getSTTheta(theta, fai);
                var st2 = getSTTheta(theta + hstep, fai);
                var st3 = getSTTheta(theta, fai + vstep);
                var st4 = getSTTheta(theta + hstep, fai + vstep);
    
                // 上三角
                index = getVertice(verticesSizes, p1, st1, index);
                index = getVertice(verticesSizes, p2, st2, index);
                index = getVertice(verticesSizes, p3, st3, index);
                // 下三角
                index = getVertice(verticesSizes, p3, st3, index);
                index = getVertice(verticesSizes, p2, st2, index);
                index = getVertice(verticesSizes, p4, st4, index);
            }
        }
        return verticesSizes;
    }
    var getVertice = function(verticesSizes, p, st, index) {
        verticesSizes.set([p.x, p.y, p.z, st.s, st.t], index);
        return index + 5;
    }
    var getPointTheta = function(theta, fai) {
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
    }
    var getSTTheta = function(theta, fai) {
        // 墨卡托坐标
        var s = 0.5 - (fai)/(2 * Math.PI);
        //[-π/2,π/2]
        var mtheta = -(theta - Math.PI/2) * ts;
        var t = Math.log(Math.tan(mtheta) + 1.0/Math.cos(mtheta))
        t = 0.5 + 0.5 * t/mmaxvalue;
        // 线性变化
        // t = 1 - (theta)/ Math.PI;
        return {s: s, t: t};
    }
    return {
        create: createSphere
    }
}();