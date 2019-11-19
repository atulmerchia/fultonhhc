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
        partners: Object.values(data.partners).sort( (a,b) => (a.org < b.org) ? - 1 : 1),
        cover_photo: data.cover_photo,
        contact_info: {
          ...data.contact_info,
          phone: helpers.num2phone(data.contact_info.phone)
        },
        loading: false })
      )
      .catch(err => window.alert(err.err))
  }

  handleClick(e, i) {
    e.stopPropagation();
    let t = e.target.parentNode.parentNode.children[1];
    t.style.maxHeight = this.state.focused === i ? '0px' : `${t.scrollHeight}px`;
    this.setState({focused: this.state.focused === i ? -2 : i})
  }

  render() {
    if (this.state.loading) return <Loading/>
    return (
      <div className="about">
        <div className="contact-area">
          <h1>Contact us!</h1>
          <div className="contact-info"><Icon>person</Icon>{this.state.contact_info.name}</div>
          <div className="contact-info"><Icon>mail</Icon>{this.state.contact_info.email}</div>
          <div className="contact-info"><Icon>phone</Icon>{this.state.contact_info.phone}</div>
          <h3>Or send us an email right from your web browser</h3>
          <div className="mail">
            <MailerPlugin/>
          </div>
        </div>
        <br/>
        <h1>A great big thank you to all our partners!</h1>
        <div className="cover">
          <div className=" lock-aspect lock-aspect-16x9">
            <img src={this.state.cover_photo} />
          </div>
        </div>
        <br/>
        <br/>
        <div className="partner-area">
          <div className={`partner-card ${this.state.focused === -1 ? " focused" : ""}`}>
            <div
              className="lock-aspect lock-aspect-16x9"
              onClick={e => this.handleClick(e, -1)}
            >
              <img src={Logo}/>
            </div>
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
                onClick={e => this.handleClick(e, i)}
              >
                <img src={p.img_url || DefaultImage}/>
              </div>
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
