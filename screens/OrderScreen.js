import React from 'react';
import { AsyncStorage, ScrollView, Image, Text, StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';

// import { getApiRestaurantMenu } from '../network/getApiRestaurantMenu';

export default class OrderScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurant : null,
      order      : [],
      data       : [],
      status     : 'loading',
    };
  }

  async removeOrderItem(dishId) {
    var found = false;

    let order = await this.state.order.map((x) => {
      if (!found && x && x.dishId && x.dishId === dishId) {
        found = true;
      } else {
        return x;
      }
    });

    this.setState({
      order : order,
    });

    await this._storeOrderData();
  }

  _storeOrderData = async () => {
    // TODO: Create service that makes all the store/retrieve actions
    try {
      await AsyncStorage.setItem('@RestaurantViewStore:order', JSON.stringify(this.state.order));
    } catch (error) {
      // TODO: Log error saving data
    }
  };

  _retrieveData = async () => {
    try {
      const restaurant = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:restaurant'));
      const order = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:order'));

      this.setState({
        restaurant : restaurant,
        order      : order.map((x) => {
          if (x.restId == restaurant.restaurantId) return x;
        }),
      });
    } catch (error) {
      // TODO: Log error retrieving data
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
    return this.state.restaurant && this.state.restaurant.name && this.state.order && this.state.order.length > 0 ? (
      <ScrollView>
        <View style={styles.container}>
          <Grid>
            <Row style={styles.row}>
              <Col style={styles.column}>{this.state.order.map(this.renderItem)}</Col>
            </Row>
            <Row style={styles.row}>
              <Button title='Clear all' type='clear' />
              <Button icon={<Icon name='arrow-right' size={15} color='white' />} title='Create order' />
            </Row>
          </Grid>
        </View>
      </ScrollView>
    ) : (
      <LoadingCircle />
    );
  }

  renderItem = (dish, i) => {
    return dish ? (
      <View key={'dish_' + i} style={{ flex: 1 }}>
        <Row style={styles.row}>
          <Grid>
            <Row style={styles.rowList}>
              <Col size={3} style={styles.columnList}>
                <Image style={{ width: 100, height: 80 }} source={{ uri: dish.imageUrl }} />
              </Col>
              <Col size={6} style={styles.columnList}>
                <Text style={styles.mediumStrong}>{dish.dishName}</Text>
                <Text style={styles.small}>{dish.price} NIS</Text>
              </Col>
              <Col size={1} style={styles.columnList}>
                <Icon
                  name='remove-shopping-cart'
                  onPress={() => {
                    this.removeOrderItem(dish.dishId);
                  }}
                />
              </Col>
            </Row>
          </Grid>
        </Row>
      </View>
    ) : (
      <View key={'no_dish_' + i} />
    );
  };
}

const styles = StyleSheet.create({
  container    : {
    flex            : 1,
    padding         : 5,
    backgroundColor : '#fff',
  },
  row          : {
    flex : 1,
  },
  rowList      : {
    flex : 1,
  },
  column       : {
    flex         : 1,
    marginBottom : 8,
  },
  columnList   : {
    flex    : 1,
    padding : 4,
  },
  mediumStrong : {
    fontSize   : 18,
    fontWeight : '800',
  },
  small        : { fontSize: 14 },
  smallRight   : { fontSize: 14, textAlign: 'right' },
  micro        : { fontSize: 10 },
});
