import Lottie from "lottie-react";
import Header from "./Header";
import animationData from "./assets/part-cloudy-animation.json";
import { useEffect, useState } from "react";

const api = {
  key: "624d764ffa0f7674fc5785fe8404a689",
  base: "https://api.openweathermap.org/data/2.5/",
};

export default function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const convertedTemp = (weather.main?.temp - 273.15) * (9 / 5) + 32; //Converted Kelvin to Fahrenheit

  async function weatherData() {
    try {
      const res = await fetch(
        `${api.base}weather?q=${search}&appid=${api.key}`
      );
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  useEffect(function () {
    weatherData();
  }, []);

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      weatherData();
    }
  }

  return (
    <>
      <Header />

      <div className="weather-info">
        {weather.main && (
          <div className="weather-animation">
            {weather.weather[0].main.includes("Cloud") && (
              <Lottie animationData={animationData} />
            )}
          </div>
        )}
        <div className="search">
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <div>
            <button className="search-button" onClick={(e) => weatherData(e)}>
              Search
            </button>
          </div>
        </div>

        <div className="weather-output">
          {weather.weather && weather.weather.length > 0 && (
            <ul className="weather-list">
              <li>{weather.name}</li>
              <li>{convertedTemp.toFixed(2)}&deg;F</li>
              <li>{weather.weather[0].main}</li>
              <li>{weather.weather[0].description}</li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
