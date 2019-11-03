import React from "react";
import { NavLink } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <nav id="header">
        <NavLink activeClassName="active" exact={true} to="/">Home</NavLink>
        <NavLink activeClassName="active" to="/outreach">Outreach</NavLink>
        <NavLink activeClassName="active" to="/events">Events</NavLink>
        <NavLink activeClassName="active" to="/social">Social</NavLink>
        <NavLink activeClassName="active" to="/store">Store</NavLink>
        <NavLink activeClassName="active" to="/about">About</NavLink>
      </nav>
    )
  }
}
