import React from 'react';
import ReactDOM from 'react-dom/client';
import { Main } from '/Main.jsx';
import { Canvas } from '@react-three/fiber';
import '/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Canvas
		camera={{
			fov: 45,
			near: 0.1,
			far: 200,
			position: [0, 20, 20],
		}}
		shadows
	>
		<Main />
	</Canvas>
);
