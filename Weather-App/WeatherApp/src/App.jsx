import React, { useState, useEffect } from 'react';
import TopButtons from './components/TopButtons';
import Inputs from './components/inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TempAndDetails from './components/TempAndDetails';
import Forecast from './components/Forecast';
import { getWeatherData, getForecastData } from './services/weatherService';
import LocationButton from './components/LocationButton';

const App = () => {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeatherData("weather", { q: city });
      if (data) setWeather(data);

      const forecastData = await getForecastData({ q: city });
      if (forecastData) setForecast(forecastData);
    };

    fetchWeather();
  }, [city]);

  const fetchWeatherByCoords = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            
            const data = await getWeatherData("weather", { lat: latitude, lon: longitude });
            if (data) setWeather(data);

            const forecastData = await getForecastData({ lat: latitude, lon: longitude });
            if (forecastData) setForecast(forecastData);
        }, (error) => {
            console.error("Géolocalisation refusée ou indisponible :", error);
            alert("Impossible de récupérer votre localisation.");
        });
    } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
};


  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 bg-light text-center">
        <h2 className="text-primary fw-bold mb-4">🌤️ Météo des Villes</h2>
        <LocationButton fetchWeatherByCoords={fetchWeatherByCoords} />

        <TopButtons setCity={setCity} />
        <Inputs setCity={setCity} />


        {weather && <TimeAndLocation weather={weather} />}
        {weather && <TempAndDetails weather={weather} />}
        {forecast.length > 0 && <Forecast forecastData={forecast} />}

      </div>
    </div>
  );
};

export default App;
