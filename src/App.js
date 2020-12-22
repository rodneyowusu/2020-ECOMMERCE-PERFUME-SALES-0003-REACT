import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import Details from "./containers/CheckOut/Checkout";
import HomePage from "./containers/Home/HomePage";
import BodySplash from "./containers/bodySplash/bodySplash";
import { FooterContainer } from "./containers/Footer";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/bodysplash" component={BodySplash} />
            <Route path="/checkout" component={Details} />
            <Route path="/" exact component={HomePage} />
          </Switch>
        </Layout>

        <FooterContainer />
      </div>
    );
  }
}

export default App;
