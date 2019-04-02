import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { commonStyles } from './styles';
import StorageManager from './services/storage_manager';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoadingComplete: false
    };
    this.storageManager = new StorageManager();
  }

  async componentWillMount() {
    let DEBUG = true;
    if (DEBUG) {
      await this.storageManager._removeAllData();
      console.log(await this.storageManager._retrieveUserData());
      console.log(await this.storageManager._retrieveRestaurantData());
      console.log(await this.storageManager._retrieveAllOrdersData());
      console.log(await this.storageManager._retrieveAllOrderStatuses());
      console.log(await this.storageManager._retrieveAllTableData());
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={commonStyles.container}>
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([ require('./assets/images/robot-dev.png'), require('./assets/images/robot-prod.png') ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
      })
    ]);
  };

  _handleLoadingError = (error) => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
