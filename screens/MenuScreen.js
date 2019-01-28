import React from 'react';
import { AsyncStorage, ScrollView, Text, StyleSheet, View } from 'react-native';
import { Tile, Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';
import { Snackbar } from 'react-native-material-ui';

import { getApiRestaurantMenu } from '../network/getApiRestaurantMenu';

export default class MenuScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurant   : null,
      data         : [],
      status       : 'loading',
      order        : [],
      snackVisible : false,
    };
  }

  async addOrderItem(item) {
    await this.setState({ order: [ ...this.state.order, item ], snackVisible: true });
    this._storeOrderData();
    setTimeout(() => {
      this.setState({ snackVisible: false });
    }, 3000);
  }

  _storeRestaurantData = async () => {
    try {
      await AsyncStorage.setItem('@RestaurantViewStore:restaurant', JSON.stringify(this.state.restaurant));
    } catch (error) {
      // TODO: Log error saving data
    }
  };

  _storeOrderData = async () => {
    try {
      await AsyncStorage.setItem('@RestaurantViewStore:order', JSON.stringify(this.state.order));
    } catch (error) {
      // TODO: Log error saving data
    }
  };

  async componentWillMount() {
    try {
      await this.setState({
        restaurant : this.props.navigation.dangerouslyGetParent().getParam('restaurant'),
      });

      this._storeRestaurantData();

      const dishes = await getApiRestaurantMenu(this.state.restaurant.restaurantId);

      this.setState({
        data   : dishes || [],
        status : 'loaded',
      });
    } catch (err) {
      console.error(err);
      this.setState({
        data   : [],
        status : 'failed',
      });
    }
  }

  render() {
    const { snackVisible } = this.state;

    return (
      <View>
        <Snackbar
          visible={snackVisible}
          message='The dish has been added to your order'
          onRequestClose={() => this.setState({ snackVisible: false })}
        />
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
      </View>
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
                    name='add-shopping-cart'
                    onPress={() => {
                      this.addOrderItem(dish);
                    }}
                  />
                </Col>
                <Col>
                  <Icon name='comment' />
                </Col>
                <Col>
                  <Icon name='thumb-up' />
                </Col>
                <Col>
                  <Icon name='share' />
                </Col>
              </Row>
            </Grid>
          </Tile>
        </Row>
      </View>
    );
  };
}

// TODO: Create global styling service

const styles = StyleSheet.create({
  container  : {
    flex            : 1,
    padding         : 5,
    backgroundColor : '#fff',
  },
  row        : {
    flex : 1,
  },
  column     : {
    flex         : 1,
    marginBottom : 8,
  },
  small      : { fontSize: 14 },
  smallRight : { fontSize: 14, textAlign: 'right' },
  micro      : { fontSize: 10 },
});
