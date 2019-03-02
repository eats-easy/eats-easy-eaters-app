import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MenuScreen from '../screens/MenuScreen';
import OrderScreen from '../screens/OrderScreen';
import CallServiceScreen from '../screens/CallServiceScreen';
import PaymentScreen from '../screens/PaymentScreen';
import RestaurantInfoScreen from '../screens/RestaurantInfoScreen';

// Stacks
const MenuStack = createStackNavigator(
  {
    Menu: MenuScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const OrderStack = createStackNavigator(
  {
    Order: OrderScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const CallServiceStack = createStackNavigator(
  {
    Call: CallServiceScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const PaymentStack = createStackNavigator(
  {
    Payment: PaymentScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const RestaurantInfoStack = createStackNavigator(
  {
    Info: RestaurantInfoScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

// Navigations
MenuStack.navigationOptions = {
  tabBarLabel: 'Menu',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'restaurant'} />
};

OrderStack.navigationOptions = {
  tabBarLabel: 'Order',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'shopping-cart'} />
};

CallServiceStack.navigationOptions = {
  tabBarLabel: 'Service',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'room-service'} />
};

PaymentStack.navigationOptions = {
  tabBarLabel: 'Payment',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'payment'} />
};

RestaurantInfoStack.navigationOptions = {
  tabBarLabel: 'Info',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'info'} />
};

export default createBottomTabNavigator({
  MenuStack,
  OrderStack,
  CallServiceStack,
  PaymentStack,
  RestaurantInfoStack
});
