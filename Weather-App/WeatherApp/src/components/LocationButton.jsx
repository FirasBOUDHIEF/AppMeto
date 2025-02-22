import React from "react";

const LocationButton = ({ fetchWeatherByCoords }) => {
  return (
    <button 
      className="btn btn-primary mt-3"
      onClick={fetchWeatherByCoords}
    >
      📍 Météo à ma position
    </button>
  );
};

export default LocationButton;
