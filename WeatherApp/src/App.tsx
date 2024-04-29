import React, { useState, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function App() {
  const APIKey = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null); // State to track errors
  const [weather, setWeather] = useState<string | null>(null);
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
      setWeather(data.weather[0].description)
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

        {/* Render weather img if not null*/}
        {weather && (
          <div>
            {/* Images are not working for some reason :/ */}
            <img src={`./assets/${weather}.png`} alt={weather} />
            <p>{weather}</p>
          </div>
        )}

        {/* Render error message if error state is not null */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {/* Render weather information if weather state is not null and error state is null */}
        {data && !error && (
          <div>
            <h2>Weather Information</h2>
            <p>City: {data.name}</p>
            <p>Temperature: {Math.floor(data.main.temp)}°C</p>
            {/* Add more weather details as needed */}
          </div>
        )}
      </div>

    </>
  );
}

// (For Reference) - Ternary operators are written: condition ? if_condition_true : if_condition_false