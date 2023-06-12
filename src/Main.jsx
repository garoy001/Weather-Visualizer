import { Canvas, useFrame } from '@react-three/fiber';
import { useControls, button } from 'leva';
import { Html, OrbitControls, Sky, Stage, useHelper } from '@react-three/drei';
import { Experience } from './Weather-Experience/experience';
import { DirectionalLightHelper, PointLightHelper } from 'three';
import {
	useRef,
	createContext,
	useContext,
	useState,
	useEffect,
	forwardRef,
} from 'react';
import { WeatherDebug } from './html-components/weatherDebug';
import { WeatherUI } from './html-components/weatherUI';
import { Bloom, EffectComposer, GodRays } from '@react-three/postprocessing';

export const WeatherContext = createContext({
	weather: {},
	setWeather: () => {},
});
// const Sun = forwardRef(function Sun(props, forwardRef) {
// 	console.log(forwardRef);
// 	useFrame(({ clock }) => {
// 		forwardRef.current.position.x = Math.sin(clock.getElapsedTime()) * -8;
// 		// forwardRef.current.position.y = Math.cos(clock.getElapsedTime()) * -8;
// 	});

// 	return (
// 		<mesh ref={forwardRef} position={[0, 45, -15]}>
// 			<sphereGeometry args={[1, 36, 36]} />
// 			<meshBasicMaterial color={'#062d89'} />
// 		</mesh>
// 	);
// });
// function Effects() {
// 	const sunRef = useRef();
// 	return (
// 		<>
// 			<Sun ref={sunRef} />
// 			{sunRef.current && (
// 				<EffectComposer multisampling={0}>
// 					<GodRays
// 						sun={sunRef.current}
// 						samples={60}
// 						density={0.97}
// 						decay={0.96}
// 						weight={0.6}
// 						exposure={0.4}
// 						clampMax={1}
// 						width={window.innerWidth}
// 						height={window.innerHeight}
// 						blur={false}
// 					/>
// 					<Bloom mipmapBlur intensity={1.0} luminanceThreshold={0.5} />
// 				</EffectComposer>
// 			)}
// 		</>
// 	);
// }
export const Main = () => {
	const sphereRef = useRef();
	const skyRef = useRef();
	const [sunPos, setSunPos] = useState(0.02);
	const [weather, setWeather] = useState({
		name: 'sunny',
		count: 10,
		height: 30,
		width: 25,
		amount: 1000,
		noise: 1,
		speed: 0.3,
		opacity: 0.5,
		scale: 10,
		size: 30,
	});
	// console.log(weather);
	const { sunPosition } = useControls('sun', {
		sunPosition: {
			value: { x: 0.05, y: sunPos, z: -2 },
			step: 0.01,
		},
	});
	const light = useRef();
	const pointLight = useRef();
	// useHelper(pointLight, PointLightHelper);
	let timeElapsed = 0;
	useEffect(() => {
		if (weather.name === 'stormy') {
			// skyRef.current.sunPosition.y = -10;
			console.log(skyRef);
			setSunPos(-10);
		}
		if (weather.name === 'sunny') {
			// skyRef.current.sunPosition.y = -10;
			console.log(skyRef);
			setSunPos(0.02);
		}
	}, [weather]);
	useFrame((state, delta) => {
		// state.scene.children[4].intensity = 0;
		// console.log(weather);
		timeElapsed += delta;

		// console.log(pointLight);
		const x = Math.max(Math.min(20, (Math.random() - 0.5) * 40), -20);
		const z = Math.max(Math.min(-10, Math.random() * -10), -15);
		const y = Math.max(Math.min(35, (Math.random() - 0.5) * 20), 40);
		// pointLight.current.intensity = Math.sin(timeElapsed * 1000) * 30;
		// if (timeElapsed % 10 > 9.5) {
		// 	pointLight.current.intensity = 50;
		// 	light.current.intensity = 50;
		// }
		// if (timeElapsed % 10 < 0.5) {
		// 	pointLight.current.intensity = 0;
		// 	light.current.intensity = 0;
		// 	// state.scene.children[4].intensity = 0;
		// }
		// console.log(state);
		// console.log(pointLight);
		// console.log(timeElapsed % 10);
		// pointLight.current.position.x =
		// 	Math.sin(pointLight.current.position.x + timeElapsed * 0.1) * 20;
	});
	return (
		<>
			{/* <Effects /> */}

			{/* <pointLight
				ref={pointLight}
				position={[0, 35, -10]}
				lookAt={[0, 10, 30]}
				decay={0.5}
				power={50 * 500}
				scale={10}
				args={[0x062d89, 30, 500, 1.7]}
			/> */}
			<WeatherContext.Provider value={{ weather, setWeather }}>
				<Experience></Experience>
			</WeatherContext.Provider>
			{/* <OrbitControls /> */}
			<ambientLight />
			<directionalLight
				ref={light}
				position={[0, 10, -40]}
				lookAt={[0, 10, 30]}
				scale={10}
				intensity={0.3}
			/>
			<Html
				wrapperClass="html-container"
				className="html-div"
				// position={]}
				// lookAt={[0, 20, 20]}
				// fullscreen
			>
				<WeatherContext.Provider value={{ weather, setWeather }}>
					<WeatherDebug></WeatherDebug>
				</WeatherContext.Provider>

				<WeatherUI></WeatherUI>
			</Html>
			<Sky
				ref={skyRef}
				distance={10000}
				sunPosition={[sunPosition.x, sunPos, sunPosition.z]}
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
