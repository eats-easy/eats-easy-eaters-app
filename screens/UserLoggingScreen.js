import React from 'react';
import { Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import { commonStyles } from '../styles';
import Colors from '../constants/Colors';

export default class UserLoggingScreen extends React.Component {
  render() {
    return (
      <View style={[ commonStyles.container, commonStyles.centered, commonStyles.justifyCenter ]}>
        <Text style={[ commonStyles.textBig, commonStyles.textCenter, commonStyles.textStrong ]}>
          I'm the UserLoggingScreen screen
        </Text>
      </View>
    );
  }
}
