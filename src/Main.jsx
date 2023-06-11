import { Canvas, useFrame } from '@react-three/fiber';
import { useControls, button } from 'leva';
import { OrbitControls, Sky, Stage, useHelper } from '@react-three/drei';
import { Experience } from './Weather-Experience/experience';
import { DirectionalLightHelper } from 'three';
import { useRef } from 'react';
export const Main = () => {
	const { sunPosition } = useControls('sun', {
		sunPosition: {
			value: { x: 0.05, y: 0.02, z: -2 },
			step: 0.01,
		},
	});
	const light = useRef();
	// useHelper(light, DirectionalLightHelper);
	useFrame((state) => {});
	return (
		<>
			<Experience></Experience>
			{/* <OrbitControls /> */}
			<ambientLight />
			<directionalLight
				ref={light}
				position={[0, 10, -40]}
				lookAt={[0, 10, 30]}
				scale={10}
				intensity={0.3}
			/>

			<Sky
				distance={10000}
				sunPosition={[sunPosition.x, sunPosition.y, sunPosition.z]}
				azimuth={180}
				inclination={0.6}
				turbidity={10}
				rayleigh={2}
				mieCoefficient={0.005}
				mieDirectionalG={0.8}
			/>
			{/*Sun position is the setting*/}
			{/* <OrbitControls /> */}
		</>
	);
};
