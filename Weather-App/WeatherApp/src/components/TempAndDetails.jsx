import React from 'react';
import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";

const TempAndDetails = ({ weather }) => {
  return (
    <div className="text-center text-primary">
      <div className="py-3">
        <h4 className="fw-bold">🌦️ {weather.details}</h4>
      </div>

      <div className="d-flex align-items-center justify-content-around py-3">
        <img
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt="weather icon"
          className="img-fluid"
          style={{ width: '80px' }}
        />
        <p className="display-4 fw-bold">{Math.round(weather.temp)}°</p>

        <div className="d-flex flex-column text-start">
          <p><FaThermometerEmpty /> Ressenti: <strong>{Math.round(weather.feels_like)}°</strong></p>
          <p><BiSolidDropletHalf /> Humidité: <strong>{weather.humidity}%</strong></p>
          <p><FiWind /> Vent: <strong>{weather.speed} km/h</strong></p>
        </div>
      </div>

      <div className="d-flex justify-content-between py-3 border-top pt-3">
        <p><GiSunrise /> Lever du soleil: <strong>{weather.sunrise}</strong></p>
        <p><GiSunset /> Coucher du soleil: <strong>{weather.sunset}</strong></p>
      </div>
    </div>
  );
};

export default TempAndDetails;
