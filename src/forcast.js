/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forcast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const [unit, setUnit] = useState("celsius");

  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${
          city != "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        // setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setError({ message: "Not Found", query: query });
        // setQuery("");
      });
  };

  const toggleUnit = () => {
    setUnit(unit === "celsius" ? "fahrenheit" : "celsius");
  };

  const convertTemp = (temp) => {
    if (unit === "fahrenheit") {
      return (temp * 9) / 5 + 32;
    }
    return temp;
  };

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search("Dhaka");
  }, []);

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{props.weather}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box">
            {" "}
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={() => search(query)}
            />
          </div>
        </div>
        <ul>
          {typeof weather.main != "undefined" ? (
            <div>
              {" "}
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(convertTemp(weather.main.temp))}°
                  <span className="unit-toggle">
                    <button
                      className={`unit-button ${
                        unit === "celsius" ? "active" : ""
                      }`}
                      onClick={toggleUnit}
                    >
                      C
                    </button>
                    {/* <span className="unit-separator">|</span> */}
                    <button
                      className={`unit-button ${
                        unit === "fahrenheit" ? "active" : ""
                      }`}
                      onClick={toggleUnit}
                    >
                      F
                    </button>
                  </span>
                </span>
                <span className="weather-condition">
                  ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Forcast;
