import React from "react";
import { Facebook, Instagram, Twitter } from "components/social";
import Logo_FB from "assets/facebook.svg";
import Logo_IG from "assets/instagram.svg";
import Logo_TW from "assets/twitter.svg";

const FB = 0;
const IG = 1;
const TW = 2;

export default class Social extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 500, height: window.innerHeight, active: IG };
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    setTimeout(this.updateDimensions, 2000);
  }
  componentWillUnmount() { window.removeEventListener('resize', this.updateDimensions); }

  updateDimensions() {
    const id = Date.now();
    this.updateId = id;
    setTimeout(_ => {
      if (this.updateId !== id) return;
      const h = window.innerHeight, w = this.colRef.clientWidth;
      if (this.state.height !== h || this.state.width !== w)
        this.setState({ height: h, width: w })
    }, 100)
  }

  render() {
    return (
      <div className="social-media-portal">
        <div className="mobile-only logo-space platform-selector">
          <img className={this.state.active === FB && "active"} onClick={_ => this.setState({active: FB})} src={Logo_FB}/>
          <img className={this.state.active === IG && "active"} onClick={_ => this.setState({active: IG})} src={Logo_IG}/>
          <img className={this.state.active === TW && "active"} onClick={_ => this.setState({active: TW})} src={Logo_TW}/>
        </div>
        <div className={this.state.active === FB ? "media-col active" : "media-col"}>
          <div className="logo-space">
            <img src={Logo_FB}/>
          </div>
          <Facebook width={this.state.width} height={this.state.height}/>
        </div>
        <div className={this.state.active === IG ? "media-col active" : "media-col"} ref={r => {this.colRef = r}}>
          <div className="logo-space">
            <img src={Logo_IG}/>
          </div>
          <Instagram height={this.state.height} />
        </div>
        <div className={this.state.active === TW ? "media-col active" : "media-col"}>
          <div className="logo-space">
            <img src={Logo_TW}/>
          </div>
          <div className="media-col media-col-twitter" style={{height: this.state.height}}>
            <Twitter height={this.state.height}/>
          </div>
        </div>
      </div>
    )
  }
}
