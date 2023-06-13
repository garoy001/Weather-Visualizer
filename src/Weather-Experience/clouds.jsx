//////////////////////////////////
//-------------Dependencies-------------//
//////////////////////////////////

//////////
//// React
//////////
import { useEffect, useRef, useContext, useLayoutEffect } from 'react';

//////////
//// React-Three
//////////
import { Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
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
import cloud from '/assets/cloud.png';
import { WeatherContext } from '../main';
export const Clouds = (props) => {
	//////////////////////////////////
	//-------------Refs-------------//
	//////////////////////////////////
	const materialRef = useRef();
	const cloudGroup = useRef();
	const cloudRef = useRef();
	const cloudRef2 = useRef();
	const cloudRef3 = useRef();
	//////////////////////////////////
	//-------------Loaders-------------//
	//////////////////////////////////
	//Cloud Texture
	const particleTexture = new THREE.TextureLoader().load(cloud);
	//////////////////////////////////
	//-------------State-------------//
	//////////////////////////////////
	const { weather, setWeather } = useContext(WeatherContext);

	//////////////////////////////////
	//-------------ThreeJS Meshes-------------//
	//////////////////////////////////
	//Cloud Material
	const particleMaterial = new THREE.PointsMaterial({
		size: weather.size,
		sizeAttenuation: true,
		depthWrite: false,
		transparent: true,
		opacity: weather.opacity,

		map: particleTexture,
	});

	//////////////////////////////////
	//-------------React-Based Hooks-------------//
	//////////////////////////////////
	useLayoutEffect(() => {}, []);
	useEffect(() => {
		particleMaterial.color = new THREE.Color(weather.color);
		cloudRef.current.material = particleMaterial;
		cloudRef2.current.material = particleMaterial;
		cloudRef3.current.material = particleMaterial;
	}, [weather]);
	//////////////////////////////////
	//-------------R3F-Based Hooks-------------//
	//////////////////////////////////
	useFrame((state, delta) => {
		cloudGroup.current.rotation.y += delta * 0.015;
		cloudGroup.current.rotation.x = Math.PI * 0.05;
	});
	//////////////////////////////////
	//-------------Component Sent to Experience.jsx-------------//
	//////////////////////////////////
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
			></Sparkles>
			<Sparkles
				ref={cloudRef2}
				speed={weather.speed}
				noise={weather.noise}
				amount={weather.amount}
				size={weather.size}
				scale={[100, 17, 100]}
				position={[0, 35, -20]}
			></Sparkles>
			<Sparkles
				ref={cloudRef3}
				speed={weather.speed}
				noise={weather.noise}
				amount={weather.amount}
				size={weather.size}
				scale={[100, 17, 100]}
				position={[10, 40, -5]}
			></Sparkles>
		</group>
	);
};
