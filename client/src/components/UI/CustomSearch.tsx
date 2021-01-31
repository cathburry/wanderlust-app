import React, { FC, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CustomSearch: FC<SearchProps> = ({ type = 'text', placeholder, value, name, onChange, label }) => {
  return(
    <div className="field">
      <div className="control">
        <label htmlFor={name}>{label}</label>
        <input 
          className="input"
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          id={name}
          onChange={onChange}
          required
          autoComplete="off"
        />
      </div>
    </div>
  );
}

export default CustomSearch;