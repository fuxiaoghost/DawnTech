class AnimationValue {
    value = 0.0;
    constructor(value) {
        this.value = value;
    }
}
class AnimatioinParam  {
    timeOffset = 0;
    timeEnd = 0;
    value = new AnimationValue();
    valueFrom = 0;
    valueTo = 0;
    cx = 0;
    bx = 0;
    ax = 0;
    cy = 0;
    by = 0;
    ay = 0;
    p1x = 0;
    p1y = 0;
    p2x = 0;
    p2y = 0;
    end;
    next;
    delay;
}
class WebGLAnimation {
    
    static completions = null;
    static count = 100;
    static pointer = -1;
    static params = null;
    static prepareInfo(valueFrom){
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
    
    static stopAllAnimation() {
        if (WebGLAnimation.params == null) {
            return;
        }
        for (var i = 0; i < WebGLAnimation.count; i++) {
            WebGLAnimation.params[i].end = true;
        }
    }
    
    static animateEaseInWithDuration(time, valueFrom, valueTo) {
        // 加速
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
    
    static animateEaseOutWithDuration(time, valueFrom, valueTo) {
        // 减速
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
    
    static animateLinearWithDuration(time, valueFrom, valueTo) {
        // 匀速
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
    
    static animateEaseInOutWithDuration(time, valueFrom, valueTo) {
        // 先加速后减速
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
    
    static animationTimerStep(duration){
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
                    }else{
                        WebGLAnimation.params[i].next = true;
                    }
                }else{
                    var t = WebGLAnimation.params[i].timeOffset/WebGLAnimation.params[i].timeEnd;

                    WebGLAnimation.unitBezier(i);

                    WebGLAnimation.params[i].value.value = WebGLAnimation.params[i].valueFrom + (WebGLAnimation.params[i].valueTo - WebGLAnimation.params[i].valueFrom) * WebGLAnimation.solve(t, 1e-6, i);
                }
            }else{
                WebGLAnimation.params[i].delay -= duration;
            }
        }
    }
    
    // ExponentialEase
    static exponentialEaseFrom(valueFrom, valueTo, a, t) {
        var y = (Math.exp(a*t) -1)/(Math.exp(a) -1);
        return valueFrom + (valueTo - valueFrom) * y;
    }
    
    static unitBezier(i) {
        WebGLAnimation.params[i].cx = 3.0 * WebGLAnimation.params[i].p1x;
        WebGLAnimation.params[i].bx = 3.0 * (WebGLAnimation.params[i].p2x - WebGLAnimation.params[i].p1x) - WebGLAnimation.params[i].cx;
        WebGLAnimation.params[i].ax = 1.0 - WebGLAnimation.params[i].cx - WebGLAnimation.params[i].bx;
        
        WebGLAnimation.params[i].cy = 3.0 * WebGLAnimation.params[i].p1y;
        WebGLAnimation.params[i].by = 3.0 * (WebGLAnimation.params[i].p2y - WebGLAnimation.params[i].p1y) - WebGLAnimation.params[i].cy;
        WebGLAnimation.params[i].ay = 1.0 - WebGLAnimation.params[i].cy - WebGLAnimation.params[i].by;
    }
    
    static sampleCurveX(t, i) {
        // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.
        return ((WebGLAnimation.params[i].ax * t + WebGLAnimation.params[i].bx) * t + WebGLAnimation.params[i].cx) * t;
    }
    
    static sampleCurveY(t, i) {
        return ((WebGLAnimation.params[i].ay * t + WebGLAnimation.params[i].by) * t + WebGLAnimation.params[i].cy) * t;
    }
    
    static sampleCurveDerivativeX(t, i) {
        return (3.0 * WebGLAnimation.params[i].ax * t + 2.0 * WebGLAnimation.params[i].bx) * t + WebGLAnimation.params[i].cx;
    }
    
    static solveCurveX(x ,epsilon, index) {
        var t0;
        var t1;
        var t2;
        var x2;
        var d2;
        var i;
        
        // First try a few iterations of Newton's method -- normally very fast.
        for (t2 = x, i = 0; i < 8; i++) {
            x2 = WebGLAnimation.sampleCurveX(t2, index) - x;
            if (Math.abs(x2) < epsilon)
                return t2;
            d2 =  WebGLAnimation.sampleCurveDerivativeX(t2, index);
            if (Math.abs(d2) < epsilon)
                break;
            t2 = t2 - x2 / d2;
        }
        
        // Fall back to the bisection method for reliability.
        t0 = 0.0;
        t1 = 1.0;
        t2 = x;
        
        if (t2 < t0)
            return t0;
        if (t2 > t1)
            return t1;
        
        while (t0 < t1) {
            x2 = WebGLAnimation.sampleCurveX(t2, index);
            if (Math.abs(x2 - x) < epsilon)
                return t2;
            if (x > x2)
                t0 = t2;
            else
                t1 = t2;
            t2 = (t1 - t0) * .5 + t0;
        }
        
        // Failure.
        return t2;
    }
    
    static solve(x, epsilon, i) {
        var valuex = WebGLAnimation.solveCurveX(x, epsilon, i);
        return WebGLAnimation.sampleCurveY(valuex, i);
    }
} 

export {AnimationValue, WebGLAnimation}