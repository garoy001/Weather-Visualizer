varying vec3 vDepthColor;
varying vec3 vSurfaceColor;
varying vec2 vUv;
varying float vElevation;
uniform float uColorOffset;
uniform float uColorMultiplier;
uniform sampler2D uTextureColor;
uniform sampler2D uTextureHeight;
uniform sampler2D uTextureNormal;
uniform sampler2D uTextureRoughness;
uniform sampler2D uTextureAmbientOcclusion;
void main(){
    vec3 texColor = texture2D(uTextureColor,vUv).rgb;
    float ao = texture2D(uTextureAmbientOcclusion, vUv).r;
    vec3 normal = texture2D(uTextureNormal, vUv).rgb;
    float displacement = texture2D(uTextureHeight, vUv).r;
    float roughness = texture2D(uTextureRoughness, vUv).r;
float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
vec3 depthMix = mix(vDepthColor, vec3(texColor * ao + normal), 1.0);
vec3 surfaceMix = mix(vSurfaceColor, vec3(texColor * ao + normal), 1.0);
vec3 colorMix = mix(depthMix, surfaceMix, mixStrength);

  gl_FragColor = vec4(colorMix * 0.5, 2);
  //   + vec3(roughness)
}