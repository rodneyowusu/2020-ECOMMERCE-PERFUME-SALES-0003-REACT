import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Perfume Oils
    </NavigationItem>
    <NavigationItem link="/bodysplash">Body Splash</NavigationItem>
  </ul>
);

export default navigationItems;
