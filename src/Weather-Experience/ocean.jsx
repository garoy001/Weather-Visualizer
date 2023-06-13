//////////////////////////////////
//-------------Dependencies-------------//
//////////////////////////////////

//////////
//// React
//////////
import { useRef } from 'react';
//////////
//// React-Three
//////////
import { shaderMaterial } from '@react-three/drei';

import { useFrame, extend, useLoader } from '@react-three/fiber';
//////////
//// Three.JS
//////////
import * as THREE from 'three';

//////////
//// Misc
//////////
import { useControls } from 'leva';
//////////////////////////////////
//-------------Project Files-------------//
//////////////////////////////////

//Shaders
import oceanVertexShader from '/shaders/water/vertex.glsl';
import oceanFragmentShader from '/shaders/water/fragment.glsl';

//Textures
import oceanAmbientOcclusion from '/assets/ocean/WaterAmbientOcclusion.jpg';
import oceanBaseColor from '/assets/ocean/WaterColor.jpg';
import oceanHeight from '/assets/ocean/WaterDisplacement.png';
import oceanNormal from '/assets/ocean/WaterNormal.jpg';
import oceanRoughness from '/assets/ocean/WaterRoughness.jpg';

const OceanScale = 100;
export const Ocean = () => {
	//////////////////////////////////
	//-------------Refs-------------//
	//////////////////////////////////
	const oceanMaterial = useRef();
	//////////////////////////////////
	//-------------Loaders-------------//
	//////////////////////////////////
	const [oceanTexture, oceanAO, oceanH, oceanN, oceanR] = useLoader(
		THREE.TextureLoader,
		[
			oceanBaseColor,
			oceanAmbientOcclusion,
			oceanHeight,
			oceanNormal,
			oceanRoughness,
		]
	);
	//Shader Materials
	const OceanMaterial = shaderMaterial(
		{
			uBigWavesElevation: 0.21,
			uBigWavesFrequency: new THREE.Vector2(1, 1.5),
			uTime: 0,
			uBigWavesSpeed: 2,
			uDepthColor: new THREE.Color('#0000ff'),
			uSurfaceColor: new THREE.Color('#9bd8ff'),
			uColorOffset: 0.8,
			uColorMultiplier: 1,
			uSmallWavesElevation: 0.1,
			uSmallWavesFrequency: 5,
			uSmallWavesSpeed: 0.266,
			uSmallIterations: 4.0,
			uOceanScale: OceanScale,
			uTextureColor: oceanTexture,
			uTextureHeight: oceanH,
			uTextureNormal: oceanN,
			uTextureRoughness: oceanR,
			uTextureAmbientOcclusion: oceanAO,
		},
		oceanVertexShader,
		oceanFragmentShader
	);
	extend({ OceanMaterial });
	//////////////////////////////////
	//-------------R3F-Based Hooks-------------//
	//////////////////////////////////
	useFrame((state, delta) => {
		oceanMaterial.current.uTime += delta;
	});

	//////////////////////////////////
	//-------------Component Sent to Experience.jsx-------------//
	//////////////////////////////////
	return (
		<group position={[0, -5, -20]}>
			<mesh rotation-x={-Math.PI * 0.5} scale={1}>
				<planeGeometry args={[200, 100, 512, 512]} />
				<oceanMaterial ref={oceanMaterial} />
			</mesh>
		</group>
	);
};
