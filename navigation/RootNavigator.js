import { createStackNavigator } from 'react-navigation';

import SearchRestaurantScreen from '../screens/SearchRestaurantScreen';
import RestaurantTabNavigator from './RestaurantTabNavigator';
import AppOptionsNavigator from './AppOptionsNavigator';

// Stacks
const RootStack = createStackNavigator({
  Search: SearchRestaurantScreen,
  Restaurant: RestaurantTabNavigator,
  AppOptions: AppOptionsNavigator
});

export default RootStack;
