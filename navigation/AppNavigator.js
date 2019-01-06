import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import RestaurantTabNavigator from "./RestaurantTabNavigator";

export default createAppContainer(
  createSwitchNavigator({
    // TODO: add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: RestaurantTabNavigator
  })
);
