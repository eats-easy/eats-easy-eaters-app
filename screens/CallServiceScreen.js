import React from 'react';
import { Text, View, TouchableNativeFeedback } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Row, Col, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';
import DishStatusStepper from '../components/DishStatusStepper';
import StorageManager from '../services/storage_manager';
import SignInDialog from '../components/SignInDialog';
import SignUpDialog from '../components/SignUpDialog';
import TablePickerDialog from '../components/TablePickerDialog';

import { commonStyles, dishStatusStepperStyles } from '../styles';

import { postApiServiceCall } from '../network/postApiServiceCall';
import Colors from '../constants/Colors';

export default class CallServiceScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'loading',
      restaurant: null,
      signInVisible: false,
      signUpVisible: false,
      tablePickerVisible: false,
      selectedBill: false,
      selectedHelp: false,
      selectedQuestion: false,
      selectedOther: false
    };
    this.storageManager = new StorageManager();
  }

  async componentWillMount() {
    let restaurant = await this.storageManager._retrieveRestaurantData();
    let user = await this.storageManager._retrieveUserData();
    let table = await this.storageManager._retrieveTableData();
    let tableId = null;

    if (table && table.tableId && table.tableId !== -99999 && table.restId === restaurant.restaurantId)
      tableId = table.tableId;

    await this.setState({
      status: 'loaded',
      restaurant: restaurant,
      user: user,
      tableId: tableId
    });
  }

  async createServiceCall(value) {
    let user = await this.storageManager._retrieveUserData();
    let table = await this.storageManager._retrieveTableData();
    let tableId = null;

    if (table && table.tableId && table.tableId !== -99999 && table.restId === this.state.restaurant.restaurantId)
      tableId = table.tableId;
    else return;

    let newServiceCall = {
      tableId: tableId,
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
          <DishStatusStepper />
        </View>
        <Grid style={{ padding: 10 }}>
          <Row style={[ commonStyles.centered, commonStyles.justifyCenter, { marginBottom: 8 } ]}>
            <TouchableNativeFeedback
              disabled={!this.state.user || !this.state.tableId}
              onPress={() => this.createServiceCall('bill')}
            >
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
                    {
                      color: this.state.selectedBill
                        ? Colors.white
                        : !this.state.user || !this.state.tableId ? Colors.grey : Colors.tintColor
                    }
                  ]}
                >
                  Bill, please
                </Text>
              </View>
            </TouchableNativeFeedback>
          </Row>
          <Row style={[ commonStyles.centered, commonStyles.justifyCenter, { marginBottom: 8 } ]}>
            <TouchableNativeFeedback
              disabled={!this.state.user || !this.state.tableId}
              onPress={() => this.createServiceCall('question')}
            >
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
                    {
                      color: this.state.selectedQuestion
                        ? Colors.white
                        : !this.state.user || !this.state.tableId ? Colors.grey : Colors.tintColor
                    }
                  ]}
                >
                  I have a question
                </Text>
              </View>
            </TouchableNativeFeedback>
          </Row>
          <Row style={[ commonStyles.centered, commonStyles.justifyCenter, { marginBottom: 8 } ]}>
            <TouchableNativeFeedback
              disabled={!this.state.user || !this.state.tableId}
              onPress={() => this.createServiceCall('help')}
            >
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
                    {
                      color: this.state.selectedHelp
                        ? Colors.white
                        : !this.state.user || !this.state.tableId ? Colors.grey : Colors.tintColor
                    }
                  ]}
                >
                  I need help
                </Text>
              </View>
            </TouchableNativeFeedback>
          </Row>
          <Row style={[ commonStyles.centered, commonStyles.justifyCenter, { marginBottom: 8 } ]}>
            <TouchableNativeFeedback
              disabled={!this.state.user || !this.state.tableId}
              onPress={() => this.createServiceCall('other')}
            >
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
                    {
                      color: this.state.selectedOther
                        ? Colors.white
                        : !this.state.user || !this.state.tableId ? Colors.grey : Colors.tintColor
                    }
                  ]}
                >
                  Something else...
                </Text>
              </View>
            </TouchableNativeFeedback>
          </Row>
        </Grid>
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
                      tableId: tableId
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
              {(!this.state.user || !this.state.user.userId) && (
                <Col style={[ commonStyles.justifyCenter, commonStyles.centered ]} size={2}>
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
                </Col>
              )}
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
      </View>
    ) : (
      <LoadingCircle />
    );
  }
}
