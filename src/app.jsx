import React from "react";
import { BrowserRouter, Switch, Redirect, Route, Link } from "react-router-dom";
import * as Pages from "pages";
import { Header } from "components";
import { hot } from "react-hot-loader";
import api from "lib/api";
import "css/main.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <div id="app-wrapper">
        <Switch>
          <Route exact path="/" component={Pages.Home} />
          <Route path="/community" component={Pages.Community} />
          <Route path="/social" component={Pages.Social} />
          <Route path="/page-not-found" component={Pages.PageNotFound} />
          <Redirect from="/*" to="/page-not-found"/>
        </Switch>
      </div>
    </BrowserRouter>
  )
};

export default hot(module)(App);
