import React from 'react';

export default class Input extends React.Component {
  render() {
    const { name, placeholder, prompt, type, format, className, form, update } = this.props;

    return (
      <div className={`input-group ${className || ""}`}>
        <span>{prompt || `Your ${name}`}</span>
        <input
          type={type}
          placeholder={placeholder || ""}
          value={form[name]}
          onChange={({target: { value }}) => update({ [name]: format ? format(value) : value })}
        />
      </div>
    )
  }
}
