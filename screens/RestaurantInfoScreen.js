import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default class RestaurantInfoScreen extends React.Component {
  static navigationOptions = { title: "<Restaurant> information" };

  render() {
    return (
      <View style={styles.container}>
        <Text>Info screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#fff"
  }
});
