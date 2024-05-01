import React, { useState, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import getImageURL from './utilities/image-util.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faWind, faTemperatureHalf } from '@fortawesome/free-solid-svg-icons'

interface Weather {
  id: number,
  main: string,
  description: string,
  icon: string
}
export default function App() {
  const APIKey = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null); // State to track errors
  const [weather, setWeather] = useState<Weather | null>(null);
  const cityRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const city = cityRef.current?.value;

    if (!city) {
      alert('Please enter a valid city name.');
      return;
    }

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }
      const data = await response.json();
      setData(data);
      setWeather(data.weather[0])
      setError(null); // Reset error state if successful response
      console.log(weather, data) // Testing App
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setData(null);
      setWeather(null);
      setError('Failed to fetch weather data. Please try again.'); // Set error message
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input placeholder="Type to search..." id="cityName" ref={cityRef} />
            <button type="submit" id="search"><FaSearch id="search-icon" /></button>
          </div>
        </form>

        {/* Render error message if error state is not null */}
        {error && (
          <div className="error-message fadeIn">
            <img src={getImageURL('404.png')} alt="Not Found" />
            <p>{error}</p>
            <p>{cityRef.current?.value} Does Not Exist</p>
          </div>
        )}

        {/* Render weather information if weather state is not null and error state is null */}
        {data && weather && !error && (
          <>
            <h2>Weather Information</h2>
            <div className='weather-box fadeIn'>
              {/* Making sure to get the same image no matter day or night */}
              <img src={getImageURL(`${weather.icon.slice(0, 2)}d.png`)} alt={weather.main} />
              <p className='description'>{weather.description}</p>
              <p className='description city'>City: {data.name}</p>

              <p className='temperature'><FontAwesomeIcon icon={faTemperatureHalf} /> Temperature: {Math.floor(data.main.temp)}°C</p>
            </div>
            <div className="weather-details fadeIn">
              <div className="humidity">
                <FontAwesomeIcon className='icon' icon={faWater} />
                <p><span className="default">Humidity: </span>{data.main.humidity}</p>
              </div>
              <div className="wind">
                <FontAwesomeIcon className='icon' icon={faWind} />
                <p><span className="default">Wind Speed: </span>{data.wind.speed}</p>
              </div>
            </div>
          </>

        )}
      </div>

    </>
  );
}

// (For Reference) - Ternary operators are written: condition ? if_condition_true : if_condition_false