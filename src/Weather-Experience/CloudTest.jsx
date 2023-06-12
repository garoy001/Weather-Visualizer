import { Sparkles, shaderMaterial } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export const CloudTest = (props) => {
	const cloudMeshes = [];
	const texture = useLoader(THREE.TextureLoader, '/assets/smoke.png');

	for (let p = 0; p < 25; p++) {
		// let cloud = new THREE.Mesh( cloudGeo, cloudMaterial );
		let cloud = {};
		cloud.position = [
			(Math.random() - 0.5) * 40,
			(50 + Math.random() - 0.5) * 3,
			(-20 + Math.random() - 0.5) * 3,
		];
		cloud.rotation = [1.16, -0.12, Math.random() * 360];
		cloud.opacity = 0.6;
		cloudMeshes.push(cloud);
	}

	// const cloudGeo = new THREE.PlaneGeometry(500, 500);
	// const cloudMaterial = new THREE.MeshLambertMaterial({
	// 	map: texture,
	// 	transparent: true,
	// });
	console.log(cloudMeshes);
	return (
		<>
			{cloudMeshes.map((cloud) => {
				console.log(cloud);
				return (
					<mesh
						position={cloud.position}
						opacity={cloud.opacity}
						rotation-x={Math.PI * 0.6}
					>
						<planeGeometry args={[500, 500]} />
						<meshLambertMaterial
							attach="material"
							map={texture}
							transparent
							side={THREE.DoubleSide}
						/>
					</mesh>
				);
			})}
		</>
	);
};
