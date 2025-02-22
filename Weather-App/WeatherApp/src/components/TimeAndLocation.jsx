import React from 'react';

const TimeAndLocation = ({ weather }) => (
    <div className="text-center mt-3">
        <p className="fw-bold text-muted">{weather.localTime}</p>
        <h2 className="fw-bold">{weather.name}, {weather.country}</h2>
    </div>
);

export default TimeAndLocation;
