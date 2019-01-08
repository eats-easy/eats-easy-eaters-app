import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SearchRestaurantResultGrid from "./subscreens/SearchRestaurantResultGrid";

export default class SearchRestaurantScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Find a restaurant near you",
      headerLeft: (
        <Icon
          onPress={() => navigation.navigate("DrawerOpen")}
          name="menu"
          size={30}
          style={{ marginLeft: 10 }}
        />
      ),
      headerRight: <Icon name="search" size={30} style={{ marginRight: 10 }} />
    };
  };

  render() {
    return (
      <ScrollView>
        <SearchRestaurantResultGrid />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
