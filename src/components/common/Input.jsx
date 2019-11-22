import React from 'react';

const Input = ({ className, prompt, name, type, placeholder, form, update, format, other }) => (
  !form ? <></> :
  <div className={`input-group ${className || ""}`}>
    <span>{prompt || `Your ${name}`}</span>
    <input
      type={type}
      placeholder={placeholder || ""}
      value={form[name]}
      onChange={({target: { value }}) => update({ [name]: format ? format(value) : value })}
      {...other}
    />
  </div>
)

export default Input
