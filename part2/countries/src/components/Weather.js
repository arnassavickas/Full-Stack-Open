import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    console.log("effect");
    axios
      .get("http://api.weatherstack.com/current", {
        params: {
          access_key: process.env.REACT_APP_API_KEY,
          query: country.capital,
        },
      })
      .then((response) => {
        setWeather(response.data);
      });
  }, [country.capital]);

  if (country.capital === "") {
    return (
      <div>
        This country has no capital (yet...), so I cannot show the weather
      </div>
    );
  }

  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <p>
        <b>temerature</b>: {weather ? weather.current.temperature : ""} Celsius
      </p>
      <img
        src={weather ? weather.current.weather_icons : ""}
        alt="current weather"
      />
      <p>
        <b>wind</b>: {weather ? weather.current.wind_speed : ""} mph direction{" "}
        {weather ? weather.current.wind_dir : ""}
      </p>
    </div>
  );
};

export default Weather;
