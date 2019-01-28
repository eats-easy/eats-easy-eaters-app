import React from 'react';
import { AsyncStorage, Text, StyleSheet, View } from 'react-native';
import { Tile, Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';

// import { getApiRestaurantMenu } from '../network/getApiRestaurantMenu';

export default class OrderScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurant: null,
      order: [],
      data: [],
      status: 'loading'
    };
  }

  _retrieveData = async () => {
    try {
      const restaurant = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:restaurant'));
      const order = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:order'));

      this.setState({
        restaurant: restaurant,
        order: order
      });

      if (value !== null) {
        // TODO: Log data is null
      }
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
        status: 'failed'
      });
    }
  }

  render() {
    return this.state.restaurant && this.state.restaurant.name ? (
      <View style={styles.container}>
        {this.state.order != []} ? (<Grid>
          <Col style={styles.column}>{this.state.order.map(this.renderItem)}</Col>
        </Grid>) :
        <Text>There are no dishes in your cart...</Text>
      </View>
    ) : (
      <LoadingCircle />
    );
  }

  renderItem = (dish, i) => {
    return (
      <View key={'dish_' + i} style={{ flex: 1 }}>
        <Row style={styles.row}>
          <Tile imageSrc={{ uri: dish.imageUrl }} title={dish.dishName} contentContainerStyle={{ height: 150 }}>
            <Grid>
              <Row>
                <Col>
                  <Text style={styles.small}>{dish.description}</Text>
                </Col>
                <Col>
                  <Text style={styles.smallRight}>{dish.price} NIS</Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Icon
                    name="remove-shopping-cart"
                    onPress={() => {
                      this.addOrderItem(dish.dishId);
                    }}
                  />
                </Col>
                <Col>
                  <Icon name="comment" />
                </Col>
                <Col>
                  <Icon name="thumb-up" />
                </Col>
                <Col>
                  <Icon name="share" />
                </Col>
              </Row>
            </Grid>
          </Tile>
        </Row>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff'
  },
  row: {
    flex: 1
  },
  column: {
    flex: 1,
    marginBottom: 8
  },
  small: { fontSize: 14 },
  smallRight: { fontSize: 14, textAlign: 'right' },
  micro: { fontSize: 10 }
});
