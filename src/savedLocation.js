/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

const SavedLocations = () => {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState("");

  useEffect(() => {
    const savedLocations =
      JSON.parse(localStorage.getItem("savedLocations")) || [];
    setLocations(savedLocations);
  }, []);

  const saveLocation = () => {
    if (newLocation.trim() === "") return;

    axios
      .get(
        `${apiKeys.base}weather?q=${newLocation}&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        const locationData = {
          name: response.data.name,
          country: response.data.sys.country,
          temperature: response.data.main.temp,
          humidity: response.data.main.humidity,
          visibility: response.data.visibility,
          windSpeed: response.data.wind.speed,
          icon: response.data.weather[0].icon,
        };

        const updatedLocations = [...locations, locationData];
        setLocations(updatedLocations);
        localStorage.setItem(
          "savedLocations",
          JSON.stringify(updatedLocations)
        );
        setNewLocation("");
      })
      .catch((error) => {
        alert("Location not found!");
      });
  };

  const removeLocation = (index) => {
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
    localStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
  };

  return (
    <div className="saved-locations">
      <div className="add-location">
        <input
          type="text"
          placeholder="Add a location"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
        />
        <button onClick={saveLocation}>Add</button>
      </div>
      <div className="location-list">
        {locations.map((location, index) => (
          <div key={index} className="location-card">
            <div className="location-header">
              <span
                className="remove-icon"
                onClick={() => removeLocation(index)}
              >
                🗑️
              </span>
            </div>
            <div className="location-details">
              <img
                src={`https://openweathermap.org/img/wn/${location.icon}.png`}
                alt="weather-icon"
              />
              <h3>
                {location.name}, {location.country}
              </h3>
              <p>Temperature: {Math.round(location.temperature)}°C</p>
              <p>Humidity: {location.humidity}%</p>
              <p>Visibility: {location.visibility} mi</p>
              <p>Wind Speed: {location.windSpeed} Km/h</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedLocations;
