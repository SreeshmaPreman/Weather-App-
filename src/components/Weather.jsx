import React, { useEffect, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const API_KEY = "ee0fc3208343f263c375f9859178ae4e";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return clear_icon;
      case "Clouds":
        return cloud_icon;
      case "Rain":
        return rain_icon;
      case "Drizzle":
        return drizzle_icon;
      case "Snow":
        return snow_icon;
      default:
        return clear_icon;
    }
  };

  const search = async (city) => {
    if (!city) return;

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
        setError("");
      } else {
        setWeatherData(null);
        setError("City not found.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error. Try again.");
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="container">
      <div className='weather'>
        <div className="search-bar">
          <input
            type="text"
            placeholder='Search'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') search(city); }}
          />
          <img
            src={search_icon}
            alt="Search"
            onClick={() => search(city)}
            style={{ cursor: "pointer" }}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        {weatherData && (
          <>
            <img
              src={getWeatherIcon(weatherData.weather[0].main)}
              alt={weatherData.weather[0].main}
              className='weather-icon'
            />
            <p className="temperature">{weatherData.main.temp}°C</p>
            <p className="city">{weatherData.name}</p>
            <div className="weather-data">
              <div className="col">
                <img src={humidity_icon} alt="Humidity Icon" />
                <div>
                  <p>{weatherData.main.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="col">
                <img src={wind_icon} alt="Wind Speed Icon" />
                <div>
                  <p>{(weatherData.wind.speed * 3.6).toFixed(1)} Km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
