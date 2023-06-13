//////////////////////////////////
//-------------Dependencies-------------//
//////////////////////////////////

//////////
//// React
//////////
import {
	Suspense,
	useEffect,
	useMemo,
	useRef,
	useContext,
	useState,
	useLayoutEffect,
} from 'react';

//////////
//// React-Three
//////////
import { Sparkles } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
//////////
//// Three.JS
//////////
import * as THREE from 'three';

//////////
//// Misc
//////////

//////////////////////////////////
//-------------Project Files-------------//
//////////////////////////////////
//Textures
import rainTexture from '/assets/rain/rain.png';
import rainMatcap from '/assets/rain/rainMatcap.png';

export const Rain = (props) => {
	//////////////////////////////////
	//-------------Variables-------------//
	//////////////////////////////////
	let timeValue = 0;
	const parameters = {};
	parameters.count = 20000;
	parameters.size = 10;
	parameters.radius = 100;
	parameters.branches = 3;
	parameters.spin = 1;
	parameters.randomness = 1;
	parameters.randomnessPower = 3;
	parameters.insideColor = '#000221';
	parameters.outsideColor = '#757575';
	parameters.rainHeight = 75;

	let geometry = null;
	let material = null;
	let points = null;

	geometry = new THREE.BufferGeometry();
	const positions = new Float32Array(parameters.count * 3);
	const originPositions = new Float32Array(parameters.count * 3);
	/**
	 * Geometry
	 */

	//////////////////////////////////
	//-------------Refs-------------//
	//////////////////////////////////
	const rainGroup = useRef();
	//////////////////////////////////
	//-------------Loaders-------------//
	//////////////////////////////////
	const texture = new THREE.TextureLoader().load(rainTexture);
	const matcap = new THREE.TextureLoader().load(rainMatcap);
	//////////////////////////////////
	//-------------React-Based Hooks-------------//
	//////////////////////////////////
	const randomness = useMemo(() => {
		const radius = Math.random() * parameters.radius;
		const randomArray = new Float32Array(parameters.count * 3);
		for (let i = 0; i < parameters.count; i++) {
			const i3 = i * 3;
			const randomX =
				Math.pow(Math.random(), parameters.randomnessPower) *
				(Math.random() < 0.5 ? 1 : -1) *
				parameters.randomness *
				radius;
			const randomY =
				Math.pow(Math.random(), parameters.randomnessPower) *
				Math.random() *
				parameters.randomness *
				radius;
			const randomZ =
				Math.pow(Math.random(), parameters.randomnessPower) *
				(Math.random() < 0.5 ? 1 : -1) *
				parameters.randomness *
				radius;
			randomArray[i3] = randomX;
			randomArray[i3 + 1] = randomY;
			randomArray[i3 + 2] = randomZ;
		}
		return randomArray;
	}, []);
	geometry.setAttribute(
		'originPosition',
		new THREE.BufferAttribute(originPositions, 3)
	);
	geometry.setAttribute(
		'aRandomness',
		new THREE.BufferAttribute(randomness, 3)
	);
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	//////////////////////////////////
	//-------------ThreeJS Meshes-------------//
	//////////////////////////////////

	for (let i = 0; i < parameters.count; i++) {
		const i3 = i * 3;

		// Position
		const radius = Math.random() * parameters.radius;
		const randPosX = (Math.random() - 0.5) * 2 * parameters.radius;
		const randPosZ = 0 - Math.random() * radius * 2;
		const randPosY = Math.random() * parameters.rainHeight * radius;
		positions[i3] = randPosX;
		positions[i3 + 1] = randPosY;
		positions[i3 + 2] = randPosZ;
		originPositions[i3] = randPosX;
		originPositions[i3 + 1] = randPosY;
		originPositions[i3 + 2] = randPosZ;
	}
	/**
	 * Material
	 */

	material = new THREE.PointsMaterial({
		size: 2.0,
		sizeAttenuation: true,
		color: new THREE.Color('#ffffff'),
		transparent: true,
		alphaMap: texture,
		map: texture,
		// alphaTest: 0.001,
		// depthTest: false,
		depthWrite: false,
		opacity: 0.2,
		// vertexColors: true,
	});
	//////////////////////////////////
	//-------------R3F-Based Hooks-------------//
	//////////////////////////////////
	const { gl, viewport, size } = useThree();
	useFrame((state, delta) => {
		timeValue += delta;
		for (let i = 0; i < parameters.count; i++) {
			const i3 = i * 3;
			let yValue = geometry.attributes.position.array[i3 + 1];
			const originValue = geometry.attributes.originPosition.array[i3 + 1];
			if (yValue > -5.0) {
				yValue -= 0.5 * props.rainSpeed;
			} else {
				yValue = originValue;
			}
			geometry.attributes.position.array[i3 + 1] = yValue;
			geometry.attributes.position.needsUpdate = true;
		}
	});
	//////////////////////////////////
	//-------------Component Sent to Experience.jsx-------------//
	//////////////////////////////////
	return (
		<group ref={rainGroup} frustumCulled={false} visible={props.visible}>
			<points
				geometry={geometry}
				material={material}
				depthWrite={false}
			></points>
		</group>
	);
};
