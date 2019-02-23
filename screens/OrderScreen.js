import React from 'react';
import {
  ScrollView,
  TouchableNativeFeedback,
  Image,
  Text,
  View
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';
import DishStatusStepper from '../components/DishStatusStepper';
import StorageManager from '../services/storage_manager';

import { commonStyles, dishStatusStepperStyles } from '../styles';
import Colors from '../constants/Colors';

export default class OrderScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'loading',
      restaurant: null,
      orders: [],
      orderStatus: 0
    };
    this.storageManager = new StorageManager();
  }

  async createOrder() {}

  async componentWillMount() {
    let restaurant = await this.storageManager._retrieveRestaurantData();
    await this.setState({
      status: 'loaded',
      restaurant: restaurant,
      orders: await this.storageManager._retrieveAllOrdersOfRest(
        restaurant.restaurantId
      ),
      orderStatus: await this.storageManager._retrieveOrderStatusOfRest(
        restaurant.restaurantId
      )
    });
  }

  render() {
    return this.state.restaurant && this.state.restaurant.restaurantId ? (
      <View style={commonStyles.container}>
        <View style={[ dishStatusStepperStyles.dishStatusContainer ]}>
          <DishStatusStepper status={this.state.orderStatus} />
        </View>
        <ScrollView style={commonStyles.flexed}>
          <Grid>
            <Row style={commonStyles.row}>
              <Col style={[ commonStyles.column ]}>
                {this.state.orders.length > 0 ? (
                  this.state.orders.map(this.renderItem)
                ) : (
                  <Text style={{ paddingTop: 30, textAlign: 'center' }}>
                    No items in your cart...
                  </Text>
                )}
              </Col>
            </Row>
          </Grid>
        </ScrollView>
        <View style={{ height: 60, padding: 10 }}>
          <Grid>
            <Row>
              <Col
                style={[ commonStyles.justifyCenter, commonStyles.centered ]}
              >
                <Icon
                  raised
                  name="refresh"
                  type="font-awesome"
                  size={20}
                  color={Colors.black}
                  onPress={async () => {
                    let orders = await this.storageManager._retrieveAllOrdersOfRest(
                      this.state.restaurant.restaurantId
                    );
                    this.setState({
                      orders: orders
                    });
                  }}
                />
              </Col>
              <Col
                style={[ commonStyles.justifyCenter, commonStyles.centered ]}
              >
                <Icon
                  raised
                  name="trash"
                  type="font-awesome"
                  size={20}
                  color={Colors.red}
                  onPress={async () => {
                    await this.storageManager._removeAllOrdersOfRest(
                      this.state.restaurant.restaurantId
                    );
                    this.setState({
                      orders: []
                    });
                  }}
                />
              </Col>
              <Col
                style={[ commonStyles.justifyCenter, commonStyles.centered ]}
              >
                <Button
                  title={'Order'.toUpperCase()}
                  onPress={async () => {
                    // TODO: Send order
                    await this.storageManager._addToOrdersStatusesData({
                      restaurantId: this.state.restaurant.restaurantId,
                      orderStatus: (this.state.orderStatus + 1) % 6
                    });
                    let newOrderStatus = await this.storageManager._retrieveOrderStatusOfRest(
                      this.state.restaurant.restaurantId
                    );
                    this.setState({ orderStatus: newOrderStatus });
                  }}
                  icon={{
                    name: 'send',
                    type: 'font-awesome',
                    size: 15,
                    color: Colors.white
                  }}
                  rounded
                  disabled={this.state.orders.length == 0}
                  backgroundColor={Colors.tintColor}
                />
              </Col>
            </Row>
          </Grid>
        </View>
      </View>
    ) : (
      <LoadingCircle />
    );
  }

  renderItem = (dish, i) => {
    return dish ? (
      <View
        key={'dish_' + i}
        style={[
          commonStyles.container,
          commonStyles.shadowSmall,
          { height: 100, marginBottom: 5 }
        ]}
      >
        <Row style={commonStyles.row}>
          <Grid>
            <Row style={commonStyles.rowList}>
              <Col
                size={3}
                style={[ commonStyles.columnList, commonStyles.justifyCenter ]}
              >
                <Image
                  style={{ width: 100, height: 80 }}
                  source={{ uri: dish.imageUrl }}
                />
              </Col>
              <Col
                size={6}
                style={[ commonStyles.columnList, commonStyles.justifyCenter ]}
              >
                <Text style={commonStyles.textMedium}>{dish.dishName}</Text>
                <Text style={commonStyles.textSmall}>{dish.description}</Text>
                <Text style={commonStyles.textSmall}>
                  {parseFloat(dish.price).toFixed(2)} NIS
                </Text>
              </Col>
              <Col
                size={1}
                style={[ commonStyles.columnList, commonStyles.justifyCenter ]}
              >
                <TouchableNativeFeedback
                  onPress={async () => {
                    await this.storageManager._removeDishFromOrders(
                      dish.dishId
                    );
                    let orders = await this.storageManager._retrieveAllOrdersOfRest(
                      this.state.restaurant.restaurantId
                    );
                    this.setState({ orders: orders });
                  }}
                  style={[
                    { width: 40, height: 40, padding: 0, margin: 0 },
                    commonStyles.centered,
                    commonStyles.justifyCenter
                  ]}
                >
                  <Icon name="clear" size={30} />
                </TouchableNativeFeedback>
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
