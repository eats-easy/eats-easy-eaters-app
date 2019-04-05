import React from 'react';
import { Text, View, TouchableNativeFeedback } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';
import DishStatusStepper from '../components/DishStatusStepper';
import StorageManager from '../services/storage_manager';

import { commonStyles, dishStatusStepperStyles } from '../styles';

import { postApiServiceCall } from '../network/postApiServiceCall';
import Colors from '../constants/Colors';

export default class CallServiceScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'loading',
      restaurant: null,
      orderStatus: 0,
      selectedBill: false,
      selectedHelp: false,
      selectedQuestion: false,
      selectedOther: false
    };
    this.storageManager = new StorageManager();
  }

  async componentWillMount() {
    let restaurant = await this.storageManager._retrieveRestaurantData();
    await this.setState({
      status: 'loaded',
      restaurant: restaurant,
      orderStatus: await this.storageManager._retrieveOrderStatusOfRest(restaurant.restaurantId)
    });
  }

  async createServiceCall(value) {
    let table = await this.storageManager._retrieveTableData();
    let user = await this.storageManager._retrieveUserData();
    let newServiceCall = {
      tableId: table.tableId,
      userId: user.userId,
      restId: this.state.restaurant.restaurantId,
      reason: value,
      callDate: new Date()
    };
    // TODO: Do something with this call Id
    let callId = await postApiServiceCall(newServiceCall);

    let selected =
      value === 'bill'
        ? { selectedBill: true }
        : value === 'help'
          ? { selectedHelp: true }
          : value === 'question' ? { selectedQuestion: true } : { selectedOther: true };

    this.setState(selected);
  }

  render() {
    return this.state.restaurant && this.state.restaurant.restaurantId ? (
      <View style={[ commonStyles.container ]}>
        <View style={dishStatusStepperStyles.dishStatusContainer}>
          <DishStatusStepper status={this.state.orderStatus} />
        </View>
        <Grid style={{ padding: 10 }}>
          <Row style={[ commonStyles.centered, commonStyles.justifyCenter, { marginBottom: 8 } ]}>
            <TouchableNativeFeedback onPress={() => this.createServiceCall('bill')}>
              <View
                style={[
                  commonStyles.flexed,
                  commonStyles.centered,
                  commonStyles.justifyCenter,
                  commonStyles.shadowMedium,
                  {
                    height: '100%',
                    borderRadius: 50,
                    backgroundColor: this.state.selectedBill ? Colors.tintColor : Colors.white
                  }
                ]}
              >
                <Text
                  style={[
                    commonStyles.textHuge,
                    { color: this.state.selectedBill ? Colors.white : Colors.tintColor }
                  ]}
                >
                  Bill, please
                </Text>
              </View>
            </TouchableNativeFeedback>
          </Row>
          <Row style={[ commonStyles.centered, commonStyles.justifyCenter, { marginBottom: 8 } ]}>
            <TouchableNativeFeedback onPress={() => this.createServiceCall('question')}>
              <View
                style={[
                  commonStyles.flexed,
                  commonStyles.centered,
                  commonStyles.justifyCenter,
                  commonStyles.shadowMedium,
                  {
                    height: '100%',
                    borderRadius: 50,
                    backgroundColor: this.state.selectedQuestion ? Colors.tintColor : Colors.white
                  }
                ]}
              >
                <Text
                  style={[
                    commonStyles.textHuge,
                    { color: this.state.selectedQuestion ? Colors.white : Colors.tintColor }
                  ]}
                >
                  I have a question
                </Text>
              </View>
            </TouchableNativeFeedback>
          </Row>
          <Row style={[ commonStyles.centered, commonStyles.justifyCenter, { marginBottom: 8 } ]}>
            <TouchableNativeFeedback onPress={() => this.createServiceCall('help')}>
              <View
                style={[
                  commonStyles.flexed,
                  commonStyles.centered,
                  commonStyles.shadowMedium,
                  commonStyles.justifyCenter,
                  {
                    height: '100%',
                    borderRadius: 50,
                    backgroundColor: this.state.selectedHelp ? Colors.tintColor : Colors.white
                  }
                ]}
              >
                <Text
                  style={[
                    commonStyles.textHuge,
                    { color: this.state.selectedHelp ? Colors.white : Colors.tintColor }
                  ]}
                >
                  I need help
                </Text>
              </View>
            </TouchableNativeFeedback>
          </Row>
          <Row style={[ commonStyles.centered, commonStyles.justifyCenter, { marginBottom: 8 } ]}>
            <TouchableNativeFeedback onPress={() => this.createServiceCall('other')}>
              <View
                style={[
                  commonStyles.flexed,
                  commonStyles.centered,
                  commonStyles.justifyCenter,
                  commonStyles.shadowMedium,
                  {
                    height: '100%',
                    borderRadius: 50,
                    backgroundColor: this.state.selectedOther ? Colors.tintColor : Colors.white
                  }
                ]}
              >
                <Text
                  style={[
                    commonStyles.textHuge,
                    { color: this.state.selectedOther ? Colors.white : Colors.tintColor }
                  ]}
                >
                  Something else...
                </Text>
              </View>
            </TouchableNativeFeedback>
          </Row>
        </Grid>
      </View>
    ) : (
      <LoadingCircle />
    );
  }
}
