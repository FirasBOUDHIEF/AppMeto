import React from 'react';

const Forecast = ({ forecastData = [] }) => {
  return (
    <div className="text-primary mt-4">
      <h5 className="fw-bold text-center">Prévisions des 5 prochains jours</h5>
      <hr className="my-2" />
      <div className="d-flex justify-content-around">
        {forecastData.map((item, index) => (
          <div key={index} className="d-flex flex-column align-items-center p-2 shadow rounded bg-light">
            <p className="fw-bold">{item.date}</p>
            <img
              src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt="weather icon"
              className="img-fluid"
              style={{ width: '60px' }}
            />
            <p className="fw-medium text-primary">{item.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
