import React from "react";
import { Facebook, Instagram, Twitter } from "components/social";
import Logo_FB from "assets/facebook.svg";
import Logo_IG from "assets/instagram.svg";
import Logo_TW from "assets/twitter.svg";

export default class Social extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 500, height: window.innerHeight };
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    setTimeout(this.updateDimensions, 2000);
  }
  componentWillUnmount() { window.removeEventListener('resize', this.updateDimensions); }
  updateDimensions() {
    const h = window.innerHeight, w = this.colRef.clientWidth;
    if (this.state.height !== h || this.state.width !== w)
      this.setState({ height: h, width: w })
  }

  render() {
    return (
      <div className="social-media-portal">
        <div className="media-col">
          <div className="logo-space">
            <img src={Logo_FB}/>
          </div>
          <Facebook width={this.state.width} height={this.state.height}/>
        </div>
        <div className="media-col" ref={r => {this.colRef = r}}>
          <div className="logo-space">
            <img src={Logo_IG}/>
          </div>
          <Instagram height={this.state.height} />
        </div>
        <div className="media-col">
          <div className="logo-space">
            <img src={Logo_TW}/>
          </div>
          <div className="media-col media-col-twitter" style={{maxHeight: this.state.height}}>
            <Twitter height={this.state.height}/>
          </div>
        </div>
      </div>
    )
  }
}
