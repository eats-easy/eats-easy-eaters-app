import React from 'react';
import { ScrollView, Text, View, TextInput } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';
import PaymentDialog from '../components/PaymentDialog';
import SignInDialog from '../components/SignInDialog';
import SignUpDialog from '../components/SignUpDialog';
import DishStatusStepper from '../components/DishStatusStepper';
import StorageManager from '../services/storage_manager';

import { commonStyles, dishStatusStepperStyles } from '../styles';
import Colors from '../constants/Colors';

export default class PaymentScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'loading',
      restaurant: null,
      user: null,
      orders: [],
      orderStatus: 0,
      paymentDialogVisible: false,
      signInVisible: false,
      signUpVisible: false
    };
    this.storageManager = new StorageManager();
  }

  async createPayment() {
    let user = await this.storageManager._retrieveUserData();
    let order = await this.storageManager._retrieveAllOrdersOfRest(this.state.restaurant.restaurantId);

    if (!order || order.length === 0) return;

    let newPayment = {
      orderId: order[0].orderId,
      userId: user.userId,
      restId: this.state.restaurant.restaurantId,
      amount: amount,
      dateAccepted: new Date()
    };

    console.log('newPayment', newPayment);
  }

  async componentWillMount() {
    let restaurant = await this.storageManager._retrieveRestaurantData();
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
        <View style={dishStatusStepperStyles.dishStatusContainer}>
          <DishStatusStepper status={this.state.orderStatus} />
        </View>
        <ScrollView style={commonStyles.flexed}>
          <Grid>
            <Row style={commonStyles.row}>
              <Col style={[ commonStyles.column ]}>
                {this.state.orders.length > 0 ? (
                  this.state.orders.map(this.renderItem)
                ) : (
                  <Text style={[ commonStyles.textCenter, { paddingTop: 30 } ]}>No items in your cart...</Text>
                )}
              </Col>
            </Row>
          </Grid>
        </ScrollView>
        <View style={{ height: 60, padding: 10 }}>
          <Grid>
            <Row style={commonStyles.row}>
              <Col size={4}>
                <Text
                  style={[
                    commonStyles.textCenter,
                    commonStyles.textMedium,
                    commonStyles.textBold,
                    { paddingTop: 10, paddingRight: 10 }
                  ]}
                >
                  Total:{' '}
                  {this.state.orders.length > 0 ? (
                    this.state.orders
                      .reduce((total, item) => {
                        return total + parseFloat(item.price);
                      }, 0)
                      .toFixed(2)
                  ) : (
                    0
                  )}{' '}
                  NIS
                </Text>
              </Col>
              <Col size={1} style={[ commonStyles.justifyCenter, commonStyles.centered ]}>
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
              <Col size={4} style={[ commonStyles.justifyCenter, commonStyles.centered ]}>
                {this.state.user && this.state.user.userId ? (
                  <Button
                    title={'Pay now!'.toUpperCase()}
                    onPress={() => {
                      this.setState({ paymentDialogVisible: true });
                    }}
                    icon={{
                      name: 'credit-card',
                      type: 'font-awesome',
                      size: 15,
                      color: 'white'
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

        <Grid>
          <Row style={commonStyles.row}>
            <TextInput
              style={[ commonStyles.input, commonStyles.textBig, { paddingTop: 24, margin: 0 } ]}
              underlineColorAndroid="transparent"
              placeholder="Credit card number"
              placeholderTextColor={Colors.grey}
              autoCapitalize="none"
              maxLength={16}
              keyboardType="numeric"
              value={this.state.cardNumber}
              onChange={(evt) => this.setState({ cardNumber: evt.nativeEvent.text })}
            />
          </Row>
          <Row style={commonStyles.row}>
            <Col style={commonStyles.column}>
              <TextInput
                style={[ commonStyles.input, commonStyles.textBig, { paddingTop: 24, margin: 0 } ]}
                underlineColorAndroid="transparent"
                placeholder="MM"
                placeholderTextColor={Colors.grey}
                autoCapitalize="none"
                maxLength={2}
                keyboardType="numeric"
                value={this.state.cardExpiryMonth}
                onChange={(evt) => this.setState({ cardExpiryMonth: evt.nativeEvent.text })}
              />
            </Col>
            <Col style={commonStyles.column}>
              <Text style={[ commonStyles.textBig ]}>/</Text>
            </Col>
            <Col style={commonStyles.column}>
              <TextInput
                style={[ commonStyles.input, commonStyles.textBig, { paddingTop: 24, margin: 0 } ]}
                underlineColorAndroid="transparent"
                placeholder="YY"
                placeholderTextColor={Colors.grey}
                autoCapitalize="none"
                maxLength={2}
                keyboardType="numeric"
                value={this.state.cardExpiryYear}
                onChange={(evt) => this.setState({ cardExpiryYear: evt.nativeEvent.text })}
              />
            </Col>
            <Col style={commonStyles.column}>
              <TextInput
                style={[ commonStyles.input, commonStyles.textBig, { paddingTop: 24, margin: 0 } ]}
                underlineColorAndroid="transparent"
                placeholder="CVV"
                placeholderTextColor={Colors.grey}
                autoCapitalize="none"
                maxLength={3}
                keyboardType="numeric"
                value={this.state.cardCVV}
                onChange={(evt) => this.setState({ cardCVV: evt.nativeEvent.text })}
              />
            </Col>
          </Row>
          <Row style={commonStyles.row}>
            <TextInput
              style={[ commonStyles.input, commonStyles.textBig, { paddingTop: 24, margin: 0 } ]}
              underlineColorAndroid="transparent"
              placeholder="Card holder name"
              placeholderTextColor={Colors.grey}
              autoCapitalize="none"
              maxLength={20}
              value={this.state.cardHolderName}
              onChange={(evt) => this.setState({ cardHolderName: evt.nativeEvent.text })}
            />
          </Row>
        </Grid>

        <PaymentDialog
          visible={this.state.paymentDialogVisible}
          close={() => this.setState({ paymentDialogVisible: false })}
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
        style={[
          commonStyles.container,
          {
            height: 30,
            margin: 10,
            borderBottomColor: Colors.lightGrey,
            borderBottomWidth: 1
          }
        ]}
      >
        <Row style={commonStyles.row}>
          <Grid>
            <Row style={commonStyles.rowList}>
              <Col size={6} style={[ commonStyles.columnList, commonStyles.justifyCenter ]}>
                <Text style={commonStyles.textSmall}>{dish.dishName}</Text>
              </Col>
              <Col size={1} style={[ commonStyles.columnList, commonStyles.justifyCenter ]}>
                <Text style={[ commonStyles.textSmall, commonStyles.textRight ]}>
                  {parseFloat(dish.price).toFixed(2)}
                </Text>
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
