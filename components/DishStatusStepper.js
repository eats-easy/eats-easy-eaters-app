import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { commonStyles, dishStatusStepperStyles } from '../styles';
import Colors from '../constants/Colors';

export default class DishStatusStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.status,
      statuses: [
        'Order placed',
        'Preparing',
        'Cooking',
        'Serving',
        'Completed'
      ]
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ status: newProps.status });
  }

  render() {
    return (
      <View style={[ commonStyles.flexed, { padding: 10 } ]}>
        <Grid>
          <Row>
            {this.state.statuses.map((title, index) => {
              return (
                <Col
                  style={[ commonStyles.centered, commonStyles.justifyCenter ]}
                  key={'status_' + index}
                >
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
