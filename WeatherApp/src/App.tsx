import React, { useState, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import getImageURL from './utilities/image-util.ts';

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
  // function filterImage() {
  //   switch (weather) {
  //     case 'thunderstorm with light rain':
  //       return getImageURL('thunderstorm.png');
  //       break;
  //     case 'thunderstorm with rain':
  //       return getImageURL('thunderstorm.png')
  //       break;
  //     case 'thunderstorm with heavy rain':
  //       return getImageURL('thunderstorm.png');
  //       break;
  //     case 'light thunderstorm':
  //       return getImageURL('thunderstorm.png')
  //       break;
  //     case 'heavy thunderstorm':
  //       return getImageURL('thunderstorm.png');
  //       break;
  //     case 'ragged thunderstorm':
  //       return getImageURL('thunderstorm.png')
  //       break;
  //     case 'thunderstorm with light drizzle':
  //       return getImageURL('thunderstorm.png')
  //       break;
  //     case 'thunderstorm with drizzle':
  //       return getImageURL('thunderstorm.png')
  //       break;
  //     case 'thunderstorm with heavy drizzle':
  //       return getImageURL('thunderstorm.png')
  //       break;

  //     case 'light intensity drizzle':
  //       return getImageURL('shower rain.png')
  //       break;
  //     case 'drizzle':
  //       return getImageURL('shower rain.png')
  //       break;
  //     case 'heavy intensity drizzle':
  //       return getImageURL('shower rain.png')
  //       break;
  //     case 'light intensity drizzle rain':
  //       return getImageURL('shower rain.png')
  //       break;
  //     case 'drizzle rain':
  //       return getImageURL('shower rain.png')
  //       break;
  //     case 'heavy intensity drizzle rain':
  //       return getImageURL('shower rain.png')
  //       break;
  //     case 'shower rain and drizzle':
  //       return getImageURL('shower rain.png')
  //       break;
  //     case 'heavy shower rain and drizzle':
  //       return getImageURL('shower rain.png')
  //       break;
  //     case 'shower drizzle':
  //       return getImageURL('shower rain.png')
  //       break;

  //     case 'light rain':
  //       return getImageURL('rain.png')
  //       break;
  //     case 'moderate rain':
  //       return getImageURL('rain.png')
  //       break;
  //     case 'heavy intensity rain':
  //       return getImageURL('rain.png')
  //       break;
  //     case 'very heavy rain':
  //       return getImageURL('rain.png')
  //       break;
  //     case 'extreme rain':
  //       return getImageURL('rain.png')
  //       break;
  //     case 'freezing rain':
  //       return getImageURL('snow.png')
  //       break;
  //     case 'light intensity rain':
  //       return getImageURL('shower rain.png')
  //       break;
  //   }
  // }

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
          <div className="error-message">
            <img src={getImageURL('404.png')} alt="Not Found" />
            <p>{error}</p>
            <p>{cityRef.current?.value} Does Not Exist</p>
          </div>
        )}

        {/* Render weather information if weather state is not null and error state is null */}
        {data && weather && !error && (
          <div>
            <h2>Weather Information</h2>
            {/* Making sure to get the same image no matter day or night */}
            <img src={getImageURL(`${weather.icon.slice(0, 2)}d.png`)} alt={weather.main} />
            <p>{weather.description}</p>
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