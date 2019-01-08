import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { createStackNavigator } from "react-navigation";

import SearchRestaurantScreen from "../screens/SearchRestaurantScreen";

// Stacks
const RootStack = createStackNavigator({
  Search: SearchRestaurantScreen
});

export default RootStack;
