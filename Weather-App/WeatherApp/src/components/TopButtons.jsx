import React from 'react';

const TopButtons = ({ setCity }) => {

  const cities = ["Paris", "Madrid", "Bucarest", "Berlin", "London"];

  return (
    <div className="d-flex flex-wrap justify-content-center gap-3 my-4">
      {cities.map((city, index) => (
        <button 
          key={index} 
          className="btn btn-outline-primary px-4 py-2 fw-medium shadow-sm"
          onClick={() => setCity(city)}
        >
          📍 {city}
        </button>
      ))}
    </div>
  );
};

export default TopButtons;
