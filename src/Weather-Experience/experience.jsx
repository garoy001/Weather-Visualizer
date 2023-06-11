import { Cloud, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { Clouds } from './clouds';
import { Grass } from './grass';
import { Ocean } from './ocean';
import { useThree, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
export const Experience = () => {
	useFrame((state) => {
		// state.camera.lookAt(0, 10, -100);
		// state.camera.position.set(0, 10, 30);
		// console.log(state);
	});

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
			<Suspense>
				<Clouds />
			</Suspense>

			<group rotation-x={Math.PI * 0.05} position={[0, 0, 0]}>
				<Grass position={[0, 0, 0]} />
				<Ocean />
			</group>

			<mesh visible={false}>
				<planeGeometry />
				<meshBasicMaterial color={'red'} />
			</mesh>
			{/* </PresentationControls> */}
		</>
	);
};
