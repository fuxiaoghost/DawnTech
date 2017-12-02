//
//  Shader.fsh
//  Panoram
//
//  Created by Kirn on 7/23/15.
//  Copyright (c) 2015 北京易客信息技术有限公司. All rights reserved.
//

varying lowp vec2 texcoordVarying;
varying lowp vec4 positionVarying;
uniform sampler2D colorMap;

void main()
{
    lowp vec4 textureColor = texture2D(colorMap,texcoordVarying);
    if (positionVarying.z < 0.0) {
        discard;
    }
    gl_FragColor = textureColor;
    
}
