//
//  Shader.vsh
//  Panoram
//
//  Created by Kirn on 7/23/15.
//  Copyright (c) 2015 北京易客信息技术有限公司. All rights reserved.
//

attribute vec4 position;
attribute vec2 texcoord;

uniform mat4 modelViewProjectionMatrix;
varying vec2 texcoordVarying;
varying vec4 positionVarying;

void main()
{
    positionVarying = position;
    texcoordVarying = texcoord;
    vec4 positionV = modelViewProjectionMatrix * position;
    positionVarying = positionV - modelViewProjectionMatrix * vec4(0.0,0.0,0.0,1.0);
    gl_Position = positionV;
}
