import React from "react";
import { AsyncStorage, Text, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class MenuScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Menu screen</Text>
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
