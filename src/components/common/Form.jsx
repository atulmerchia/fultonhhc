import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.clone = this.clone.bind(this);
    this.setState = this.setState.bind(this);
  }

  getData() { return this.state; }
  clone(e) {
    if (!e.type) return e;
    return e.type.name === 'Input'
      ? React.cloneElement(e, { form: this.state, update: this.setState })
      : React.cloneElement(e, { children: React.Children.map(e.props.children, this.clone )})
  }

  render() { return <>{React.Children.map(this.props.children, this.clone)}</> }
}
