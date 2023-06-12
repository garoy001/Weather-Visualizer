import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import {
	Suspense,
	useEffect,
	useMemo,
	useRef,
	useContext,
	useState,
	useLayoutEffect,
} from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import cloud from '/assets/cloud.png';
import { WeatherContext } from '../main';
export const Clouds = (props) => {
	const materialRef = useRef();
	const { weather, setWeather } = useContext(WeatherContext);
	console.log(weather);

	//Cloud Settings
	const cloudGroup = useRef();
	const cloudRef = useRef();
	const cloudRef2 = useRef();
	const cloudRef3 = useRef();
	//Cloud Mesh
	//Cloud Texture
	const particleTexture = new THREE.TextureLoader().load(cloud);
	// const particleTexture = useLoader(THREE.TextureLoader, '/assets/smoke.png');
	//Cloud Material
	const particleMaterial = new THREE.PointsMaterial({
		size: weather.size,
		sizeAttenuation: true,
		depthWrite: false,
		transparent: true,
		opacity: weather.opacity,

		map: particleTexture,
	});
	// const particleMaterial = new THREE.MeshLambertMaterial({
	// 	map: particleTexture,
	// 	transparent: true,
	// });

	//Hooks
	useLayoutEffect(() => {}, []);
	useEffect(() => {
		particleMaterial.color = new THREE.Color(weather.color);
		cloudRef.current.material = particleMaterial;
		cloudRef2.current.material = particleMaterial;
		cloudRef3.current.material = particleMaterial;
		console.log(cloudRef);
	}, [weather]);
	useFrame((state, delta) => {
		cloudGroup.current.rotation.y += delta * 0.015;
		cloudGroup.current.rotation.x = Math.PI * 0.05;
	});
	return (
		<group ref={cloudGroup}>
			<Sparkles
				ref={cloudRef}
				speed={weather.speed}
				noise={weather.noise}
				amount={weather.amount}
				size={weather.size}
				scale={[100, 17, 100]}
				position={[0, 30, -5]}
			>
				{/* <meshLambertMaterial
					ref={materialRef}
					attach="material"
					map={particleTexture}
					transparent
					side={THREE.DoubleSide}
					opacity={weather.opacity}
				/> */}
			</Sparkles>
			<Sparkles
				ref={cloudRef2}
				speed={weather.speed}
				noise={weather.noise}
				amount={weather.amount}
				size={weather.size}
				scale={[100, 17, 100]}
				position={[0, 25, -20]}
			>
				{/* <meshLambertMaterial
					ref={materialRef}
					attach="material"
					map={particleTexture}
					transparent
					side={THREE.DoubleSide}
					opacity={weather.opacity}
					blending={THREE.AdditiveBlending}
				/> */}
			</Sparkles>
			<Sparkles
				ref={cloudRef3}
				speed={weather.speed}
				noise={weather.noise}
				amount={weather.amount}
				size={weather.size}
				scale={[100, 17, 100]}
				position={[10, 30, -5]}
			>
				{/* <meshStandardMaterial
					ref={materialRef}
					attach="material"
					map={particleTexture}
					transparent
					side={THREE.DoubleSide}
					opacity={weather.opacity}
					blending={THREE.AdditiveBlending}
				/> */}
			</Sparkles>
		</group>
	);
};
