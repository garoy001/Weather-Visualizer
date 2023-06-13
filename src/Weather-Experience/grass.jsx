/**
 * ///////// // Created with the help of https://codesandbox.io/s/grass-shader-5xho4?from-embed=&file=/src/Grass.js
 */
//////////////////////////////////
//-------------Dependencies-------------//
//////////////////////////////////

//////////
//// React
//////////
import React, { useRef, useMemo, useEffect } from 'react';
//////////
//// React-Three
//////////
import { useFrame, useLoader, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
//////////
//// Three.JS
//////////
import * as THREE from 'three';
//////////
//// Misc
//////////
import { createNoise2D } from 'simplex-noise';

import alea from 'alea';
//////////////////////////////////
//-------------Project Files-------------//
//////////////////////////////////

//Shaders
//----Grass
import grassVertexShader from '/shaders/grass/vertex.glsl';
import grassFragmentShader from '/shaders/grass/fragment.glsl';
//Shader Materials
const GrassMaterial = shaderMaterial(
	{
		bladeHeight: 1,
		map: null,
		alphaMap: null,
		time: 0,
		tipColor: new THREE.Color(0.0, 0.6, 0.0).convertSRGBToLinear(),
		bottomColor: new THREE.Color(0.0, 0.1, 0.0).convertSRGBToLinear(),
	},
	grassVertexShader,
	grassFragmentShader
);
extend({ GrassMaterial });
//Textures
//----Grass
import bladeDiffuse from '/assets/grass/bladediffuse.jpg';
import bladeAlpha from '/assets/grass/bladealpha.jpg';
//----Ground
import groundAmbientOcclusion from '/assets/ground/Ground_AmbientOcclusion.jpg';
import groundBaseColor from '/assets/ground/Ground_Basecolor.jpg';
import groundHeight from '/assets/ground/Ground_Height.png';
import groundNormal from '/assets/ground/Ground_Normal.jpg';
import groundRoughness from '/assets/ground/Ground_Roughness.jpg';

//Random Seed
const randomSeed = alea('seed');
const noise2D = createNoise2D(randomSeed);
const widthMult = 4;
export const Grass = ({
	options = { bW: 0.12, bH: 1, joints: 5 },
	width = 30,
	instances = 15000 * widthMult,
	...props
}) => {
	//////////////////////////////////
	//-------------Variables-------------//
	//////////////////////////////////

	const { bW, bH, joints } = options;
	//////////////////////////////////
	//-------------Refs-------------//
	//////////////////////////////////

	const grassGroup = useRef();
	const geoGeometry = useRef();
	const materialRef = useRef();

	//////////////////////////////////
	//-------------Loaders-------------//
	//////////////////////////////////
	const [texture, alphaMap] = useLoader(THREE.TextureLoader, [
		bladeDiffuse,
		bladeAlpha,
	]);
	const [groundTexture, groundAO, groundH, groundN, groundR] = useLoader(
		THREE.TextureLoader,
		[
			groundBaseColor,
			groundAmbientOcclusion,
			groundHeight,
			groundNormal,
			groundRoughness,
		]
	);

	//////////////////////////////////
	//-------------React-Based Hooks-------------//
	//////////////////////////////////
	const attributeData = useMemo(
		() => getAttributeData(instances, width),
		[instances, width]
	);
	const baseGeom = useMemo(
		() => new THREE.PlaneGeometry(bW, bH, 1, joints).translate(0, bH / 2, 0),
		[options]
	);

	useEffect(() => {
		// console.log(geoGeometry.current);
		// console.log(geoGeometry.current.attributes.position.array[1]);
		const geo = geoGeometry.current;
		geo.verticesNeedUpdate = true;

		// console.log(geo);
		// console.log(geoPos);
		geo.lookAt(new THREE.Vector3(0, 1, 0));
		const geoPos = geo.attributes.position;
		// console.log(geoGeometry.current.attributes.position.array[1]);
		for (let i = 0; i < geoPos.count; i++) {
			const i3 = i * 3;
			// console.log(geoPos[i3 + 1]);

			geoPos.array[i3 + 1] = getYPosition(
				geoPos.array[i3],
				geoPos.array[i3 + 2]
			);
			// console.log(geoPos[i3 + 1]);
		}
		geo.computeVertexNormals();
	}, []);
	//////////////////////////////////
	//-------------R3F-Based Hooks-------------//
	//////////////////////////////////

	useFrame((state) => {
		materialRef.current.uniforms.time.value = state.clock.elapsedTime / 4;
	});
	//////////////////////////////////
	//-------------Component Sent to Experience.jsx-------------//
	//////////////////////////////////
	return (
		<group {...props}>
			{
				//////////////////////////////////
				//-------------Grass Blades-------------//
				//////////////////////////////////
			}
			<mesh ref={grassGroup}>
				<instancedBufferGeometry
					index={baseGeom.index}
					attributes-position={baseGeom.attributes.position}
					attributes-uv={baseGeom.attributes.uv}
				>
					<instancedBufferAttribute
						attach="attributes-offset"
						args={[new Float32Array(attributeData.offsets), 3]}
					/>
					<instancedBufferAttribute
						attach="attributes-orientation"
						args={[new Float32Array(attributeData.orientations), 4]}
					/>
					<instancedBufferAttribute
						attach="attributes-stretch"
						args={[new Float32Array(attributeData.stretches), 1]}
					/>
					<instancedBufferAttribute
						attach="attributes-halfRootAngleSin"
						args={[new Float32Array(attributeData.halfRootAngleSin), 1]}
					/>
					<instancedBufferAttribute
						attach="attributes-halfRootAngleCos"
						args={[new Float32Array(attributeData.halfRootAngleCos), 1]}
					/>
				</instancedBufferGeometry>
				<grassMaterial
					ref={materialRef}
					map={texture}
					alphaMap={alphaMap}
					toneMapped={false}
					side={THREE.DoubleSide}
				/>
			</mesh>
			{
				//////////////////////////////////
				//-------------Ground-------------//
				//////////////////////////////////
			}
			<mesh position={[0, 0, 0]}>
				<planeGeometry
					attach="geometry"
					ref={geoGeometry}
					args={[width * widthMult, width, 32, 32]}
				/>
				<meshStandardMaterial
					displacementScale={2.2}
					toneMapped={false}
					side={THREE.DoubleSide}
					map={groundTexture}
					aoMap={groundAO}
					roughnessMap={groundR}
					displacementMap={groundH}
					normalMap={groundN}
					roughness={0}
				/>
			</mesh>
		</group>
	);
};
{
	//////////////////////////////////
	//-------------Supporting Functions-------------//
	//////////////////////////////////
}
function getAttributeData(instances, width) {
	const offsets = [];
	const orientations = [];
	const stretches = [];
	const halfRootAngleSin = [];
	const halfRootAngleCos = [];

	let quaternion_0 = new THREE.Vector4();
	let quaternion_1 = new THREE.Vector4();

	//The min and max angle for the growth direction (in radians)
	const min = -0.25;
	const max = 0.25;

	//For each instance of the grass blade
	for (let i = 0; i < instances; i++) {
		//Offset of the roots
		const offsetX = Math.random() * width * widthMult - (width * widthMult) / 2;
		const offsetZ = Math.random() * width - width / 2;
		const offsetY = getYPosition(offsetX, offsetZ);
		offsets.push(offsetX, offsetY, offsetZ);

		//Define random growth directions
		//Rotate around Y
		let angle = Math.PI - Math.random() * (2 * Math.PI);
		halfRootAngleSin.push(Math.sin(0.5 * angle));
		halfRootAngleCos.push(Math.cos(0.5 * angle));

		let RotationAxis = new THREE.Vector3(0, 1, 0);
		let x = RotationAxis.x * Math.sin(angle / 2.0);
		let y = RotationAxis.y * Math.sin(angle / 2.0);
		let z = RotationAxis.z * Math.sin(angle / 2.0);
		let w = Math.cos(angle / 2.0);
		quaternion_0.set(x, y, z, w).normalize();

		//Rotate around X
		angle = Math.random() * (max - min) + min;
		RotationAxis = new THREE.Vector3(1, 0, 0);
		x = RotationAxis.x * Math.sin(angle / 2.0);
		y = RotationAxis.y * Math.sin(angle / 2.0);
		z = RotationAxis.z * Math.sin(angle / 2.0);
		w = Math.cos(angle / 2.0);
		quaternion_1.set(x, y, z, w).normalize();

		//Combine rotations to a single quaternion
		quaternion_0 = multiplyQuaternions(quaternion_0, quaternion_1);

		//Rotate around Z
		angle = Math.random() * (max - min) + min;
		RotationAxis = new THREE.Vector3(0, 0, 1);
		x = RotationAxis.x * Math.sin(angle / 2.0);
		y = RotationAxis.y * Math.sin(angle / 2.0);
		z = RotationAxis.z * Math.sin(angle / 2.0);
		w = Math.cos(angle / 2.0);
		quaternion_1.set(x, y, z, w).normalize();

		//Combine rotations to a single quaternion
		quaternion_0 = multiplyQuaternions(quaternion_0, quaternion_1);

		orientations.push(
			quaternion_0.x,
			quaternion_0.y,
			quaternion_0.z,
			quaternion_0.w
		);

		//Define variety in height
		if (i < instances / 3) {
			stretches.push(Math.random() * 1.8);
		} else {
			stretches.push(Math.random());
		}
	}

	return {
		offsets,
		orientations,
		stretches,
		halfRootAngleCos,
		halfRootAngleSin,
	};
}

function multiplyQuaternions(q1, q2) {
	const x = q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x;
	const y = -q1.x * q2.z + q1.y * q2.w + q1.z * q2.x + q1.w * q2.y;
	const z = q1.x * q2.y - q1.y * q2.x + q1.z * q2.w + q1.w * q2.z;
	const w = -q1.x * q2.x - q1.y * q2.y - q1.z * q2.z + q1.w * q2.w;
	return new THREE.Vector4(x, y, z, w);
}

function getYPosition(x, z) {
	var y = 3 * noise2D(x / 50, z / 50);
	y += 4 * noise2D(x / 100, z / 100);
	y += 0.2 * noise2D(x / 10, z / 10);
	return y;
}
