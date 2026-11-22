import{T as Xt,t as Ct,b as I,j as B,d as Qe,s as ts,D as es,f as ss}from"./index-g3E_Xf2b.js";import{S as Ie,a as Yt,U as Fe,V as Dt,b as Kt,I as ns,F as lt,c as he,d as Lt,W as os,B as ge,e as Ge,f as j,M as ot,g as Wt,L as is,h as xt,i as as,j as ve,k as we,l as rs,m as ls,C as ee,n as be,o as ze,G as Ot,N as cs,T as hs,R as He,p as rt,q as Zt,D as ds,r as us,s as fs,t as zt,u as nt,Q as Rt,v as ps,w as ms,x as Ae,P as gs,y as vs,z as ws,A as bs,E as oe,H as xs,J as Ee,K as ys,O as Ms,X as Ss,Y as ks,Z as zs,_ as As,$ as Es,a0 as Ps}from"./BufferGeometryUtils-BCUSlrMR.js";Kt.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Dt},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Yt.line={uniforms:Fe.merge([Kt.common,Kt.fog,Kt.line]),vertexShader:`
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
		`};class $e extends Ie{constructor(t){super({type:"LineMaterial",uniforms:Fe.clone(Yt.line.uniforms),vertexShader:Yt.line.vertexShader,fragmentShader:Yt.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0!==this.worldUnits&&(this.needsUpdate=!0),t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Pe=new ge,Ft=new j;class de extends ns{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],s=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(s),this.setAttribute("position",new lt(t,3)),this.setAttribute("uv",new lt(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,s=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),s.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const s=new he(e,6,1);return this.setAttribute("instanceStart",new Lt(s,3,0)),this.setAttribute("instanceEnd",new Lt(s,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const s=new he(e,6,1);return this.setAttribute("instanceColorStart",new Lt(s,3,0)),this.setAttribute("instanceColorEnd",new Lt(s,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new os(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ge);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Pe.setFromBufferAttribute(e),this.boundingBox.union(Pe))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ge),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const s=this.boundingSphere.center;this.boundingBox.getCenter(s);let a=0;for(let i=0,r=t.count;i<r;i++)Ft.fromBufferAttribute(t,i),a=Math.max(a,s.distanceToSquared(Ft)),Ft.fromBufferAttribute(e,i),a=Math.max(a,s.distanceToSquared(Ft));this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}const ie=new Wt,De=new j,Ce=new j,Q=new Wt,tt=new Wt,ut=new Wt,ae=new j,re=new xt,et=new is,Le=new j,Gt=new ge,Ht=new Ge,ft=new Wt;let pt,Et;function Be(n,t,e){return ft.set(0,0,-t,1).applyMatrix4(n.projectionMatrix),ft.multiplyScalar(1/ft.w),ft.x=Et/e.width,ft.y=Et/e.height,ft.applyMatrix4(n.projectionMatrixInverse),ft.multiplyScalar(1/ft.w),Math.abs(Math.max(ft.x,ft.y))}function Ds(n,t){const e=n.matrixWorld,s=n.geometry,a=s.attributes.instanceStart,i=s.attributes.instanceEnd,r=Math.min(s.instanceCount,a.count);for(let l=0,o=r;l<o;l++){et.start.fromBufferAttribute(a,l),et.end.fromBufferAttribute(i,l),et.applyMatrix4(e);const c=new j,h=new j;pt.distanceSqToSegment(et.start,et.end,h,c),h.distanceTo(c)<Et*.5&&t.push({point:h,pointOnLine:c,distance:pt.origin.distanceTo(h),object:n,face:null,faceIndex:l,uv:null,uv1:null})}}function Cs(n,t,e){const s=t.projectionMatrix,i=n.material.resolution,r=n.matrixWorld,l=n.geometry,o=l.attributes.instanceStart,c=l.attributes.instanceEnd,h=Math.min(l.instanceCount,o.count),f=-t.near;pt.at(1,ut),ut.w=1,ut.applyMatrix4(t.matrixWorldInverse),ut.applyMatrix4(s),ut.multiplyScalar(1/ut.w),ut.x*=i.x/2,ut.y*=i.y/2,ut.z=0,ae.copy(ut),re.multiplyMatrices(t.matrixWorldInverse,r);for(let d=0,m=h;d<m;d++){if(Q.fromBufferAttribute(o,d),tt.fromBufferAttribute(c,d),Q.w=1,tt.w=1,Q.applyMatrix4(re),tt.applyMatrix4(re),Q.z>f&&tt.z>f)continue;if(Q.z>f){const y=Q.z-tt.z,P=(Q.z-f)/y;Q.lerp(tt,P)}else if(tt.z>f){const y=tt.z-Q.z,P=(tt.z-f)/y;tt.lerp(Q,P)}Q.applyMatrix4(s),tt.applyMatrix4(s),Q.multiplyScalar(1/Q.w),tt.multiplyScalar(1/tt.w),Q.x*=i.x/2,Q.y*=i.y/2,tt.x*=i.x/2,tt.y*=i.y/2,et.start.copy(Q),et.start.z=0,et.end.copy(tt),et.end.z=0;const u=et.closestPointToPointParameter(ae,!0);et.at(u,Le);const b=as.lerp(Q.z,tt.z,u),w=b>=-1&&b<=1,p=ae.distanceTo(Le)<Et*.5;if(w&&p){et.start.fromBufferAttribute(o,d),et.end.fromBufferAttribute(c,d),et.start.applyMatrix4(r),et.end.applyMatrix4(r);const y=new j,P=new j;pt.distanceSqToSegment(et.start,et.end,P,y),e.push({point:P,pointOnLine:y,distance:pt.origin.distanceTo(P),object:n,face:null,faceIndex:d,uv:null,uv1:null})}}}class $t extends ot{constructor(t=new de,e=new $e({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,s=t.attributes.instanceEnd,a=new Float32Array(2*e.count);for(let r=0,l=0,o=e.count;r<o;r++,l+=2)De.fromBufferAttribute(e,r),Ce.fromBufferAttribute(s,r),a[l]=l===0?0:a[l-1],a[l+1]=a[l]+De.distanceTo(Ce);const i=new he(a,2,1);return t.setAttribute("instanceDistanceStart",new Lt(i,1,0)),t.setAttribute("instanceDistanceEnd",new Lt(i,1,1)),this}raycast(t,e){const s=this.material.worldUnits,a=t.camera;if(a===null&&!s&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),s===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;const i=t.params.Line2!==void 0&&t.params.Line2.threshold||0;pt=t.ray;const r=this.matrixWorld,l=this.geometry,o=this.material;Et=o.linewidth+i,l.boundingSphere===null&&l.computeBoundingSphere(),Ht.copy(l.boundingSphere).applyMatrix4(r);let c;if(s)c=Et*.5;else{const f=Math.max(a.near,Ht.distanceToPoint(pt.origin));c=Be(a,f,o.resolution)}if(Ht.radius+=c,pt.intersectsSphere(Ht)===!1)return;l.boundingBox===null&&l.computeBoundingBox(),Gt.copy(l.boundingBox).applyMatrix4(r);let h;if(s)h=Et*.5;else{const f=Math.max(a.near,Gt.distanceToPoint(pt.origin));h=Be(a,f,o.resolution)}Gt.expandByScalar(h),pt.intersectsBox(Gt)!==!1&&(s?Ds(this,e):Cs(this,a,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(ie),this.material.uniforms.resolution.value.set(ie.z,ie.w))}}const k=.5,Tt=3.1,yt=.3,At=Tt-yt,vt=4.2;function Ut(n){const t=[];for(const e of n.matchAll(/([MLHVC])([^MLHVCZ]*)/g)){const s=e[2].match(/-?[\d.]+/g)?.map(Number)??[],a=t[t.length-1]??[0,0];if(e[1]==="H")t.push([s[0],a[1]]);else if(e[1]==="V")t.push([a[0],s[0]]);else if(e[1]==="C")for(let i=0;i+5<s.length;i+=6)t.push([s[i+4],s[i+5]]);else for(let i=0;i+1<s.length;i+=2)t.push([s[i],s[i+1]])}return t}function ct(n){const t=Ut(n);return t.length>1&&t[0][0]===t[t.length-1][0]&&t[0][1]===t[t.length-1][1]&&t.pop(),t}const Ls=n=>[...n.matchAll(/M(-?[\d.]+),(-?[\d.]+)a([\d.]+),/g)].map(t=>({r:+t[3],x:+t[1]+ +t[3],y:+t[2]})),mt=n=>{const t=n.map(i=>i[0]),e=n.map(i=>i[1]),s=Math.min(...t),a=Math.min(...e);return[s,a,Math.max(...t)-s,Math.max(...e)-a]},Bt=n=>{let t=0;for(let e=0;e<n.length;e++){const s=n[(e+1)%n.length];t+=n[e][0]*s[1]-s[0]*n[e][1]}return t/2},se=n=>{let t=0,e=0,s=0;for(let a=0;a<n.length;a++){const i=n[(a+1)%n.length],r=n[a][0]*i[1]-i[0]*n[a][1];t+=r,e+=(n[a][0]+i[0])*r,s+=(n[a][1]+i[1])*r}return Math.abs(t)<1e-9?[n.reduce((a,i)=>a+i[0],0)/n.length,n.reduce((a,i)=>a+i[1],0)/n.length]:[e/(3*t),s/(3*t)]},_t=n=>Bt(n)<0?[...n].reverse():n,_e=n=>{const t=Math.hypot(n[0],n[1])||1;return[n[0]/t,n[1]/t]};function xe(n,t){const e=_t(n),s=e.length,a=[];for(let i=0;i<s;i++){const r=e[(i+s-1)%s],l=e[i],o=e[(i+1)%s],c=_e([l[0]-r[0],l[1]-r[1]]),h=_e([o[0]-l[0],o[1]-l[1]]),f=[c[1],-c[0]],d=[h[1],-h[0]],m=f[0]+d[0],g=f[1]+d[1],u=1+f[0]*d[0]+f[1]*d[1],b=u<.2?1:1/u;a.push([l[0]+m*b*t,l[1]+g*b*t])}return a}function Bs(n,t){let e=n;for(let s=0;s<t.length&&e.length;s++){const a=t[s],i=t[(s+1)%t.length],r=o=>(i[0]-a[0])*(o[1]-a[1])-(i[1]-a[1])*(o[0]-a[0]),l=e;e=[];for(let o=0;o<l.length;o++){const c=l[o],h=l[(o+1)%l.length],f=r(c),d=r(h);if(f>=0&&e.push(c),f>=0!=d>=0){const m=f/(f-d);e.push([c[0]+(h[0]-c[0])*m,c[1]+(h[1]-c[1])*m])}}}return e}const _s=n=>{for(let t=0;t<n.length;t++){const e=n[t],s=n[(t+1)%n.length],a=n[(t+2)%n.length];if((s[0]-e[0])*(a[1]-s[1])-(s[1]-e[1])*(a[0]-s[0])<-1e-7)return!1}return!0};function Ts(n){const t=_t(n);let s=ve.triangulateShape(t.map(i=>new Dt(i[0],i[1])),[]).map(i=>{const r=[i[0],i[1],i[2]];return Bt(r.map(l=>t[l]))<0?r.reverse():r}),a=!0;for(;a;){a=!1;t:for(let i=0;i<s.length;i++)for(let r=i+1;r<s.length;r++){const l=s[i],o=s[r];for(let c=0;c<l.length;c++){const h=l[c],f=l[(c+1)%l.length],d=o.findIndex((g,u)=>g===f&&o[(u+1)%o.length]===h);if(d<0)continue;const m=[];for(let g=0;g<l.length;g++)m.push(l[(c+1+g)%l.length]);for(let g=2;g<o.length;g++)m.push(o[(d+g)%o.length]);if(_s(m.map(g=>t[g]))){s=s.filter((g,u)=>u!==i&&u!==r),s.push(m),a=!0;break t}}}}return s.map(i=>i.map(r=>t[r]))}const Te=(n,t,e)=>{const s=e[0]-t[0],a=e[1]-t[1],i=s*s+a*a,r=i?Math.max(0,Math.min(1,((n[0]-t[0])*s+(n[1]-t[1])*a)/i)):0;return Math.hypot(n[0]-(t[0]+s*r),n[1]-(t[1]+a*r))},Us=(n,t,e,s=.08)=>e.some((a,i)=>{const r=e[(i+1)%e.length];return Te(n,a,r)<s&&Te(t,a,r)<s});function Os(n){const t=_t(ct(n.footprint)),e=n.floorPlate.units.map(o=>({stack:o.stack,p:ct(o.d)})),s=mt(e.flatMap(o=>o.p)),a=mt(t),i=o=>[a[0]+(o[0]-s[0])/s[2]*a[2],a[1]+(o[1]-s[1])/s[3]*a[3]],r=Ts(t),l=e.map(o=>({stack:o.stack,pieces:r.map(c=>Bs(_t(o.p.map(i)),c)).filter(c=>c.length>=3&&Math.abs(Bt(c))>.5)}));return{code:n.code,footprint:t,parts:r,stacks:l,core:_t(ct(n.floorPlate.core).map(i)),floors:n.floors}}const le=n=>vt+(n-1)*Tt,Rs=n=>vt+n*Tt,js=n=>{const[t,e,s,a]=mt(n);return[[t,e],[t+s,e],[t+s,e+a],[t,e+a]]},Ns=(n,t)=>se(js(n.pieces.length?n.pieces.flat():t));function Ws(n){let t={area:1/0,cx:0,cy:0,w:0,h:0,ang:0};for(let e=0;e<n.length;e++){const s=n[e],a=n[(e+1)%n.length],i=Math.atan2(a[1]-s[1],a[0]-s[0]),r=Math.cos(-i),l=Math.sin(-i),o=n.map(m=>[m[0]*r-m[1]*l,m[0]*l+m[1]*r]),[c,h,f,d]=mt(o);if(f*d<t.area){const m=c+f/2,g=h+d/2;t={area:f*d,cx:m*Math.cos(i)-g*Math.sin(i),cy:m*Math.sin(i)+g*Math.cos(i),w:f,h:d,ang:i}}}return t}class ht{pos=[];nor=[];col=[];glo=[];gloss=0;tri(t,e,s,a){const i=e[0]-t[0],r=e[1]-t[1],l=e[2]-t[2],o=s[0]-t[0],c=s[1]-t[1],h=s[2]-t[2];let f=r*h-l*c,d=l*o-i*h,m=i*c-r*o;const g=Math.hypot(f,d,m);if(!(g<1e-9)){f/=g,d/=g,m/=g;for(const u of[t,e,s])this.pos.push(u[0],u[1],u[2]),this.nor.push(f,d,m),this.col.push(a[0],a[1],a[2]),this.glo.push(this.gloss)}}quad(t,e,s,a,i){this.tri(t,e,s,i),this.tri(t,s,a,i)}wall(t,e,s,a,i){this.quad([t[0],s,t[1]],[e[0],s,e[1]],[e[0],a,e[1]],[t[0],a,t[1]],i)}cap(t,e,s,a=!0){const i=ve.triangulateShape(t.map(r=>new Dt(r[0],r[1])),[]);for(const r of i){let[l,o,c]=r.map(f=>t[f]);(o[1]-l[1])*(c[0]-l[0])-(o[0]-l[0])*(c[1]-l[1])>0!==a&&([o,c]=[c,o]),this.tri([l[0],e,l[1]],[o[0],e,o[1]],[c[0],e,c[1]],s)}}prism(t,e,s,a,i={}){const r=Bt(t)>0?[...t].reverse():t;for(let l=0;l<r.length;l++)this.wall(r[l],r[(l+1)%r.length],e,s,i.side??a);i.top!==!1&&this.cap(r,s,a,!0),i.bottom&&this.cap(r,e,a,!1)}ring(t,e,s,a,i){const r=Bt(t)>0?[...t].reverse():t,l=Bt(t)>0?[...e].reverse():e,o=r.length;for(let c=0;c<o;c++){const h=(c+1)%o;this.wall(r[c],r[h],s,a,i),this.wall(l[h],l[c],s,a,i),this.quad([r[c][0],a,r[c][1]],[l[c][0],a,l[c][1]],[l[h][0],a,l[h][1]],[r[h][0],a,r[h][1]],i)}}box(t,e,s,a,i,r,l,o=0){const c=Math.cos(o),h=Math.sin(o),f=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([d,m])=>[t+(d*a*c-m*r*h)/2,s+(d*a*h+m*r*c)/2]);this.prism(f,e,e+i,l)}build(){const t=new we;return t.setAttribute("position",new lt(this.pos,3)),t.setAttribute("normal",new lt(this.nor,3)),t.setAttribute("color",new lt(this.col,3)),t.setAttribute("gloss",new lt(this.glo,1)),t.computeBoundingSphere(),t.computeBoundingBox(),t}}const Mt=[1,1,1],Is=[.5,.62,.78],Ue=[.9,.9,.9],Oe=[.78,.78,.78],Re=(n,t)=>[(n[0]-t[0])*k,(n[1]-t[1])*k];function Fs(n,t,e){const s=new ht,a=.38,i=3.2,r=.18,l=.34,o=At-.42;for(const c of n){const f=[..._t(c)].reverse();for(let d=0;d<f.length;d++){const m=f[d],g=f[(d+1)%f.length],u=Re(m,e),b=Re(g,e),w=Math.hypot(b[0]-u[0],b[1]-u[1]);if(w<.05)continue;if(!Us(m,g,t)){s.wall(u,b,0,At,Mt);continue}const p=(b[0]-u[0])/w,y=(b[1]-u[1])/w,P=y*a,E=-p*a;s.wall(u,b,0,l,Mt),s.wall(u,b,o,At,Mt);const C=Math.max(1,Math.round(w/i)),G=w/C,W=A=>[u[0]+p*A,u[1]+y*A];for(let A=0;A<C;A++){const q=A*G,H=(A+1)*G,D=r*G*.5,_=W(q+D),R=W(H-D);s.wall(W(q),_,l,o,Mt),s.wall(R,W(H),l,o,Mt);const U=[_[0]+P,_[1]+E],S=[R[0]+P,R[1]+E];s.gloss=1,s.wall(U,S,l,o,Is),s.gloss=0,s.quad([_[0],l,_[1]],[U[0],l,U[1]],[U[0],o,U[1]],[_[0],o,_[1]],Oe),s.quad([S[0],l,S[1]],[R[0],l,R[1]],[R[0],o,R[1]],[S[0],o,S[1]],Oe),s.quad([_[0],l,_[1]],[R[0],l,R[1]],[S[0],l,S[1]],[U[0],l,U[1]],Ue),s.quad([U[0],o,U[1]],[S[0],o,S[1]],[R[0],o,R[1]],[_[0],o,_[1]],Ue)}}}return s.build()}function Gs(n,t){const e=w=>w.map(p=>[p[0]*k,p[1]*k]),s=w=>e(xe(n.footprint,w/k)),a=vt+n.floors*Tt,i=new ht,r=new ht;i.prism(s(-.7),vt-.2,a,[.74,.74,.72]),i.prism(s(1.6),0,.7,[.55,.54,.5]),r.gloss=1,r.prism(s(1.4),.7,vt-.4,[.34,.46,.58],{top:!1}),i.prism(s(2.2),vt-.4,vt,[.96,.95,.92]);for(const w of e(s(1)))i.box(w[0],.7,w[1],.5,vt-1.1,.5,[.92,.91,.88]);const l=s(.45);i.prism(l,a,a+yt,[.95,.94,.9]),i.ring(l,s(.1),a+yt,a+yt+1,[.97,.96,.93]);const o=e(n.core),c=o.reduce((w,p)=>w+p[0],0)/o.length,h=o.reduce((w,p)=>w+p[1],0)/o.length,f=Math.max(...o.map(w=>w[0]))-Math.min(...o.map(w=>w[0])),d=Math.max(...o.map(w=>w[1]))-Math.min(...o.map(w=>w[1])),m=a+yt;i.box(c,m,h,Math.max(4,f*.8),t==="tower"?3.6:2.8,Math.max(4,d*.8),[.84,.83,.8]),i.box(c+f*.55+2.4,m,h-1.5,3.2,1.6,3.2,[.7,.72,.74]),i.box(c-f*.55-2.2,m,h+1.2,2.6,1.3,4.4,[.7,.72,.74]),t==="tower"&&i.box(c,m+3.6,h,.35,12,.35,[.5,.52,.55]);const g=new ht;g.prism(s(.5),0,yt,[.97,.96,.93],{bottom:!0});const u=Array.from({length:n.floors},(w,p)=>vt+p*Tt),b=n.stacks.map(w=>{const p=Ns(w,n.footprint);return{stack:w.stack,geometry:Fs(w.pieces,n.footprint,p),centre:p}});return{shell:i.build(),glass:r.build(),slab:g.build(),slabY:u,blocks:b,top:a}}function Hs(){const n=new ht,t=new ht,e=[.94,.92,.87],s=[.16,.24,.32],a=[.56,.4,.28],i=5.8,r=i+2.7,l=.06,o=[[-.5,-.5],[-.5,.5],[.5,.5],[.5,-.5]];n.prism(o,0,i,e,{top:!1}),n.tri([-.5,i,-.5],[-.5,i,.5],[-.5,r,0],e),n.tri([.5,i,.5],[.5,i,-.5],[.5,r,0],e);const c=.5+l;t.quad([-c,i-.2,c],[c,i-.2,c],[c,r+.05,0],[-c,r+.05,0],Mt),t.quad([c,i-.2,-c],[-c,i-.2,-c],[-c,r+.05,0],[c,r+.05,0],Mt);const h=(d,m,g,u,b,w)=>{const p=b+.002*w;w===1?n.quad([d-g/2,m,p],[d+g/2,m,p],[d+g/2,m+u,p],[d-g/2,m+u,p],s):n.quad([d+g/2,m,p],[d-g/2,m,p],[d-g/2,m+u,p],[d+g/2,m+u,p],s)};for(const d of[1,-1]){for(const m of[-.32,.32])h(m,.5,.2,1.5,.5*d,d),h(m,3.3,.2,1.5,.5*d,d);h(0,3.3,.16,1.5,.5*d,d),d===1&&n.quad([-.07,0,.502],[.07,0,.502],[.07,2.3,.502],[-.07,2.3,.502],a)}const f=(d,m)=>{const g=d+.0015*m;for(const u of[-.2,.2])for(const b of[.6,3.3])m===1?n.quad([g,b,u+.09],[g,b,u-.09],[g,b+1.4,u-.09],[g,b+1.4,u+.09],s):n.quad([g,b,u-.09],[g,b,u+.09],[g,b+1.4,u+.09],[g,b+1.4,u-.09],s)};return f(.5,1),f(-.5,-1),n.box(0,0,.58,1,.12,.16,[.8,.78,.72]),n.box(0,0,0,1.012,.35,1.012,[.66,.64,.6]),n.box(0,2.45,.545,.26,.1,.09,a),n.box(.28,i-.3,-.12,.07,r-i+.95,.1,[.62,.5,.44]),{walls:n.build(),roof:t.build()}}function $s(){const n=new ht,t=new ht,e=[.93,.9,.84],s=[.16,.24,.32],a=[.62,.45,.32],i=7,r=[[-.5,-.5],[-.5,.5],[.5,.5],[.5,-.5]];n.prism(r,0,i,e,{top:!1});const l=.5;t.prism([[-l-.015,-l-.04],[-l-.015,l+.04],[l+.015,l+.04],[l+.015,-l-.04]],i,i+.55,Mt);const o=(c,h,f,d,m)=>{const g=.5*m+.002*m;m===1?n.quad([c-f/2,h,g],[c+f/2,h,g],[c+f/2,h+d,g],[c-f/2,h+d,g],s):n.quad([c+f/2,h,g],[c-f/2,h,g],[c-f/2,h+d,g],[c+f/2,h+d,g],s)};for(const c of[1,-1])o(-.2,.45,.38,2.1,c),o(.2,3.5,.5,2,c),o(-.22,3.5,.3,2,c),c===1&&n.quad([.12,0,.502],[.34,0,.502],[.34,2.3,.502],[.12,2.3,.502],a);return n.box(0,0,.56,1,.1,.12,[.8,.78,.72]),n.box(0,0,0,1.006,.35,1.006,[.66,.64,.6]),{walls:n.build(),roof:t.build()}}const wt='"Segoe UI", system-ui, Helvetica, Arial, sans-serif',qs=()=>Math.min(2,Math.max(1,typeof window>"u"?1:window.devicePixelRatio||1))*1.5;class Qt{sprite;px={w:1,h:1};on=!0;clash=!1;show(t){this.on=t,this.sprite.visible=t&&!this.clash}setClash(t){t!==this.clash&&(this.clash=t,this.sprite.visible=this.on&&!t)}tex=null;constructor(t,e){const s=new rs({transparent:!0,sizeAttenuation:!1,depthTest:t,depthWrite:!1,toneMapped:!1,fog:!1});this.sprite=new ls(s),this.sprite.renderOrder=e,this.sprite.raycast=()=>{}}paint(t,e,s){const a=qs(),i=document.createElement("canvas");i.width=Math.ceil(t*a),i.height=Math.ceil(e*a);const r=i.getContext("2d");r.scale(a,a),s(r);const l=new ee(i);l.colorSpace=be,l.generateMipmaps=!1,l.minFilter=ze,l.magFilter=ze;const o=this.sprite.material;this.tex?.dispose(),this.tex=l,o.map=l,o.needsUpdate=!0,this.px={w:t,h:e}}dispose(){this.tex?.dispose(),this.sprite.material.dispose()}}const Pt=(n,t,e=0)=>{const s=document.createElement("canvas").getContext("2d");return s.font=t,s.measureText(n).width+e*n.length};function Vs(n){const t=new Qt(!1,20),e=`600 15px ${wt}`,s=Pt(n,e,5)+24,a=30;return t.paint(s,a,i=>{i.font=e,i.textAlign="center",i.textBaseline="middle",i.letterSpacing="5px",i.lineJoin="round",i.lineWidth=5,i.strokeStyle="rgba(241,238,228,0.95)",i.strokeText(n,s/2+2,a/2+1),i.fillStyle="#3a4955",i.fillText(n,s/2+2,a/2+1)}),t.sprite.center.set(.5,.5),t}const ce=(n,t,e,s,a,i)=>{n.beginPath(),n.moveTo(t+i,e),n.arcTo(t+s,e,t+s,e+a,i),n.arcTo(t+s,e+a,t,e+a,i),n.arcTo(t,e+a,t,e,i),n.arcTo(t,e,t+s,e,i),n.closePath()};function Ys(n,t,e,s=!1){const a=n.slice(n.indexOf("-")+1),i=s?a:`${a}  ${t}`,r=e?.badge?Pt(e.badge,`700 13px ${wt}`)+20:0;return Math.max(Pt(i,`700 12.5px ${wt}`)+16,r+12,e?.stage?Pt(e.stage,`600 10.5px ${wt}`)+12:0,40)}function je(n,t,e,s,a=!1){const i=t.slice(t.indexOf("-")+1),r=a?i:`${i}  ${e}`,l=`700 12.5px ${wt}`,o=`700 13px ${wt}`,c=`600 10.5px ${wt}`,h=s?.badge,f=h?Pt(h,o)+20:0,d=Pt(r,l),m=Math.max(d+16,f+12,s?.stage?Pt(s.stage,c)+12:0,40),g=22+(h?27:0)+(s?.progressPct!==void 0?7:0)+(s?.stage?14:0);n.paint(m,g,u=>{u.textAlign="center",u.textBaseline="middle",u.lineJoin="round";let b=11;if(u.font=l,u.lineWidth=4.5,u.strokeStyle="rgba(244,241,232,0.96)",u.strokeText(r,m/2,b),u.fillStyle="#26303a",u.fillText(r,m/2,b),b+=11,h&&(u.fillStyle="rgba(30,42,53,0.94)",ce(u,(m-f)/2,b+2,f,21,10.5),u.fill(),u.fillStyle="#fff",u.font=o,u.fillText(h,m/2,b+13),b+=27),s?.progressPct!==void 0){const w=Math.max(f,56)-8;u.fillStyle="rgba(30,42,53,0.28)",ce(u,(m-w)/2,b+1,w,4,2),u.fill(),u.fillStyle="#d9822b",ce(u,(m-w)/2,b+1,Math.max(3,w*Math.min(1,Math.max(0,s.progressPct/100))),4,2),u.fill(),b+=7}s?.stage&&(u.font=c,u.lineWidth=4,u.strokeStyle="rgba(244,241,232,0.96)",u.strokeText(s.stage,m/2,b+8),u.fillStyle="#4a5560",u.fillText(s.stage,m/2,b+8))}),n.sprite.center.set(.5,0)}function Ks(n,t){n.paint(22,22,s=>{s.fillStyle="#10202e",s.strokeStyle="#fff",s.lineWidth=1.6,s.beginPath(),s.arc(22/2,22/2,22/2-1.5,0,7),s.fill(),s.stroke(),s.fillStyle="#fff",s.font=`800 12px ${wt}`,s.textAlign="center",s.textBaseline="middle",s.fillText(String(t),22/2,22/2+.5)})}function Zs(){const n=new Qt(!1,20);return n.paint(24,24,t=>{t.font=`800 15px ${wt}`,t.textAlign="center",t.textBaseline="middle",t.lineWidth=4,t.strokeStyle="rgba(244,241,232,0.95)",t.strokeText("N",12,12),t.fillStyle="#33414d",t.fillText("N",12,12)}),n}const st=(n,t)=>n.scenery.filter(e=>e.kind===t),K={x0:-6e3,x1:7600,y1:8e3},jt=-.5,ue=-1.6,Js=(n,t)=>{if(t<=n[0][0])return n[0][1];for(let e=1;e<n.length;e++)if(t<=n[e][0]){const s=n[e-1],a=n[e];return s[1]+(a[1]-s[1])*(t-s[0])/(a[0]-s[0]||1)}return n[n.length-1][1]};function ye(n){const t=st(n,"water").find(o=>o.text==="sea");if(!t?.d)return{edge:[],quay:[],sea:[],pond:null};const e=Ut(t.d).slice(0,-2),s=st(n,"water").find(o=>o.text==="basin"),a=st(n,"water").find(o=>o.text==="pond");let i=e,r=e.map(()=>!1);if(s?.d){const o=ct(s.d),c=d=>d[1]<Js(e,d[0])-.5,h=o.length,f=o.findIndex((d,m)=>c(d)&&!c(o[(m+h-1)%h]));if(f>=0){const d=[];let m=f;for(;c(o[m%h])&&d.length<h;)d.push(o[m%h]),m++;const g=(C,G)=>{let W=0,A=1;for(let H=0;H<30;H++){const D=(W+A)/2,_=[C[0]+(G[0]-C[0])*D,C[1]+(G[1]-C[1])*D];c(_)?W=D:A=D}const q=(W+A)/2;return[C[0]+(G[0]-C[0])*q,C[1]+(G[1]-C[1])*q]},u=g(o[f],o[(f+h-1)%h]),b=g(d[d.length-1],o[(f+d.length)%h]);let w=[u,...d,b];u[0]>b[0]&&(w=w.reverse());const p=w[0][0],y=w[w.length-1][0],P=e.filter(C=>C[0]<p),E=e.filter(C=>C[0]>y);i=[...P,...w,...E],r=[...P.map(()=>!1),...w.map(()=>!0),...E.map(()=>!1)]}}const l=[[K.x0,i[0][1]],...i,[K.x1,i[i.length-1][1]],[K.x1,K.y1],[K.x0,K.y1]];return{edge:i,quay:r,sea:l,pond:a?.d?ct(a.d):null}}const qt=100,Me=n=>{const[t,e,s,a]=n.viewBox;return[t-qt,e-qt,s+2*qt,a+2*qt]},Xs="#bfc4ae";function Qs(n,t){const[e,s,a,i]=Me(n),r=t/a,l=document.createElement("canvas");l.width=Math.round(t),l.height=Math.round(i*r);const o=l.getContext("2d");o.scale(r,r),o.translate(-e,-s),o.fillStyle=Xs,o.fillRect(e,s,a,i);const c=p=>{const y=new Path2D;return p.forEach((P,E)=>E?y.lineTo(P[0],P[1]):y.moveTo(P[0],P[1])),y.closePath(),y},h=ye(n);if(h.sea.length){const p=o.createLinearGradient(0,560,0,1e3);p.addColorStop(0,"#a9d0d9"),p.addColorStop(.4,"#6fa4b9"),p.addColorStop(1,"#3d6e8c"),o.fillStyle=p,o.fill(c(h.sea))}const[f,d,m,g]=n.viewBox;o.save(),o.beginPath(),o.rect(f,d,m,g),o.clip();for(const p of st(n,"beach")){const y=new Path2D(p.d);o.fillStyle="#ead9a8",o.strokeStyle="#d3c08c",o.lineWidth=1,o.fill(y),o.stroke(y)}for(const p of st(n,"water").filter(y=>y.text==="basin")){const y=o.createLinearGradient(0,600,0,880);y.addColorStop(0,"#a6cfd8"),y.addColorStop(1,"#6fa6bf"),o.fillStyle=y,o.fill(new Path2D(p.d))}for(const p of st(n,"park")){const y=new Path2D(p.d);o.fillStyle="#98b184",o.strokeStyle="#829b6e",o.lineWidth=1.4,o.fill(y),o.stroke(y)}for(const p of st(n,"water").filter(y=>y.text==="pond")){const y=new Path2D(p.d);o.fillStyle="#8db9c9",o.strokeStyle="#6f9db0",o.lineWidth=1.2,o.fill(y),o.stroke(y)}for(const p of st(n,"plaza")){const y=new Path2D(p.d);o.fillStyle="#e3dac4",o.strokeStyle="#b9ac8d",o.lineWidth=1.2,o.fill(y),o.stroke(y);const P=se(ct(p.d));o.fillStyle="#bcd6dc",o.strokeStyle="#9fb6bd",o.beginPath(),o.arc(P[0],P[1]-10,9,0,7),o.fill(),o.stroke(),o.fillStyle="#e8f2f4",o.beginPath(),o.arc(P[0],P[1]-10,3,0,7),o.fill()}o.lineJoin="round",o.lineCap="round";const u=st(n,"road"),b=st(n,"path");for(const p of u)o.strokeStyle="#85857f",o.lineWidth=(p.w??10)+3,o.stroke(new Path2D(p.d));for(const p of u)o.strokeStyle="#a3a3a0",o.lineWidth=p.w??10,o.stroke(new Path2D(p.d));u[0]&&(o.strokeStyle="#eceae0",o.lineWidth=1,o.setLineDash([9,7]),o.stroke(new Path2D(u[0].d)),o.setLineDash([]));for(const p of b)o.strokeStyle="#b3aa90",o.lineWidth=(p.w??4)+1.4,o.stroke(new Path2D(p.d));for(const p of b)o.strokeStyle="#e4dcc6",o.lineWidth=p.w??4,o.stroke(new Path2D(p.d));for(const p of n.plots){const y=new Path2D(p.d);o.fillStyle="#aabf94",o.strokeStyle="#8c9c76",o.lineWidth=.9,o.fill(y),o.stroke(y)}for(const p of n.buildings){const y=c(xe(ct(p.footprint),7));o.fillStyle="#dcd7c8",o.strokeStyle="#b5ad98",o.lineWidth=1,o.fill(y),o.stroke(y)}for(const p of n.zones)o.strokeStyle="#7f8d97",o.globalAlpha=.6,o.lineWidth=1.3,o.setLineDash([8,6]),o.stroke(new Path2D(p.outline)),o.setLineDash([]),o.globalAlpha=1;const w=new Set(["Harbour Bay","Harbour Beach","Marina Basin"]);o.textAlign="center",o.font="";for(const p of st(n,"label")){const[y,P]=p.at,E=p.w??12,C=p.text??"";if(!(E>=20)){if(o.lineJoin="round",w.has(C)){o.font=`italic ${E*1.2}px "Segoe UI", system-ui, sans-serif`,o.fillStyle="#f4f9fb",o.fillText(C,y,P);continue}if(C===C.toUpperCase()){o.font=`${E}px "Segoe UI", system-ui, sans-serif`,o.fillStyle="#6f6a5c",o.fillText(C.split("").join(" "),y,P);continue}o.font=`italic ${E*1.15}px "Segoe UI", system-ui, sans-serif`,o.strokeStyle="#d4e0bc",o.lineWidth=3,o.strokeText(C,y,P),o.fillStyle="#51663f",o.fillText(C,y,P)}}return o.restore(),l}function tn(n,t){const[e,s,a,i]=Me(n),r=t/a,l=document.createElement("canvas");l.width=Math.round(t),l.height=Math.round(i*r);const o=l.getContext("2d");o.scale(r,r),o.translate(-e,-s);const c="#f00",h="#0f0",f="#00f";o.fillStyle=c,o.fillRect(e,s,a,i);const d=p=>{const y=new Path2D;return p.forEach((P,E)=>E?y.lineTo(P[0],P[1]):y.moveTo(P[0],P[1])),y.closePath(),y},m=ye(n);o.fillStyle="#000",m.sea.length&&o.fill(d(m.sea));const[g,u,b,w]=n.viewBox;o.save(),o.beginPath(),o.rect(g,u,b,w),o.clip(),o.fillStyle=f;for(const p of st(n,"beach"))o.fill(new Path2D(p.d));o.fillStyle="#000";for(const p of st(n,"water"))p.text!=="sea"&&o.fill(new Path2D(p.d));o.fillStyle=h;for(const p of st(n,"plaza"))o.fill(new Path2D(p.d));o.lineJoin="round",o.lineCap="round",o.strokeStyle=h;for(const p of st(n,"road"))o.lineWidth=(p.w??10)+3,o.stroke(new Path2D(p.d));for(const p of st(n,"path"))o.lineWidth=(p.w??4)+1.4,o.stroke(new Path2D(p.d));o.fillStyle=c;for(const p of n.plots)o.fill(new Path2D(p.d));o.fillStyle=h;for(const p of n.buildings)o.fill(d(xe(ct(p.footprint),7)));return o.restore(),l}const en=(n,t,e)=>{const s=new ee(Qs(n,Math.min(4096,t)));return s.colorSpace=be,s.anisotropy=e,s};function Vt(n,t,e,s){const a=[...n,...t.flat()],i=ve.triangulateShape(n.map(h=>new Dt(h[0],h[1])),t.map(h=>h.map(f=>new Dt(f[0],f[1])))),r=[],l=[];for(const h of i){let[f,d,m]=h.map(g=>a[g]);(d[1]-f[1])*(m[0]-f[0])-(d[0]-f[0])*(m[1]-f[1])<0&&([d,m]=[m,d]);for(const g of[f,d,m]){r.push(g[0]*k,e,g[1]*k);const u=s(g[0],g[1]);l.push(u[0],u[1])}}const o=new we;o.setAttribute("position",new lt(r,3)),o.setAttribute("uv",new lt(l,2));const c=new Float32Array(r.length);for(let h=1;h<c.length;h+=3)c[h]=1;return o.setAttribute("normal",new lt(c,3)),o.computeBoundingSphere(),o}function sn(){const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d"),s=e.createImageData(256,256),a=(h,f,d)=>{const m=Math.sin((h%d+d)%d*127.1+(f%d+d)%d*311.7+d*17.3)*43758.5453;return m-Math.floor(m)},i=h=>h*h*(3-2*h),r=(h,f,d)=>{const m=Math.floor(h),g=Math.floor(f),u=i(h-m),b=i(f-g),w=a(m,g,d),p=a(m+1,g,d),y=a(m,g+1,d),P=a(m+1,g+1,d);return w+(p-w)*u+(y-w)*b+(w-p-y+P)*u*b},l=new Float32Array(256*256);for(let h=0;h<256;h++)for(let f=0;f<256;f++){let d=0,m=1,g=4;for(let u=0;u<4;u++)d+=(r(f/256*g,h/256*g,g)-.5)*m,m*=.5,g*=2;l[h*256+f]=d}const o=(h,f)=>l[(f+256)%256*256+(h+256)%256];for(let h=0;h<256;h++)for(let f=0;f<256;f++){const d=(o(f+1,h)-o(f-1,h))*9,m=(o(f,h+1)-o(f,h-1))*9,g=Math.hypot(d,m,1),u=(h*256+f)*4;s.data[u]=(-d/g*.5+.5)*255,s.data[u+1]=(-m/g*.5+.5)*255,s.data[u+2]=(1/g*.5+.5)*255,s.data[u+3]=255}e.putImageData(s,0,0);const c=new ee(t);return c.wrapS=c.wrapT=He,c.anisotropy=4,c}const nn="./",Ne=()=>{const n=new ds(new Uint8Array([255,255,255,255]),1,1);return n.needsUpdate=!0,n};function on(n,t){n.onBeforeCompile=e=>{Object.assign(e.uniforms,t),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
        uniform sampler2D tMask; uniform sampler2D tGrass; uniform sampler2D tStone; uniform vec4 uBox;`).replace("#include <map_fragment>",`#include <map_fragment>
        {
          vec4 mk = texture2D(tMask, vMapUv);
          vec2 wp = vec2(vMapUv.x * uBox.z + uBox.x, (1.0 - vMapUv.y) * uBox.w + uBox.y) * ${k.toFixed(3)};
          vec3 gm = max(textureLod(tGrass, vec2(0.5), 9.0).rgb, vec3(0.02));
          vec3 sm = max(textureLod(tStone, vec2(0.5), 9.0).rgb, vec3(0.02));
          vec3 g1 = min(texture2D(tGrass, wp / 8.0).rgb / gm, vec3(2.2));
          vec3 g2 = min(texture2D(tGrass, wp / 31.0 + 0.31).rgb / gm, vec3(2.2));
          vec3 s1 = min(texture2D(tStone, wp / 3.0).rgb / sm, vec3(2.2));
          vec3 gg = g1 * g2;
          vec3 gd = mix(vec3(dot(gg, vec3(0.299, 0.587, 0.114))), gg, 0.25);
          diffuseColor.rgb *= mix(vec3(1.0), gd, 0.65 * mk.r);
          diffuseColor.rgb *= mix(vec3(1.0), s1, 0.6 * mk.g);
          diffuseColor.rgb *= mix(vec3(1.0), vec3(g2.g), 0.5 * mk.b);
        }`)}}function an(n,t){n.onBeforeCompile=e=>{e.uniforms.uWave={value:t},e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
uniform vec2 uWave;`).replace("vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;",`vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
        vec3 mapN2 = texture2D( normalMap, vNormalMapUv * -1.37 + uWave ).xyz * 2.0 - 1.0;
        mapN = normalize( vec3( mapN.xy + mapN2.xy * 0.85, mapN.z ) );`)}}const We=(n,t)=>{let e=!1;for(let s=0,a=n.length-1;s<n.length;a=s++)n[s][1]>t[1]!=n[a][1]>t[1]&&t[0]<(n[a][0]-n[s][0])*(t[1]-n[s][1])/(n[a][1]-n[s][1])+n[s][0]&&(e=!e);return e};function rn(n,t,e=4){const s=new Ot,[a,i,r,l]=Me(n),o=(x,M)=>[(x-a)/r,1-(M-i)/l],c=ye(n),h=[c.sea,...c.pond?[c.pond]:[]],f=[t];let d=!1;const m=new ee(tn(n,1024));m.colorSpace=cs,m.anisotropy=4,f.push(m);const g={tMask:{value:m},tGrass:{value:Ne()},tStone:{value:Ne()},uBox:{value:[a,i,r,l]}};f.push(g.tGrass.value,g.tStone.value);for(const[x,M]of[["tGrass","grass"],["tStone","stone"]])new hs().load(`${nn}3d/tex/${M}/color-512.webp`,L=>{if(d){L.dispose();return}L.wrapS=L.wrapT=He,L.colorSpace=be,L.anisotropy=e,f.push(L),g[x].value=L},void 0,()=>{});const u={land:new rt({map:t,roughness:.95,metalness:0}),bed:new rt({map:t,roughness:1,metalness:0})};on(u.land,g),f.push(u.land,u.bed);const b=new ot(Vt([[K.x0-200,-6e3],[K.x1+200,-6e3],[K.x1+200,K.y1+200],[K.x0-200,K.y1+200]],h,0,o),u.land);b.receiveShadow=!0,b.name="land";const w=new ot(Vt([[K.x0,-6e3],[K.x1,-6e3],[K.x1,K.y1],[K.x0,K.y1]],[],ue,o),u.bed);w.receiveShadow=!0,w.name="bed",s.add(b,w),f.push(b.geometry,w.geometry);const p=new ht,y=st(n,"beach").map(x=>ct(x.d)),P=x=>y.some(M=>{const[L,$,T,it]=mt(M);if(x[0]<L-4||x[0]>L+T+4||x[1]<$-12||x[1]>$+it+12)return!1;let dt=!1;for(let X=0,gt=M.length-1;X<M.length;gt=X++)M[X][1]>x[1]!=M[gt][1]>x[1]&&x[0]<(M[gt][0]-M[X][0])*(x[1]-M[X][1])/(M[gt][1]-M[X][1])+M[X][0]&&(dt=!dt);return dt||M.some(X=>Math.hypot(X[0]-x[0],X[1]-x[1])<14)}),E=[.9,.84,.68],C=[.6,.6,.57],G=[.62,.72,.5],W=(x,M,L,$,T,it)=>{const dt=M[0]-x[0],X=M[1]-x[1],gt=Math.hypot(dt,X)||1,v=-X/gt*L,z=dt/gt*L,N=[x[0]*k,T,x[1]*k],Y=[M[0]*k,T,M[1]*k],St=[x[0]*k+v,T-$,x[1]*k+z],It=[M[0]*k+v,T-$,M[1]*k+z],bt=Y[0]-N[0],Se=Y[2]-N[2],Je=St[0]-N[0],ke=St[1]-N[1],Xe=St[2]-N[2],ne=[-Se*ke,Se*Je-bt*Xe,bt*ke];ne[0]*v+ne[1]*.3*L+ne[2]*z>0?p.quad(N,Y,It,St,it):p.quad(N,St,It,Y,it)};for(let x=0;x+1<c.edge.length;x++){const M=c.edge[x],L=c.edge[x+1];if(M[0]<-200||L[0]>1800)continue;const $=[(M[0]+L[0])/2,(M[1]+L[1])/2],T=!c.quay[x]&&P($);W(M,L,T?20*k:.5,1.6+jt+.5,0,T?E:C)}if(c.pond)for(let x=0;x<c.pond.length;x++)W(c.pond[x],c.pond[(x+1)%c.pond.length],.4,.5,0,G);const A=new ot(p.build(),new rt({vertexColors:!0,roughness:.95,metalness:0}));A.receiveShadow=!0,A.name="skirt",s.add(A),f.push(A.geometry,A.material);const q=[],H=[],D=[],_=jt+.04,R=c.edge,U=R.length,S=x=>{const M=R[Math.max(0,x-1)],L=R[Math.min(U-1,x+1)],$=Math.hypot(L[0]-M[0],L[1]-M[1])||1,T=[-(L[1]-M[1])/$,(L[0]-M[0])/$],it=R[x],dt=We(c.sea,[it[0]+T[0]*3,it[1]+T[1]*3]);return dt?{n:T,ok:dt}:{n:[-T[0],-T[1]],ok:We(c.sea,[it[0]-T[0]*3,it[1]-T[1]*3])}},O=[];for(let x=0;x<U;x++){const{n:M,ok:L}=S(x),$=c.quay[x],T=!$&&P(R[x]);O.push({x:R[x][0]*k,z:R[x][1]*k,nx:M[0],nz:M[1],beach:T,ok:L})}for(let x=0;x<U;x++){const M=O[x],L=M.beach?3.2:.15,$=M.beach?9:3.2;if(q.push(M.x+M.nx*L,_,M.z+M.nz*L,M.x+M.nx*(L+$),_,M.z+M.nz*(L+$)),H.push(.93,.98,.98,M.beach?.5:.34,.93,.98,.98,0),x+1<U&&M.ok&&O[x+1].ok&&R[x][0]>-200&&R[x+1][0]<1800){const T=x*2;D.push(T,T+2,T+1,T+1,T+2,T+3,T,T+1,T+2,T+2,T+1,T+3)}}if(D.length){const x=new we;x.setAttribute("position",new lt(q,3)),x.setAttribute("color",new lt(H,4)),x.setIndex(D);const M=new ot(x,new Zt({vertexColors:!0,transparent:!0,depthWrite:!1}));M.renderOrder=3,M.name="foam",s.add(M),f.push(x,M.material)}const F=sn(),Z=new Dt;f.push(F);const at=(x,M)=>{const L=new rt({color:M,roughness:.05,metalness:.1,transparent:!0,opacity:x,normalMap:F,depthWrite:!1,envMapIntensity:1.05});return L.normalScale.set(.55,.55),an(L,Z),f.push(L),L},J=(x,M)=>[x*k/70,M*k/70],V=new ot(Vt(c.sea,[],jt,J),at(.82,2453388));if(V.name="sea",V.renderOrder=2,s.add(V),f.push(V.geometry),c.pond){const x=new ot(Vt(c.pond,[],-.18,J),at(.78,5940152));x.renderOrder=2,s.add(x),f.push(x.geometry)}return{group:s,water:{normal:F,wave:Z},dispose:()=>{d=!0,f.forEach(x=>x.dispose())}}}const kt=n=>{const t=Math.sin(n*127.1+311.7)*43758.5453;return t-Math.floor(t)};function ln(n){const t=new Ot,e=[],s=S=>(e.push(S),S),a=[];for(const S of n.scenery){if(S.kind!=="trees"||!S.d)continue;const O=S.text?.endsWith("-b")?1:0;for(const F of Ls(S.d))a.push({x:F.x*k,z:F.y*k,r:F.r*k,tone:O})}const i=(S,O,F,Z,at)=>{const J=new ps(S,at);return J.translate(O,F,Z),J},r=s(us([i(1,0,0,0,1),i(.62,.55,-.15,.2,0),i(.58,-.45,-.1,-.35,0),i(.5,.05,.55,-.1,0)])),l=r.getAttribute("position"),o=[];for(let S=0;S<l.count;S++){const O=.66+.4*Math.min(1,Math.max(0,(l.getY(S)+.9)/1.9));o.push(O,O,O)}r.setAttribute("color",new lt(o,3));const c=s(new fs(.1,.16,1,5));c.translate(0,.5,0);const h=new zt(r,s(new rt({vertexColors:!0,roughness:.9,metalness:0,flatShading:!0})),a.length),f=new zt(c,s(new rt({color:7033400,roughness:1})),a.length),d=new xt,m=new Rt,g=new j,u=new j,b=new nt,w=[new nt("#587f50"),new nt("#6c9660")];a.forEach((S,O)=>{const F=kt(O),Z=kt(O+99),at=1.6+S.r*.55,J=kt(O+41)<.35,V=S.r*(J?.78:.92+F*.18)*.92,x=S.r*(J?1.18+Z*.2:.85+Z*.22)*.92;m.setFromAxisAngle(new j(0,1,0),F*6.28),g.set(S.x,at+x*.7,S.z),u.set(V,x,V),h.setMatrixAt(O,d.compose(g,m,u)),b.copy(w[S.tone]).offsetHSL((F-.5)*.03,0,(Z-.5)*.09),h.setColorAt(O,b),g.set(S.x,0,S.z),u.set(Math.max(1,S.r*.35),at+x*.3,Math.max(1,S.r*.35)),f.setMatrixAt(O,d.compose(g,new Rt,u))}),h.castShadow=!0,h.receiveShadow=!0,f.castShadow=!1,h.name="trees",f.name="trunks",t.add(h,f);const p=new ht,y=[.8,.7,.54],P=[.6,.58,.53],E=[.4,.33,.26];for(const S of n.scenery){if(S.kind!=="pier"||!S.d||S.text==="boat")continue;const O=ct(S.d).map(F=>[F[0]*k,F[1]*k]);if(S.text==="breakwater")p.prism(O,ue+.4,1.25,P);else{p.prism(O,ue+.4,.38,y);const[F,Z,at,J]=mt(O);for(let V=Z+1.5;V<Z+J;V+=5)for(const x of[F-.06,F+at+.06])p.box(x,jt-.3,V,.28,1.1,.28,E)}}const C=new ot(s(p.build()),s(new rt({vertexColors:!0,roughness:.9})));C.castShadow=!0,C.receiveShadow=!0,C.name="piers",t.add(C),s(C.geometry);const G=n.scenery.filter(S=>S.kind==="pier"&&S.text==="boat"&&S.d);if(G.length){const S=new ht,O=[1,1,1],F=[.78,.68,.52],Z=[.22,.3,.38];S.prism([[-.5,.5],[-.5,-.12],[0,-.5],[.5,-.12],[.5,.5]].map(x=>x),0,.9,O,{top:!1}),S.prism([[-.44,.44],[-.44,-.1],[0,-.44],[.44,-.1],[.44,.44]].map(x=>x),.9,.96,F),S.box(0,.96,.1,.62,.9,.34,O),S.box(0,1.2,.1,.64,.34,.3,Z);const at=s(S.build()),J=s(new rt({vertexColors:!0,roughness:.4,metalness:.05})),V=new zt(at,J,G.length);G.forEach((x,M)=>{const[L,$,T,it]=mt(ct(x.d));g.set((L+T/2)*k,jt-.25,($+it/2)*k),u.set(Math.max(1.8,T*k*.95),1.15,it*k*1.05),V.setMatrixAt(M,d.compose(g,new Rt().setFromAxisAngle(new j(0,1,0),(kt(M+5)-.5)*.12),u)),V.setColorAt(M,b.setHSL(.55+kt(M)*.05,kt(M+3)*.15,.92-kt(M+7)*.12))}),V.castShadow=!0,V.name="boats",t.add(V)}const W=new ht,A=(n.northDeg||0)*Math.PI/180,q=[Math.sin(A),-Math.cos(A)],H=[Math.cos(A),Math.sin(A)],D=[70*k,78*k],_=(S,O)=>[D[0]+q[0]*S+H[0]*O,D[1]+q[1]*S+H[1]*O],R=Array.from({length:24},(S,O)=>_(Math.cos(O/24*6.283)*15,Math.sin(O/24*6.283)*15));W.prism(R,0,.18,[.96,.95,.9]),W.prism([_(12,0),_(-9,6),_(-5,0),_(-9,-6)],.18,.4,[.2,.26,.32]),W.prism([_(12,0),_(-9,6),_(-5,0)],.4,.5,[.55,.6,.65]);const U=new ot(s(W.build()),s(new rt({vertexColors:!0,roughness:.8})));return U.receiveShadow=!0,U.name="north",t.add(U),{group:t,trees:a.length,dispose:()=>e.forEach(S=>S.dispose())}}const cn=n=>{const t=(n.northDeg||0)*Math.PI/180;return new j(70*k+Math.sin(t)*19,1.5,78*k-Math.cos(t)*19)},te=34,qe=n=>n*Math.PI/180,hn=n=>[n.tx+n.dist*Math.sin(n.pol)*Math.sin(n.az),n.ty+n.dist*Math.cos(n.pol),n.tz+n.dist*Math.sin(n.pol)*Math.cos(n.az)];function dn(n,t,e,s,a=1.08,i=te){const r=Math.tan(qe(i)/2),l=n/2/(r*e),o=(t*Math.cos(Math.PI/2-s)+.001)/2/r;return Math.max(l,o)*a}function un(n,t){const e=[t.camera,...n.plots.filter(i=>i.zone===t.code).map(i=>mt(Ut(i.d))),...n.buildings.filter(i=>i.zone===t.code).map(i=>mt(Ut(i.footprint)))],s=Math.min(...e.map(i=>i[0])),a=Math.min(...e.map(i=>i[1]));return[s,a,Math.max(...e.map(i=>i[0]+i[2]))-s,Math.max(...e.map(i=>i[1]+i[3]))-a]}const fn=1.1,Ve=0;function Ye(n,t,e,s,a){return{tx:(n[0]+n[2]/2)*k,ty:0,tz:(n[1]+n[3]/2)*k,az:e,pol:s,dist:dn(n[2]*k,n[3]*k,t,s,a)}}function Nt(n,t){const[e,s,a,i]=n.viewBox,r=[e+a*.02,s+i*.09,a*.96,i*.74];return Ye(r,t,Ve,fn,.97)}function fe(n,t,e){const s=n.zones.find(i=>i.code===t);if(!s)return Nt(n,e);const a=Ye(un(n,s),e,Ve,.95,1.24);return{...a,dist:Math.max(a.dist,90)}}function pn(n){return mt(Ut(n.footprint))}function mn(n,t){const e=pn(n),s=Rs(n.floors)+4,a=n.kind==="tower",i=a?1.38:1.22,r=a?.42:.2,l=(e[0]+e[2]/2)*k,o=(e[1]+e[3]/2)*k,c=Math.tan(qe(te)/2),h=Math.max(e[2],e[3])*k*1.05,f=s*1/2/c,d=h/2/(c*t);return{tx:l,ty:s*.46,tz:o,az:r,pol:i,dist:Math.max(f,d)*1.18+h*.25}}function gn(n,t,e){let s=t.az-n.az;return s=((s+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI,{tx:n.tx+(t.tx-n.tx)*e,ty:n.ty+(t.ty-n.ty)*e,tz:n.tz+(t.tz-n.tz)*e,az:n.az+s*e,pol:n.pol+(t.pol-n.pol)*e,dist:n.dist*Math.pow(t.dist/n.dist,e)}}const vn=n=>n<.5?4*n*n*n:1-Math.pow(-2*n+2,3)/2;function wn(n,t){return[Nt(n,t),...n.zones.map(e=>fe(n,e.code,t))]}const Jt={elevation:.8376,azimuth:.5983},pe=Math.atan2(.56,.55),Ke=pe-Jt.azimuth,me=new j(Math.cos(Jt.elevation)*Math.cos(pe),Math.sin(Jt.elevation),Math.cos(Jt.elevation)*Math.sin(pe)),bn=new nt("#e9e6dc"),Ze="#dfe8ea",xn=()=>new Ie({side:As,depthWrite:!1,fog:!1,uniforms:{top:{value:new nt("#5b9bd5")},horizon:{value:new nt(Ze)},ground:{value:new nt("#cdc8b8")},sun:{value:me},tSky:{value:null},uHave:{value:0},uRot:{value:new Es().setFromMatrix4(new xt().makeRotationY(Ke))}},vertexShader:"varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform vec3 top; uniform vec3 horizon; uniform vec3 ground; uniform vec3 sun; uniform sampler2D tSky; uniform float uHave; uniform mat3 uRot; varying vec3 vP;
    void main(){
      vec3 d = normalize(vP);
      float h = d.y;
      vec3 c = mix(horizon, top, pow(clamp(h, 0.0, 1.0), 0.45));
      c = mix(c, ground, smoothstep(0.0, -0.25, h) * 0.9);
      float s = max(dot(d, normalize(sun)), 0.0);
      c += vec3(1.0, 0.92, 0.75) * (pow(s, 600.0) * 4.0 + pow(s, 8.0) * 0.12);
      if (uHave > 0.5) {
        vec3 t = uRot * d;
        c = texture2D(tSky, vec2(atan(t.z, t.x) * 0.15915494 + 0.5, asin(clamp(t.y, -1.0, 1.0)) * 0.31830989 + 0.5)).rgb;
        c = mix(c, horizon, smoothstep(0.3, 0.0, h));
      }
      gl_FragColor = vec4(c, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`});function yn(n){return n.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
attribute float gloss; varying float vGloss;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vGloss = gloss;`),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
varying float vGloss;`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor = mix(roughnessFactor, 0.07, vGloss);`).replace("#include <metalnessmap_fragment>",`#include <metalnessmap_fragment>
metalnessFactor = mix(metalnessFactor, 0.6, vGloss);`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
normal = normalize(normal + vGloss * 0.5 * normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz));`)},n}function Mn(n){const t=n.image;if(!t?.data||!t.width||!t.height)return null;const{data:e,width:s,height:a}=t,i=e instanceof Uint16Array,r=h=>i?Ps.fromHalfFloat(e[h]):e[h],l=(h,f)=>{let d=0,m=0,g=0,u=0;for(let b=Math.round(a*h);b<=Math.round(a*f);b++)for(let w=0;w<s;w+=8){const p=(b*s+w)*4;d+=r(p),m+=r(p+1),g+=r(p+2),u++}return new nt(d/u,m/u,g/u)},o=l(.53,.6),c=l(.4,.47);return o.r+o.g+o.b>c.r+c.g+c.b?o:c}class Sn{constructor(t,e,s,a,i,r){this.g=e,this.minTarget=s,this.host=t,this.cb=a,this.level=i,this.interactive=r,this.canvas=document.createElement("canvas"),this.canvas.className="plan3d-canvas",this.canvas.style.cssText="position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none;outline:none;";try{if(this.renderer=new ms({canvas:this.canvas,antialias:!0,powerPreference:"high-performance"}),!this.renderer.getContext())throw new Error("no context")}catch{this.ok=!1;return}this.ok=!0,t.appendChild(this.canvas),this.reduced=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches,this.setup()}g;minTarget;ok;host;canvas;renderer;scene=new Ae;camera=new gs(te,1,2,6e3);controls;sun;skyMat;dome;terrain;nature;units=new Map;blds=new Map;plotMats=[];plotFade={cur:1,target:1};plotMeshes=[];pickMeshes=[];zoneLabels=[];labels=[];ranks=new Map;north;disposables=[];overlayGroup=new Ot;ovMats={};lineMats={};overlays=new Map;flashes=new Map;outlineCache=new Map;ray=new vs;paint=new Map;colors={};bPaint={};sel=null;compare=new Set;focus=null;hover=null;hoverBuilding=null;level="site";interactive=!0;paintedOnce=!1;flight=null;userMoved=!1;lastAspect=0;tour={i:0,next:0};visible=!0;raf=0;last=0;w=1;h=1;ro;io;time=0;pointer={x:0,y:0,down:!1,sx:0,sy:0,st:0,moved:!1,pending:!1};cb;reduced=!1;disposed=!1;near=2;az=0;frames=0;compact=!1;modeTick=0;shadowExt=0;cursorOn=!1;envFallback=null;shadowAt=new j(1e9,0,0);track(t){return this.disposables.push(t),t}setup(){const t=this.renderer;t.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),t.shadowMap.enabled=!0,t.shadowMap.type=ws,t.shadowMap.autoUpdate=!1,t.toneMapping=bs,t.toneMappingExposure=1.1,this.skyMat=this.track(xn()),this.dome=new ot(this.track(new oe(4600,32,20)),this.skyMat),this.dome.renderOrder=-10,this.dome.frustumCulled=!1,this.scene.add(this.dome),this.scene.fog=new xs(new nt(Ze),900,3400);const e=new Ae;e.add(new ot(new oe(100,24,16),this.skyMat));const s=new ot(new oe(9,12,8),new Zt({color:new nt(14,12,9)}));s.position.copy(me).multiplyScalar(80),e.add(s);const a=new Ee(t),i=a.fromScene(e,.02);a.dispose(),this.envFallback=i,this.scene.environment=i.texture,this.scene.environmentIntensity=.8,this.loadSky(),this.sun=new ys(16774374,2.7),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-4e-4,this.sun.shadow.normalBias=.7,this.sun.shadow.radius=2.2,this.sun.shadow.camera.near=10,this.sun.shadow.camera.far=1600,this.scene.add(this.sun,this.sun.target);const r=t.capabilities.maxTextureSize,l=en(this.g,r,Math.min(8,t.capabilities.getMaxAnisotropy()));this.terrain=rn(this.g,l,Math.min(8,t.capabilities.getMaxAnisotropy())),this.track(this.terrain),this.scene.add(this.terrain.group),this.nature=ln(this.g),this.track(this.nature),this.scene.add(this.nature.group),this.buildBuildings(),this.buildPlots(),this.buildLabels(),this.overlayGroup.name="overlays",this.scene.add(this.overlayGroup),this.makeOverlayMaterials(),this.controls=new Ms(this.camera,this.canvas);const o=this.controls;o.enableDamping=!0,o.dampingFactor=.09,o.rotateSpeed=.55,o.zoomSpeed=.9,o.panSpeed=.9,o.screenSpacePanning=!1,o.minPolarAngle=.12,o.maxPolarAngle=1.5,o.minDistance=30,o.maxDistance=1500,o.enabled=this.interactive,o.addEventListener("start",()=>{this.flight=null,this.userMoved=!0});const c=this.canvas;c.addEventListener("pointerdown",this.onDown),c.addEventListener("pointermove",this.onMove),c.addEventListener("pointerup",this.onUp),c.addEventListener("pointerleave",this.onLeave),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(this.host),this.io=new IntersectionObserver(h=>{this.visible=h[h.length-1].isIntersecting,this.syncLoop()}),this.io.observe(this.host),document.addEventListener("visibilitychange",this.syncLoop),this.resize(),this.applyLevel(!1),this.syncLoop()}loadSky(){new Ss().load("./3d/env/sky-1k.hdr",t=>{if(this.disposed){t.dispose();return}t.mapping=ks;const e=new Ee(this.renderer),s=e.fromEquirectangular(t);e.dispose(),this.track(t),this.track(s.texture);const a=this.scene;a.environment=s.texture,a.environmentRotation.set(0,Ke,0),this.skyMat.uniforms.tSky.value=t,this.skyMat.uniforms.uHave.value=1,this.envFallback?.dispose(),this.envFallback=null;const i=Mn(t);i&&(this.skyMat.uniforms.horizon.value.copy(i),a.fog&&a.fog.color.copy(i))},void 0,()=>{})}buildBuildings(){for(const t of this.g.buildings){const e=Os(t),s=Gs(e,t.kind),a=new Ot;a.name=t.code;const i=new rt({vertexColors:!0,roughness:.78,metalness:0}),r=new rt({vertexColors:!0,roughness:.08,metalness:.7}),l=yn(new rt({vertexColors:!0,roughness:.55,metalness:0})),o=[i,r,l];o.forEach(p=>this.track(p));const c=[],h=(p,y)=>{p.castShadow=!0,p.receiveShadow=!0,p.userData={building:t.code,role:y},a.add(p),c.push(p),this.pickMeshes.push(p)};h(new ot(this.track(s.shell),i),"solid"),h(new ot(this.track(s.glass),r),"solid");const f=new zt(this.track(s.slab),i,s.slabY.length),d=new xt;s.slabY.forEach((p,y)=>f.setMatrixAt(y,d.makeTranslation(0,p,0))),h(f,"thin");const m=new Map(t.elevation.cells.map(p=>[`${p.stack}:${p.floor}`,p.unitCode])),g=new Map(e.stacks.map(p=>[p.stack,p]));s.blocks.forEach(p=>{const y=new zt(this.track(p.geometry),l,e.floors),P=[];for(let D=1;D<=e.floors;D++)y.setMatrixAt(D-1,d.makeTranslation(p.centre[0]*k,le(D)+yt,p.centre[1]*k)),y.setColorAt(D-1,new nt(1,1,1)),P.push(m.get(`${p.stack}:${D}`)??"");y.instanceMatrix.needsUpdate=!0,h(y,"block"),y.userData.codes=P;const E=g.get(p.stack),C=[],G=D=>[(D[0]-p.centre[0])*k,(D[1]-p.centre[1])*k];for(const D of E.pieces)D.forEach((_,R)=>{const U=G(_),S=G(D[(R+1)%D.length]);C.push(U[0],0,U[1],S[0],0,S[1],U[0],At,U[1],S[0],At,S[1],U[0],0,U[1],U[0],At,U[1])});const W=new Float32Array(C);let A=1;for(let D=0;D<C.length;D+=3)A=Math.max(A,Math.abs(C[D]),Math.abs(C[D+2]));const q=1+.68/A,H=1+.22/At;P.forEach((D,_)=>{if(!D)return;const R=new j(p.centre[0]*k,le(_+1)+yt-.11,p.centre[1]*k),U=new xt().compose(R,new Rt,new j(q,H,q));this.units.set(D,{code:D,kind:"cell",building:t.code,meshes:[{mesh:y,idx:_,tint:1}],geom:p.geometry,ov:U,outline:W,centre:new j(p.centre[0]*k,le(_+1)+Tt/2,p.centre[1]*k)})})});const[u,b]=se(e.footprint),w=new Qt(!1,21);je(w,t.code,t.name,void 0,this.compact),w.sprite.position.set(u*k,s.top+7,b*k),this.scene.add(w.sprite),this.labels.push(w),this.scene.add(a),this.blds.set(t.code,{code:t.code,b:t,group:a,mats:o,meshes:c,label:w,fade:{cur:1,target:1},centre:new j(u*k,s.top/2,b*k),top:s.top})}}buildPlots(){const t=Hs(),e=$s(),s=this.track(new rt({vertexColors:!0,roughness:.82})),a=this.track(new rt({vertexColors:!0,roughness:.62}));this.plotMats=[s,a];const i=[{kind:"villa",geo:t,H:8.6,plots:this.g.plots.filter(h=>h.kind==="villa")},{kind:"townhouse",geo:e,H:7.6,plots:this.g.plots.filter(h=>h.kind==="townhouse")}],r=this.track(new zs(1,1,1));r.translate(0,.5,0);const l=[],o=[[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]];o.forEach((h,f)=>{const d=o[(f+1)%4];l.push(h[0],0,h[1],d[0],0,d[1],h[0],1,h[1],d[0],1,d[1],h[0],0,h[1],h[0],1,h[1])});const c=new Float32Array(l);for(const h of i){if(!h.plots.length)continue;const f=new zt(this.track(h.geo.walls),s,h.plots.length),d=new zt(this.track(h.geo.roof),a,h.plots.length),m=[];h.plots.forEach((g,u)=>{const b=ct(g.d),w=Ws(b);let{w:p,h:y,ang:P}=w;h.kind==="villa"&&y>p&&([p,y]=[y,p],P+=Math.PI/2);const E=h.kind==="villa"?Math.min(15,Math.max(9,p*k*.62)):p*k*.97,C=h.kind==="villa"?Math.min(11,Math.max(7,y*k*.52)):y*k*.55,G=new Rt().setFromAxisAngle(new j(0,1,0),-P),W=new j(w.cx*k,0,w.cy*k);h.kind==="townhouse"&&W.add(new j(0,0,0));const A=new xt().compose(W,G,new j(E,1,C));f.setMatrixAt(u,A),d.setMatrixAt(u,A),f.setColorAt(u,new nt(1,1,1)),d.setColorAt(u,new nt(1,1,1)),m.push(g.unitCode);const q=W.clone().add(new j(0,-.08,0)),H=new xt().compose(q,G,new j(E+.6,h.H+.3,C+.6)),D=[];b.forEach((_,R)=>{const U=b[(R+1)%b.length];D.push(_[0]*k,.25,_[1]*k,U[0]*k,.25,U[1]*k)}),this.units.set(g.unitCode,{code:g.unitCode,kind:"plot",building:g.buildingCode,meshes:[{mesh:f,idx:u,tint:.22},{mesh:d,idx:u,tint:1}],geom:r,ov:H,outline:c,lot:new Float32Array(D),centre:new j(W.x,h.H/2,W.z)})});for(const g of[f,d])g.castShadow=!0,g.receiveShadow=!0,g.userData={kind:"plot",codes:m,role:"plot"},g.instanceMatrix.needsUpdate=!0,this.scene.add(g),this.plotMeshes.push(g),this.pickMeshes.push(g)}}buildLabels(){for(const t of this.g.scenery){if(t.kind!=="label"||!t.at||!t.text||(t.w??12)<20)continue;const e=Vs(t.text);e.sprite.position.set(t.at[0]*k,16,t.at[1]*k),this.scene.add(e.sprite),this.zoneLabels.push(e),this.labels.push(e)}this.north=Zs(),this.north.sprite.position.copy(cn(this.g)),this.scene.add(this.north.sprite),this.labels.push(this.north)}makeOverlayMaterials(){const t=(s,a)=>this.track(new Zt({color:s,transparent:!0,opacity:a,depthWrite:!1,toneMapped:!1,fog:!1}));this.ovMats={sel:t(16777215,.3),cmp:t(12720219,.28),glow:t(16757760,.3),hover:t(16777215,.22),focus:t(684e3,.28)};const e=(s,a)=>{const i=new $e({color:s,linewidth:a,worldUnits:!1,transparent:!0,depthWrite:!1,fog:!1});return this.track(i),i};this.lineMats={selHalo:e(16777215,7.5),sel:e(662058,3.6),cmp:e(12720219,2.8),focus:e(684e3,3.2),glow:e(16757760,3)},this.updateLineRes()}updateLineRes(){for(const t of Object.values(this.lineMats))t.resolution.set(this.w,this.h)}colorFor(t){const e=Xt[Ct(t?.token)],s=new nt(e.bg);return .299*s.r+.587*s.g+.114*s.b>.74&&s.lerp(new nt(e.ink),.55),t?.dim&&s.lerp(bn,.7),s}applyColor(t,e){const s=this.colorFor(e);for(const{mesh:a,idx:i,tint:r}of t.meshes)a.setColorAt(i,r>=1?s:new nt(1,1,1).lerp(s,r)),a.instanceColor&&(a.instanceColor.needsUpdate=!0)}setPaint(t,e){if(this.colors=t,!this.ok)return;const s=performance.now();for(const a of this.units.values()){const i=t[a.code],r=this.paint.get(a.code),l={token:Ct(i?.token),dim:!!i?.dim,glow:!!i?.glow,rank:i?.rank,flash:i?.flash};(!r||r.token!==l.token||r.dim!==l.dim)&&this.applyColor(a,i),(!r||r.rank!==l.rank)&&this.syncRank(a,l.rank),l.flash!==void 0&&(r?r.flash!==l.flash:this.paintedOnce)&&this.startFlash(a,s),this.paint.set(a.code,l)}this.paintedOnce=!0,this.syncGlow(),this.syncRankVisibility(),this.bPaint=e??{},this.repaintLabels()}repaintLabels(){for(const t of this.blds.values())je(t.label,t.code,t.b.name,this.bPaint[t.code],this.compact)}syncRank(t,e){let s=this.ranks.get(t.code);if(e===void 0){s&&(this.scene.remove(s.sprite),s.dispose(),this.ranks.delete(t.code));return}s||(s=new Qt(!1,22),s.sprite.position.copy(t.centre).add(new j(0,t.kind==="cell"?.4:11,0)),this.scene.add(s.sprite),this.ranks.set(t.code,s)),Ks(s,e)}unitVisible(t){return t.kind==="plot"?this.level==="site":this.level!=="site"&&this.level.building===t.building}syncRankVisibility(){for(const[t,e]of this.ranks)e.sprite.visible=this.unitVisible(this.units.get(t))}overlayFor(t,e,s,a){let i=this.overlays.get(t);if(i)return i;const r=new Ot,l=new ot(e.geom,s);if(l.matrixAutoUpdate=!1,l.matrix.copy(e.ov),l.matrixWorldNeedsUpdate=!0,l.renderOrder=5,r.add(l),a){const o=`${e.code}`;let c=this.outlineCache.get(o);if(c||(c=new de,c.setPositions(e.outline),this.outlineCache.set(o,c),this.track(c)),a==="sel"){const f=new $t(c,this.lineMats.selHalo);f.matrixAutoUpdate=!1,f.matrix.copy(e.ov),f.matrixWorldNeedsUpdate=!0,f.renderOrder=5.5,r.add(f)}const h=new $t(c,this.lineMats[a]);if(h.matrixAutoUpdate=!1,h.matrix.copy(e.ov),h.matrixWorldNeedsUpdate=!0,h.renderOrder=6,r.add(h),e.lot){const f=e.code+":lot";let d=this.outlineCache.get(f);if(d||(d=new de,d.setPositions(e.lot),this.outlineCache.set(f,d),this.track(d)),a==="sel"){const g=new $t(d,this.lineMats.selHalo);g.renderOrder=5.5,r.add(g)}const m=new $t(d,this.lineMats[a]);m.renderOrder=6,r.add(m)}}return this.overlayGroup.add(r),this.overlays.set(t,r),r}dropOverlay(t){const e=this.overlays.get(t);e&&(this.overlayGroup.remove(e),this.overlays.delete(t))}syncKind(t,e){const s=t+":";for(const a of[...this.overlays.keys()])a.startsWith(s)&&!e.has(a.slice(s.length))&&this.dropOverlay(a);for(const a of e){const i=this.units.get(a);if(!i)continue;const r=this.overlayFor(s+a,i,this.ovMats[t],t==="sel"||t==="cmp"||t==="focus"||t==="glow"?t:void 0);r.visible=this.unitVisible(i)}}syncSel(){this.syncKind("sel",new Set(this.sel?[this.sel]:[])),this.syncKind("cmp",this.compare),this.syncKind("focus",new Set(this.focus?[this.focus]:[])),this.syncKind("hover",new Set(this.hover?[this.hover]:[]))}syncGlow(){const t=new Set;for(const[e,s]of this.paint)s.glow&&t.add(e);this.syncKind("glow",t)}startFlash(t,e){const s=this.flashes.get(t.code);s&&(this.overlayGroup.remove(s.mesh),s.mat.dispose());const a=new Zt({color:16757760,transparent:!0,opacity:.9,depthWrite:!1,toneMapped:!1,fog:!1}),i=new ot(t.geom,a);i.matrixAutoUpdate=!1,i.matrix.copy(t.ov),i.matrixWorldNeedsUpdate=!0,i.renderOrder=7,i.visible=this.unitVisible(t),this.overlayGroup.add(i),this.flashes.set(t.code,{start:e,mesh:i,mat:a})}setSelection(t,e){this.sel=t,this.compare=new Set(e??[]),this.ok&&this.syncSel()}setFocus(t){this.focus=t,this.ok&&this.syncSel()}setLevel(t,e=!0){const s=(typeof t=="string"?"site":t.building)===(typeof this.level=="string"?"site":this.level.building);this.level=t,this.ok&&!s&&(this.applyLevel(e),this.userMoved=!1)}applyLevel(t){const e=this.level==="site"?null:this.level.building;for(const s of this.blds.values()){const a=!e||s.code===e;s.fade.target=a?1:.1,s.label.show(a)}this.plotFade.target=e?.2:1;for(const s of this.zoneLabels)s.show(!e);this.north.show(!e),this.controls.minDistance=e?28:40,this.controls.maxDistance=e?420:1500,this.syncSel(),this.syncGlow(),this.syncRankVisibility(),this.hover=null,this.hoverBuilding=null;for(const s of this.blds.values())s.mats.forEach(a=>a.emissive.setRGB(0,0,0));this.cb.onTip(null,0,0),this.flyTo(this.homePose(),t?1100:0)}aspect(){return this.w/Math.max(1,this.h)}homePose(){if(this.level==="site")return Nt(this.g,this.aspect());const t=this.g.buildings.find(e=>e.code===this.level.building);return t?mn(t,this.aspect()):Nt(this.g,this.aspect())}currentPose(){const t=this.controls.target,e=this.camera.position,s=new j().subVectors(e,t),a=s.length();return{tx:t.x,ty:t.y,tz:t.z,az:Math.atan2(s.x,s.z),pol:Math.acos(Math.min(1,Math.max(-1,s.y/a))),dist:a}}setPose(t){const e=hn(t);this.camera.position.set(e[0],e[1],e[2]),this.controls.target.set(t.tx,t.ty,t.tz),this.camera.lookAt(t.tx,t.ty,t.tz)}flyTo(t,e){if(this.reduced||e<=0){this.flight=null,this.setPose(t),this.controls.update();return}this.flight={from:this.currentPose(),to:t,t0:performance.now(),ms:e}}preset(t){this.userMoved=!1,this.flyTo(t?fe(this.g,t,this.aspect()):Nt(this.g,this.aspect()),900)}fit(){this.userMoved=!1,this.flyTo(this.homePose(),700)}zoomBy(t){const e=this.currentPose(),s=this.controls.minDistance,a=this.controls.maxDistance;this.userMoved=!0,this.flyTo({...e,dist:Math.min(a,Math.max(s,e.dist/t))},220)}orbit(t,e){const s=this.currentPose();this.userMoved=!0,this.flyTo({...s,az:s.az+t,pol:Math.min(this.controls.maxPolarAngle,Math.max(this.controls.minPolarAngle,s.pol+e))},200)}setInteractive(t){this.interactive=t,this.ok&&(this.controls.enabled=t,this.tour.next=performance.now()+5e3,t&&(this.hover=null),this.syncSel())}ndc(t,e){const s=this.canvas.getBoundingClientRect();return new Dt((t-s.left)/s.width*2-1,-((e-s.top)/s.height)*2+1)}screenOf(t){const e=t.clone().project(this.camera);return{x:(e.x+1)/2*this.w,y:(1-e.y)/2*this.h,behind:e.z>1}}pickAt(t,e){const s=this.level==="site"?null:this.level.building;this.camera.updateMatrixWorld(),this.ray.setFromCamera(this.ndc(t,e),this.camera);const a=this.ray.intersectObjects(this.pickMeshes,!1);for(const i of a){const r=i.object.userData;if(i.object.visible)if(s){if(r.kind==="plot"||r.building!==s)continue;if(r.role==="block"){const l=r.codes[i.instanceId];return l?{unit:l,crowd:1}:{crowd:1}}if(r.role==="solid")return{crowd:1}}else{if(r.kind==="plot")return{unit:r.codes[i.instanceId],crowd:1};if(r.building)return{building:r.building,crowd:1}}}if(this.minTarget){const i=this.canvas.getBoundingClientRect(),r=t-i.left,l=e-i.top,o=this.minTarget/2;let c=null,h=1/0,f=0;const d=(m,g,u=!1)=>{const b=this.screenOf(m);if(b.behind)return;const w=Math.hypot(b.x-r,b.y-l);w<=o&&(u&&f++,w<h&&(h=w,c=g))};if(s)for(const m of this.units.values())m.kind==="cell"&&m.building===s&&d(m.centre,{unit:m.code});else{for(const m of this.blds.values())d(m.centre,{building:m.code});for(const m of this.units.values())m.kind==="plot"&&d(m.centre,{unit:m.code},!0)}if(c)return{...c,crowd:Math.max(1,f)}}return{crowd:1}}onDown=t=>{this.interactive&&(this.pointer={...this.pointer,down:!0,sx:t.clientX,sy:t.clientY,st:performance.now(),moved:!1})};onMove=t=>{if(!this.interactive)return;const e=this.pointer;e.x=t.clientX,e.y=t.clientY,e.down&&Math.hypot(t.clientX-e.sx,t.clientY-e.sy)>5&&(e.moved=!0),!(t.pointerType!=="mouse"||e.down)&&(e.pending||(e.pending=!0,requestAnimationFrame(()=>{e.pending=!1,this.updateHover()})))};onLeave=()=>{this.pointer.down=!1,this.hoverTo({crowd:1}),this.cb.onTip(null,0,0)};onUp=t=>{const e=this.pointer,s=this.interactive&&e.down&&!e.moved&&performance.now()-e.st<700&&t.button===0;if(e.down=!1,!s)return;const a=this.pickAt(t.clientX,t.clientY);if(a.unit){const i=this.units.get(a.unit);if(this.minTarget&&i?.kind==="plot"&&a.crowd>1&&this.level==="site"){const r=this.g.plots.find(o=>o.unitCode===a.unit)?.zone,l=r?fe(this.g,r,this.aspect()):null;if(l&&this.currentPose().dist>l.dist*1.25){this.userMoved=!1,this.flyTo(l,900);return}}this.cb.onSelect(a.unit)}else a.building&&this.level==="site"&&this.cb.onLevelChange({building:a.building})};updateHover(){const t=this.pointer;this.hoverTo(this.pickAt(t.x,t.y))}hoverTo(t){const e=t.unit??null,s=t.building??null,a=this.canvas.getBoundingClientRect();if(e!==this.hover&&(this.hover=e,this.syncKind("hover",new Set(e?[e]:[])),this.cb.onHover(e)),s!==this.hoverBuilding){const l=this.hoverBuilding&&this.blds.get(this.hoverBuilding);l&&l.mats.forEach(c=>c.emissive.setRGB(0,0,0));const o=s&&this.blds.get(s);o&&o.mats.forEach(c=>c.emissive.setRGB(.045,.055,.07)),this.hoverBuilding=s}const i=!!(e||s);if(i!==this.cursorOn&&(this.cursorOn=i,this.canvas.style.cursor=i?"pointer":""),!i){this.cb.onTip(null,0,0);return}let r;if(s){const l=this.blds.get(s).b,o=this.bPaint[s];r=`${l.name}${o?.badge?" · "+o.badge:""}${o?.stage?" · "+o.stage:""}`}else{const l=this.colors[e];r=`${e} · ${Xt[Ct(l?.token)].word}${l?.label?" · "+l.label:""}`}this.cb.onTip(r,this.pointer.x-a.left,this.pointer.y-a.top)}query(t){const e=this.units.get(t),s=!!e&&this.unitVisible(e);return{token:Ct(this.colors[t]?.token),selected:this.sel===t,visible:s}}has(t){return this.units.has(t)||this.blds.has(t)}focusOnUnit(t){const e=this.units.get(t);if(!e)return;this.userMoved=!0;const s=this.currentPose();this.flyTo({...s,tx:e.centre.x,ty:e.centre.y,tz:e.centre.z,dist:Math.min(s.dist,e.kind==="plot"?70:90)},900)}info(){const t=this.renderer.info,e=this.camera.position;return{calls:t.render.calls,triangles:t.render.triangles,geometries:t.memory.geometries,textures:t.memory.textures,trees:this.nature.trees,frames:this.frames,compact:this.compact,camera:[Math.round(e.x),Math.round(e.y),Math.round(e.z)]}}syncLoop=()=>{const t=this.ok&&!this.disposed&&this.visible&&!document.hidden;t&&!this.raf?(this.last=performance.now(),this.raf=requestAnimationFrame(this.frame)):!t&&this.raf&&(cancelAnimationFrame(this.raf),this.raf=0)};resize(){if(!this.ok)return;const t=Math.max(1,this.host.clientWidth),e=Math.max(1,this.host.clientHeight);this.w=t,this.h=e,this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.updateLineRes();const s=t/e;(this.lastAspect===0||!this.userMoved&&Math.abs(s/this.lastAspect-1)>.05)&&(this.flight=null,this.setPose(this.homePose()),this.controls.update()),this.lastAspect=s}frame=t=>{if(this.raf=0,this.disposed)return;const e=Math.min(.1,(t-this.last)/1e3);this.last=t,this.time+=e,this.update(t,e),this.frames++,this.renderer.render(this.scene,this.camera),this.raf=requestAnimationFrame(this.frame)};update(t,e){if(this.flight){const u=this.flight,b=Math.min(1,(t-u.t0)/u.ms);this.setPose(gn(u.from,u.to,vn(b))),b>=1&&(this.flight=null)}else this.interactive||this.tourStep(t,e);this.controls.update(),this.dome.position.copy(this.camera.position);const s=this.controls.target,a=Math.min(850,Math.max(-50,s.x)),i=Math.min(560,Math.max(-60,s.z)),r=Math.min(90,Math.max(0,s.y));(a!==s.x||i!==s.z||r!==s.y)&&(this.camera.position.add(new j(a-s.x,r-s.y,i-s.z)),s.set(a,r,i));const l=this.camera.position.distanceTo(s),o=this.scene.fog;o.near=Math.max(320,l*1.05),o.far=Math.max(1900,l*2.5);const c=Math.atan2(this.camera.position.x-s.x,this.camera.position.z-s.z);Math.abs(c-this.az)>.002&&(this.az=c,this.cb.onAzimuth?.(c));const h=Math.max(1,l*.02);Math.abs(h-this.near)>.2&&(this.near=h,this.camera.near=h,this.camera.updateProjectionMatrix());const f=Math.min(1,e*7);for(const u of this.blds.values())this.fadeTo(u.fade,f,u.mats,u.meshes);this.fadeTo(this.plotFade,f,this.plotMats,this.plotMeshes),this.terrain.water.normal.offset.x+=e*.012,this.terrain.water.normal.offset.y+=e*.007,this.terrain.water.wave.set(-this.time*.009,this.time*.005);const d=Math.min(520,Math.max(70,l*.8));if(this.sun.position.copy(s).addScaledVector(me,520),this.sun.target.position.copy(s),this.shadowAt.distanceToSquared(s)>.25&&(this.shadowAt.copy(s),this.renderer.shadowMap.needsUpdate=!0),Math.abs(d-this.shadowExt)>d*.03){this.shadowExt=d,this.renderer.shadowMap.needsUpdate=!0;const u=this.sun.shadow.camera;u.left=-d,u.right=d,u.top=d,u.bottom=-d,u.updateProjectionMatrix()}const m=2*Math.tan(te*Math.PI/360)/this.h;for(const u of this.labels)u.sprite.scale.set(u.px.w*m,u.px.h*m,1);this.declutter();for(const u of this.ranks.values())u.sprite.scale.set(u.px.w*m,u.px.h*m,1);const g=this.reduced?.7:.62+.38*Math.sin(this.time*(Math.PI*2/1.4));this.ovMats.glow.opacity=.05+.2*g,this.lineMats.glow.opacity=.35+.65*g;for(const[u,b]of this.flashes){const w=(t-b.start)/900;if(w>=1){this.overlayGroup.remove(b.mesh),b.mat.dispose(),this.flashes.delete(u);continue}b.mat.opacity=.9*(1-w);const p=this.units.get(u),y=1+w*.35;b.mesh.matrix.copy(p.ov).multiply(new xt().makeScale(y,1+w*.1,y)),b.mesh.matrixWorldNeedsUpdate=!0}}labelMode(){if(++this.modeTick<20)return;this.modeTick=0;const t=[],e=new j;for(const i of this.blds.values())i.label.on&&(e.copy(i.label.sprite.position).project(this.camera),!(e.z>1)&&t.push({x:(e.x+1)/2*this.w,y:(1-e.y)/2*this.h,w:Ys(i.code,i.b.name,this.bPaint[i.code],!1)}));const s=i=>t.some((r,l)=>t.some((o,c)=>c>l&&Math.abs(r.x-o.x)<(r.w+o.w)/2*i+12&&Math.abs(r.y-o.y)<62)),a=this.compact?s(1.2):s(1);a!==this.compact&&(this.compact=a,this.repaintLabels())}declutter(){this.labelMode();const t=[],e=new j,s=i=>t.some(r=>i.x0<r.x1&&i.x1>r.x0&&i.y0<r.y1&&i.y1>r.y0),a=(i,r,l)=>{for(const o of i){const c=o.sprite;if(!o.on)continue;if(e.copy(c.position).project(this.camera),e.z>1){o.setClash(!0);continue}const h=(e.x+1)/2*this.w,f=(1-e.y)/2*this.h,{w:d,h:m}=o.px;let g=!1;for(let u=0;u<(r?7:1)&&!g;u++){const b=u===0?0:(u%2?-1:1)*Math.ceil(u/2)*(m+3),w=f-m*(1-l)+b,p={x0:h-d/2-2,x1:h+d/2+2,y0:w-2,y1:w+m+2};s(p)||(g=!0,t.push(p),c.center.y=l+b/m)}o.setClash(!g)}};a([...this.blds.values()].map(i=>i.label),!1,0),a(this.zoneLabels,!0,.5),a([this.north],!1,.5)}fadeTo(t,e,s,a){if(t.cur===t.target)return;const i=t.cur<.999;t.cur+=(t.target-t.cur)*e,Math.abs(t.target-t.cur)<.01&&(t.cur=t.target);const r=t.cur<.999;for(const l of s)l.opacity=t.cur,r!==i&&(l.transparent=r,l.depthWrite=!r,l.needsUpdate=!0);if(r!==i){for(const l of a)l.castShadow=!r||t.target>.5;this.renderer.shadowMap.needsUpdate=!0}}tourStep(t,e){const s=wn(this.g,this.aspect());if(this.level==="site"&&t>this.tour.next)this.tour.i=(this.tour.i+1)%s.length,this.tour.next=t+7e3,this.flyTo({...s[this.tour.i],az:s[this.tour.i].az+(this.tour.i%2?.45:-.35)},2600);else{const a=this.currentPose();this.setPose({...a,az:a.az+e*.035})}}dispose(){if(this.disposed=!0,this.raf&&cancelAnimationFrame(this.raf),this.raf=0,!this.ok)return;document.removeEventListener("visibilitychange",this.syncLoop),this.ro?.disconnect(),this.io?.disconnect();const t=this.canvas;t.removeEventListener("pointerdown",this.onDown),t.removeEventListener("pointermove",this.onMove),t.removeEventListener("pointerup",this.onUp),t.removeEventListener("pointerleave",this.onLeave),this.controls.dispose();for(const e of[...this.labels,...this.ranks.values()])e.dispose();for(const e of this.flashes.values())e.mat.dispose();this.disposables.forEach(e=>e.dispose()),this.envFallback?.dispose(),this.scene.environment=null,this.renderer.dispose(),this.renderer.forceContextLoss(),t.remove()}}const kn={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right"},zn="0 0 18 14";function An({uid:n,token:t}){const e=Xt[t];return B.jsxs("svg",{width:"18",height:"14",viewBox:zn,"aria-hidden":"true",children:[B.jsx("rect",{x:".5",y:".5",width:"17",height:"13",rx:"3",fill:ss(n,t,"e"),stroke:e.ink}),e.glyph&&e.glyph!=="pips"&&B.jsx("use",{href:`#${n}-g-${e.glyph}`,x:"5",y:"2.5",width:"9",height:"9",color:e.text})]})}function En({uid:n,items:t,onClick:e}){return B.jsxs("div",{className:"plan-legend",role:"group","aria-label":"Legend",children:[B.jsx("svg",{width:"0",height:"0",style:{position:"absolute"},"aria-hidden":"true",children:B.jsx(es,{uid:n,vb:[0,0,1,1]})}),t.map(s=>B.jsxs("button",{type:"button",className:"plan-legend-item",onClick:()=>e?.(s.token),children:[B.jsx(An,{uid:n,token:s.token}),B.jsx("span",{children:s.label}),s.count!==void 0&&B.jsx("b",{children:s.count})]},s.token))]})}const Pn=n=>/^\d+ \/ \d+$/.test(n);function Ln(n){const{geometry:t,colors:e,buildingColors:s,selection:a,level:i,onLevelChange:r,onSelect:l,onHover:o,onReady:c,legend:h,onLegendClick:f,interactive:d=!0,minTarget:m,className:g,id:u}=n,b="pv3"+I.useId().replace(/[^a-zA-Z0-9]/g,""),w=I.useRef(null),p=I.useRef(null),y=I.useRef(null),P=I.useRef(null),[E,C]=I.useState(null),[G,W]=I.useState(!0),A=i==="site"?null:t.buildings.find(v=>v.code===i.building)??null,q=A?A.code:"site",H=a?.code??null,D=I.useRef({colors:e,buildingColors:s,level:i,interactive:d,onLevelChange:r,onSelect:l,onHover:o,selection:a});D.current={colors:e,buildingColors:s,level:i,interactive:d,onLevelChange:r,onSelect:l,onHover:o,selection:a},I.useEffect(()=>{const v=p.current;if(!v)return;const z=D.current,N=new Sn(v,t,m,{onSelect:Y=>D.current.onSelect(Y),onLevelChange:Y=>D.current.onLevelChange(Y),onHover:Y=>D.current.onHover?.(Y),onTip:(Y,St,It)=>{const bt=y.current;if(bt){if(Y===null){bt.hidden=!0;return}bt.textContent=Y,bt.style.transform=`translate(${Math.min(St+14,v.clientWidth-170)}px, ${It+16}px)`,bt.hidden=!1}},onAzimuth:Y=>{P.current?.style.setProperty("transform",`rotate(${t.northDeg+Y*180/Math.PI|0}deg)`)}},typeof z.level=="string"?"site":z.level,z.interactive);return W(N.ok),C(N),()=>{N.dispose(),C(null)}},[t,m]),I.useEffect(()=>{E?.setPaint(e,s)},[E,e,s]),I.useEffect(()=>{E?.setSelection(a?.code??null,a?.compare)},[E,a?.code,a?.compare]),I.useEffect(()=>{E?.setLevel(i,!0)},[E,q]),I.useEffect(()=>{E?.setInteractive(d)},[E,d]);const _=I.useMemo(()=>{const v=[];for(const z of t.plots)v.push(z.unitCode);for(const z of t.buildings)for(const N of z.elevation.cells)v.push(N.unitCode);return v},[t]),R=I.useRef(null);I.useEffect(()=>{R.current!==t&&(R.current=t,c?.(_))},[t,_,c]);const U=I.useCallback(v=>{t.buildings.some(z=>z.code===v)?D.current.onLevelChange({building:v}):D.current.onSelect(v)},[t]);I.useEffect(()=>(window.__plan3d={query(v){const z=D.current;return E?E.query(v):{token:Ct(z.colors[v]?.token),selected:z.selection?.code===v,visible:!1}},pick(v){(E?.has(v)||t.buildings.some(z=>z.code===v))&&U(v)},info:()=>E?.info(),preset:v=>E?.preset(v)},()=>{delete window.__plan3d}),[E,t,U]);const S=v=>{if(!d||!E)return;const z=v.key;if(z==="ArrowLeft")E.orbit(-.16,0);else if(z==="ArrowRight")E.orbit(.16,0);else if(z==="ArrowUp")E.orbit(0,-.1);else if(z==="ArrowDown")E.orbit(0,.1);else if(z==="+"||z==="=")E.zoomBy(1.3);else if(z==="-"||z==="_")E.zoomBy(1/1.3);else return;v.preventDefault()},O=v=>{d&&v.key==="Escape"&&A&&(v.stopPropagation(),r("site"))},[F,Z]=I.useState(null),at=I.useMemo(()=>A?[]:[...t.buildings.map(v=>{const z=se(Ut(v.footprint));return{code:v.code,x:z[0],y:z[1]}}),...t.plots.map(v=>({code:v.unitCode,x:v.labelAt[0],y:v.labelAt[1]}))],[t,A]),J=I.useMemo(()=>A?A.elevation.cells.map(v=>({code:v.unitCode,floor:v.floor,stack:v.stack})):[],[A]),V=v=>!!v&&(A?J.some(z=>z.code===v):at.some(z=>z.code===v)),x=A?H&&J.some(v=>v.code===H)?H:J.filter(v=>v.floor===1).sort((v,z)=>v.stack.localeCompare(z.stack))[0]?.code:t.buildings[0]?.code,M=V(F)?F:x??"",L=I.useRef(null),$=I.useRef(!0);I.useEffect(()=>{if(A&&(L.current=A.code),$.current){$.current=!1;return}const v=w.current,z=document.activeElement;if(!v||!(z===document.body||v.contains(z)))return;const N=A?x:L.current;N&&(Z(N),requestAnimationFrame(()=>v.querySelector(`[data-code="${N}"]`)?.focus({preventScroll:!0})))},[q]);const T=v=>{const z=v.target.getAttribute("data-code"),N=kn[v.key];if(!z||!N)return;v.preventDefault();const Y=A?Qe(J,z,N):ts(at,z,N);Y&&(Z(Y),w.current?.querySelector(`[data-code="${Y}"]`)?.focus({preventScroll:!0}))},it=(v,z)=>{const N=e[z];return`${v}${N?.label?", "+N.label:""}, ${Xt[Ct(N?.token)].word}${N?.badge?", "+N.badge:""}${H===z?", selected":""}`},dt=v=>{const z=s?.[v.code];return`${v.code.slice(v.code.indexOf("-")+1)}${z?.badge?" "+z.badge:""}, ${v.name}${z?.badge&&Pn(z.badge)?", available":""}${z?.stage?", "+z.stage:""}. Press Enter to open`},X=(v,z)=>B.jsx("li",{children:B.jsx("button",{type:"button","data-code":v,tabIndex:v===M?0:-1,"aria-label":z,onClick:()=>U(v),onFocus:()=>{Z(v),E?.setFocus(v)},onBlur:()=>E?.setFocus(null)})},v),gt=I.useMemo(()=>t.zones.map(v=>({code:v.code,name:v.name})),[t]);return B.jsxs("div",{id:u,ref:w,className:`plan-root plan3d${A?" plan-level-building":""}${d?"":" plan-static"}${g?" "+g:""}`,onKeyDown:O,children:[d&&A&&B.jsx("div",{className:"plan-bar",children:B.jsxs("button",{type:"button",className:"plan-btn plan-back",onClick:()=>r("site"),children:[B.jsx("span",{"aria-hidden":"true",children:"←"})," Site plan ",B.jsx("kbd",{children:"Esc"})]})}),B.jsxs("div",{className:"plan-stage",children:[B.jsx("div",{ref:p,className:"plan3d-host",tabIndex:d?0:-1,role:"group","aria-label":`${t.name} 3D master plan${A?", "+A.name:""}. Arrow keys orbit, plus and minus zoom${A?", Escape returns to the site":""}.`,onKeyDown:S,onPointerDown:()=>p.current?.focus({preventScroll:!0})}),B.jsx("div",{className:"plan-tip",ref:y,hidden:!0,role:"presentation"}),!G&&B.jsxs("div",{className:"plan3d-fallback",role:"alert",children:[B.jsx("b",{children:"3D view unavailable"}),B.jsx("span",{children:"This browser or device cannot run WebGL. Switch to the 2D plan."})]}),d&&!A&&B.jsx("div",{className:"plan-top",children:B.jsxs("div",{className:"plan-zones",role:"group","aria-label":"Zoom to zone",children:[B.jsx("button",{type:"button",className:"plan-chip",onClick:()=>E?.preset(null),children:"Overview"}),gt.map(v=>B.jsx("button",{type:"button",className:"plan-chip",onClick:()=>E?.preset(v.code),children:v.name},v.code))]})}),d&&B.jsxs("div",{className:"plan-ctl",children:[B.jsx("button",{type:"button",className:"plan-btn","aria-label":"Zoom in",onClick:()=>E?.zoomBy(1.5),children:"+"}),B.jsx("button",{type:"button",className:"plan-btn","aria-label":"Zoom out",onClick:()=>E?.zoomBy(1/1.5),children:"−"}),B.jsx("button",{type:"button",className:"plan-btn","aria-label":"Fit to view",onClick:()=>E?.fit(),children:B.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14","aria-hidden":"true",children:B.jsx("path",{d:"M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9",fill:"none",stroke:"currentColor",strokeWidth:"1.6"})})})]}),B.jsxs("div",{className:"plan-furniture plan3d-compass","aria-hidden":"true",children:[B.jsxs("svg",{ref:P,width:"34",height:"34",viewBox:"-20 -20 40 40",style:{transform:`rotate(${t.northDeg}deg)`},children:[B.jsx("circle",{r:"17",fill:"#f7f5ee",stroke:"#6c7780"}),B.jsx("path",{d:"M0-13L5 6L0 3L-5 6Z",fill:"#33414d"}),B.jsx("path",{d:"M0-13L5 6L0 3Z",fill:"#8a97a1"})]}),B.jsx("span",{className:"plan-n",children:"N"})]}),d&&B.jsx("ul",{className:"plan3d-sr","aria-label":A?`${A.name} homes`:"Buildings and houses",onKeyDown:T,children:A?A.elevation.cells.map(v=>X(v.unitCode,it(v.unitCode.slice(v.unitCode.lastIndexOf("-")+1),v.unitCode))):[...t.buildings.map(v=>X(v.code,dt(v))),...t.plots.map(v=>X(v.unitCode,it(v.unitCode,v.unitCode)))]})]}),h&&h.length>0&&B.jsx(En,{uid:b,items:h,onClick:f})]})}export{Ln as default};
