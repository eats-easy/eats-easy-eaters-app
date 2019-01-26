import React from "react";
import { Button, Text, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class MenuScreen extends React.Component {
  render() {
    const { navigation } = this.props;

    const restName = navigation.getParam("restName", "Unknown restaurant");
    const restaurantId = navigation.getParam("restaurantId", "Unknown");
    return (
      <View style={styles.container}>
        <Text>{restName} menu screen</Text>
        <Text>Restaurant ID: {restaurantId}</Text>
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
