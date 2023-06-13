#ifdef GL_ES
precision mediump float;
#endif
uniform sampler2D uTextureColor;
uniform float uTime;
uniform vec2 resolution;
      varying vec2 vUv;
vec2 random(vec2 st) {
    st = vec2( dot(st,vec2(127.1,311.7)), dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float noise(vec2 st) {
    
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix( mix( dot(random(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)), 
                     dot(random(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
                mix( dot(random(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)), 
                     dot(random(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x), u.y);
}

void main() {
    
    vec2 newVUV = vUv/resolution;
    
    float n = noise(newVUV + uTime * 0.1);
    vec4 texColor = texture2D(uTextureColor,newVUV).rgba;
    n = smoothstep(0.4, 0.6, n);  // creates more distinct cloud formations
   
    vec4 cloudColor = vec4(vec3(1.0), n);  // white clouds
    vec4 colorMix = mix(cloudColor, texColor, 1.0);
    vec4 backgroundColor = vec4(vec3(1.0, 1.0, 1.0), 1.0);  // blue sky
    
    // Final color
    gl_FragColor = mix(backgroundColor, colorMix, n);
}