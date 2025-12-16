import React from 'react';

const RadioGroup = ({ label, name, options, value, onChange, error }) => (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div>
        {options.map(option => (
          <div key={option.value} className="form-check form-check-block">
            <input
              type="radio"
              name={name}
              id={`${name}-${option.value}`}
              value={option.value}
              className="form-check-input"
              checked={value === option.value}
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor={`${name}-${option.value}`}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && <div className="text-danger">{error}</div>}
    </div>
  );

export default RadioGroup;