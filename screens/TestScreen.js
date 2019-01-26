import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default class TestScreen extends React.Component {
  static navigationOptions = { title: 'Test screen' };

  render() {
    return (
      <View>
        <Text>I am a test screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
