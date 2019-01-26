import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default class PaymentScreen extends React.Component {
  static navigationOptions = {
    title: 'Payment details'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Payment screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff'
  }
});
