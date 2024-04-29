import "./App.css";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from 'react'

export default function App() {
  const APIKey = import.meta.env.VITE_API_KEY;

  function useSearchWeather(city: string) {
    const [weather, setWeather] = useState({});
    useEffect(() => {
      async function fetchData() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
        const data = await response.json();
        setWeather(data);
      }
      fetchData();
    }, [city])
    return weather;
  }
  // Try to use weather so I can use the data
  // weather is in celsius, also add a math.floor to get whole number

  console.log(useSearchWeather("new york"))

  //const cityInput = document.querySelector("input .city").target.value
  //const weather = useSearchPokemon(cityInput)


  return (
    <>
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input placeholder="Type to search..." />
      </div>

    </>
  )
}
