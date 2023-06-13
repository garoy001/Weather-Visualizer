//////////////////////////////////
//-------------Dependencies-------------//
//////////////////////////////////

//////////
//// React
//////////
import {
	useRef,
	createContext,
	useContext,
	useState,
	useEffect,
	forwardRef,
} from 'react';

//////////
//// React-Three
//////////
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Sky, Stage, useHelper } from '@react-three/drei';
import {
	Bloom,
	BrightnessContrast,
	EffectComposer,
	GodRays,
	Sepia,
	Vignette,
} from '@react-three/postprocessing';

//////////
//// Three.JS
//////////
import { DirectionalLightHelper, PointLightHelper } from 'three';

//////////
//// Misc
//////////
import { useControls, button } from 'leva';
import { createNoise2D } from 'simplex-noise';
import alea from 'alea';

//////////////////////////////////
//-------------Project Files-------------//
//////////////////////////////////
import { Experience } from './Weather-Experience/experience';
import { WeatherDebug } from './html-components/weatherDebug';

//Random Seed
const randomSeed = alea('seed');
const noise2D = createNoise2D(randomSeed);

//Weather Context
export const WeatherContext = createContext({
	weather: {},
	setWeather: () => {},
});

export const Main = () => {
	//////////////////////////////////
	//-------------Variables-------------//
	//////////////////////////////////
	let timeElapsed = 0;
	let lightningElapsed = 0;
	let previousSeconds = 0;
	//////////////////////////////////
	//-------------Refs-------------//
	//////////////////////////////////

	const sphereRef = useRef();
	const skyRef = useRef();
	const ambientLight = useRef();
	const effectRef = useRef();
	const light = useRef();
	const pointLight = useRef();
	//////////////////////////////////
	//-------------State-------------//
	//////////////////////////////////
	const [sunPos, setSunPos] = useState({ x: 0, y: 0, z: 0 });
	const [brightness, setBrightness] = useState(0.0);
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
		color: '#FFFFFF',
		rainEnabled: false,
	});
	//////////////////////////////////
	//-------------Leva Debug UI-------------//
	//////////////////////////////////
	// const { sunPosition } = useControls('sun', {
	// 	sunPosition: {
	// 		value: { x: 0.05, y: sunPos, z: -2 },
	// 		step: 0.01,
	// 	},
	// });

	//////////////////////////////////
	//-------------Helpers-------------//
	//////////////////////////////////
	// useHelper(pointLight, PointLightHelper);

	//////////////////////////////////
	//-------------React-Based Hooks-------------//
	//////////////////////////////////

	useEffect(() => {
		if (weather.name === 'stormy') {
			setSunPos({ x: 0.05, y: -10, z: -2 });
		}
		if (weather.name === 'sunny') {
			setSunPos({ x: 0.05, y: 0.02, z: -2 });
		}
		if (weather.name === 'rainy') {
			setSunPos({ x: -0.56, y: -0.05, z: -2 });
		}
		if (weather.name === 'cloudy') {
			setSunPos({ x: 0.05, y: 0.17, z: -2 });
		}
	}, [weather]);
	//////////////////////////////////
	//-------------R3F-Based Hooks-------------//
	//////////////////////////////////

	useFrame((state, delta) => {
		timeElapsed += delta;
		const seconds = Math.floor(timeElapsed);

		const x = Math.max(Math.min(20, (Math.random() - 0.5) * 40), -20);
		const z = Math.max(Math.min(-10, Math.random() * -10), -15);
		const y = Math.max(Math.min(35, (Math.random() - 0.5) * 20), 40);
	});

	//////////////////////////////////
	//-------------Component Sent to Index.jsx-------------//
	//////////////////////////////////

	return (
		<>
			{
				//////////////////////////////////
				//-------------Controls-------------//
				//////////////////////////////////
			}
			<OrbitControls />
			{
				//////////////////////////////////
				//-------------Post Processing-------------//
				//////////////////////////////////
			}
			<group ref={effectRef}>
				{weather.name == 'cloudy' && (
					<EffectComposer>
						{/* {weather.name == 'stormy' && <BrightnessContrast />} */}
						{/* <Bloom intensity={2} luminanceThreshold={0.5} mipmapBlur /> */}
						{weather.name == 'cloudy' && <Sepia intensity={0.2} />}
					</EffectComposer>
				)}
			</group>
			{
				//////////////////////////////////
				//-------------Lighting-------------//
				//////////////////////////////////
			}
			{/* <pointLight
				ref={pointLight}
				position={[0, 35, -10]}
				lookAt={[0, 10, 30]}
				decay={0.5}
				power={50 * 500}
				scale={10}
				args={[0x062d89, 30, 500, 1.7]}
			/> */}
			{/* <ambientLight intensity={20} ref={ambientLight} /> */}
			<directionalLight
				ref={light}
				position={[0, 10, -40]}
				lookAt={[0, 0, 0]}
				scale={10}
				intensity={0}
			/>
			{
				//////////////////////////////////
				//-------------Sky-------------//
				//////////////////////////////////
			}
			<Sky
				ref={skyRef}
				distance={10000}
				sunPosition={[sunPos.x, sunPos.y, sunPos.z]}
				// sunPosition={[sunPosition.x, sunPosition.y, sunPosition.z]}
				azimuth={180}
				inclination={0.6}
				turbidity={10}
				rayleigh={2}
				mieCoefficient={0.005}
				mieDirectionalG={0.8}
			/>
			{
				//////////////////////////////////
				//-------------Weather Rendering-------------//
				//////////////////////////////////
			}
			<WeatherContext.Provider value={{ weather, setWeather }}>
				<Experience></Experience>
			</WeatherContext.Provider>
			{/* <OrbitControls /> */}
			{
				//////////////////////////////////
				//-------------Weather UI-------------//
				//////////////////////////////////
			}
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
			</Html>
		</>
	);
};
