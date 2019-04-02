import React from 'react';
import { ScrollView, TouchableNativeFeedback, Image, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';
import DishStatusStepper from '../components/DishStatusStepper';
import SignInDialog from '../components/SignInDialog';
import SignUpDialog from '../components/SignUpDialog';
import TablePickerDialog from '../components/TablePickerDialog';
import StorageManager from '../services/storage_manager';
import { commonStyles, dishStatusStepperStyles } from '../styles';
import Colors from '../constants/Colors';
import { postApiOrder } from '../network/postApiOrder';
import { getApiFreeTables } from '../network/getApiFreeTables';
import { postApiOrderItem } from '../network/postApiOrderItem';

export default class OrderScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'loading',
      restaurant: null,
      user: null,
      orders: [],
      orderStatus: 0,
      signInVisible: false,
      signUpVisible: false,
      tablePickerVisible: false
    };
    this.storageManager = new StorageManager();
  }

  async createOrder() {}

  async componentWillMount() {
    let restaurant = await this.storageManager._retrieveRestaurantData();

    let tables = await getApiFreeTables(restaurant.restaurantId);
    await this.storageManager._storeTablesData(tables);
    tables.length > 0 && (await this.storageManager._storeTableData(tables[0]));

    await this.setState({
      status: 'loaded',
      restaurant: restaurant,
      user: await this.storageManager._retrieveUserData(),
      orders: await this.storageManager._retrieveAllOrdersOfRest(restaurant.restaurantId),
      orderStatus: await this.storageManager._retrieveOrderStatusOfRest(restaurant.restaurantId)
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
                  <Text style={{ paddingTop: 30, textAlign: 'center' }}>No items in your cart...</Text>
                )}
              </Col>
            </Row>
          </Grid>
        </ScrollView>
        <View style={{ height: 60, padding: 10 }}>
          <Grid>
            <Row>
              <Col style={[ commonStyles.justifyCenter, commonStyles.centered ]} size={1}>
                <Icon
                  raised
                  name="refresh"
                  type="font-awesome"
                  size={20}
                  color={Colors.black}
                  onPress={async () => {
                    let orders = await this.storageManager._retrieveAllOrdersOfRest(this.state.restaurant.restaurantId);
                    this.setState({
                      orders: orders
                    });
                  }}
                />
              </Col>
              <Col style={[ commonStyles.justifyCenter, commonStyles.centered ]} size={1}>
                <Icon
                  raised
                  name="trash"
                  type="font-awesome"
                  size={20}
                  color={Colors.red}
                  onPress={async () => {
                    await this.storageManager._removeAllOrdersOfRest(this.state.restaurant.restaurantId);
                    this.setState({
                      orders: []
                    });
                  }}
                />
              </Col>
              <Col style={[ commonStyles.justifyCenter, commonStyles.centered ]} size={1}>
                <Icon
                  raised
                  name="hand-o-down"
                  type="font-awesome"
                  size={20}
                  color={Colors.black}
                  onPress={() => this.setState({ tablePickerVisible: true })}
                />
              </Col>
              <Col style={[ commonStyles.justifyCenter, commonStyles.centered ]} size={2}>
                {this.state.user && this.state.user.userId ? (
                  <Button
                    title={'Order'.toUpperCase()}
                    // onPress needs to first check that this.state.table is not null, if it is, we get a snackbar
                    // telling us to chose a table before we order, if it isn't we can create the order
                    onPress={async () => {
                      var NewOrder = {
                        restId: this.state.restaurant.restaurantId,
                        orderStatus: this.state.restaurant.orderStatus,
                        tableId: await this.storageManager._retrieveTableData().tableId,
                        userId: this.state.user.userId,
                        timeReceived: new Date(),
                        timeDelivered: new Date()
                      };

                      createdOrder = await postApiOrder(NewOrder);

                      // add all individual items in the order to the server DB
                      // OrderItem consists of: orderId, dishId, restId, quantity, subtotal,
                      // maybe we don't need quantity and subtotal?

                      // this is a blueprint
                      this.state.orders.map(async (value, index) => {
                        await postApiOrderItem(
                          (orderItem = {
                            restId: this.state.restaurant.restaurantId,
                            dishId: this.state.orders.dish.dishId,
                            orderId: createdOrder.orderId,
                            quantity: 1,
                            subtotal: this.state.orders.dish.price
                          })
                        );
                      });

                      await this.storageManager._addToOrdersStatusesData({
                        restaurantId: this.state.restaurant.restaurantId,
                        orderStatus: 1
                      });

                      this.setState({ orderStatus: 1 });
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
                ) : (
                  <Button
                    title={'Sign in'.toUpperCase()}
                    onPress={() => {
                      this.setState({ signInVisible: true });
                    }}
                    icon={{
                      name: 'sign-in',
                      type: 'font-awesome',
                      size: 20,
                      color: Colors.white
                    }}
                    rounded
                    backgroundColor={Colors.tintColor}
                  />
                )}
              </Col>
            </Row>
          </Grid>
        </View>

        <TablePickerDialog
          visible={this.state.tablePickerVisible}
          cancel={() => this.setState({ tablePickerVisible: false })}
        />

        <SignInDialog
          visible={this.state.signInVisible}
          cancel={() => this.setState({ signInVisible: false })}
          signUpActionHandler={() => {
            this.setState({ signInVisible: false, signUpVisible: true });
          }}
        />
        <SignUpDialog visible={this.state.signUpVisible} cancel={() => this.setState({ signUpVisible: false })} />
      </View>
    ) : (
      <LoadingCircle />
    );
  }

  renderItem = (dish, i) => {
    return dish ? (
      <View
        key={'dish_' + i}
        style={[ commonStyles.container, commonStyles.shadowSmall, { height: 100, marginBottom: 5 } ]}
      >
        <Row style={commonStyles.row}>
          <Grid>
            <Row style={commonStyles.rowList}>
              <Col size={3} style={[ commonStyles.columnList, commonStyles.justifyCenter ]}>
                <Image style={{ width: 100, height: 80 }} source={{ uri: dish.imageUrl }} />
              </Col>
              <Col size={6} style={[ commonStyles.columnList, commonStyles.justifyCenter ]}>
                <Text style={commonStyles.textMedium}>{dish.dishName}</Text>
                <Text style={commonStyles.textSmall}>{dish.description}</Text>
                <Text style={commonStyles.textSmall}>{parseFloat(dish.price).toFixed(2)} NIS</Text>
              </Col>
              <Col size={1} style={[ commonStyles.columnList, commonStyles.justifyCenter ]}>
                <TouchableNativeFeedback
                  onPress={async () => {
                    await this.storageManager._removeDishFromOrders(dish.dishId);
                    let orders = await this.storageManager._retrieveAllOrdersOfRest(this.state.restaurant.restaurantId);
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
