import React from 'react';
import { AsyncStorage, Text, StyleSheet, View } from 'react-native';

export default class OrderScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      restName: null,
      restaurantId: null,
      test: null,
      data: [],
      status: 'loading'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.restName} order screen</Text>
        <Text>Test is: {this.state.test}</Text>
      </View>
    );
  }

  async componentWillMount() {
    try {
      this._retrieveData();
      /*
      const dishes = await getApiRestaurantMenu(this.state.restaurantId);

      this.setState({
        data: dishes || [],
        status: 'loaded'
      });
      */
    } catch (err) {
      console.error(err);
      this.setState({
        data: [],
        status: 'failed'
      });
    }
  }

  _retrieveData = async () => {
    try {
      const restName = await AsyncStorage.getItem('@RestaurantViewStore:restName');
      const restaurantId = await AsyncStorage.getItem('@RestaurantViewStore:restaurantId');

      this.setState({
        restName: restName,
        restaurantId: restaurantId
      });

      if (value !== null) {
        // TODO: Log data is null
      }
    } catch (error) {
      // TODO: Log error retrieving data
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff'
  }
});
