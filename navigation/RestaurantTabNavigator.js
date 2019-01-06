import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import MenuScreen from "../screens/MenuScreen";
import OrderScreen from "../screens/OrderScreen";
import CallServiceScreen from "../screens/CallServiceScreen";
import PaymentScreen from "../screens/PaymentScreen";
import RestaurantInfoScreen from "../screens/RestaurantInfoScreen";

// Stacks
const MenuStack = createStackNavigator({
  Menu: MenuScreen
});

const OrderStack = createStackNavigator({
  Order: OrderScreen
});

const CallServiceStack = createStackNavigator({
  Call: CallServiceScreen
});

const PaymentStack = createStackNavigator({
  Payment: PaymentScreen
});

const RestaurantInfoStack = createStackNavigator({
  Info: RestaurantInfoScreen
});

// Navigations
MenuStack.navigationOptions = {
  tabBarLabel: "Menu",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"restaurant-menu"} />
  )
};

OrderStack.navigationOptions = {
  tabBarLabel: "Order",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"shopping-cart"} />
  )
};

CallServiceStack.navigationOptions = {
  tabBarLabel: "Service",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"room-service"} />
  )
};

PaymentStack.navigationOptions = {
  tabBarLabel: "Payment",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"payment"} />
};

RestaurantInfoStack.navigationOptions = {
  tabBarLabel: "Info",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"info"} />
};

export default createBottomTabNavigator({
  MenuStack,
  OrderStack,
  CallServiceStack,
  PaymentStack,
  RestaurantInfoStack
});