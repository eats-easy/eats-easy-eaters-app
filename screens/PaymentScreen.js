import React from 'react';
import { AsyncStorage, Text, StyleSheet, View } from 'react-native';

export default class PaymentScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurant : null,
      order      : [],
      data       : [],
      status     : 'loading',
    };
  }

  _retrieveData = async () => {
    try {
      const restaurant = await JSON.parse(
        await AsyncStorage.getItem('@RestaurantViewStore:restaurant')
      );
      const order = await JSON.parse(
        await AsyncStorage.getItem('@RestaurantViewStore:order')
      );

      this.setState({
        restaurant : restaurant,
        order      : order.map((x) => {
          if (x.restId == restaurant.restaurantId) return x;
        }),
      });
    } catch (error) {
      // TODO: Log error retrieving data

      console.warn('Got error', error);
    }
  };

  async componentWillMount() {
    try {
      this._retrieveData();
    } catch (err) {
      console.error(err);
      this.setState({
        status : 'failed',
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.order.map(this.renderItem)}
      </View>
    );
  }

  renderItem = (dish, i) => {
    return (
      <Text key={'dish_' + i}>
        {i + 1}. {dish.dishName ? dish.dishName : 'Unknown'}
      </Text>
    );
  };
}

const styles = StyleSheet.create({
  container : {
    flex            : 1,
    padding         : 5,
    backgroundColor : '#fff',
  },
});
