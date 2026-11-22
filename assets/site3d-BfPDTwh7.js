import{T as $t,t as St,b as O,j as T,d as Ne,s as Fe,D as He,f as $e}from"./index-BZbcFSQ9.js";import{S as ze,a as Ft,U as Ae,V as At,b as Ht,I as Ge,F as ft,c as oe,d as Mt,W as qe,B as ce,e as Ee,f as U,M as Y,g as Ut,L as Ve,h as gt,i as Ke,j as he,k as Pe,l as Ye,m as Ze,C as de,n as Ce,o as ue,G as Bt,p as X,R as Je,q as Xe,r as Qe,s as vt,t as K,Q as Tt,u as ts,v as fe,P as es,w as ss,x as ns,A as os,y as Jt,z as is,D as Xt,E as rs,H as as,O as ls,J as cs,K as hs}from"./OrbitControls-BMoAZxnf.js";Ht.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new At},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Ft.line={uniforms:Ae.merge([Ht.common,Ht.fog,Ht.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = perspective ? normalize( mix( start.xyz, end.xyz, 0.5 ) ) : vec3( 0.0, 0.0, - 1.0 );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;

				// only shift the depth of vertices in front of the camera (#35137)
				if ( clip.w > 0.0 ) clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				float len;

				if ( isOrthographic ) {

					// View rays are parallel to the z axis so the distance reduces to camera-space XY
					vec2 lineDir = worldEnd.xy - worldStart.xy;
					float t = clamp( dot( worldPos.xy - worldStart.xy, lineDir ) / dot( lineDir, lineDir ), 0.0, 1.0 );
					len = length( worldStart.xy + lineDir * t - worldPos.xy );

				} else {

					// Find the closest points on the view ray and the line segment
					vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
					vec3 lineDir = worldEnd - worldStart;
					vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

					vec3 p1 = worldStart + lineDir * params.x;
					vec3 p2 = rayEnd * params.y;
					vec3 delta = p1 - p2;
					len = length( delta );

				}

				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class Le extends ze{constructor(t){super({type:"LineMaterial",uniforms:Ae.clone(Ft.line.uniforms),vertexShader:Ft.line.vertexShader,fragmentShader:Ft.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0!==this.worldUnits&&(this.needsUpdate=!0),t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const pe=new ce,Ot=new U;class ie extends Ge{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],s=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(s),this.setAttribute("position",new ft(t,3)),this.setAttribute("uv",new ft(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,s=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),s.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const s=new oe(e,6,1);return this.setAttribute("instanceStart",new Mt(s,3,0)),this.setAttribute("instanceEnd",new Mt(s,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const s=new oe(e,6,1);return this.setAttribute("instanceColorStart",new Mt(s,3,0)),this.setAttribute("instanceColorEnd",new Mt(s,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new qe(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ce);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),pe.setFromBufferAttribute(e),this.boundingBox.union(pe))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ee),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const s=this.boundingSphere.center;this.boundingBox.getCenter(s);let r=0;for(let o=0,a=t.count;o<a;o++)Ot.fromBufferAttribute(t,o),r=Math.max(r,s.distanceToSquared(Ot)),Ot.fromBufferAttribute(e,o),r=Math.max(r,s.distanceToSquared(Ot));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}const Qt=new Ut,me=new U,ge=new U,G=new Ut,q=new Ut,nt=new Ut,te=new U,ee=new gt,V=new Ve,ve=new U,jt=new ce,It=new Ee,ot=new Ut;let it,bt;function we(i,t,e){return ot.set(0,0,-t,1).applyMatrix4(i.projectionMatrix),ot.multiplyScalar(1/ot.w),ot.x=bt/e.width,ot.y=bt/e.height,ot.applyMatrix4(i.projectionMatrixInverse),ot.multiplyScalar(1/ot.w),Math.abs(Math.max(ot.x,ot.y))}function ds(i,t){const e=i.matrixWorld,s=i.geometry,r=s.attributes.instanceStart,o=s.attributes.instanceEnd,a=Math.min(s.instanceCount,r.count);for(let l=0,n=a;l<n;l++){V.start.fromBufferAttribute(r,l),V.end.fromBufferAttribute(o,l),V.applyMatrix4(e);const d=new U,c=new U;it.distanceSqToSegment(V.start,V.end,c,d),c.distanceTo(d)<bt*.5&&t.push({point:c,pointOnLine:d,distance:it.origin.distanceTo(c),object:i,face:null,faceIndex:l,uv:null,uv1:null})}}function us(i,t,e){const s=t.projectionMatrix,o=i.material.resolution,a=i.matrixWorld,l=i.geometry,n=l.attributes.instanceStart,d=l.attributes.instanceEnd,c=Math.min(l.instanceCount,n.count),u=-t.near;it.at(1,nt),nt.w=1,nt.applyMatrix4(t.matrixWorldInverse),nt.applyMatrix4(s),nt.multiplyScalar(1/nt.w),nt.x*=o.x/2,nt.y*=o.y/2,nt.z=0,te.copy(nt),ee.multiplyMatrices(t.matrixWorldInverse,a);for(let h=0,p=c;h<p;h++){if(G.fromBufferAttribute(n,h),q.fromBufferAttribute(d,h),G.w=1,q.w=1,G.applyMatrix4(ee),q.applyMatrix4(ee),G.z>u&&q.z>u)continue;if(G.z>u){const b=G.z-q.z,L=(G.z-u)/b;G.lerp(q,L)}else if(q.z>u){const b=q.z-G.z,L=(q.z-u)/b;q.lerp(G,L)}G.applyMatrix4(s),q.applyMatrix4(s),G.multiplyScalar(1/G.w),q.multiplyScalar(1/q.w),G.x*=o.x/2,G.y*=o.y/2,q.x*=o.x/2,q.y*=o.y/2,V.start.copy(G),V.start.z=0,V.end.copy(q),V.end.z=0;const m=V.closestPointToPointParameter(te,!0);V.at(m,ve);const x=Ke.lerp(G.z,q.z,m),w=x>=-1&&x<=1,g=te.distanceTo(ve)<bt*.5;if(w&&g){V.start.fromBufferAttribute(n,h),V.end.fromBufferAttribute(d,h),V.start.applyMatrix4(a),V.end.applyMatrix4(a);const b=new U,L=new U;it.distanceSqToSegment(V.start,V.end,L,b),e.push({point:L,pointOnLine:b,distance:it.origin.distanceTo(L),object:i,face:null,faceIndex:h,uv:null,uv1:null})}}}class Rt extends Y{constructor(t=new ie,e=new Le({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,s=t.attributes.instanceEnd,r=new Float32Array(2*e.count);for(let a=0,l=0,n=e.count;a<n;a++,l+=2)me.fromBufferAttribute(e,a),ge.fromBufferAttribute(s,a),r[l]=l===0?0:r[l-1],r[l+1]=r[l]+me.distanceTo(ge);const o=new oe(r,2,1);return t.setAttribute("instanceDistanceStart",new Mt(o,1,0)),t.setAttribute("instanceDistanceEnd",new Mt(o,1,1)),this}raycast(t,e){const s=this.material.worldUnits,r=t.camera;if(r===null&&!s&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),s===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;const o=t.params.Line2!==void 0&&t.params.Line2.threshold||0;it=t.ray;const a=this.matrixWorld,l=this.geometry,n=this.material;bt=n.linewidth+o,l.boundingSphere===null&&l.computeBoundingSphere(),It.copy(l.boundingSphere).applyMatrix4(a);let d;if(s)d=bt*.5;else{const u=Math.max(r.near,It.distanceToPoint(it.origin));d=we(r,u,n.resolution)}if(It.radius+=d,it.intersectsSphere(It)===!1)return;l.boundingBox===null&&l.computeBoundingBox(),jt.copy(l.boundingBox).applyMatrix4(a);let c;if(s)c=bt*.5;else{const u=Math.max(r.near,jt.distanceToPoint(it.origin));c=we(r,u,n.resolution)}jt.expandByScalar(c),it.intersectsBox(jt)!==!1&&(s?ds(this,e):us(this,r,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(Qt),this.material.uniforms.resolution.value.set(Qt.z,Qt.w))}}const k=.5,Et=3.1,dt=.3,wt=Et-dt,at=4.2;function Pt(i){const t=[];for(const e of i.matchAll(/([MLHVC])([^MLHVCZ]*)/g)){const s=e[2].match(/-?[\d.]+/g)?.map(Number)??[],r=t[t.length-1]??[0,0];if(e[1]==="H")t.push([s[0],r[1]]);else if(e[1]==="V")t.push([r[0],s[0]]);else if(e[1]==="C")for(let o=0;o+5<s.length;o+=6)t.push([s[o+4],s[o+5]]);else for(let o=0;o+1<s.length;o+=2)t.push([s[o],s[o+1]])}return t}function et(i){const t=Pt(i);return t.length>1&&t[0][0]===t[t.length-1][0]&&t[0][1]===t[t.length-1][1]&&t.pop(),t}const fs=i=>[...i.matchAll(/M(-?[\d.]+),(-?[\d.]+)a([\d.]+),/g)].map(t=>({r:+t[3],x:+t[1]+ +t[3],y:+t[2]})),rt=i=>{const t=i.map(o=>o[0]),e=i.map(o=>o[1]),s=Math.min(...t),r=Math.min(...e);return[s,r,Math.max(...t)-s,Math.max(...e)-r]},kt=i=>{let t=0;for(let e=0;e<i.length;e++){const s=i[(e+1)%i.length];t+=i[e][0]*s[1]-s[0]*i[e][1]}return t/2},Kt=i=>{let t=0,e=0,s=0;for(let r=0;r<i.length;r++){const o=i[(r+1)%i.length],a=i[r][0]*o[1]-o[0]*i[r][1];t+=a,e+=(i[r][0]+o[0])*a,s+=(i[r][1]+o[1])*a}return Math.abs(t)<1e-9?[i.reduce((r,o)=>r+o[0],0)/i.length,i.reduce((r,o)=>r+o[1],0)/i.length]:[e/(3*t),s/(3*t)]},zt=i=>kt(i)<0?[...i].reverse():i,be=i=>{const t=Math.hypot(i[0],i[1])||1;return[i[0]/t,i[1]/t]};function De(i,t){const e=zt(i),s=e.length,r=[];for(let o=0;o<s;o++){const a=e[(o+s-1)%s],l=e[o],n=e[(o+1)%s],d=be([l[0]-a[0],l[1]-a[1]]),c=be([n[0]-l[0],n[1]-l[1]]),u=[d[1],-d[0]],h=[c[1],-c[0]],p=u[0]+h[0],f=u[1]+h[1],m=1+u[0]*h[0]+u[1]*h[1],x=m<.2?1:1/m;r.push([l[0]+p*x*t,l[1]+f*x*t])}return r}function ps(i,t){let e=i;for(let s=0;s<t.length&&e.length;s++){const r=t[s],o=t[(s+1)%t.length],a=n=>(o[0]-r[0])*(n[1]-r[1])-(o[1]-r[1])*(n[0]-r[0]),l=e;e=[];for(let n=0;n<l.length;n++){const d=l[n],c=l[(n+1)%l.length],u=a(d),h=a(c);if(u>=0&&e.push(d),u>=0!=h>=0){const p=u/(u-h);e.push([d[0]+(c[0]-d[0])*p,d[1]+(c[1]-d[1])*p])}}}return e}const ms=i=>{for(let t=0;t<i.length;t++){const e=i[t],s=i[(t+1)%i.length],r=i[(t+2)%i.length];if((s[0]-e[0])*(r[1]-s[1])-(s[1]-e[1])*(r[0]-s[0])<-1e-7)return!1}return!0};function gs(i){const t=zt(i);let s=he.triangulateShape(t.map(o=>new At(o[0],o[1])),[]).map(o=>{const a=[o[0],o[1],o[2]];return kt(a.map(l=>t[l]))<0?a.reverse():a}),r=!0;for(;r;){r=!1;t:for(let o=0;o<s.length;o++)for(let a=o+1;a<s.length;a++){const l=s[o],n=s[a];for(let d=0;d<l.length;d++){const c=l[d],u=l[(d+1)%l.length],h=n.findIndex((f,m)=>f===u&&n[(m+1)%n.length]===c);if(h<0)continue;const p=[];for(let f=0;f<l.length;f++)p.push(l[(d+1+f)%l.length]);for(let f=2;f<n.length;f++)p.push(n[(h+f)%n.length]);if(ms(p.map(f=>t[f]))){s=s.filter((f,m)=>m!==o&&m!==a),s.push(p),r=!0;break t}}}}return s.map(o=>o.map(a=>t[a]))}const ye=(i,t,e)=>{const s=e[0]-t[0],r=e[1]-t[1],o=s*s+r*r,a=o?Math.max(0,Math.min(1,((i[0]-t[0])*s+(i[1]-t[1])*r)/o)):0;return Math.hypot(i[0]-(t[0]+s*a),i[1]-(t[1]+r*a))},vs=(i,t,e,s=.08)=>e.some((r,o)=>{const a=e[(o+1)%e.length];return ye(i,r,a)<s&&ye(t,r,a)<s});function ws(i){const t=zt(et(i.footprint)),e=i.floorPlate.units.map(n=>({stack:n.stack,p:et(n.d)})),s=rt(e.flatMap(n=>n.p)),r=rt(t),o=n=>[r[0]+(n[0]-s[0])/s[2]*r[2],r[1]+(n[1]-s[1])/s[3]*r[3]],a=gs(t),l=e.map(n=>({stack:n.stack,pieces:a.map(d=>ps(zt(n.p.map(o)),d)).filter(d=>d.length>=3&&Math.abs(kt(d))>.5)}));return{code:i.code,footprint:t,parts:a,stacks:l,core:zt(et(i.floorPlate.core).map(o)),floors:i.floors}}const se=i=>at+(i-1)*Et,bs=i=>at+i*Et,ys=i=>{const[t,e,s,r]=rt(i);return[[t,e],[t+s,e],[t+s,e+r],[t,e+r]]},xs=(i,t)=>Kt(ys(i.pieces.length?i.pieces.flat():t));function Ss(i){let t={area:1/0,cx:0,cy:0,w:0,h:0,ang:0};for(let e=0;e<i.length;e++){const s=i[e],r=i[(e+1)%i.length],o=Math.atan2(r[1]-s[1],r[0]-s[0]),a=Math.cos(-o),l=Math.sin(-o),n=i.map(p=>[p[0]*a-p[1]*l,p[0]*l+p[1]*a]),[d,c,u,h]=rt(n);if(u*h<t.area){const p=d+u/2,f=c+h/2;t={area:u*h,cx:p*Math.cos(o)-f*Math.sin(o),cy:p*Math.sin(o)+f*Math.cos(o),w:u,h,ang:o}}}return t}class tt{pos=[];nor=[];col=[];tri(t,e,s,r){const o=e[0]-t[0],a=e[1]-t[1],l=e[2]-t[2],n=s[0]-t[0],d=s[1]-t[1],c=s[2]-t[2];let u=a*c-l*d,h=l*n-o*c,p=o*d-a*n;const f=Math.hypot(u,h,p);if(!(f<1e-9)){u/=f,h/=f,p/=f;for(const m of[t,e,s])this.pos.push(m[0],m[1],m[2]),this.nor.push(u,h,p),this.col.push(r[0],r[1],r[2])}}quad(t,e,s,r,o){this.tri(t,e,s,o),this.tri(t,s,r,o)}wall(t,e,s,r,o){this.quad([t[0],s,t[1]],[e[0],s,e[1]],[e[0],r,e[1]],[t[0],r,t[1]],o)}cap(t,e,s,r=!0){const o=he.triangulateShape(t.map(a=>new At(a[0],a[1])),[]);for(const a of o){let[l,n,d]=a.map(u=>t[u]);(n[1]-l[1])*(d[0]-l[0])-(n[0]-l[0])*(d[1]-l[1])>0!==r&&([n,d]=[d,n]),this.tri([l[0],e,l[1]],[n[0],e,n[1]],[d[0],e,d[1]],s)}}prism(t,e,s,r,o={}){const a=kt(t)>0?[...t].reverse():t;for(let l=0;l<a.length;l++)this.wall(a[l],a[(l+1)%a.length],e,s,o.side??r);o.top!==!1&&this.cap(a,s,r,!0),o.bottom&&this.cap(a,e,r,!1)}ring(t,e,s,r,o){const a=kt(t)>0?[...t].reverse():t,l=kt(t)>0?[...e].reverse():e,n=a.length;for(let d=0;d<n;d++){const c=(d+1)%n;this.wall(a[d],a[c],s,r,o),this.wall(l[c],l[d],s,r,o),this.quad([a[d][0],r,a[d][1]],[l[d][0],r,l[d][1]],[l[c][0],r,l[c][1]],[a[c][0],r,a[c][1]],o)}}box(t,e,s,r,o,a,l,n=0){const d=Math.cos(n),c=Math.sin(n),u=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([h,p])=>[t+(h*r*d-p*a*c)/2,s+(h*r*c+p*a*d)/2]);this.prism(u,e,e+o,l)}build(){const t=new Pe;return t.setAttribute("position",new ft(this.pos,3)),t.setAttribute("normal",new ft(this.nor,3)),t.setAttribute("color",new ft(this.col,3)),t.computeBoundingSphere(),t.computeBoundingBox(),t}}const ut=[1,1,1],Ms=[.5,.62,.78],xe=[.9,.9,.9],Se=[.78,.78,.78],Me=(i,t)=>[(i[0]-t[0])*k,(i[1]-t[1])*k];function ks(i,t,e){const s=new tt,r=.38,o=3.2,a=.18,l=.34,n=wt-.42;for(const d of i){const u=[...zt(d)].reverse();for(let h=0;h<u.length;h++){const p=u[h],f=u[(h+1)%u.length],m=Me(p,e),x=Me(f,e),w=Math.hypot(x[0]-m[0],x[1]-m[1]);if(w<.05)continue;if(!vs(p,f,t)){s.wall(m,x,0,wt,ut);continue}const g=(x[0]-m[0])/w,b=(x[1]-m[1])/w,L=b*r,z=-g*r;s.wall(m,x,0,l,ut),s.wall(m,x,n,wt,ut);const B=Math.max(1,Math.round(w/o)),I=w/B,j=A=>[m[0]+g*A,m[1]+b*A];for(let A=0;A<B;A++){const S=A*I,D=(A+1)*I,M=a*I*.5,y=j(S+M),E=j(D-M);s.wall(j(S),y,l,n,ut),s.wall(E,j(D),l,n,ut);const C=[y[0]+L,y[1]+z],_=[E[0]+L,E[1]+z];s.wall(C,_,l,n,Ms),s.quad([y[0],l,y[1]],[C[0],l,C[1]],[C[0],n,C[1]],[y[0],n,y[1]],Se),s.quad([_[0],l,_[1]],[E[0],l,E[1]],[E[0],n,E[1]],[_[0],n,_[1]],Se),s.quad([y[0],l,y[1]],[E[0],l,E[1]],[_[0],l,_[1]],[C[0],l,C[1]],xe),s.quad([C[0],n,C[1]],[_[0],n,_[1]],[E[0],n,E[1]],[y[0],n,y[1]],xe)}}}return s.build()}function zs(i,t){const e=w=>w.map(g=>[g[0]*k,g[1]*k]),s=w=>e(De(i.footprint,w/k)),r=at+i.floors*Et,o=new tt,a=new tt;o.prism(s(-.7),at-.2,r,[.74,.74,.72]),o.prism(s(1.6),0,.7,[.55,.54,.5]),a.prism(s(1.4),.7,at-.4,[.34,.46,.58],{top:!1}),o.prism(s(2.2),at-.4,at,[.96,.95,.92]);for(const w of e(s(1)))o.box(w[0],.7,w[1],.5,at-1.1,.5,[.92,.91,.88]);const l=s(.45);o.prism(l,r,r+dt,[.95,.94,.9]),o.ring(l,s(.1),r+dt,r+dt+1,[.97,.96,.93]);const n=e(i.core),d=n.reduce((w,g)=>w+g[0],0)/n.length,c=n.reduce((w,g)=>w+g[1],0)/n.length,u=Math.max(...n.map(w=>w[0]))-Math.min(...n.map(w=>w[0])),h=Math.max(...n.map(w=>w[1]))-Math.min(...n.map(w=>w[1])),p=r+dt;o.box(d,p,c,Math.max(4,u*.8),t==="tower"?3.6:2.8,Math.max(4,h*.8),[.84,.83,.8]),o.box(d+u*.55+2.4,p,c-1.5,3.2,1.6,3.2,[.7,.72,.74]),o.box(d-u*.55-2.2,p,c+1.2,2.6,1.3,4.4,[.7,.72,.74]),t==="tower"&&o.box(d,p+3.6,c,.35,12,.35,[.5,.52,.55]);const f=new tt;f.prism(s(.5),0,dt,[.97,.96,.93],{bottom:!0});const m=Array.from({length:i.floors},(w,g)=>at+g*Et),x=i.stacks.map(w=>{const g=xs(w,i.footprint);return{stack:w.stack,geometry:ks(w.pieces,i.footprint,g),centre:g}});return{shell:o.build(),glass:a.build(),slab:f.build(),slabY:m,blocks:x,top:r}}function As(){const i=new tt,t=new tt,e=[.94,.92,.87],s=[.16,.24,.32],r=[.56,.4,.28],o=5.8,a=o+2.7,l=.06,n=[[-.5,-.5],[-.5,.5],[.5,.5],[.5,-.5]];i.prism(n,0,o,e,{top:!1}),i.tri([-.5,o,-.5],[-.5,o,.5],[-.5,a,0],e),i.tri([.5,o,.5],[.5,o,-.5],[.5,a,0],e);const d=.5+l;t.quad([-d,o-.2,d],[d,o-.2,d],[d,a+.05,0],[-d,a+.05,0],ut),t.quad([d,o-.2,-d],[-d,o-.2,-d],[-d,a+.05,0],[d,a+.05,0],ut);const c=(h,p,f,m,x,w)=>{const g=x+.002*w;w===1?i.quad([h-f/2,p,g],[h+f/2,p,g],[h+f/2,p+m,g],[h-f/2,p+m,g],s):i.quad([h+f/2,p,g],[h-f/2,p,g],[h-f/2,p+m,g],[h+f/2,p+m,g],s)};for(const h of[1,-1]){for(const p of[-.32,.32])c(p,.5,.2,1.5,.5*h,h),c(p,3.3,.2,1.5,.5*h,h);c(0,3.3,.16,1.5,.5*h,h),h===1&&i.quad([-.07,0,.502],[.07,0,.502],[.07,2.3,.502],[-.07,2.3,.502],r)}const u=(h,p)=>{const f=h+.0015*p;for(const m of[-.2,.2])for(const x of[.6,3.3])p===1?i.quad([f,x,m+.09],[f,x,m-.09],[f,x+1.4,m-.09],[f,x+1.4,m+.09],s):i.quad([f,x,m-.09],[f,x,m+.09],[f,x+1.4,m+.09],[f,x+1.4,m-.09],s)};return u(.5,1),u(-.5,-1),i.box(0,0,.58,1,.12,.16,[.8,.78,.72]),{walls:i.build(),roof:t.build()}}function Es(){const i=new tt,t=new tt,e=[.93,.9,.84],s=[.16,.24,.32],r=[.62,.45,.32],o=7,a=[[-.5,-.5],[-.5,.5],[.5,.5],[.5,-.5]];i.prism(a,0,o,e,{top:!1});const l=.5;t.prism([[-l-.015,-l-.04],[-l-.015,l+.04],[l+.015,l+.04],[l+.015,-l-.04]],o,o+.55,ut);const n=(d,c,u,h,p)=>{const f=.5*p+.002*p;p===1?i.quad([d-u/2,c,f],[d+u/2,c,f],[d+u/2,c+h,f],[d-u/2,c+h,f],s):i.quad([d+u/2,c,f],[d-u/2,c,f],[d-u/2,c+h,f],[d+u/2,c+h,f],s)};for(const d of[1,-1])n(-.2,.45,.38,2.1,d),n(.2,3.5,.5,2,d),n(-.22,3.5,.3,2,d),d===1&&i.quad([.12,0,.502],[.34,0,.502],[.34,2.3,.502],[.12,2.3,.502],r);return i.box(0,0,.56,1,.1,.12,[.8,.78,.72]),{walls:i.build(),roof:t.build()}}const lt='"Segoe UI", system-ui, Helvetica, Arial, sans-serif',Ps=()=>Math.min(2,Math.max(1,typeof window>"u"?1:window.devicePixelRatio||1))*1.5;class Gt{sprite;px={w:1,h:1};on=!0;clash=!1;show(t){this.on=t,this.sprite.visible=t&&!this.clash}setClash(t){t!==this.clash&&(this.clash=t,this.sprite.visible=this.on&&!t)}tex=null;constructor(t,e){const s=new Ye({transparent:!0,sizeAttenuation:!1,depthTest:t,depthWrite:!1,toneMapped:!1,fog:!1});this.sprite=new Ze(s),this.sprite.renderOrder=e,this.sprite.raycast=()=>{}}paint(t,e,s){const r=Ps(),o=document.createElement("canvas");o.width=Math.ceil(t*r),o.height=Math.ceil(e*r);const a=o.getContext("2d");a.scale(r,r),s(a);const l=new de(o);l.colorSpace=Ce,l.generateMipmaps=!1,l.minFilter=ue,l.magFilter=ue;const n=this.sprite.material;this.tex?.dispose(),this.tex=l,n.map=l,n.needsUpdate=!0,this.px={w:t,h:e}}dispose(){this.tex?.dispose(),this.sprite.material.dispose()}}const yt=(i,t,e=0)=>{const s=document.createElement("canvas").getContext("2d");return s.font=t,s.measureText(i).width+e*i.length};function Cs(i){const t=new Gt(!1,20),e=`600 15px ${lt}`,s=yt(i,e,5)+24,r=30;return t.paint(s,r,o=>{o.font=e,o.textAlign="center",o.textBaseline="middle",o.letterSpacing="5px",o.lineJoin="round",o.lineWidth=5,o.strokeStyle="rgba(241,238,228,0.95)",o.strokeText(i,s/2+2,r/2+1),o.fillStyle="#3a4955",o.fillText(i,s/2+2,r/2+1)}),t.sprite.center.set(.5,.5),t}const ne=(i,t,e,s,r,o)=>{i.beginPath(),i.moveTo(t+o,e),i.arcTo(t+s,e,t+s,e+r,o),i.arcTo(t+s,e+r,t,e+r,o),i.arcTo(t,e+r,t,e,o),i.arcTo(t,e,t+s,e,o),i.closePath()};function Ls(i,t,e,s=!1){const r=i.slice(i.indexOf("-")+1),o=s?r:`${r}  ${t}`,a=e?.badge?yt(e.badge,`700 13px ${lt}`)+20:0;return Math.max(yt(o,`700 12.5px ${lt}`)+16,a+12,e?.stage?yt(e.stage,`600 10.5px ${lt}`)+12:0,40)}function ke(i,t,e,s,r=!1){const o=t.slice(t.indexOf("-")+1),a=r?o:`${o}  ${e}`,l=`700 12.5px ${lt}`,n=`700 13px ${lt}`,d=`600 10.5px ${lt}`,c=s?.badge,u=c?yt(c,n)+20:0,h=yt(a,l),p=Math.max(h+16,u+12,s?.stage?yt(s.stage,d)+12:0,40),f=22+(c?27:0)+(s?.progressPct!==void 0?7:0)+(s?.stage?14:0);i.paint(p,f,m=>{m.textAlign="center",m.textBaseline="middle",m.lineJoin="round";let x=11;if(m.font=l,m.lineWidth=4.5,m.strokeStyle="rgba(244,241,232,0.96)",m.strokeText(a,p/2,x),m.fillStyle="#26303a",m.fillText(a,p/2,x),x+=11,c&&(m.fillStyle="rgba(30,42,53,0.94)",ne(m,(p-u)/2,x+2,u,21,10.5),m.fill(),m.fillStyle="#fff",m.font=n,m.fillText(c,p/2,x+13),x+=27),s?.progressPct!==void 0){const w=Math.max(u,56)-8;m.fillStyle="rgba(30,42,53,0.28)",ne(m,(p-w)/2,x+1,w,4,2),m.fill(),m.fillStyle="#d9822b",ne(m,(p-w)/2,x+1,Math.max(3,w*Math.min(1,Math.max(0,s.progressPct/100))),4,2),m.fill(),x+=7}s?.stage&&(m.font=d,m.lineWidth=4,m.strokeStyle="rgba(244,241,232,0.96)",m.strokeText(s.stage,p/2,x+8),m.fillStyle="#4a5560",m.fillText(s.stage,p/2,x+8))}),i.sprite.center.set(.5,0)}function Ds(i,t){i.paint(22,22,s=>{s.fillStyle="#10202e",s.strokeStyle="#fff",s.lineWidth=1.6,s.beginPath(),s.arc(22/2,22/2,22/2-1.5,0,7),s.fill(),s.stroke(),s.fillStyle="#fff",s.font=`800 12px ${lt}`,s.textAlign="center",s.textBaseline="middle",s.fillText(String(t),22/2,22/2+.5)})}function Bs(){const i=new Gt(!1,20);return i.paint(24,24,t=>{t.font=`800 15px ${lt}`,t.textAlign="center",t.textBaseline="middle",t.lineWidth=4,t.strokeStyle="rgba(244,241,232,0.95)",t.strokeText("N",12,12),t.fillStyle="#33414d",t.fillText("N",12,12)}),i}const Q=(i,t)=>i.scenery.filter(e=>e.kind===t),H={x0:-6e3,x1:7600,y1:8e3},qt=-.5,re=-1.6,Ts=(i,t)=>{if(t<=i[0][0])return i[0][1];for(let e=1;e<i.length;e++)if(t<=i[e][0]){const s=i[e-1],r=i[e];return s[1]+(r[1]-s[1])*(t-s[0])/(r[0]-s[0]||1)}return i[i.length-1][1]};function Be(i){const t=Q(i,"water").find(n=>n.text==="sea");if(!t?.d)return{edge:[],quay:[],sea:[],pond:null};const e=Pt(t.d).slice(0,-2),s=Q(i,"water").find(n=>n.text==="basin"),r=Q(i,"water").find(n=>n.text==="pond");let o=e,a=e.map(()=>!1);if(s?.d){const n=et(s.d),d=h=>h[1]<Ts(e,h[0])-.5,c=n.length,u=n.findIndex((h,p)=>d(h)&&!d(n[(p+c-1)%c]));if(u>=0){const h=[];let p=u;for(;d(n[p%c])&&h.length<c;)h.push(n[p%c]),p++;const f=(B,I)=>{let j=0,A=1;for(let D=0;D<30;D++){const M=(j+A)/2,y=[B[0]+(I[0]-B[0])*M,B[1]+(I[1]-B[1])*M];d(y)?j=M:A=M}const S=(j+A)/2;return[B[0]+(I[0]-B[0])*S,B[1]+(I[1]-B[1])*S]},m=f(n[u],n[(u+c-1)%c]),x=f(h[h.length-1],n[(u+h.length)%c]);let w=[m,...h,x];m[0]>x[0]&&(w=w.reverse());const g=w[0][0],b=w[w.length-1][0],L=e.filter(B=>B[0]<g),z=e.filter(B=>B[0]>b);o=[...L,...w,...z],a=[...L.map(()=>!1),...w.map(()=>!0),...z.map(()=>!1)]}}const l=[[H.x0,o[0][1]],...o,[H.x1,o[o.length-1][1]],[H.x1,H.y1],[H.x0,H.y1]];return{edge:o,quay:a,sea:l,pond:r?.d?et(r.d):null}}const Wt=100,Te=i=>{const[t,e,s,r]=i.viewBox;return[t-Wt,e-Wt,s+2*Wt,r+2*Wt]},_s="#e7e3d6";function Us(i,t){const[e,s,r,o]=Te(i),a=t/r,l=document.createElement("canvas");l.width=Math.round(t),l.height=Math.round(o*a);const n=l.getContext("2d");n.scale(a,a),n.translate(-e,-s),n.fillStyle=_s,n.fillRect(e,s,r,o);const d=g=>{const b=new Path2D;return g.forEach((L,z)=>z?b.lineTo(L[0],L[1]):b.moveTo(L[0],L[1])),b.closePath(),b},c=Be(i);if(c.sea.length){const g=n.createLinearGradient(0,560,0,1e3);g.addColorStop(0,"#b3d8e2"),g.addColorStop(.4,"#84b6cb"),g.addColorStop(1,"#4a7fa0"),n.fillStyle=g,n.fill(d(c.sea))}const[u,h,p,f]=i.viewBox;n.save(),n.beginPath(),n.rect(u,h,p,f),n.clip();for(const g of Q(i,"beach")){const b=new Path2D(g.d);n.fillStyle="#ecdfba",n.strokeStyle="#d6c697",n.lineWidth=1,n.fill(b),n.stroke(b)}for(const g of Q(i,"water").filter(b=>b.text==="basin")){const b=n.createLinearGradient(0,600,0,880);b.addColorStop(0,"#a6cfd8"),b.addColorStop(1,"#6fa6bf"),n.fillStyle=b,n.fill(new Path2D(g.d))}for(const g of Q(i,"park")){const b=new Path2D(g.d);n.fillStyle="#cbd8b0",n.strokeStyle="#b3c496",n.lineWidth=1.4,n.fill(b),n.stroke(b)}for(const g of Q(i,"water").filter(b=>b.text==="pond")){const b=new Path2D(g.d);n.fillStyle="#8db9c9",n.strokeStyle="#6f9db0",n.lineWidth=1.2,n.fill(b),n.stroke(b)}for(const g of Q(i,"plaza")){const b=new Path2D(g.d);n.fillStyle="#f1e9d8",n.strokeStyle="#cdbf9f",n.lineWidth=1.2,n.fill(b),n.stroke(b);const L=Kt(et(g.d));n.fillStyle="#bcd6dc",n.strokeStyle="#9fb6bd",n.beginPath(),n.arc(L[0],L[1]-10,9,0,7),n.fill(),n.stroke(),n.fillStyle="#e8f2f4",n.beginPath(),n.arc(L[0],L[1]-10,3,0,7),n.fill()}n.lineJoin="round",n.lineCap="round";const m=Q(i,"road"),x=Q(i,"path");for(const g of m)n.strokeStyle="#b4ae9e",n.lineWidth=(g.w??10)+3,n.stroke(new Path2D(g.d));for(const g of m)n.strokeStyle="#fbf9f4",n.lineWidth=g.w??10,n.stroke(new Path2D(g.d));m[0]&&(n.strokeStyle="#e3ddcc",n.lineWidth=1,n.setLineDash([9,7]),n.stroke(new Path2D(m[0].d)),n.setLineDash([]));for(const g of x)n.strokeStyle="#cfc8b3",n.lineWidth=(g.w??4)+1.4,n.stroke(new Path2D(g.d));for(const g of x)n.strokeStyle="#f8f5ea",n.lineWidth=g.w??4,n.stroke(new Path2D(g.d));for(const g of i.plots){const b=new Path2D(g.d);n.fillStyle="#d3e0bb",n.strokeStyle="#98a285",n.lineWidth=.9,n.fill(b),n.stroke(b)}for(const g of i.buildings){const b=d(De(et(g.footprint),7));n.fillStyle="#efe9da",n.strokeStyle="#d3cab2",n.lineWidth=1,n.fill(b),n.stroke(b)}for(const g of i.zones)n.strokeStyle="#7f8d97",n.globalAlpha=.6,n.lineWidth=1.3,n.setLineDash([8,6]),n.stroke(new Path2D(g.outline)),n.setLineDash([]),n.globalAlpha=1;const w=new Set(["Harbour Bay","Harbour Beach","Marina Basin"]);n.textAlign="center",n.font="";for(const g of Q(i,"label")){const[b,L]=g.at,z=g.w??12,B=g.text??"";if(!(z>=20)){if(n.lineJoin="round",w.has(B)){n.font=`italic ${z*1.2}px "Segoe UI", system-ui, sans-serif`,n.fillStyle="#f4f9fb",n.fillText(B,b,L);continue}if(B===B.toUpperCase()){n.font=`${z}px "Segoe UI", system-ui, sans-serif`,n.fillStyle="#857f70",n.fillText(B.split("").join(" "),b,L);continue}n.font=`italic ${z*1.15}px "Segoe UI", system-ui, sans-serif`,n.strokeStyle="#d4e0bc",n.lineWidth=3,n.strokeText(B,b,L),n.fillStyle="#51663f",n.fillText(B,b,L)}}return n.restore(),l}const Os=(i,t,e)=>{const s=new de(Us(i,Math.min(4096,t)));return s.colorSpace=Ce,s.anisotropy=e,s};function Nt(i,t,e,s){const r=[...i,...t.flat()],o=he.triangulateShape(i.map(c=>new At(c[0],c[1])),t.map(c=>c.map(u=>new At(u[0],u[1])))),a=[],l=[];for(const c of o){let[u,h,p]=c.map(f=>r[f]);(h[1]-u[1])*(p[0]-u[0])-(h[0]-u[0])*(p[1]-u[1])<0&&([h,p]=[p,h]);for(const f of[u,h,p]){a.push(f[0]*k,e,f[1]*k);const m=s(f[0],f[1]);l.push(m[0],m[1])}}const n=new Pe;n.setAttribute("position",new ft(a,3)),n.setAttribute("uv",new ft(l,2));const d=new Float32Array(a.length);for(let c=1;c<d.length;c+=3)d[c]=1;return n.setAttribute("normal",new ft(d,3)),n.computeBoundingSphere(),n}function js(){const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d"),s=e.createImageData(256,256),r=(c,u,h)=>{const p=Math.sin((c%h+h)%h*127.1+(u%h+h)%h*311.7+h*17.3)*43758.5453;return p-Math.floor(p)},o=c=>c*c*(3-2*c),a=(c,u,h)=>{const p=Math.floor(c),f=Math.floor(u),m=o(c-p),x=o(u-f),w=r(p,f,h),g=r(p+1,f,h),b=r(p,f+1,h),L=r(p+1,f+1,h);return w+(g-w)*m+(b-w)*x+(w-g-b+L)*m*x},l=new Float32Array(256*256);for(let c=0;c<256;c++)for(let u=0;u<256;u++){let h=0,p=1,f=4;for(let m=0;m<4;m++)h+=(a(u/256*f,c/256*f,f)-.5)*p,p*=.5,f*=2;l[c*256+u]=h}const n=(c,u)=>l[(u+256)%256*256+(c+256)%256];for(let c=0;c<256;c++)for(let u=0;u<256;u++){const h=(n(u+1,c)-n(u-1,c))*9,p=(n(u,c+1)-n(u,c-1))*9,f=Math.hypot(h,p,1),m=(c*256+u)*4;s.data[m]=(-h/f*.5+.5)*255,s.data[m+1]=(-p/f*.5+.5)*255,s.data[m+2]=(1/f*.5+.5)*255,s.data[m+3]=255}e.putImageData(s,0,0);const d=new de(t);return d.wrapS=d.wrapT=Je,d.anisotropy=4,d}function Is(i,t){const e=new Bt,[s,r,o,a]=Te(i),l=(S,D)=>[(S-s)/o,1-(D-r)/a],n=Be(i),d=[n.sea,...n.pond?[n.pond]:[]],c=[t],u={land:new X({map:t,roughness:.95,metalness:0}),bed:new X({map:t,roughness:1,metalness:0})};c.push(u.land,u.bed);const h=new Y(Nt([[H.x0-200,-6e3],[H.x1+200,-6e3],[H.x1+200,H.y1+200],[H.x0-200,H.y1+200]],d,0,l),u.land);h.receiveShadow=!0,h.name="land";const p=new Y(Nt([[H.x0,-6e3],[H.x1,-6e3],[H.x1,H.y1],[H.x0,H.y1]],[],re,l),u.bed);p.receiveShadow=!0,p.name="bed",e.add(h,p),c.push(h.geometry,p.geometry);const f=new tt,m=Q(i,"beach").map(S=>et(S.d)),x=S=>m.some(D=>{const[M,y,E,C]=rt(D);if(S[0]<M-4||S[0]>M+E+4||S[1]<y-12||S[1]>y+C+12)return!1;let _=!1;for(let R=0,$=D.length-1;R<D.length;$=R++)D[R][1]>S[1]!=D[$][1]>S[1]&&S[0]<(D[$][0]-D[R][0])*(S[1]-D[R][1])/(D[$][1]-D[R][1])+D[R][0]&&(_=!_);return _||D.some(R=>Math.hypot(R[0]-S[0],R[1]-S[1])<14)}),w=[.9,.84,.68],g=[.6,.6,.57],b=[.62,.72,.5],L=(S,D,M,y,E,C)=>{const _=D[0]-S[0],R=D[1]-S[1],$=Math.hypot(_,R)||1,W=-R/$*M,Z=_/$*M,N=[S[0]*k,E,S[1]*k],ct=[D[0]*k,E,D[1]*k],st=[S[0]*k+W,E-y,S[1]*k+Z],pt=[D[0]*k+W,E-y,D[1]*k+Z],ht=ct[0]-N[0],Ct=ct[2]-N[2],Yt=st[0]-N[0],Lt=st[1]-N[1],Zt=st[2]-N[2],mt=[-Ct*Lt,Ct*Yt-ht*Zt,ht*Lt];mt[0]*W+mt[1]*.3*M+mt[2]*Z>0?f.quad(N,ct,pt,st,C):f.quad(N,st,pt,ct,C)};for(let S=0;S+1<n.edge.length;S++){const D=n.edge[S],M=n.edge[S+1];if(D[0]<-200||M[0]>1800)continue;const y=[(D[0]+M[0])/2,(D[1]+M[1])/2],E=!n.quay[S]&&x(y);L(D,M,E?20*k:.5,1.6+qt+.5,0,E?w:g)}if(n.pond)for(let S=0;S<n.pond.length;S++)L(n.pond[S],n.pond[(S+1)%n.pond.length],.4,.5,0,b);const z=new Y(f.build(),new X({vertexColors:!0,roughness:.95,metalness:0}));z.receiveShadow=!0,z.name="skirt",e.add(z),c.push(z.geometry,z.material);const B=js();c.push(B);const I=(S,D)=>{const M=new X({color:D,roughness:.06,metalness:.1,transparent:!0,opacity:S,normalMap:B,depthWrite:!1,envMapIntensity:1.5});return M.normalScale.set(.7,.7),c.push(M),M},j=(S,D)=>[S*k/70,D*k/70],A=new Y(Nt(n.sea,[],qt,j),I(.74,4035508));if(A.name="sea",A.renderOrder=2,e.add(A),c.push(A.geometry),n.pond){const S=new Y(Nt(n.pond,[],-.18,j),I(.78,5940152));S.renderOrder=2,e.add(S),c.push(S.geometry)}return{group:e,water:{normal:B,layers:[B]},dispose:()=>c.forEach(S=>S.dispose())}}const xt=i=>{const t=Math.sin(i*127.1+311.7)*43758.5453;return t-Math.floor(t)};function Rs(i){const t=new Bt,e=[],s=y=>(e.push(y),y),r=[];for(const y of i.scenery){if(y.kind!=="trees"||!y.d)continue;const E=y.text?.endsWith("-b")?1:0;for(const C of fs(y.d))r.push({x:C.x*k,z:C.y*k,r:C.r*k,tone:E})}const o=s(new Xe(1,1)),a=s(new Qe(.1,.16,1,5));a.translate(0,.5,0);const l=new vt(o,s(new X({roughness:.9,metalness:0,flatShading:!0})),r.length),n=new vt(a,s(new X({color:7033400,roughness:1})),r.length),d=new gt,c=new Tt,u=new U,h=new U,p=new K,f=[new K("#5f9156"),new K("#76a566")];r.forEach((y,E)=>{const C=xt(E),_=xt(E+99),R=1.6+y.r*.55,$=y.r*(.92+C*.18),W=y.r*(.85+_*.22);c.setFromAxisAngle(new U(0,1,0),C*6.28),u.set(y.x,R+W*.7,y.z),h.set($,W,$),l.setMatrixAt(E,d.compose(u,c,h)),p.copy(f[y.tone]).offsetHSL((C-.5)*.03,0,(_-.5)*.09),l.setColorAt(E,p),u.set(y.x,0,y.z),h.set(Math.max(1,y.r*.35),R+W*.3,Math.max(1,y.r*.35)),n.setMatrixAt(E,d.compose(u,new Tt,h))}),l.castShadow=!0,l.receiveShadow=!0,n.castShadow=!1,l.name="trees",n.name="trunks",t.add(l,n);const m=new tt,x=[.8,.7,.54],w=[.6,.58,.53],g=[.4,.33,.26];for(const y of i.scenery){if(y.kind!=="pier"||!y.d||y.text==="boat")continue;const E=et(y.d).map(C=>[C[0]*k,C[1]*k]);if(y.text==="breakwater")m.prism(E,re+.4,1.25,w);else{m.prism(E,re+.4,.38,x);const[C,_,R,$]=rt(E);for(let W=_+1.5;W<_+$;W+=5)for(const Z of[C-.06,C+R+.06])m.box(Z,qt-.3,W,.28,1.1,.28,g)}}const b=new Y(s(m.build()),s(new X({vertexColors:!0,roughness:.9})));b.castShadow=!0,b.receiveShadow=!0,b.name="piers",t.add(b),s(b.geometry);const L=i.scenery.filter(y=>y.kind==="pier"&&y.text==="boat"&&y.d);if(L.length){const y=new tt,E=[1,1,1],C=[.78,.68,.52],_=[.22,.3,.38];y.prism([[-.5,.5],[-.5,-.12],[0,-.5],[.5,-.12],[.5,.5]].map(Z=>Z),0,.9,E,{top:!1}),y.prism([[-.44,.44],[-.44,-.1],[0,-.44],[.44,-.1],[.44,.44]].map(Z=>Z),.9,.96,C),y.box(0,.96,.1,.62,.9,.34,E),y.box(0,1.2,.1,.64,.34,.3,_);const R=s(y.build()),$=s(new X({vertexColors:!0,roughness:.4,metalness:.05})),W=new vt(R,$,L.length);L.forEach((Z,N)=>{const[ct,st,pt,ht]=rt(et(Z.d));u.set((ct+pt/2)*k,qt-.25,(st+ht/2)*k),h.set(Math.max(1.8,pt*k*.95),1.15,ht*k*1.05),W.setMatrixAt(N,d.compose(u,new Tt().setFromAxisAngle(new U(0,1,0),(xt(N+5)-.5)*.12),h)),W.setColorAt(N,p.setHSL(.55+xt(N)*.05,xt(N+3)*.15,.92-xt(N+7)*.12))}),W.castShadow=!0,W.name="boats",t.add(W)}const z=new tt,B=(i.northDeg||0)*Math.PI/180,I=[Math.sin(B),-Math.cos(B)],j=[Math.cos(B),Math.sin(B)],A=[70*k,78*k],S=(y,E)=>[A[0]+I[0]*y+j[0]*E,A[1]+I[1]*y+j[1]*E],D=Array.from({length:24},(y,E)=>S(Math.cos(E/24*6.283)*15,Math.sin(E/24*6.283)*15));z.prism(D,0,.18,[.96,.95,.9]),z.prism([S(12,0),S(-9,6),S(-5,0),S(-9,-6)],.18,.4,[.2,.26,.32]),z.prism([S(12,0),S(-9,6),S(-5,0)],.4,.5,[.55,.6,.65]);const M=new Y(s(z.build()),s(new X({vertexColors:!0,roughness:.8})));return M.receiveShadow=!0,M.name="north",t.add(M),{group:t,trees:r.length,dispose:()=>e.forEach(y=>y.dispose())}}const Ws=i=>{const t=(i.northDeg||0)*Math.PI/180;return new U(70*k+Math.sin(t)*19,1.5,78*k-Math.cos(t)*19)},Vt=34,_e=i=>i*Math.PI/180,Ns=i=>[i.tx+i.dist*Math.sin(i.pol)*Math.sin(i.az),i.ty+i.dist*Math.cos(i.pol),i.tz+i.dist*Math.sin(i.pol)*Math.cos(i.az)];function Fs(i,t,e,s,r=1.08,o=Vt){const a=Math.tan(_e(o)/2),l=i/2/(a*e),n=(t*Math.cos(Math.PI/2-s)+.001)/2/a;return Math.max(l,n)*r}function Hs(i,t){const e=[t.camera,...i.plots.filter(o=>o.zone===t.code).map(o=>rt(Pt(o.d))),...i.buildings.filter(o=>o.zone===t.code).map(o=>rt(Pt(o.footprint)))],s=Math.min(...e.map(o=>o[0])),r=Math.min(...e.map(o=>o[1]));return[s,r,Math.max(...e.map(o=>o[0]+o[2]))-s,Math.max(...e.map(o=>o[1]+o[3]))-r]}const $s=1.1,Ue=0;function Oe(i,t,e,s,r){return{tx:(i[0]+i[2]/2)*k,ty:0,tz:(i[1]+i[3]/2)*k,az:e,pol:s,dist:Fs(i[2]*k,i[3]*k,t,s,r)}}function _t(i,t){const[e,s,r,o]=i.viewBox,a=[e+r*.02,s+o*.09,r*.96,o*.74];return Oe(a,t,Ue,$s,.97)}function ae(i,t,e){const s=i.zones.find(o=>o.code===t);if(!s)return _t(i,e);const r=Oe(Hs(i,s),e,Ue,.95,1.24);return{...r,dist:Math.max(r.dist,90)}}function Gs(i){return rt(Pt(i.footprint))}function qs(i,t){const e=Gs(i),s=bs(i.floors)+4,r=i.kind==="tower",o=r?1.38:1.22,a=r?.42:.2,l=(e[0]+e[2]/2)*k,n=(e[1]+e[3]/2)*k,d=Math.tan(_e(Vt)/2),c=Math.max(e[2],e[3])*k*1.05,u=s*1/2/d,h=c/2/(d*t);return{tx:l,ty:s*.46,tz:n,az:a,pol:o,dist:Math.max(u,h)*1.18+c*.25}}function Vs(i,t,e){let s=t.az-i.az;return s=((s+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI,{tx:i.tx+(t.tx-i.tx)*e,ty:i.ty+(t.ty-i.ty)*e,tz:i.tz+(t.tz-i.tz)*e,az:i.az+s*e,pol:i.pol+(t.pol-i.pol)*e,dist:i.dist*Math.pow(t.dist/i.dist,e)}}const Ks=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;function Ys(i,t){return[_t(i,t),...i.zones.map(e=>ae(i,e.code,t))]}const le=new U(.55,.62,.56).normalize(),Zs=new K("#e9e6dc"),je="#dfe8ea",Js=()=>new ze({side:hs,depthWrite:!1,fog:!1,uniforms:{top:{value:new K("#5b9bd5")},horizon:{value:new K(je)},ground:{value:new K("#cdc8b8")},sun:{value:le}},vertexShader:"varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform vec3 top; uniform vec3 horizon; uniform vec3 ground; uniform vec3 sun; varying vec3 vP;
    void main(){
      vec3 d = normalize(vP);
      float h = d.y;
      vec3 c = mix(horizon, top, pow(clamp(h, 0.0, 1.0), 0.45));
      c = mix(c, ground, smoothstep(0.0, -0.25, h) * 0.9);
      float s = max(dot(d, normalize(sun)), 0.0);
      c += vec3(1.0, 0.92, 0.75) * (pow(s, 600.0) * 4.0 + pow(s, 8.0) * 0.12);
      gl_FragColor = vec4(c, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`});class Xs{constructor(t,e,s,r,o,a){this.g=e,this.minTarget=s,this.host=t,this.cb=r,this.level=o,this.interactive=a,this.canvas=document.createElement("canvas"),this.canvas.className="plan3d-canvas",this.canvas.style.cssText="position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none;outline:none;";try{if(this.renderer=new ts({canvas:this.canvas,antialias:!0,powerPreference:"high-performance"}),!this.renderer.getContext())throw new Error("no context")}catch{this.ok=!1;return}this.ok=!0,t.appendChild(this.canvas),this.reduced=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches,this.setup()}g;minTarget;ok;host;canvas;renderer;scene=new fe;camera=new es(Vt,1,2,6e3);controls;sun;skyMat;dome;terrain;nature;units=new Map;blds=new Map;plotMats=[];plotFade={cur:1,target:1};plotMeshes=[];pickMeshes=[];zoneLabels=[];labels=[];ranks=new Map;north;disposables=[];overlayGroup=new Bt;ovMats={};lineMats={};overlays=new Map;flashes=new Map;outlineCache=new Map;ray=new ss;paint=new Map;colors={};bPaint={};sel=null;compare=new Set;focus=null;hover=null;hoverBuilding=null;level="site";interactive=!0;paintedOnce=!1;flight=null;userMoved=!1;lastAspect=0;tour={i:0,next:0};visible=!0;raf=0;last=0;w=1;h=1;ro;io;time=0;pointer={x:0,y:0,down:!1,sx:0,sy:0,st:0,moved:!1,pending:!1};cb;reduced=!1;disposed=!1;near=2;az=0;frames=0;compact=!1;modeTick=0;shadowExt=0;cursorOn=!1;track(t){return this.disposables.push(t),t}setup(){const t=this.renderer;t.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),t.shadowMap.enabled=!0,t.shadowMap.type=ns,t.toneMapping=os,t.toneMappingExposure=1,this.skyMat=this.track(Js()),this.dome=new Y(this.track(new Jt(4600,32,20)),this.skyMat),this.dome.renderOrder=-10,this.dome.frustumCulled=!1,this.scene.add(this.dome),this.scene.fog=new is(new K(je),900,3400);const e=new fe;e.add(new Y(new Jt(100,24,16),this.skyMat));const s=new Y(new Jt(9,12,8),new Xt({color:new K(14,12,9)}));s.position.copy(le).multiplyScalar(80),e.add(s);const r=new rs(t),o=r.fromScene(e,.02);r.dispose(),this.track(o.texture),this.scene.environment=o.texture,this.scene.environmentIntensity=.85,this.sun=new as(16773596,3.1),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-4e-4,this.sun.shadow.normalBias=.7,this.sun.shadow.radius=2.2,this.sun.shadow.camera.near=10,this.sun.shadow.camera.far=1600,this.scene.add(this.sun,this.sun.target);const a=t.capabilities.maxTextureSize,l=Os(this.g,a,Math.min(8,t.capabilities.getMaxAnisotropy()));this.terrain=Is(this.g,l),this.track(this.terrain),this.scene.add(this.terrain.group),this.nature=Rs(this.g),this.track(this.nature),this.scene.add(this.nature.group),this.buildBuildings(),this.buildPlots(),this.buildLabels(),this.overlayGroup.name="overlays",this.scene.add(this.overlayGroup),this.makeOverlayMaterials(),this.controls=new ls(this.camera,this.canvas);const n=this.controls;n.enableDamping=!0,n.dampingFactor=.09,n.rotateSpeed=.55,n.zoomSpeed=.9,n.panSpeed=.9,n.screenSpacePanning=!1,n.minPolarAngle=.12,n.maxPolarAngle=1.5,n.minDistance=30,n.maxDistance=1500,n.enabled=this.interactive,n.addEventListener("start",()=>{this.flight=null,this.userMoved=!0});const d=this.canvas;d.addEventListener("pointerdown",this.onDown),d.addEventListener("pointermove",this.onMove),d.addEventListener("pointerup",this.onUp),d.addEventListener("pointerleave",this.onLeave),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(this.host),this.io=new IntersectionObserver(c=>{this.visible=c[c.length-1].isIntersecting,this.syncLoop()}),this.io.observe(this.host),document.addEventListener("visibilitychange",this.syncLoop),this.resize(),this.applyLevel(!1),this.syncLoop()}buildBuildings(){for(const t of this.g.buildings){const e=ws(t),s=zs(e,t.kind),r=new Bt;r.name=t.code;const o=new X({vertexColors:!0,roughness:.78,metalness:0}),a=new X({vertexColors:!0,roughness:.12,metalness:.55}),l=new X({vertexColors:!0,roughness:.5,metalness:0}),n=[o,a,l];n.forEach(g=>this.track(g));const d=[],c=(g,b)=>{g.castShadow=!0,g.receiveShadow=!0,g.userData={building:t.code,role:b},r.add(g),d.push(g),this.pickMeshes.push(g)};c(new Y(this.track(s.shell),o),"solid"),c(new Y(this.track(s.glass),a),"solid");const u=new vt(this.track(s.slab),o,s.slabY.length),h=new gt;s.slabY.forEach((g,b)=>u.setMatrixAt(b,h.makeTranslation(0,g,0))),c(u,"thin");const p=new Map(t.elevation.cells.map(g=>[`${g.stack}:${g.floor}`,g.unitCode])),f=new Map(e.stacks.map(g=>[g.stack,g]));s.blocks.forEach(g=>{const b=new vt(this.track(g.geometry),l,e.floors),L=[];for(let M=1;M<=e.floors;M++)b.setMatrixAt(M-1,h.makeTranslation(g.centre[0]*k,se(M)+dt,g.centre[1]*k)),b.setColorAt(M-1,new K(1,1,1)),L.push(p.get(`${g.stack}:${M}`)??"");b.instanceMatrix.needsUpdate=!0,c(b,"block"),b.userData.codes=L;const z=f.get(g.stack),B=[],I=M=>[(M[0]-g.centre[0])*k,(M[1]-g.centre[1])*k];for(const M of z.pieces)M.forEach((y,E)=>{const C=I(y),_=I(M[(E+1)%M.length]);B.push(C[0],0,C[1],_[0],0,_[1],C[0],wt,C[1],_[0],wt,_[1],C[0],0,C[1],C[0],wt,C[1])});const j=new Float32Array(B);let A=1;for(let M=0;M<B.length;M+=3)A=Math.max(A,Math.abs(B[M]),Math.abs(B[M+2]));const S=1+.68/A,D=1+.22/wt;L.forEach((M,y)=>{if(!M)return;const E=new U(g.centre[0]*k,se(y+1)+dt-.11,g.centre[1]*k),C=new gt().compose(E,new Tt,new U(S,D,S));this.units.set(M,{code:M,kind:"cell",building:t.code,meshes:[{mesh:b,idx:y,tint:1}],geom:g.geometry,ov:C,outline:j,centre:new U(g.centre[0]*k,se(y+1)+Et/2,g.centre[1]*k)})})});const[m,x]=Kt(e.footprint),w=new Gt(!1,21);ke(w,t.code,t.name,void 0,this.compact),w.sprite.position.set(m*k,s.top+7,x*k),this.scene.add(w.sprite),this.labels.push(w),this.scene.add(r),this.blds.set(t.code,{code:t.code,b:t,group:r,mats:n,meshes:d,label:w,fade:{cur:1,target:1},centre:new U(m*k,s.top/2,x*k),top:s.top})}}buildPlots(){const t=As(),e=Es(),s=this.track(new X({vertexColors:!0,roughness:.82})),r=this.track(new X({vertexColors:!0,roughness:.62}));this.plotMats=[s,r];const o=[{kind:"villa",geo:t,H:8.6,plots:this.g.plots.filter(c=>c.kind==="villa")},{kind:"townhouse",geo:e,H:7.6,plots:this.g.plots.filter(c=>c.kind==="townhouse")}],a=this.track(new cs(1,1,1));a.translate(0,.5,0);const l=[],n=[[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]];n.forEach((c,u)=>{const h=n[(u+1)%4];l.push(c[0],0,c[1],h[0],0,h[1],c[0],1,c[1],h[0],1,h[1],c[0],0,c[1],c[0],1,c[1])});const d=new Float32Array(l);for(const c of o){if(!c.plots.length)continue;const u=new vt(this.track(c.geo.walls),s,c.plots.length),h=new vt(this.track(c.geo.roof),r,c.plots.length),p=[];c.plots.forEach((f,m)=>{const x=et(f.d),w=Ss(x);let{w:g,h:b,ang:L}=w;c.kind==="villa"&&b>g&&([g,b]=[b,g],L+=Math.PI/2);const z=c.kind==="villa"?Math.min(15,Math.max(9,g*k*.62)):g*k*.97,B=c.kind==="villa"?Math.min(11,Math.max(7,b*k*.52)):b*k*.55,I=new Tt().setFromAxisAngle(new U(0,1,0),-L),j=new U(w.cx*k,0,w.cy*k);c.kind==="townhouse"&&j.add(new U(0,0,0));const A=new gt().compose(j,I,new U(z,1,B));u.setMatrixAt(m,A),h.setMatrixAt(m,A),u.setColorAt(m,new K(1,1,1)),h.setColorAt(m,new K(1,1,1)),p.push(f.unitCode);const S=j.clone().add(new U(0,-.08,0)),D=new gt().compose(S,I,new U(z+.6,c.H+.3,B+.6)),M=[];x.forEach((y,E)=>{const C=x[(E+1)%x.length];M.push(y[0]*k,.25,y[1]*k,C[0]*k,.25,C[1]*k)}),this.units.set(f.unitCode,{code:f.unitCode,kind:"plot",building:f.buildingCode,meshes:[{mesh:u,idx:m,tint:.22},{mesh:h,idx:m,tint:1}],geom:a,ov:D,outline:d,lot:new Float32Array(M),centre:new U(j.x,c.H/2,j.z)})});for(const f of[u,h])f.castShadow=!0,f.receiveShadow=!0,f.userData={kind:"plot",codes:p,role:"plot"},f.instanceMatrix.needsUpdate=!0,this.scene.add(f),this.plotMeshes.push(f),this.pickMeshes.push(f)}}buildLabels(){for(const t of this.g.scenery){if(t.kind!=="label"||!t.at||!t.text||(t.w??12)<20)continue;const e=Cs(t.text);e.sprite.position.set(t.at[0]*k,16,t.at[1]*k),this.scene.add(e.sprite),this.zoneLabels.push(e),this.labels.push(e)}this.north=Bs(),this.north.sprite.position.copy(Ws(this.g)),this.scene.add(this.north.sprite),this.labels.push(this.north)}makeOverlayMaterials(){const t=(s,r)=>this.track(new Xt({color:s,transparent:!0,opacity:r,depthWrite:!1,toneMapped:!1,fog:!1}));this.ovMats={sel:t(16777215,.3),cmp:t(12720219,.28),glow:t(16757760,.3),hover:t(16777215,.22),focus:t(684e3,.28)};const e=(s,r)=>{const o=new Le({color:s,linewidth:r,worldUnits:!1,transparent:!0,depthWrite:!1,fog:!1});return this.track(o),o};this.lineMats={selHalo:e(16777215,7.5),sel:e(662058,3.6),cmp:e(12720219,2.8),focus:e(684e3,3.2),glow:e(16757760,3)},this.updateLineRes()}updateLineRes(){for(const t of Object.values(this.lineMats))t.resolution.set(this.w,this.h)}colorFor(t){const e=$t[St(t?.token)],s=new K(e.bg);return .299*s.r+.587*s.g+.114*s.b>.74&&s.lerp(new K(e.ink),.55),t?.dim&&s.lerp(Zs,.7),s}applyColor(t,e){const s=this.colorFor(e);for(const{mesh:r,idx:o,tint:a}of t.meshes)r.setColorAt(o,a>=1?s:new K(1,1,1).lerp(s,a)),r.instanceColor&&(r.instanceColor.needsUpdate=!0)}setPaint(t,e){if(this.colors=t,!this.ok)return;const s=performance.now();for(const r of this.units.values()){const o=t[r.code],a=this.paint.get(r.code),l={token:St(o?.token),dim:!!o?.dim,glow:!!o?.glow,rank:o?.rank,flash:o?.flash};(!a||a.token!==l.token||a.dim!==l.dim)&&this.applyColor(r,o),(!a||a.rank!==l.rank)&&this.syncRank(r,l.rank),l.flash!==void 0&&(a?a.flash!==l.flash:this.paintedOnce)&&this.startFlash(r,s),this.paint.set(r.code,l)}this.paintedOnce=!0,this.syncGlow(),this.syncRankVisibility(),this.bPaint=e??{},this.repaintLabels()}repaintLabels(){for(const t of this.blds.values())ke(t.label,t.code,t.b.name,this.bPaint[t.code],this.compact)}syncRank(t,e){let s=this.ranks.get(t.code);if(e===void 0){s&&(this.scene.remove(s.sprite),s.dispose(),this.ranks.delete(t.code));return}s||(s=new Gt(!1,22),s.sprite.position.copy(t.centre).add(new U(0,t.kind==="cell"?.4:11,0)),this.scene.add(s.sprite),this.ranks.set(t.code,s)),Ds(s,e)}unitVisible(t){return t.kind==="plot"?this.level==="site":this.level!=="site"&&this.level.building===t.building}syncRankVisibility(){for(const[t,e]of this.ranks)e.sprite.visible=this.unitVisible(this.units.get(t))}overlayFor(t,e,s,r){let o=this.overlays.get(t);if(o)return o;const a=new Bt,l=new Y(e.geom,s);if(l.matrixAutoUpdate=!1,l.matrix.copy(e.ov),l.matrixWorldNeedsUpdate=!0,l.renderOrder=5,a.add(l),r){const n=`${e.code}`;let d=this.outlineCache.get(n);if(d||(d=new ie,d.setPositions(e.outline),this.outlineCache.set(n,d),this.track(d)),r==="sel"){const u=new Rt(d,this.lineMats.selHalo);u.matrixAutoUpdate=!1,u.matrix.copy(e.ov),u.matrixWorldNeedsUpdate=!0,u.renderOrder=5.5,a.add(u)}const c=new Rt(d,this.lineMats[r]);if(c.matrixAutoUpdate=!1,c.matrix.copy(e.ov),c.matrixWorldNeedsUpdate=!0,c.renderOrder=6,a.add(c),e.lot){const u=e.code+":lot";let h=this.outlineCache.get(u);if(h||(h=new ie,h.setPositions(e.lot),this.outlineCache.set(u,h),this.track(h)),r==="sel"){const f=new Rt(h,this.lineMats.selHalo);f.renderOrder=5.5,a.add(f)}const p=new Rt(h,this.lineMats[r]);p.renderOrder=6,a.add(p)}}return this.overlayGroup.add(a),this.overlays.set(t,a),a}dropOverlay(t){const e=this.overlays.get(t);e&&(this.overlayGroup.remove(e),this.overlays.delete(t))}syncKind(t,e){const s=t+":";for(const r of[...this.overlays.keys()])r.startsWith(s)&&!e.has(r.slice(s.length))&&this.dropOverlay(r);for(const r of e){const o=this.units.get(r);if(!o)continue;const a=this.overlayFor(s+r,o,this.ovMats[t],t==="sel"||t==="cmp"||t==="focus"||t==="glow"?t:void 0);a.visible=this.unitVisible(o)}}syncSel(){this.syncKind("sel",new Set(this.sel?[this.sel]:[])),this.syncKind("cmp",this.compare),this.syncKind("focus",new Set(this.focus?[this.focus]:[])),this.syncKind("hover",new Set(this.hover?[this.hover]:[]))}syncGlow(){const t=new Set;for(const[e,s]of this.paint)s.glow&&t.add(e);this.syncKind("glow",t)}startFlash(t,e){const s=this.flashes.get(t.code);s&&(this.overlayGroup.remove(s.mesh),s.mat.dispose());const r=new Xt({color:16757760,transparent:!0,opacity:.9,depthWrite:!1,toneMapped:!1,fog:!1}),o=new Y(t.geom,r);o.matrixAutoUpdate=!1,o.matrix.copy(t.ov),o.matrixWorldNeedsUpdate=!0,o.renderOrder=7,o.visible=this.unitVisible(t),this.overlayGroup.add(o),this.flashes.set(t.code,{start:e,mesh:o,mat:r})}setSelection(t,e){this.sel=t,this.compare=new Set(e??[]),this.ok&&this.syncSel()}setFocus(t){this.focus=t,this.ok&&this.syncSel()}setLevel(t,e=!0){const s=(typeof t=="string"?"site":t.building)===(typeof this.level=="string"?"site":this.level.building);this.level=t,this.ok&&!s&&(this.applyLevel(e),this.userMoved=!1)}applyLevel(t){const e=this.level==="site"?null:this.level.building;for(const s of this.blds.values()){const r=!e||s.code===e;s.fade.target=r?1:.1,s.label.show(r)}this.plotFade.target=e?.2:1;for(const s of this.zoneLabels)s.show(!e);this.north.show(!e),this.controls.minDistance=e?28:40,this.controls.maxDistance=e?420:1500,this.syncSel(),this.syncGlow(),this.syncRankVisibility(),this.hover=null,this.hoverBuilding=null;for(const s of this.blds.values())s.mats.forEach(r=>r.emissive.setRGB(0,0,0));this.cb.onTip(null,0,0),this.flyTo(this.homePose(),t?1100:0)}aspect(){return this.w/Math.max(1,this.h)}homePose(){if(this.level==="site")return _t(this.g,this.aspect());const t=this.g.buildings.find(e=>e.code===this.level.building);return t?qs(t,this.aspect()):_t(this.g,this.aspect())}currentPose(){const t=this.controls.target,e=this.camera.position,s=new U().subVectors(e,t),r=s.length();return{tx:t.x,ty:t.y,tz:t.z,az:Math.atan2(s.x,s.z),pol:Math.acos(Math.min(1,Math.max(-1,s.y/r))),dist:r}}setPose(t){const e=Ns(t);this.camera.position.set(e[0],e[1],e[2]),this.controls.target.set(t.tx,t.ty,t.tz),this.camera.lookAt(t.tx,t.ty,t.tz)}flyTo(t,e){if(this.reduced||e<=0){this.flight=null,this.setPose(t),this.controls.update();return}this.flight={from:this.currentPose(),to:t,t0:performance.now(),ms:e}}preset(t){this.userMoved=!1,this.flyTo(t?ae(this.g,t,this.aspect()):_t(this.g,this.aspect()),900)}fit(){this.userMoved=!1,this.flyTo(this.homePose(),700)}zoomBy(t){const e=this.currentPose(),s=this.controls.minDistance,r=this.controls.maxDistance;this.userMoved=!0,this.flyTo({...e,dist:Math.min(r,Math.max(s,e.dist/t))},220)}orbit(t,e){const s=this.currentPose();this.userMoved=!0,this.flyTo({...s,az:s.az+t,pol:Math.min(this.controls.maxPolarAngle,Math.max(this.controls.minPolarAngle,s.pol+e))},200)}setInteractive(t){this.interactive=t,this.ok&&(this.controls.enabled=t,this.tour.next=performance.now()+5e3,t&&(this.hover=null),this.syncSel())}ndc(t,e){const s=this.canvas.getBoundingClientRect();return new At((t-s.left)/s.width*2-1,-((e-s.top)/s.height)*2+1)}screenOf(t){const e=t.clone().project(this.camera);return{x:(e.x+1)/2*this.w,y:(1-e.y)/2*this.h,behind:e.z>1}}pickAt(t,e){const s=this.level==="site"?null:this.level.building;this.camera.updateMatrixWorld(),this.ray.setFromCamera(this.ndc(t,e),this.camera);const r=this.ray.intersectObjects(this.pickMeshes,!1);for(const o of r){const a=o.object.userData;if(o.object.visible)if(s){if(a.kind==="plot"||a.building!==s)continue;if(a.role==="block"){const l=a.codes[o.instanceId];return l?{unit:l,crowd:1}:{crowd:1}}if(a.role==="solid")return{crowd:1}}else{if(a.kind==="plot")return{unit:a.codes[o.instanceId],crowd:1};if(a.building)return{building:a.building,crowd:1}}}if(this.minTarget){const o=this.canvas.getBoundingClientRect(),a=t-o.left,l=e-o.top,n=this.minTarget/2;let d=null,c=1/0,u=0;const h=(p,f,m=!1)=>{const x=this.screenOf(p);if(x.behind)return;const w=Math.hypot(x.x-a,x.y-l);w<=n&&(m&&u++,w<c&&(c=w,d=f))};if(s)for(const p of this.units.values())p.kind==="cell"&&p.building===s&&h(p.centre,{unit:p.code});else{for(const p of this.blds.values())h(p.centre,{building:p.code});for(const p of this.units.values())p.kind==="plot"&&h(p.centre,{unit:p.code},!0)}if(d)return{...d,crowd:Math.max(1,u)}}return{crowd:1}}onDown=t=>{this.interactive&&(this.pointer={...this.pointer,down:!0,sx:t.clientX,sy:t.clientY,st:performance.now(),moved:!1})};onMove=t=>{if(!this.interactive)return;const e=this.pointer;e.x=t.clientX,e.y=t.clientY,e.down&&Math.hypot(t.clientX-e.sx,t.clientY-e.sy)>5&&(e.moved=!0),!(t.pointerType!=="mouse"||e.down)&&(e.pending||(e.pending=!0,requestAnimationFrame(()=>{e.pending=!1,this.updateHover()})))};onLeave=()=>{this.pointer.down=!1,this.hoverTo({crowd:1}),this.cb.onTip(null,0,0)};onUp=t=>{const e=this.pointer,s=this.interactive&&e.down&&!e.moved&&performance.now()-e.st<700&&t.button===0;if(e.down=!1,!s)return;const r=this.pickAt(t.clientX,t.clientY);if(r.unit){const o=this.units.get(r.unit);if(this.minTarget&&o?.kind==="plot"&&r.crowd>1&&this.level==="site"){const a=this.g.plots.find(n=>n.unitCode===r.unit)?.zone,l=a?ae(this.g,a,this.aspect()):null;if(l&&this.currentPose().dist>l.dist*1.25){this.userMoved=!1,this.flyTo(l,900);return}}this.cb.onSelect(r.unit)}else r.building&&this.level==="site"&&this.cb.onLevelChange({building:r.building})};updateHover(){const t=this.pointer;this.hoverTo(this.pickAt(t.x,t.y))}hoverTo(t){const e=t.unit??null,s=t.building??null,r=this.canvas.getBoundingClientRect();if(e!==this.hover&&(this.hover=e,this.syncKind("hover",new Set(e?[e]:[])),this.cb.onHover(e)),s!==this.hoverBuilding){const l=this.hoverBuilding&&this.blds.get(this.hoverBuilding);l&&l.mats.forEach(d=>d.emissive.setRGB(0,0,0));const n=s&&this.blds.get(s);n&&n.mats.forEach(d=>d.emissive.setRGB(.045,.055,.07)),this.hoverBuilding=s}const o=!!(e||s);if(o!==this.cursorOn&&(this.cursorOn=o,this.canvas.style.cursor=o?"pointer":""),!o){this.cb.onTip(null,0,0);return}let a;if(s){const l=this.blds.get(s).b,n=this.bPaint[s];a=`${l.name}${n?.badge?" · "+n.badge:""}${n?.stage?" · "+n.stage:""}`}else{const l=this.colors[e];a=`${e} · ${$t[St(l?.token)].word}${l?.label?" · "+l.label:""}`}this.cb.onTip(a,this.pointer.x-r.left,this.pointer.y-r.top)}query(t){const e=this.units.get(t),s=!!e&&this.unitVisible(e);return{token:St(this.colors[t]?.token),selected:this.sel===t,visible:s}}has(t){return this.units.has(t)||this.blds.has(t)}focusOnUnit(t){const e=this.units.get(t);if(!e)return;this.userMoved=!0;const s=this.currentPose();this.flyTo({...s,tx:e.centre.x,ty:e.centre.y,tz:e.centre.z,dist:Math.min(s.dist,e.kind==="plot"?70:90)},900)}info(){const t=this.renderer.info,e=this.camera.position;return{calls:t.render.calls,triangles:t.render.triangles,geometries:t.memory.geometries,textures:t.memory.textures,trees:this.nature.trees,frames:this.frames,compact:this.compact,camera:[Math.round(e.x),Math.round(e.y),Math.round(e.z)]}}syncLoop=()=>{const t=this.ok&&!this.disposed&&this.visible&&!document.hidden;t&&!this.raf?(this.last=performance.now(),this.raf=requestAnimationFrame(this.frame)):!t&&this.raf&&(cancelAnimationFrame(this.raf),this.raf=0)};resize(){if(!this.ok)return;const t=Math.max(1,this.host.clientWidth),e=Math.max(1,this.host.clientHeight);this.w=t,this.h=e,this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.updateLineRes();const s=t/e;(this.lastAspect===0||!this.userMoved&&Math.abs(s/this.lastAspect-1)>.05)&&(this.flight=null,this.setPose(this.homePose()),this.controls.update()),this.lastAspect=s}frame=t=>{if(this.raf=0,this.disposed)return;const e=Math.min(.1,(t-this.last)/1e3);this.last=t,this.time+=e,this.update(t,e),this.frames++,this.renderer.render(this.scene,this.camera),this.raf=requestAnimationFrame(this.frame)};update(t,e){if(this.flight){const f=this.flight,m=Math.min(1,(t-f.t0)/f.ms);this.setPose(Vs(f.from,f.to,Ks(m))),m>=1&&(this.flight=null)}else this.interactive||this.tourStep(t,e);this.controls.update(),this.dome.position.copy(this.camera.position);const s=this.controls.target,r=Math.min(850,Math.max(-50,s.x)),o=Math.min(560,Math.max(-60,s.z)),a=Math.min(90,Math.max(0,s.y));(r!==s.x||o!==s.z||a!==s.y)&&(this.camera.position.add(new U(r-s.x,a-s.y,o-s.z)),s.set(r,a,o));const l=this.camera.position.distanceTo(s),n=Math.atan2(this.camera.position.x-s.x,this.camera.position.z-s.z);Math.abs(n-this.az)>.002&&(this.az=n,this.cb.onAzimuth?.(n));const d=Math.max(1,l*.02);Math.abs(d-this.near)>.2&&(this.near=d,this.camera.near=d,this.camera.updateProjectionMatrix());const c=Math.min(1,e*7);for(const f of this.blds.values())this.fadeTo(f.fade,c,f.mats,f.meshes);this.fadeTo(this.plotFade,c,this.plotMats,this.plotMeshes),this.terrain.water.normal.offset.x+=e*.012,this.terrain.water.normal.offset.y+=e*.007;const u=Math.min(520,Math.max(70,l*.8));if(this.sun.position.copy(s).addScaledVector(le,520),this.sun.target.position.copy(s),Math.abs(u-this.shadowExt)>u*.03){this.shadowExt=u;const f=this.sun.shadow.camera;f.left=-u,f.right=u,f.top=u,f.bottom=-u,f.updateProjectionMatrix()}const h=2*Math.tan(Vt*Math.PI/360)/this.h;for(const f of this.labels)f.sprite.scale.set(f.px.w*h,f.px.h*h,1);this.declutter();for(const f of this.ranks.values())f.sprite.scale.set(f.px.w*h,f.px.h*h,1);const p=this.reduced?.7:.62+.38*Math.sin(this.time*(Math.PI*2/1.4));this.ovMats.glow.opacity=.05+.2*p,this.lineMats.glow.opacity=.35+.65*p;for(const[f,m]of this.flashes){const x=(t-m.start)/900;if(x>=1){this.overlayGroup.remove(m.mesh),m.mat.dispose(),this.flashes.delete(f);continue}m.mat.opacity=.9*(1-x);const w=this.units.get(f),g=1+x*.35;m.mesh.matrix.copy(w.ov).multiply(new gt().makeScale(g,1+x*.1,g)),m.mesh.matrixWorldNeedsUpdate=!0}}labelMode(){if(++this.modeTick<20)return;this.modeTick=0;const t=[],e=new U;for(const o of this.blds.values())o.label.on&&(e.copy(o.label.sprite.position).project(this.camera),!(e.z>1)&&t.push({x:(e.x+1)/2*this.w,y:(1-e.y)/2*this.h,w:Ls(o.code,o.b.name,this.bPaint[o.code],!1)}));const s=o=>t.some((a,l)=>t.some((n,d)=>d>l&&Math.abs(a.x-n.x)<(a.w+n.w)/2*o+12&&Math.abs(a.y-n.y)<62)),r=this.compact?s(1.2):s(1);r!==this.compact&&(this.compact=r,this.repaintLabels())}declutter(){this.labelMode();const t=[],e=new U,s=o=>t.some(a=>o.x0<a.x1&&o.x1>a.x0&&o.y0<a.y1&&o.y1>a.y0),r=(o,a,l)=>{for(const n of o){const d=n.sprite;if(!n.on)continue;if(e.copy(d.position).project(this.camera),e.z>1){n.setClash(!0);continue}const c=(e.x+1)/2*this.w,u=(1-e.y)/2*this.h,{w:h,h:p}=n.px;let f=!1;for(let m=0;m<(a?7:1)&&!f;m++){const x=m===0?0:(m%2?-1:1)*Math.ceil(m/2)*(p+3),w=u-p*(1-l)+x,g={x0:c-h/2-2,x1:c+h/2+2,y0:w-2,y1:w+p+2};s(g)||(f=!0,t.push(g),d.center.y=l+x/p)}n.setClash(!f)}};r([...this.blds.values()].map(o=>o.label),!1,0),r(this.zoneLabels,!0,.5),r([this.north],!1,.5)}fadeTo(t,e,s,r){if(t.cur===t.target)return;const o=t.cur<.999;t.cur+=(t.target-t.cur)*e,Math.abs(t.target-t.cur)<.01&&(t.cur=t.target);const a=t.cur<.999;for(const l of s)l.opacity=t.cur,a!==o&&(l.transparent=a,l.depthWrite=!a,l.needsUpdate=!0);if(a!==o)for(const l of r)l.castShadow=!a||t.target>.5}tourStep(t,e){const s=Ys(this.g,this.aspect());if(this.level==="site"&&t>this.tour.next)this.tour.i=(this.tour.i+1)%s.length,this.tour.next=t+7e3,this.flyTo({...s[this.tour.i],az:s[this.tour.i].az+(this.tour.i%2?.45:-.35)},2600);else{const r=this.currentPose();this.setPose({...r,az:r.az+e*.035})}}dispose(){if(this.disposed=!0,this.raf&&cancelAnimationFrame(this.raf),this.raf=0,!this.ok)return;document.removeEventListener("visibilitychange",this.syncLoop),this.ro?.disconnect(),this.io?.disconnect();const t=this.canvas;t.removeEventListener("pointerdown",this.onDown),t.removeEventListener("pointermove",this.onMove),t.removeEventListener("pointerup",this.onUp),t.removeEventListener("pointerleave",this.onLeave),this.controls.dispose();for(const e of[...this.labels,...this.ranks.values()])e.dispose();for(const e of this.flashes.values())e.mat.dispose();this.disposables.forEach(e=>e.dispose()),this.scene.environment=null,this.renderer.dispose(),this.renderer.forceContextLoss(),t.remove()}}const Qs={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right"},tn="0 0 18 14";function en({uid:i,token:t}){const e=$t[t];return T.jsxs("svg",{width:"18",height:"14",viewBox:tn,"aria-hidden":"true",children:[T.jsx("rect",{x:".5",y:".5",width:"17",height:"13",rx:"3",fill:$e(i,t,"e"),stroke:e.ink}),e.glyph&&e.glyph!=="pips"&&T.jsx("use",{href:`#${i}-g-${e.glyph}`,x:"5",y:"2.5",width:"9",height:"9",color:e.text})]})}function sn({uid:i,items:t,onClick:e}){return T.jsxs("div",{className:"plan-legend",role:"group","aria-label":"Legend",children:[T.jsx("svg",{width:"0",height:"0",style:{position:"absolute"},"aria-hidden":"true",children:T.jsx(He,{uid:i,vb:[0,0,1,1]})}),t.map(s=>T.jsxs("button",{type:"button",className:"plan-legend-item",onClick:()=>e?.(s.token),children:[T.jsx(en,{uid:i,token:s.token}),T.jsx("span",{children:s.label}),s.count!==void 0&&T.jsx("b",{children:s.count})]},s.token))]})}const nn=i=>/^\d+ \/ \d+$/.test(i);function an(i){const{geometry:t,colors:e,buildingColors:s,selection:r,level:o,onLevelChange:a,onSelect:l,onHover:n,onReady:d,legend:c,onLegendClick:u,interactive:h=!0,minTarget:p,className:f,id:m}=i,x="pv3"+O.useId().replace(/[^a-zA-Z0-9]/g,""),w=O.useRef(null),g=O.useRef(null),b=O.useRef(null),L=O.useRef(null),[z,B]=O.useState(null),[I,j]=O.useState(!0),A=o==="site"?null:t.buildings.find(v=>v.code===o.building)??null,S=A?A.code:"site",D=r?.code??null,M=O.useRef({colors:e,buildingColors:s,level:o,interactive:h,onLevelChange:a,onSelect:l,onHover:n,selection:r});M.current={colors:e,buildingColors:s,level:o,interactive:h,onLevelChange:a,onSelect:l,onHover:n,selection:r},O.useEffect(()=>{const v=g.current;if(!v)return;const P=M.current,F=new Xs(v,t,p,{onSelect:J=>M.current.onSelect(J),onLevelChange:J=>M.current.onLevelChange(J),onHover:J=>M.current.onHover?.(J),onTip:(J,Re,We)=>{const Dt=b.current;if(Dt){if(J===null){Dt.hidden=!0;return}Dt.textContent=J,Dt.style.transform=`translate(${Math.min(Re+14,v.clientWidth-170)}px, ${We+16}px)`,Dt.hidden=!1}},onAzimuth:J=>{L.current?.style.setProperty("transform",`rotate(${t.northDeg+J*180/Math.PI|0}deg)`)}},typeof P.level=="string"?"site":P.level,P.interactive);return j(F.ok),B(F),()=>{F.dispose(),B(null)}},[t,p]),O.useEffect(()=>{z?.setPaint(e,s)},[z,e,s]),O.useEffect(()=>{z?.setSelection(r?.code??null,r?.compare)},[z,r?.code,r?.compare]),O.useEffect(()=>{z?.setLevel(o,!0)},[z,S]),O.useEffect(()=>{z?.setInteractive(h)},[z,h]);const y=O.useMemo(()=>{const v=[];for(const P of t.plots)v.push(P.unitCode);for(const P of t.buildings)for(const F of P.elevation.cells)v.push(F.unitCode);return v},[t]),E=O.useRef(null);O.useEffect(()=>{E.current!==t&&(E.current=t,d?.(y))},[t,y,d]);const C=O.useCallback(v=>{t.buildings.some(P=>P.code===v)?M.current.onLevelChange({building:v}):M.current.onSelect(v)},[t]);O.useEffect(()=>(window.__plan3d={query(v){const P=M.current;return z?z.query(v):{token:St(P.colors[v]?.token),selected:P.selection?.code===v,visible:!1}},pick(v){(z?.has(v)||t.buildings.some(P=>P.code===v))&&C(v)},info:()=>z?.info()},()=>{delete window.__plan3d}),[z,t,C]);const _=v=>{if(!h||!z)return;const P=v.key;if(P==="ArrowLeft")z.orbit(-.16,0);else if(P==="ArrowRight")z.orbit(.16,0);else if(P==="ArrowUp")z.orbit(0,-.1);else if(P==="ArrowDown")z.orbit(0,.1);else if(P==="+"||P==="=")z.zoomBy(1.3);else if(P==="-"||P==="_")z.zoomBy(1/1.3);else return;v.preventDefault()},R=v=>{h&&v.key==="Escape"&&A&&(v.stopPropagation(),a("site"))},[$,W]=O.useState(null),Z=O.useMemo(()=>A?[]:[...t.buildings.map(v=>{const P=Kt(Pt(v.footprint));return{code:v.code,x:P[0],y:P[1]}}),...t.plots.map(v=>({code:v.unitCode,x:v.labelAt[0],y:v.labelAt[1]}))],[t,A]),N=O.useMemo(()=>A?A.elevation.cells.map(v=>({code:v.unitCode,floor:v.floor,stack:v.stack})):[],[A]),ct=v=>!!v&&(A?N.some(P=>P.code===v):Z.some(P=>P.code===v)),st=A?D&&N.some(v=>v.code===D)?D:N.filter(v=>v.floor===1).sort((v,P)=>v.stack.localeCompare(P.stack))[0]?.code:t.buildings[0]?.code,pt=ct($)?$:st??"",ht=O.useRef(null),Ct=O.useRef(!0);O.useEffect(()=>{if(A&&(ht.current=A.code),Ct.current){Ct.current=!1;return}const v=w.current,P=document.activeElement;if(!v||!(P===document.body||v.contains(P)))return;const F=A?st:ht.current;F&&(W(F),requestAnimationFrame(()=>v.querySelector(`[data-code="${F}"]`)?.focus({preventScroll:!0})))},[S]);const Yt=v=>{const P=v.target.getAttribute("data-code"),F=Qs[v.key];if(!P||!F)return;v.preventDefault();const J=A?Ne(N,P,F):Fe(Z,P,F);J&&(W(J),w.current?.querySelector(`[data-code="${J}"]`)?.focus({preventScroll:!0}))},Lt=(v,P)=>{const F=e[P];return`${v}${F?.label?", "+F.label:""}, ${$t[St(F?.token)].word}${F?.badge?", "+F.badge:""}${D===P?", selected":""}`},Zt=v=>{const P=s?.[v.code];return`${v.code.slice(v.code.indexOf("-")+1)}${P?.badge?" "+P.badge:""}, ${v.name}${P?.badge&&nn(P.badge)?", available":""}${P?.stage?", "+P.stage:""}. Press Enter to open`},mt=(v,P)=>T.jsx("li",{children:T.jsx("button",{type:"button","data-code":v,tabIndex:v===pt?0:-1,"aria-label":P,onClick:()=>C(v),onFocus:()=>{W(v),z?.setFocus(v)},onBlur:()=>z?.setFocus(null)})},v),Ie=O.useMemo(()=>t.zones.map(v=>({code:v.code,name:v.name})),[t]);return T.jsxs("div",{id:m,ref:w,className:`plan-root plan3d${A?" plan-level-building":""}${h?"":" plan-static"}${f?" "+f:""}`,onKeyDown:R,children:[h&&A&&T.jsx("div",{className:"plan-bar",children:T.jsxs("button",{type:"button",className:"plan-btn plan-back",onClick:()=>a("site"),children:[T.jsx("span",{"aria-hidden":"true",children:"←"})," Site plan ",T.jsx("kbd",{children:"Esc"})]})}),T.jsxs("div",{className:"plan-stage",children:[T.jsx("div",{ref:g,className:"plan3d-host",tabIndex:h?0:-1,role:"group","aria-label":`${t.name} 3D master plan${A?", "+A.name:""}. Arrow keys orbit, plus and minus zoom${A?", Escape returns to the site":""}.`,onKeyDown:_,onPointerDown:()=>g.current?.focus({preventScroll:!0})}),T.jsx("div",{className:"plan-tip",ref:b,hidden:!0,role:"presentation"}),!I&&T.jsxs("div",{className:"plan3d-fallback",role:"alert",children:[T.jsx("b",{children:"3D view unavailable"}),T.jsx("span",{children:"This browser or device cannot run WebGL. Switch to the 2D plan."})]}),h&&!A&&T.jsx("div",{className:"plan-top",children:T.jsxs("div",{className:"plan-zones",role:"group","aria-label":"Zoom to zone",children:[T.jsx("button",{type:"button",className:"plan-chip",onClick:()=>z?.preset(null),children:"Overview"}),Ie.map(v=>T.jsx("button",{type:"button",className:"plan-chip",onClick:()=>z?.preset(v.code),children:v.name},v.code))]})}),h&&T.jsxs("div",{className:"plan-ctl",children:[T.jsx("button",{type:"button",className:"plan-btn","aria-label":"Zoom in",onClick:()=>z?.zoomBy(1.5),children:"+"}),T.jsx("button",{type:"button",className:"plan-btn","aria-label":"Zoom out",onClick:()=>z?.zoomBy(1/1.5),children:"−"}),T.jsx("button",{type:"button",className:"plan-btn","aria-label":"Fit to view",onClick:()=>z?.fit(),children:T.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14","aria-hidden":"true",children:T.jsx("path",{d:"M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9",fill:"none",stroke:"currentColor",strokeWidth:"1.6"})})})]}),T.jsxs("div",{className:"plan-furniture plan3d-compass","aria-hidden":"true",children:[T.jsxs("svg",{ref:L,width:"34",height:"34",viewBox:"-20 -20 40 40",style:{transform:`rotate(${t.northDeg}deg)`},children:[T.jsx("circle",{r:"17",fill:"#f7f5ee",stroke:"#6c7780"}),T.jsx("path",{d:"M0-13L5 6L0 3L-5 6Z",fill:"#33414d"}),T.jsx("path",{d:"M0-13L5 6L0 3Z",fill:"#8a97a1"})]}),T.jsx("span",{className:"plan-n",children:"N"})]}),h&&T.jsx("ul",{className:"plan3d-sr","aria-label":A?`${A.name} homes`:"Buildings and houses",onKeyDown:Yt,children:A?A.elevation.cells.map(v=>mt(v.unitCode,Lt(v.unitCode.slice(v.unitCode.lastIndexOf("-")+1),v.unitCode))):[...t.buildings.map(v=>mt(v.code,Zt(v))),...t.plots.map(v=>mt(v.unitCode,Lt(v.unitCode,v.unitCode)))]})]}),c&&c.length>0&&T.jsx(sn,{uid:x,items:c,onClick:u})]})}export{an as default};
