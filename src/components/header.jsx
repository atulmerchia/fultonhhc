import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    return (
      <nav id="header" className={this.state.open ? "header-open" : "header-closed"} onClick={_ => this.setState({open: false})}>
        <div className="mobile-only title">
          <span>Healthy Heart Coalition</span>
          <Icon
            id="burger"
            onClick={e => {e.stopPropagation(); this.setState({open: !this.state.open})}}
            fontSize="large">
              {this.state.open ? "close" : "menu"}
          </Icon>
        </div>
        <NavLink activeClassName="active" exact={true} to="/">Home</NavLink>
        <NavLink activeClassName="active" to="/community">Community</NavLink>
        <NavLink activeClassName="active" to="/events">Events</NavLink>
        <NavLink activeClassName="active" to="/social">Social</NavLink>
        <NavLink activeClassName="active" to="/store">Store</NavLink>
        <NavLink activeClassName="active" to="/about">About</NavLink>
      </nav>
    )
  }
}
