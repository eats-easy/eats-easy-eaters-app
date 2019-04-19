import React from 'react';
import { ScrollView, TouchableNativeFeedback, Image, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';
import DishStatusStepper from '../components/DishStatusStepper';
import SignInDialog from '../components/SignInDialog';
import SignUpDialog from '../components/SignUpDialog';
import TablePickerDialog from '../components/TablePickerDialog';
import SuccessDialog from '../components/SuccessDialog';
import FailureDialog from '../components/FailureDialog';
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
      tableId: null,
      orders: [],
      orderStatus: 0,
      signInVisible: false,
      signUpVisible: false,
      tablePickerVisible: false,
      successVisible: true,
      failureVisible: false
    };
    this.storageManager = new StorageManager();
  }

  async componentWillMount() {
    let restaurant = await this.storageManager._retrieveRestaurantData();
    let order = await this.storageManager._retrieveOrderStatusOfRest(restaurant.restaurantId);
    let tables = await getApiFreeTables(restaurant.restaurantId);
    await this.storageManager._storeTablesData(tables);
    let table = await this.storageManager._retrieveTableData();
    let tableId = null;

    if (table && table.tableId && table.tableId !== -99999 && table.restId === restaurant.restaurantId)
      tableId = table.tableId;

    console.log('tableId', tableId);

    await this.setState({
      status: 'loaded',
      restaurant: restaurant,
      user: await this.storageManager._retrieveUserData(),
      tableId: tableId,
      orders: await this.storageManager._retrieveAllOrdersOfRest(restaurant.restaurantId),
      orderStatus: order ? (order.orderStatus ? order.orderStatus : 1) : 1
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
                    let user = await this.storageManager._retrieveUserData();
                    let orders = await this.storageManager._retrieveAllOrdersOfRest(this.state.restaurant.restaurantId);
                    let table = await this.storageManager._retrieveTableData();
                    let tableId = null;

                    // TODO: Show error
                    if (
                      table &&
                      table.tableId &&
                      table.tableId !== -99999 &&
                      table.restId === this.state.restaurant.restaurantId
                    )
                      tableId = table.tableId;

                    this.setState({
                      user: user,
                      orders: orders,
                      tableId: tableId
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
                    onPress={async () => {
                      let table = await this.storageManager._retrieveTableData();
                      let tableId = null;

                      if (
                        table &&
                        table.tableId &&
                        table.tableId !== -99999 &&
                        table.restId === this.state.restaurant.restaurantId
                      )
                        tableId = table.tableId;
                      else return;

                      let newOrder = {
                        orderStatus: 1,
                        timeReceived: new Date(),
                        timeDelivered: new Date(),
                        restId: this.state.restaurant.restaurantId,
                        tableId: tableId,
                        userId: this.state.user.userId
                      };

                      console.log('newOrder', newOrder);
                      createdOrder = await postApiOrder(newOrder);
                      console.log('createdOrder', createdOrder);

                      if (!createdOrder || !createdOrder.orderId) {
                        this.setState({ failureVisible: true });
                        return;
                      }

                      this.state.orders.map(async (value, index) => {
                        // TODO: Do something with postedOrderItem
                        let newOrderItem = {
                          restId: this.state.restaurant.restaurantId,
                          dishId: value.dishId,
                          orderId: createdOrder.orderId,
                          quantity: 1,
                          subtotal: value.price
                        };

                        console.log('newOrderItem', newOrderItem);
                        let createdOrderItem = await postApiOrderItem(newOrderItem);
                        console.log('createdOrderItem', createdOrderItem);
                      });

                      await this.storageManager._addToOrdersStatusesData(createdOrder);

                      this.setState({ orderStatus: 1, successVisible: true });
                    }}
                    icon={{
                      name: 'send',
                      type: 'font-awesome',
                      size: 15,
                      color: Colors.white
                    }}
                    rounded
                    disabled={this.state.orders.length == 0 || !this.state.tableId}
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
          close={async () => {
            let table = await this.storageManager._retrieveTableData();
            let tableId = null;

            // TODO: Show error
            if (
              table &&
              table.tableId &&
              table.tableId !== -99999 &&
              table.restId === this.state.restaurant.restaurantId
            )
              tableId = table.tableId;

            this.setState({ tablePickerVisible: false, tableId: tableId });
          }}
        />
        <SignInDialog
          visible={this.state.signInVisible}
          cancel={async () => {
            let user = await this.storageManager._retrieveUserData();
            console.log(user);
            this.setState({ signInVisible: false, user });
          }}
          signUpActionHandler={() => {
            this.setState({ signInVisible: false, signUpVisible: true });
          }}
        />
        <SignUpDialog visible={this.state.signUpVisible} cancel={() => this.setState({ signUpVisible: false })} />
        <SuccessDialog visible={this.state.successVisible} cancel={() => this.setState({ successVisible: false })} />
        <FailureDialog visible={this.state.failureVisible} cancel={() => this.setState({ failureVisible: false })} />
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
