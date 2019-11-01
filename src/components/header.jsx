import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <nav id="header">
        <Link to="/">Home</Link>
      </nav>
    )
  }
}
