import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Logo from 'assets/logo.svg';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    return (
      <nav id="header" className={this.state.open ? "header-open" : "header-closed"} onClick={_ => this.setState({open: false})}>
        <div className="mobile-only title">
          <span><img className="logo" src={Logo}/>Healthy Heart Coalition</span>
          <Icon
            id="burger"
            onClick={e => {e.stopPropagation(); this.setState({open: !this.state.open})}}
            fontSize="large">
              {this.state.open ? "close" : "menu"}
          </Icon>
        </div>
        <NavLink className="no-mobile logo" exact={true} to="/">
          <img src={Logo}/>
        </NavLink>
        <NavLink className="mobile-only" activeClassName="active" exact={true} to="/">Home</NavLink>
        <NavLink activeClassName="active" to="/resources">Resources</NavLink>
        <NavLink activeClassName="active" to="/impact">Impact</NavLink>
        <NavLink activeClassName="active" to="/events">Events</NavLink>
        <NavLink activeClassName="active" to="/social">Social</NavLink>
        <NavLink activeClassName="active" to="/store">Store</NavLink>
        <NavLink activeClassName="active" to="/about">About</NavLink>
      </nav>
    )
  }
}
