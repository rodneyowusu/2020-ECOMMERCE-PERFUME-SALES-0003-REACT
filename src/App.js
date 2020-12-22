import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import { FooterContainer } from "./containers/Footer";
import "./App.css";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

//Adding Lazy Loading
const asyncCheckout = asyncComponent(() => {
  return import("./containers/CheckOut/Checkout");
});

const asyncPerfumeOils = asyncComponent(() => {
  return import("./containers/Home/HomePage");
});
const asyncBodySplash = asyncComponent(() => {
  return import("./containers/bodySplash/bodySplash");
});

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/bodysplash" component={asyncBodySplash} />
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/" exact component={asyncPerfumeOils} />
            <Redirect to="/" />
          </Switch>
        </Layout>

        <FooterContainer />
      </div>
    );
  }
}

export default withRouter(App);
