import Header from "./Header";
import { useEffect, useState } from "react";
import WeatherAnimation from "./WeatherAnimation";

const api = {
  key: "624d764ffa0f7674fc5785fe8404a689",
  base: "https://api.openweathermap.org/data/2.5/",
};

export default function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const convertedTemp = (weather.main?.temp - 273.15) * (9 / 5) + 32; //Converted Kelvin to Fahrenheit
  const currentWeather = weather.main && weather.weather[0].main;

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
            <WeatherAnimation weatherType={currentWeather} />
            <span>
              <p>
                {weather.weather[0].main} &nbsp; {convertedTemp.toFixed(2)}
                &deg;F
              </p>
            </span>
            <p className="description">{`(${weather.weather[0].description})`}</p>
          </div>
        )}
        <div className="search">
          <input
            placeholder="City (Ex: Phoenix)"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <div>
            <button className="search-button" onClick={(e) => weatherData(e)}>
              🔍
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
