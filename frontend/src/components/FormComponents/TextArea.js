import React from 'react';

const TextArea = ({ label, name, value, onChange, error }) => (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <textarea
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
        rows="3"
      />
      {error && <div className="text-danger">{error}</div>}
    </div>
  );

export default TextArea;