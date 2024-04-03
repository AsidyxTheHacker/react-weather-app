import React, { useState } from "react";
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

export default function WeatherApp() {

    let API_KEY = '7be217663430296fbe3c4669f9c20278';

    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.querySelector(".cityInput");
        document.querySelector('.weather-info').style.animation = "fadeInAnimation 1s ease";
        if(element.value === ""){
            return 0;
        }

        let URL = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=imperial&appid=${API_KEY}`;

        let resp = await fetch(URL);
        let data = await resp.json();
        const humidity = document.querySelector(".humidity-percent");
        const wind = document.querySelector(".wind-rate");
        const temp = document.querySelector(".weather-temp");
        const location = document.querySelector(".weather-location");

        humidity.innerHTML = data.main.humidity + "%";
        wind.innerHTML = Math.floor(data.wind.speed) + "mph";
        temp.innerHTML = Math.floor(data.main.temp) + "ºF";
        location.innerHTML = data.name;

        if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWicon(clear_icon);
        } else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWicon(cloud_icon);
        } else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setWicon(drizzle_icon);
        } else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWicon(drizzle_icon);
        } else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setWicon(rain_icon);
        } else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(rain_icon);
        } else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWicon(snow_icon);
        } else {
            setWicon(clear_icon);
        }

        element.value = "";
        let removeAnimation = () => document.querySelector('.weather-info').style.animation = "";
        setTimeout(removeAnimation, 1500)
    }

    return(
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="Search" />
                <div className="search-icon" onClick={() => {search()}}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-info">
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">24ºc</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
            </div>
    )
};