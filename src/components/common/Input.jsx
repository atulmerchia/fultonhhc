import React from 'react';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.defaultValue || "" };
  }

  render() {
    const props = this.props;
    return (
      <div className={`input-group ${props.className || ""}`}>
        <span>{props.prompt || `Your ${props.name}`}</span>
        <input
          name={props.name}
          type={props.type}
          placeholder={props.placeholder || ""}
          value={this.state.value}
          onChange={({target: { value }}) => this.setState({ value: props.format ? props.format(value) : value })}
          {...props.other}
        />
      </div>
    )
  }
}
