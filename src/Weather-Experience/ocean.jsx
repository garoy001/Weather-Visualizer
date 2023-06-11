import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import oceanVertexShader from '/shaders/water/vertex.glsl';
import oceanFragmentShader from '/shaders/water/fragment.glsl';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { extend, useLoader } from '@react-three/fiber';
import { useControls } from 'leva';
import oceanAmbientOcclusion from '/assets/ocean/WaterAmbientOcclusion.jpg';
import oceanBaseColor from '/assets/ocean/WaterColor.jpg';
import oceanHeight from '/assets/ocean/WaterDisplacement.png';
import oceanNormal from '/assets/ocean/WaterNormal.jpg';
import oceanRoughness from '/assets/ocean/WaterRoughness.jpg';
const OceanScale = 100;
export const Ocean = () => {
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
	const OceanMaterial = shaderMaterial(
		{
			// uBigWavesElevation: 0.2,
			// uBigWavesFrequency: new THREE.Vector2(4, 1.5),
			// uTime: 0,
			// uBigWavesSpeed: 0.3,
			// uDepthColor: new THREE.Color('#186691'),
			// uSurfaceColor: new THREE.Color('#9bd8ff'),
			// uColorOffset: 0.08,
			// uColorMultiplier: 5,
			// uSmallWavesElevation: 0.043,
			// uSmallWavesFrequency: 10,
			// uSmallWavesSpeed: 0.266,
			// uSmallIterations: 4.0,
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
	// const {
	// 	uBigWavesElevation,
	// 	uBigWavesFrequency,
	// 	uBigWavesSpeed,
	// 	uColorOffset,
	// 	uSmallWavesElevation,
	// 	uSmallWavesFrequency,
	// 	uSmallWavesSpeed,
	// 	uSmallIterations,
	// 	uDepthColor,
	// 	uSurfaceColor,
	// } = useControls('waves', {
	// 	uDepthColor: new THREE.Color('#186691'),
	// 	uSurfaceColor: new THREE.Color('#9bd8ff'),
	// 	uBigWavesElevation: {
	// 		value: 0.2,
	// 		step: 0.01,
	// 	},
	// 	uBigWavesFrequency: {
	// 		value: { x: 1, y: 1.5 },
	// 		joystick: 'invertY',
	// 		step: 0.01,
	// 	},
	// 	uBigWavesSpeed: {
	// 		value: 0.3,
	// 		step: 0.01,
	// 	},
	// 	uColorOffset: {
	// 		value: 0.8,
	// 		step: 0.01,
	// 	},
	// 	uSmallWavesElevation: {
	// 		value: 0.043,
	// 		step: 0.01,
	// 	},
	// 	uSmallWavesFrequency: {
	// 		value: 10,
	// 		step: 0.266,
	// 	},
	// 	uSmallWavesSpeed: {
	// 		value: 4.0,
	// 		step: 0.01,
	// 	},
	// 	uSmallIterations: {
	// 		value: 0.2,
	// 		step: 0.01,
	// 	},
	// });
	const oceanMaterial = useRef();
	useFrame((state, delta) => {
		oceanMaterial.current.uTime += delta;
		// 	oceanMaterial.current.uBigWavesElevation = uBigWavesElevation;
		// 	oceanMaterial.current.uBigWavesFrequency = uBigWavesFrequency;
		// 	oceanMaterial.current.uBigWavesSpeed = uBigWavesSpeed;
		// 	oceanMaterial.current.uColorOffset = uColorOffset;
		// 	oceanMaterial.current.uSmallWavesElevation = uSmallWavesElevation;
		// 	oceanMaterial.current.uSmallWavesFrequency = uSmallWavesFrequency;
		// 	oceanMaterial.current.uSmallWavesSpeed = uSmallWavesSpeed;
		// 	oceanMaterial.current.uSmallIterations = uSmallIterations;
		// 	oceanMaterial.current.alphaTest = 1;
		// 	oceanMaterial.current.uDepthColor = uDepthColor;
		// 	oceanMaterial.current.uSurfaceColor = uSurfaceColor;
	});
	return (
		<group position={[0, -5, -20]}>
			<mesh rotation-x={-Math.PI * 0.5} scale={1}>
				<planeGeometry args={[200, 100, 512, 512]} />
				<oceanMaterial ref={oceanMaterial} />
			</mesh>
		</group>
	);
};
