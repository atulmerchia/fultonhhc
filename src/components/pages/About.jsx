import React from 'react';
import API from 'lib/api';
import helpers from 'lib/helpers';
import { Loading, MailerPlugin } from 'components/common';
import DefaultImage from 'assets/partner.svg';
import Logo from 'assets/logo.svg';
import Icon from '@material-ui/core/icon';

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, focused: -2 };
  }

  componentDidMount() {
    API.get('/about')
      .then(data => this.setState({
        people: data.people,
        partners: Object.values(data.partners).sort( (a,b) => (a.org < b.org)*2-1),
        cover_photo: data.cover_photo,
        contact_info: {
          ...data.contact_info,
          phone: helpers.num2phone(data.contact_info.phone)
        },
        loading: false })
      )
      .catch(err => window.alert(err.err))
  }

  render() {
    console.log(this.state);
    if (this.state.loading) return <Loading/>
    return (
      <div className="about">
        <div className="contact-area">
          <h1>Contact us!</h1>
          <div>{this.state.contact_info.name}</div>
          <div>{this.state.contact_info.email}</div>
          <div>{this.state.contact_info.phone}</div>
          <h3>Or send us an email right from your web browser</h3>
          <div className="mail">
            <MailerPlugin/>
          </div>
        </div>
        <br/>
        <h1>A great big thank you to all our partners!</h1>
        <div className="cover">
          <div className=" lock-aspect lock-aspect-16x9" style={{ backgroundImage: `url(${this.state.cover_photo})` }}/>
        </div>
        <br/>
        <div className="partner-area">
          <div className={`partner-card ${this.state.focused === -1 ? " focused" : ""}`}>
            <div
              className="lock-aspect lock-aspect-16x9"
              style={{ backgroundImage: `url(${Logo})` }}
              onClick={_ => this.setState({focused: this.state.focused === -1 ? -2 : -1})}
            />
            <div className="partner-info">
              <div className="org-name">Healthy Heart Coalition</div>
              {this.state.people === undefined ? <></> : this.state.people.map( (x,i) => <div key={i}>{x}</div> )}
            </div>
          </div>
          {this.state.partners.map( (p,i) => (
            <div
              key={i}
              className={`partner-card ${this.state.focused === i ? " focused" : ""}`}
            >
              <div
                className="lock-aspect lock-aspect-16x9"
                style={{ backgroundImage: `url(${p.img_url || DefaultImage})` }}
                onClick={_ => this.setState({focused: this.state.focused === i ? -2 : i})}
              />
              <div className="partner-info">
                <div className="org-name">{p.org}</div>
                {p.website
                  ? <a href={p.website} target="_blank">
                      <Icon>language</Icon>
                      <span className="url">{p.website}</span>
                    </a>
                  : <></>
                }
                {p.people === undefined
                  ? <></>
                  : p.people.map( (x,i) => Array.isArray(x)
                    ? <div key={i}><em>{x[0]}</em>{x[1]}</div>
                    : <div key={i}>{x}</div>
                  )
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
