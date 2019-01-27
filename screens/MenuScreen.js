import React from 'react';
import { AsyncStorage, ScrollView, Text, StyleSheet, View } from 'react-native';
import { Tile, Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { getApiRestaurantMenu } from '../network/getApiRestaurantMenu';
import LoadingCircle from '../components/LoadingCircle';

export default class MenuScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      restName: null,
      restaurantId: null,
      data: [],
      status: 'loading'
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.state.data !== {} && this.state.status !== 'loading' ? (
            <Grid>
              <Col style={styles.column}>{this.state.data.map(this.renderItem)}</Col>
            </Grid>
          ) : (
            <LoadingCircle />
          )}
        </View>
      </ScrollView>
    );
  }

  async componentWillMount() {
    try {
      await this.setState({
        restName: this.props.navigation.dangerouslyGetParent().getParam('restName'),
        restaurantId: this.props.navigation.dangerouslyGetParent().getParam('restaurantId')
      });

      this._storeRestaurantData();

      const dishes = await getApiRestaurantMenu(this.state.restaurantId);

      this.setState({
        data: dishes || [],
        status: 'loaded'
      });
    } catch (err) {
      console.error(err);
      this.setState({
        data: [],
        status: 'failed'
      });
    }
  }

  _storeRestaurantData = async () => {
    try {
      await AsyncStorage.setItem('@RestaurantViewStore:restName', this.state.restName);
      await AsyncStorage.setItem('@RestaurantViewStore:restaurantId', this.state.restaurantId);
    } catch (error) {
      // TODO: Log error saving data
    }
  };

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
                  <Icon name="add-shopping-cart" />
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
