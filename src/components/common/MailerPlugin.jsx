import React from 'react';
import API from 'lib/api';
import helpers from 'lib/helpers';
import Icon from '@material-ui/core/icon'

export default class MailerPlugin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { buttonState: ['Send', 'send'], name: '', email: '', phone: '', text: ''}
    this.Input = this.Input.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  Input({name, placeholder, type, format}) {
    return (
      <div className="input-group">
        <span>Your {name}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={format ? format(this.state[name]) : this.state[name]}
          onChange={({target: { value }}) => this.setState({ [name]: value })}
        />
      </div>
    )
  }

  sendEmail() {
    if (this.state.buttonState[1] !== 'send' && this.state.buttonState[1] !== 'refresh') return;
    if (!window.confirm("Are you sure?")) return;
    this.setState({ buttonState: ['Sending', 'autorenew'] })
    API.post('/message', {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      text: this.state.text
    })
    .then(res => this.setState({buttonState: ['Received', 'check']}))
    .catch(err => this.setState({buttonState: ['Failed', 'refresh']}))
  }

  render() {
    return (
      <div className={`mailer-plugin ${this.props.className || ""}`}>
        <div className="headers">
          <this.Input placeholder="Johnny Appleseed" name="name" type="text"/>
          <this.Input placeholder="example@gmail.com" name="email" type="email"/>
          <this.Input placeholder="(XXX) XXX-XXXX" name="phone" type="tel" format={helpers.num2phone}/>
        </div>
        <textarea
          ref={r => {this.msgbox = r}}
          className="scrollable"
          placeholder="Your message"
          rows={4}
          value={this.state.text}
          onChange={({target}) => {
            target.style.height = 'inherit';
            target.style.height = `${target.scrollHeight}px`;
            this.setState({ text: target.value })
          }}
        />
        <div className={"submit " + this.state.buttonState[1]} onClick={this.sendEmail}>
          <span>{this.state.buttonState[0]}</span>
          <Icon>{this.state.buttonState[1]}</Icon>
        </div>
      </div>
    )
  }
}
