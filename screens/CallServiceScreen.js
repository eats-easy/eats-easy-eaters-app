import React from 'react';
import { Text, View, TouchableNativeFeedback } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';
import DishStatusStepper from '../components/DishStatusStepper';
import StorageManager from '../services/storage_manager';

import { commonStyles, dishStatusStepperStyles } from '../styles';

import { postApiServiceCall } from '../network/postApiServiceCall';

export default class CallServiceScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'loading',
      restaurant: null,
      orderStatus: 0
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
    console.log(newServiceCall);
    let serviceCallId = await postApiServiceCall(newServiceCall);
    console.log(serviceCallId);
  }

  render() {
    return this.state.restaurant && this.state.restaurant.restaurantId ? (
      <View style={[ commonStyles.container ]}>
        <View style={dishStatusStepperStyles.dishStatusContainer}>
          <DishStatusStepper status={this.state.orderStatus} />
        </View>
        <Grid style={{ padding: 10 }}>
          <Row
            style={[
              commonStyles.centered,
              commonStyles.justifyCenter,
              commonStyles.shadowMedium,
              { marginBottom: 8 }
            ]}
          >
            <TouchableNativeFeedback onPress={() => this.createServiceCall('bill')}>
              <Text style={commonStyles.textHuge}>Bill, please</Text>
            </TouchableNativeFeedback>
          </Row>
          <Row
            style={[
              commonStyles.centered,
              commonStyles.justifyCenter,
              commonStyles.shadowMedium,
              { marginBottom: 8 }
            ]}
          >
            <TouchableNativeFeedback onPress={() => this.createServiceCall('question')}>
              <Text style={commonStyles.textHuge}>I have a question</Text>
            </TouchableNativeFeedback>
          </Row>
          <Row
            style={[
              commonStyles.centered,
              commonStyles.justifyCenter,
              commonStyles.shadowMedium,
              { marginBottom: 8 }
            ]}
          >
            <TouchableNativeFeedback onPress={() => this.createServiceCall('help')}>
              <Text style={commonStyles.textHuge}>I need help</Text>
            </TouchableNativeFeedback>
          </Row>
          <Row
            style={[
              commonStyles.centered,
              commonStyles.justifyCenter,
              commonStyles.shadowMedium,
              { marginBottom: 8 }
            ]}
          >
            <TouchableNativeFeedback onPress={() => this.createServiceCall('other')}>
              <Text style={commonStyles.textHuge}>Something else...</Text>
            </TouchableNativeFeedback>
          </Row>
        </Grid>
      </View>
    ) : (
      <LoadingCircle />
    );
  }
}
