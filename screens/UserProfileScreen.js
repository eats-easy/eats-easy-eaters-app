import React from 'react';
import { Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import StorageManager from '../services/storage_manager';

import { commonStyles } from '../styles';
import Colors from '../constants/Colors';

export default class UserProfileScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null
    };

    this.storageManager = new StorageManager();
  }
  async componentWillMount() {
    let user = await this.storageManager._retrieveUserData();
    await this.setState({
      user: user
    });
  }

  render() {
    return (
      <View style={[ commonStyles.container, commonStyles.centered, commonStyles.justifyCenter ]}>
        <Text style={[ commonStyles.textBig, commonStyles.textCenter, commonStyles.textStrong ]}>
          {this.state.user && this.state.user.userId ? 'Logged in, user ID: ' + this.state.user.userId : 'Logged out'}
        </Text>
      </View>
    );
  }
}
