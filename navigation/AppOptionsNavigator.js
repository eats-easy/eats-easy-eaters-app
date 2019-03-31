import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AppSettingsScreen from '../screens/AppSettingsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

// Stacks
const UserProfileStack = createStackNavigator(
  {
    UserProfile: UserProfileScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const AppSettingsStack = createStackNavigator(
  {
    AppSettings: AppSettingsScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

// Navigations
UserProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'user'} />
};

AppSettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'cog'} />
};

export default createBottomTabNavigator({
  UserProfileStack,
  AppSettingsStack
});
