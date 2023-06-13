//////////////////////////////////
//-------------Dependencies-------------//
//////////////////////////////////

//////////
//// React
//////////
import { useContext, useRef } from 'react';
//////////
//// React-Three
//////////
import { useFrame } from '@react-three/fiber';

//////////////////////////////////
//-------------Project Files-------------//
//////////////////////////////////
import { Clouds } from './clouds';
import { Grass } from './grass';
import { Ocean } from './ocean';
import { WeatherContext } from '/Main.jsx';
import { Rain } from './rain';
export const Experience = () => {
	//////////////////////////////////
	//-------------State-------------//
	//////////////////////////////////
	const { weather, setWeather } = useContext(WeatherContext);
	//////////////////////////////////
	//-------------R3F-Based Hooks-------------//
	//////////////////////////////////
	useFrame((state) => {
		state.camera.lookAt(0, 10, -100);
		state.camera.position.set(0, 10, 30);
	});
	//////////////////////////////////
	//-------------Component Sent to Main.jsx-------------//
	//////////////////////////////////
	return (
		<>
			<Clouds />
			<Rain visible={weather.rainEnabled} rainSpeed={weather.rainSpeed} />
			{/* <CloudTest /> */}

			<group rotation-x={Math.PI * 0.05} position={[0, 0, 0]}>
				<Grass position={[0, 0, 0]} />
				<Ocean />
			</group>
			<mesh visible={false}>
				<planeGeometry />
				<meshBasicMaterial color={'red'} />
			</mesh>
		</>
	);
};
