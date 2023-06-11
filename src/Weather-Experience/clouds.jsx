import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import cloud from '/assets/cloud.png';
export const Clouds = ({
	count = 10,
	height = 30,
	width = 25,
	amount = 1000,
	noise = 1,
	speed = 0.3,
	opacity = 1,
	scale = 10,
	size = 30,
}) => {
	// Geometry

	const cloudRef = useRef();
	const particleTexture = new THREE.TextureLoader().load(cloud);
	const particleMaterial = new THREE.PointsMaterial({
		size: size,
		sizeAttenuation: true,
		depthWrite: false,
		transparent: true,
		opacity: opacity,
		// depthTest: false,
		// alphaTest: 0.001,
		// blending: THREE.AdditiveBlending,
		amount: amount,
		speed: speed,
		scale: scale,
		map: particleTexture,
	});
	useEffect(() => {
		cloudRef.current.material = particleMaterial;
	});
	useFrame((state, delta) => {
		cloudRef.current.rotation.y += delta * 0.015;
		cloudRef.current.rotation.x = Math.PI * 0.05;
	});
	return (
		<Sparkles
			ref={cloudRef}
			speed={speed}
			noise={noise}
			scale={[100, 17, 200]}
			position={[0, 30, -5]}
		/>
	);
};
