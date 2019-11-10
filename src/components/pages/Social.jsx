import React from 'react';
import { Facebook, Instagram, Twitter } from 'components/social';
import { Loading } from 'components/common';
import Logo_FB from 'assets/facebook.svg';
import Logo_IG from 'assets/instagram.svg';
import Logo_TW from 'assets/twitter.svg';

import API from 'lib/api';

const FB = 0;
const IG = 1;
const TW = 2;

export default class Social extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 500, height: window.innerHeight, active: -1 };
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  componentDidMount() {
    API.get('/social')
      .then(data => this.setState({
        ...data,
        active: IG,
        quickAccess: [data.profile_fb, data.profile_ig, data.profile_tw]
      }, _ => setTimeout(this.updateDimensions, 2000)))
      .catch(err => window.alert(err.err))
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() { window.removeEventListener('resize', this.updateDimensions); }

  updateDimensions() {
    const id = Date.now();
    this.updateId = id;
    setTimeout(_ => {
      if (this.updateId !== id || this.state.active == -1) return;
      const h = window.innerHeight, w = this.colRef.clientWidth;
      if (this.state.height !== h || this.state.width !== w)
        this.setState({ height: h, width: w })
    }, 100)
  }

  render() {
    const { active } = this.state;
    if (active === -1) return <Loading wrapperClass="social-media-portal"/>
    return (
      <div className="social-media-portal">
        <div className="mobile-only logo-space platform-selector">
          <img className={active === FB ? "active" : ""} onClick={_ => this.setState({active: FB})} src={Logo_FB}/>
          <img className={active === IG ? "active" : ""} onClick={_ => this.setState({active: IG})} src={Logo_IG}/>
          <img className={active === TW ? "active" : ""} onClick={_ => this.setState({active: TW})} src={Logo_TW}/>
        </div>
        <div className="mobile-only acct-name">{active ? "@" : ""}{this.state.quickAccess[active]}</div>
        <div className={active === FB ? "media-col active" : "media-col"}>
          <div className="logo-space">
            <img src={Logo_FB}/>
            <br/>{this.state.profile_fb}
          </div>
          <Facebook width={this.state.width} height={this.state.height} profile={this.state.profile_fb}/>
        </div>
        <div className={active === IG ? "media-col active" : "media-col"} ref={r => {this.colRef = r}}>
          <div className="logo-space">
            <img src={Logo_IG}/>
            <br/>@{this.state.profile_ig}
          </div>
          <Instagram height={this.state.height} profile={this.state.profile_ig}/>
        </div>
        <div className={active === TW ? "media-col active" : "media-col"}>
          <div className="logo-space">
            <img src={Logo_TW}/>
            <br/>@{this.state.profile_tw}
          </div>
          <div className="media-col media-col-twitter" style={{height: this.state.height}}>
            <Twitter height={this.state.height} profile={this.state.profile_tw}/>
          </div>
        </div>
      </div>
    )
  }
}
