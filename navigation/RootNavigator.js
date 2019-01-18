import { createStackNavigator } from "react-navigation";

import SearchRestaurantScreen from "../screens/SearchRestaurantScreen";
import RestaurantTabNavigator from "./RestaurantTabNavigator";

// Stacks
const RootStack = createStackNavigator({
  Search: SearchRestaurantScreen,
  Restaurant: RestaurantTabNavigator
});

export default RootStack;
