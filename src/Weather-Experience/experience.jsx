import { Cloud, OrbitControls, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { Clouds } from './clouds';
import { CloudTest } from './CloudTest';
import { Grass } from './grass';
import { Ocean } from './ocean';
import { useThree, useFrame } from '@react-three/fiber';
import { Suspense, useContext, useEffect, useRef, useState } from 'react';
import { WeatherContext } from '/Main.jsx';
export const Experience = () => {
	const pointsRef = useRef();
	const rainGeo = new THREE.BufferGeometry();
	const rainCount = 200;
	const positions = new Float32Array(rainCount * 3);
	console.log(rainGeo);
	for (let i = 0; i < rainCount; i++) {
		const i3 = i * 3;
		positions[i3 + 0] = Math.random() - 0.5 * 40;
		positions[i3 + 1] = 20 + Math.random() - 0.5 * 20;
		positions[i3 + 2] = Math.random() - 0.5 * 40 - 20;
	}
	const rainMaterial = new THREE.PointsMaterial({
		color: 0xaaaaaa,
		size: 0.1,
		transparent: true,
	});
	rainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	const { weather, setWeather } = useContext(WeatherContext);

	useFrame((state) => {
		// state.camera.lookAt(0, 10, -100);
		// state.camera.position.set(0, 10, 30);
		for (let i = 0; i < rainCount; i++) {
			const i3 = i * 3;
			pointsRef.current.geometry.attributes.position.array[i3 + 1] -= 0.1;
		}

		// console.log(weather);
		// console.log(state);
	});
	// console.log(weather);

	return (
		<>
			{/* <PresentationControls
				makeDefault
				global
				polar={[-1, 1]}
				azimuth={[-1, 1]}
				config={{ mass: 2, tension: 400 }}
				snap={{ mass: 4, tension: 400 }}
			> */}
			<OrbitControls />
			<Clouds />

			<group rotation-x={Math.PI * 0.05} position={[0, 0, 0]}>
				<Grass position={[0, 0, 0]} />
				<Ocean />
			</group>
			<points
				material={rainMaterial}
				geometry={rainGeo}
				ref={pointsRef}
			></points>
			<mesh visible={false}>
				<planeGeometry />
				<meshBasicMaterial color={'red'} />
			</mesh>
			{/* </PresentationControls> */}
		</>
	);
};
