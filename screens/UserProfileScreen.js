import React from 'react';
import { ScrollView, TouchableNativeFeedback, Image, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';
import DishStatusStepper from '../components/DishStatusStepper';
import SignInDialog from '../components/SignInDialog';
import SignUpDialog from '../components/SignUpDialog';
import StorageManager from '../services/storage_manager';
import { commonStyles, dishStatusStepperStyles } from '../styles';
import Colors from '../constants/Colors';

import { getApiUser } from '../network/getApiUser';

export default class UserProfileScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      signInVisible: false,
      signUpVisible: false
    };

    this.storageManager = new StorageManager();
  }
  async componentDidMount() {
    let user = await this.storageManager._retrieveUserData();

    if (user && user.userId !== null) {
      let retUser = await getApiUser(user.userId);
      console.log(retUser);
      await this.setState({
        user: retUser
      });
    }
  }

  render() {
    return (
      <View style={[ commonStyles.container, commonStyles.centered, commonStyles.justifyCenter ]}>
        {this.state.user && this.state.user.userId !== null ? (
          //logged in
          <Grid>
            <Row style={[ commonStyles.container, commonStyles.centered, commonStyles.justifyCenter ]}>
              <Text style={[ commonStyles.textBig, commonStyles.textCenter, commonStyles.textStrong ]}>
                {'Hello, ' + this.state.user.firstName + ' ' + this.state.user.lastName}
              </Text>
            </Row>
            <Row style={[ commonStyles.container, commonStyles.centered, commonStyles.justifyCenter ]}>
              <Button
                title={'Sign out'.toUpperCase()}
                onPress={() => {
                  this.storageManager._removeUserData({ userId: this.state.user.userId }),
                    this.setState({ user: null });
                }}
                icon={{
                  name: 'sign-out',
                  type: 'font-awesome',
                  size: 20,
                  color: Colors.white
                }}
                rounded
                backgroundColor={Colors.tintColor}
              />
            </Row>
          </Grid>
        ) : (
          //logged out
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
        <SignInDialog
          visible={this.state.signInVisible}
          cancel={() => this.setState({ signInVisible: false })}
          signUpActionHandler={() => {
            this.setState({ signInVisible: false, signUpVisible: true });
          }}
        />
        <SignUpDialog visible={this.state.signUpVisible} cancel={() => this.setState({ signUpVisible: false })} />
      </View>
    );
  }
}
