import React from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <View style={{ margin: 5 }}>
        <Icon
          name={this.props.name}
          size={28}
          type="font-awesome"
          color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      </View>
    );
  }
}
