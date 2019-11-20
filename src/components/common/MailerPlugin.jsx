import React from 'react';
import API from 'lib/api';
import helpers from 'lib/helpers';
import Icon from '@material-ui/core/icon';
import { Form, Input } from 'components/common';

export default class MailerPlugin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { buttonState: ['Send', 'send'], name: '', email: '', phone: '', text: ''}
    this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail() {
    if (this.state.buttonState[1] !== 'send' && this.state.buttonState[1] !== 'refresh') return;

    const input = { ...this.form.getData(), text: this.state.text }
    const keys = [ 'name', 'subject', 'email', 'phone', 'text' ];
    const params = {};
    for (var k of keys)
      if (!input[k] || !input[k].trim().length) {
        window.alert(`Invalid ${k}`);
        return this.setState({ buttonState: ['Failed', 'refresh']})
      }
      else params[k] = input[k].trim();

    if (!window.confirm("Are you sure?")) return;
    this.setState({ buttonState: ['Sending', 'autorenew'] })
    API.post('/message', params)
    .then(res => this.setState({buttonState: ['Received', 'check']}))
    .catch(err => this.setState({buttonState: ['Failed', 'refresh']}))
  }

  render() {
    return (
      <div className={`mailer-plugin ${this.props.className || ""}`}>
        <div className="form headers">
          <Form ref={r => { this.form = r}}>
            <div className="row">
              <Input placeholder="Johnny Appleseed" name="name" type="text"/>
              <Input placeholder="example@gmail.com" name="email" type="email"/>
              <Input placeholder="(XXX) XXX-XXXX" name="phone" type="tel" format={helpers.num2phone}/>
            </div>
            <div className="row">
              <Input placeholder="No Subject" name="subject" prompt="subject" type="text" className="wide"/>
            </div>
          </Form>
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
        <div className={"submit " + this.state.buttonState[1]} onClick={this.sendEmail} tabIndex="0" onKeyPress={e => e.key === 'Enter' && this.sendEmail()}>
          <span>{this.state.buttonState[0]}</span>
          <Icon>{this.state.buttonState[1]}</Icon>
        </div>
      </div>
    )
  }
}
