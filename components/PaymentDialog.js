import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { commonStyles } from '../styles';
import Colors from '../constants/Colors';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation
} from 'react-native-popup-dialog';
import StorageManager from '../services/storage_manager';
import { postApiPayment } from '../network/postApiPayment';

export default class PaymentDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      visible: false,
      error: false,
      restaurant: null,
      tables: [],
      table: null,
      cardNumber: null,
      cardExpiryMonth: null,
      cardExpiryYear: null,
      cardCVV: null,
      cardHolderName: null
    };
    this.storageManager = new StorageManager();
    this.sendPaymentHandler = this.sendPaymentHandler.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.visible !== prevState.visible) {
      return { visible: nextProps.visible };
    } else if (nextProps.signInError !== prevState.signInError) {
      return { signInError: nextProps.signInError };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.visible !== this.props.visible) {
      this.setState({ visible: this.props.visible });
    }
  }

  async componentDidMount() {
    let user = await this.storageManager._retrieveUserData();
    let restaurant = await this.storageManager._retrieveRestaurantData();
    let tables = await this.storageManager._retrieveTablesDataOfRest(restaurant.restaurantId);
    let table = await this.storageManager._retrieveTableData();

    if (!table) {
      table = { tableId: -99999 };
    }

    this.setState({ user, restaurant, tables, table });

    // TODO: Use stored payment method's data
  }

  async sendPaymentHandler() {
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
      let order = { orderId: '-43', amount: '30.00' };

      let newPayment = {
        orderId: order.orderId,
        userId: this.state.user.userId,
        restId: this.state.restaurant.restaurantId,
        amount: order.amount,
        dateAccepted: new Date()
      };

      // TODO: Do something with this payment response data
      let { paymentId } = await postApiPayment(newPayment);
      console.log(paymentId);

      setInterval(() => this.props.close(), 500);
    } catch (err) {
      console.warn('Got an error in sendPaymentHandler', err);
    }
  }

  render() {
    return (
      <Dialog
        visible={this.state.visible}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: 'bottom'
          })
        }
        dialogTitle={<DialogTitle title="Enter payment method details" />}
        footer={
          <DialogFooter>
            <DialogButton text="CANCEL" onPress={() => this.props.close()} />
            <DialogButton text="PAY NOW!" onPress={() => this.sendPaymentHandler()} />
          </DialogFooter>
        }
        width={400}
      >
        <DialogContent>
          <View style={[ commonStyles.flexed ]}>
            <Grid style={[ commonStyles.flexed, { backgroundColor: 'red' } ]}>
              <Row style={commonStyles.row}>
                <Text>/</Text>
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
                  <Text>/</Text>
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
          </View>
        </DialogContent>
      </Dialog>
    );
  }
}
