import React from 'react';
import { Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import { commonStyles } from '../styles';
import Colors from '../constants/Colors';

class AppSettingsScreen extends React.Component {
  render() {
    return (
      <View style={commonStyles.container}>
        <Text style={[ commonStyles.textBig, commonStyles.textCenter, commonStyles.textStrong ]}>
          I'm an app settings screen
        </Text>
      </View>
    );
  }
}

export default withNavigation(AppSettingsScreen);
