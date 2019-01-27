import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default class LoadingCircle extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../static/images/loading.gif')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 600
  },
  logo: {
    width: 50,
    height: 50
  }
});
