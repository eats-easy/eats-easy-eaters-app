import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AppSettingsScreen from '../screens/AppSettingsScreen';
import ExitAppScreen from '../screens/ExitAppScreen';
import UserLoggingScreen from '../screens/UserLoggingScreen';
import UserProfileScreen from '../screens/UserProfileScreen';


// Stacks
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

const ExitAppStack = createStackNavigator(
  {
    ExitApp: ExitAppScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const UserLoggingStack = createStackNavigator(
  {
    UserLogging: UserLoggingScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

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



// Navigations
AppSettingsStack.navigationOptions = {
  tabBarLabel: 'AppSettings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'settings'} />
  )
};

ExitAppStack.navigationOptions = {
  tabBarLabel: 'ExitApp',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'power'} />
  )
};

UserLoggingStack.navigationOptions = {
  tabBarLabel: 'UserLogging',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'login'} />
  )
};

UserProfileStack.navigationOptions = {
  tabBarLabel: 'UserProfile',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'face-profile'} />
};


export default createBottomTabNavigator({
  AppSettingsStack,
  ExitAppStack,
  UserLoggingStack,
  UserProfileStack
});
