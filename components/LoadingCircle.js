import React from 'react';
import { View, Image } from 'react-native';
import { commonStyles } from '../styles';

export default class LoadingCircle extends React.Component {
  render() {
    return (
      <View style={[ commonStyles.container, commonStyles.textCenter, commonStyles.justifyCenter ]}>
        <Image style={commonStyles.loadingIcon} source={require('../static/images/loading.gif')} />
      </View>
    );
  }
}
