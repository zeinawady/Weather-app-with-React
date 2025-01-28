import React, { useEffect,useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const inputRef=useRef();
  const [weatherData, setWeatherData]=useState(false);
  const allIcons={
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon,
  }
  const search = async (city) => {
    if(city===""){
      alert("Please Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=09287bc10de24b857de221d9b2ae3d6c`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if(!response.ok){
        alert(data.message);
      }
      const myIcon=allIcons[data.weather[0].icon]|| clear_icon;
    
      setWeatherData({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temperature: Math.floor(data.main.temp),
        cityName:data.name,
        icon:myIcon

      })
    } catch (error) {
      setWeatherData(false);
      console.error("error in fetching weather data");
    }
  };
  useEffect(() => {
    search("Cairo");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={search_icon} alt="search icon" onClick={()=>search(inputRef.current.value)}/>
      </div>

      {
        weatherData?
        <>
         <img src={weatherData.icon} alt="clear icon" className="weather-icon" />
      <p className="temp">{weatherData.temperature}°C</p>
      <p className="location">{weatherData.cityName}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity icon" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="wind icon" />
          <div>
            <p>{weatherData.windSpeed}Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
        </>:<>
        
        </>
      }
     
    </div>
  );
};

export default Weather;
