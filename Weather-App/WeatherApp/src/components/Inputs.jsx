import React, { useState } from 'react';

const Inputs = ({ setCity }) => {
  const [input, setInput] = useState("");

  return (
    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center my-4 gap-3">
      <div className="input-group w-50 shadow-sm">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Rechercher une ville..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button className="btn btn-primary px-4 py-2 shadow-sm" onClick={() => setCity(input)}>
        Rechercher
      </button>
    </div>
  );
};

export default Inputs;
