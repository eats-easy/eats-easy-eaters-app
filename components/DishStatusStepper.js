import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { commonStyles, dishStatusStepperStyles } from '../styles';
import Colors from '../constants/Colors';
import StorageManager from '../services/storage_manager';
import { getApiOrderStatusByRestIdAndUserId } from '../network/getApiOrderStatusByRestIdAndUserId';

export default class DishStatusStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      statuses: [ 'Order placed', 'Preparing', 'Cooking', 'Serving', 'Completed' ],
      intervalId: null
    };
    this.storageManager = new StorageManager();
  }

  componentDidMount() {
    this.setState({
      intervalId: setInterval(async () => {
        try {
          const user = await this.storageManager._retrieveUserData();
          const restaurant = await this.storageManager._retrieveRestaurantData();

          if (user && restaurant) {
            const orderStatuses = await getApiOrderStatusByRestIdAndUserId(user.userId, restaurant.restaurantId);

            let sortedOrderStatuses =
              orderStatuses &&
              orderStatuses.length &&
              (await orderStatuses.sort((a, b) => (a.orderId > b.orderId ? -1 : b.orderId > a.orderId ? 1 : 0)));

            this.setState({
              status: sortedOrderStatuses && sortedOrderStatuses.length > 0 ? sortedOrderStatuses[0] : 0
            });
          }
        } catch (err) {
          console.error(err);
          this.setState({
            status: 0,
            status: 'failed'
          });
        }
      }, 10000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    return (
      <View style={[ commonStyles.flexed, { padding: 10 } ]}>
        <Grid>
          <Row>
            {this.state.statuses.map((title, index) => {
              return (
                <Col style={[ commonStyles.centered, commonStyles.justifyCenter ]} key={'status_' + index}>
                  <View
                    style={[
                      dishStatusStepperStyles.circle,
                      commonStyles.centered,
                      commonStyles.justifyCenter,
                      this.state.status > index
                        ? dishStatusStepperStyles.trackerDotDone
                        : this.state.status === index
                          ? dishStatusStepperStyles.trackerDotActive
                          : dishStatusStepperStyles.trackerDotInactive
                    ]}
                  >
                    {this.state.status > index ? (
                      <Icon name="done" color={Colors.trackerStepNumberDone} />
                    ) : (
                      <Text
                        style={[
                          commonStyles.textStrong,
                          this.state.status === index
                            ? dishStatusStepperStyles.trackerStepNumberActive
                            : dishStatusStepperStyles.trackerStepNumberInactive
                        ]}
                      >
                        {index + 1}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={[
                      commonStyles.textMicro,
                      this.state.status > index
                        ? dishStatusStepperStyles.trackerStepTitleDone
                        : this.state.status === index
                          ? dishStatusStepperStyles.trackerStepTitleActive
                          : dishStatusStepperStyles.trackerStepTitleInactive
                    ]}
                  >
                    {title}
                  </Text>
                </Col>
              );
            })}
          </Row>
        </Grid>
      </View>
    );
  }
}
