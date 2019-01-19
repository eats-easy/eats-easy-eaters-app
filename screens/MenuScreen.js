import React from "react";
import { Button, Text, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class MenuScreen extends React.Component {
  render() {
    const restName = this.props.navigation.getParam(
      "restName",
      "Unknown restaurant"
    );
    return (
      <View style={styles.container}>
        <Text>{restName} menu screen</Text>
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
