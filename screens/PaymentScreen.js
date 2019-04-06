import React from 'react';
import { ScrollView, Text, View, TextInput } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';
import SignInDialog from '../components/SignInDialog';
import SignUpDialog from '../components/SignUpDialog';
import SuccessDialog from '../components/SuccessDialog';
import DishStatusStepper from '../components/DishStatusStepper';
import StorageManager from '../services/storage_manager';

import { commonStyles, dishStatusStepperStyles } from '../styles';
import Colors from '../constants/Colors';

import { postApiPayment } from '../network/postApiPayment';

export default class PaymentScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'loading',
      restaurant: null,
      user: null,
      orders: [],
      orderStatus: 0,
      cardNumber: null,
      cardExpiryMonth: null,
      cardExpiryYear: null,
      cardCVV: null,
      cardType: 'credit-card',
      cardHolderName: null,
      signInVisible: false,
      signUpVisible: false,
      successVisible: false
    };
    this.storageManager = new StorageManager();
  }

  async sendPayment() {
    try {
      let paymentMethod = {
        cardNumber: this.state.cardNumber,
        cardExpiryMonth: this.state.cardExpiryMonth,
        cardExpiryYear: this.state.cardExpiryYear,
        cardCVV: this.state.cardCVV,
        cardHolderName: this.state.cardHolderName
      };
      this.storageManager._storePaymentMethodData(paymentMethod);

      // TODO: Use external service for "real" payment procedure

      // TODO: Fill real data
      let user = await this.storageManager._retrieveUserData();
      let orders = await this.storageManager._retrieveAllOrdersOfRest(this.state.restaurant.restaurantId);
      let order = await this.storageManager._retrieveOrderStatusOfRest(this.state.restaurant.restaurantId);

      if (!orders || orders.length === 0 || !order || !order.orderId) return;

      let sum = 0;
      for (item of orders) {
        sum += item.price;
      }

      let newPayment = {
        orderId: order.orderId,
        userId: user.userId,
        restId: this.state.restaurant.restaurantId,
        amount: sum,
        dateAccepted: new Date()
      };

      console.log('order', order);
      console.log('newPayment', newPayment);

      // TODO: Do something with this payment response data
      let { paymentId } = await postApiPayment(newPayment);
      console.log(paymentId);

      this.setState({ successVisible: true });
    } catch (err) {
      console.warn('Got an error in sendPayment', err);
    }
  }

  getCardType(number) {
    /*
    Icons
    'cc-visa',
    'cc-mastercard',
    'cc-discover',
    'cc-amex',
    'cc-paypal',
    'cc-stripe',

    Card types by numbers
    VISA             4-
    American Express 34-, and 37-
    MasterCard       51-, 52-, 53-, 54-, 55-
    Discover         6011-, 65-
    */

    if (!number) return 'credit-card';

    // AMEX
    re = new RegExp('^3');
    if (number.match(re) != null) return 'cc-amex';

    // Visa
    var re = new RegExp('^4');
    if (number.match(re) != null) return 'cc-visa';

    // Mastercard
    re = new RegExp('^5');
    if (number.match(re) != null) return 'cc-mastercard';

    // Discover
    re = new RegExp('^6');
    if (number.match(re) != null) return 'cc-discover';

    return 'credit-card';
  }

  async componentWillMount() {
    let restaurant = await this.storageManager._retrieveRestaurantData();
    let paymentMethod = (await this.storageManager._retrievePaymentMethodData()) || {
      cardNumber: null,
      cardExpiryMonth: null,
      cardExpiryYear: null,
      cardCVV: null,
      cardHolderName: null
    };

    let order = await this.storageManager._retrieveOrderStatusOfRest(restaurant.restaurantId);

    await this.setState({
      status: 'loaded',
      restaurant: restaurant,
      user: await this.storageManager._retrieveUserData(),
      orders: await this.storageManager._retrieveAllOrdersOfRest(restaurant.restaurantId),
      orderStatus: order ? (order.orderStatus ? order.orderStatus : 1) : 1,
      cardNumber: paymentMethod.cardNumber,
      cardExpiryMonth: paymentMethod.cardExpiryMonth,
      cardExpiryYear: paymentMethod.cardExpiryYear,
      cardCVV: paymentMethod.cardCVV,
      cardHolderName: paymentMethod.cardHolderName,
      cardType: this.getCardType(paymentMethod.cardNumber)
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
        <View
          style={[
            commonStyles.shadowMedium,
            {
              height: 220,
              padding: 20,
              marginLeft: 50,
              marginRight: 50,
              marginBottom: 10,
              marginTop: 10,
              borderRadius: 10,
              backgroundColor: '#e8d337'
            }
          ]}
        >
          <Grid>
            <Row style={commonStyles.row}>
              <Col style={[ commonStyles.column, commonStyles.justifyCenter, { padding: 2 } ]}>
                <Text style={[ commonStyles.textHuge ]}>Credit card</Text>
              </Col>
            </Row>
            <Row style={commonStyles.row}>
              <Col style={[ commonStyles.column, commonStyles.justifyCenter, { padding: 2 } ]}>
                <TextInput
                  style={[
                    commonStyles.input,
                    commonStyles.textBig,
                    { margin: 0, backgroundColor: '#ffe738', fontFamily: 'space-mono' }
                  ]}
                  underlineColorAndroid="transparent"
                  placeholder="Credit card number"
                  textAlign={'center'}
                  placeholderTextColor={Colors.grey}
                  autoCapitalize="none"
                  maxLength={16}
                  keyboardType="numeric"
                  value={this.state.cardNumber}
                  onChange={(evt) => {
                    this.setState({ cardNumber: evt.nativeEvent.text });
                    this.setState({ cardType: this.getCardType(this.state.cardNumber) });
                  }}
                />
              </Col>
            </Row>
            <Row style={[ commonStyles.row ]}>
              <Col size={3} style={[ commonStyles.justifyCenter, { padding: 2 } ]}>
                <TextInput
                  style={[
                    commonStyles.input,
                    commonStyles.textMedium,
                    { margin: 0, backgroundColor: '#ffe738', fontFamily: 'space-mono' }
                  ]}
                  underlineColorAndroid="transparent"
                  placeholder="MM"
                  textAlign={'center'}
                  placeholderTextColor={Colors.grey}
                  maxLength={2}
                  keyboardType="numeric"
                  value={this.state.cardExpiryMonth}
                  onChange={(evt) => this.setState({ cardExpiryMonth: evt.nativeEvent.text })}
                />
              </Col>
              <Col size={1} style={[ commonStyles.justifyCenter, commonStyles.centered, { padding: 2 } ]}>
                <Text style={[ commonStyles.textMedium ]}>/</Text>
              </Col>
              <Col size={3} style={[ commonStyles.justifyCenter, { padding: 2 } ]}>
                <TextInput
                  style={[
                    commonStyles.input,
                    commonStyles.textMedium,
                    { margin: 0, backgroundColor: '#ffe738', fontFamily: 'space-mono' }
                  ]}
                  underlineColorAndroid="transparent"
                  placeholder="YY"
                  textAlign={'center'}
                  placeholderTextColor={Colors.grey}
                  maxLength={2}
                  keyboardType="numeric"
                  value={this.state.cardExpiryYear}
                  onChange={(evt) => this.setState({ cardExpiryYear: evt.nativeEvent.text })}
                />
              </Col>
              <Col size={6} style={[ commonStyles.justifyCenter, { padding: 2 } ]}>
                <TextInput
                  style={[
                    commonStyles.input,
                    commonStyles.textMedium,
                    { margin: 0, backgroundColor: '#ffe738', fontFamily: 'space-mono' }
                  ]}
                  underlineColorAndroid="transparent"
                  placeholder="CVV"
                  textAlign={'center'}
                  placeholderTextColor={Colors.grey}
                  maxLength={3}
                  keyboardType="numeric"
                  value={this.state.cardCVV}
                  onChange={(evt) => this.setState({ cardCVV: evt.nativeEvent.text })}
                />
              </Col>
            </Row>
            <Row style={commonStyles.row}>
              <Col size={5} style={[ commonStyles.justifyCenter, { padding: 2 } ]}>
                <TextInput
                  style={[
                    commonStyles.input,
                    commonStyles.textMedium,
                    { margin: 0, backgroundColor: '#ffe738', fontFamily: 'space-mono' }
                  ]}
                  underlineColorAndroid="transparent"
                  placeholder="Card holder name"
                  placeholderTextColor={Colors.grey}
                  maxLength={20}
                  value={this.state.cardHolderName}
                  onChange={(evt) => this.setState({ cardHolderName: evt.nativeEvent.text })}
                />
              </Col>
              <Col size={1} style={[ commonStyles.justifyCenter, commonStyles.centered, { padding: 2 } ]}>
                <Icon name={this.state.cardType} type="font-awesome" />
              </Col>
            </Row>
          </Grid>
        </View>
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
                      this.sendPayment();
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

        <SignInDialog
          visible={this.state.signInVisible}
          cancel={() => this.setState({ signInVisible: false })}
          signUpActionHandler={() => {
            this.setState({ signInVisible: false, signUpVisible: true });
          }}
        />
        <SignUpDialog visible={this.state.signUpVisible} cancel={() => this.setState({ signUpVisible: false })} />
        <SuccessDialog visible={this.state.successVisible} cancel={() => this.setState({ successVisible: false })} />
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
