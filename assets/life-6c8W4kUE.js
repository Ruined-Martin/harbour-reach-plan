function i(o,l,n=1){const r={value:n};return o.onBeforeCompile=e=>{e.uniforms.uNight=l.night,e.uniforms.uGlow=r,e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
attribute float gloss; varying float vGloss;`).replace("#include <color_vertex>",`#include <color_vertex>
vGloss = gloss;
#if defined( USE_INSTANCING_COLOR ) && defined( USE_COLOR )
vColor.rgb = mix( vColor.rgb, color, gloss );
#endif`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
uniform float uNight; uniform float uGlow; varying float vGloss;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
totalEmissiveRadiance += diffuseColor.rgb * ( vGloss * uNight * uGlow );`)},o}export{i as g};
