import React from 'react';

const FormInput = ({ label, name, type = "text", value, onChange, error }) => (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
      />
      {error && <div className="text-danger">{error}</div>}
    </div>
  );

export default FormInput;