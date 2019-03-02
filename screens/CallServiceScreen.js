import React from 'react';
import { Text, View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';
import DishStatusStepper from '../components/DishStatusStepper';
import StorageManager from '../services/storage_manager';

import { commonStyles, dishStatusStepperStyles } from '../styles';

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

  async createCall() {}

  async componentWillMount() {
    let restaurant = await this.storageManager._retrieveRestaurantData();
    await this.setState({
      status: 'loaded',
      restaurant: restaurant,
      orderStatus: await this.storageManager._retrieveOrderStatusOfRest(restaurant.restaurantId)
    });
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
            <Text style={commonStyles.textHuge}>Bill, please</Text>
          </Row>
          <Row
            style={[
              commonStyles.centered,
              commonStyles.justifyCenter,
              commonStyles.shadowMedium,
              { marginBottom: 8 }
            ]}
          >
            <Text style={commonStyles.textHuge}>I have a question</Text>
          </Row>
          <Row
            style={[
              commonStyles.centered,
              commonStyles.justifyCenter,
              commonStyles.shadowMedium,
              { marginBottom: 8 }
            ]}
          >
            <Text style={commonStyles.textHuge}>I need help</Text>
          </Row>
          <Row
            style={[
              commonStyles.centered,
              commonStyles.justifyCenter,
              commonStyles.shadowMedium,
              { marginBottom: 8 }
            ]}
          >
            <Text style={commonStyles.textHuge}>Something else...</Text>
          </Row>
        </Grid>
      </View>
    ) : (
      <LoadingCircle />
    );
  }
}
