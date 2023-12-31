//////////////////////////////////
//-------------Dependencies-------------//
//////////////////////////////////

//////////
//// React
//////////
import { useContext } from 'react';

//////////////////////////////////
//-------------Project Files-------------//
//////////////////////////////////
import { WeatherContext } from '/Main.jsx';
export const WeatherDebug = () => {
	// console.log(WeatherContext);
	const { weather, setWeather } = useContext(WeatherContext);
	const handleWeatherChange = (name) => {
		const currentWeather = weather;
		if (name === 'sunny') {
			currentWeather.name = name;
			currentWeather.size = 30;
			currentWeather.color = '#FFFFFF';
			currentWeather.rainEnabled = false;
		} else if (name === 'cloudy') {
			currentWeather.name = name;
			currentWeather.size = 45;
			currentWeather.color = '#757575';
			currentWeather.rainEnabled = false;
		} else if (name === 'rainy') {
			currentWeather.name = name;
			currentWeather.size = 40;
			currentWeather.color = '#4A4A4A';
			currentWeather.rainEnabled = true;
			currentWeather.rainSpeed = 1;
		} else if (name === 'stormy') {
			currentWeather.name = name;
			currentWeather.size = 50;
			currentWeather.color = '#4A4A4A';
			currentWeather.rainEnabled = true;
			currentWeather.rainSpeed = 2;
		}
		setWeather({ ...currentWeather });
	};
	return (
		<>
			<div className="debug-button-div">
				<button
					className="debug-weather-button sunny-button"
					onClick={() => handleWeatherChange('sunny')}
				>
					Sunny
				</button>
				<button
					className="debug-weather-button stormy-button"
					onClick={() => handleWeatherChange('stormy')}
				>
					Stormy
				</button>
				<button
					className="debug-weather-button rainy-button"
					onClick={() => handleWeatherChange('rainy')}
				>
					Rainy
				</button>
				<button
					className="debug-weather-button cloudy-button"
					onClick={() => handleWeatherChange('cloudy')}
				>
					Cloudy
				</button>
			</div>
		</>
	);
};
