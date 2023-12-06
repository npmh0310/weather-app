import React, { useEffect, useRef, useState } from "react";
import "./WeatherApp.css";

function WeatherApp() {
  let api_key = "3751435a053dc6740fa6b9ce8269d122";
  const [weatherData, setWeatherData] = useState(null);
  const [firstCity, setFirstCity] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    let urlFirst = `https://api.openweathermap.org/data/2.5/weather?q=Hanoi&units=Metric&appid=${api_key}`;
    fetch(urlFirst)
      .then((res) => res.json())
      .then((res) => setFirstCity(res))
      .catch((err) => {
        console.log("ERROR FETCH DATA: ", err);
      });
  }, [api_key]);

  const search = () => {
    const element = document.getElementsByClassName("cityInput");
    const value = element[0].value;
    if (!element) {
      return;
    }
    console.log(value);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        // bắt lỗi khi mà search không có
        if (res.cod === "404") {
          alert("City not found");
        } else {
          setWeatherData(res);
        }
      })
      .catch((err) => {
        console.log("ERROR FETCH DATA: ", err);
        alert("ERROR");
      });

    inputRef.current.focus();
    element[0].value = "";
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          ref={inputRef}
        />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={require("../../assets/images/search.png")} alt="search" />
        </div>
      </div>
      <div className="weather-image">
        <img src={require("../../assets/images/cloud.png")} alt="weather-img" />
      </div>
      <div className="weather-temp">
        {weatherData === null
          ? firstCity
            ? firstCity.main.temp
            : ""
          : weatherData.main.temp}
        °C
      </div>
      <div className="weather-location">
        {weatherData === null
          ? firstCity
            ? firstCity.name
            : ""
          : weatherData.name}
      </div>
      <div className="data-container">
        <div className="element">
          <img
            src={require("../../assets/images/humidity.png")}
            alt=""
            className="icon"
          />
          <div className="data">
            <div className="humidity-percent">
              {weatherData === null
                ? firstCity
                  ? firstCity.main.humidity
                  : ""
                : weatherData.main.humidity}
              %
            </div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img
            src={require("../../assets/images/wind.png")}
            alt=""
            className="icon"
          />
          <div className="data">
            <div className="wind-rate">
              {weatherData === null
                ? firstCity
                  ? firstCity.wind.speed
                  : ""
                : weatherData.wind.speed}{" "}
              km/h
            </div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
