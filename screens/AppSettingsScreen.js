import React from 'react';
import { ScrollView, TouchableNativeFeedback, Image, Text, View, BackHandler } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';
import StorageManager from '../services/storage_manager';
import { commonStyles, dishStatusStepperStyles } from '../styles';
import Colors from '../constants/Colors';
import { withNavigation } from 'react-navigation';
import { Snackbar } from 'react-native-material-ui';

export default class AppSettingsScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      snackRemoveUser: false,
      snackUserLoggedOut: false
    };

    this.storageManager = new StorageManager();
  }

  exit_function = () => {
    BackHandler.exitApp();
  };

  async componentWillMount() {
    let user = await this.storageManager._retrieveUserData();
    await this.setState({
      user: user
    });
  }

  render() {
    return (
      <View style={[ commonStyles.container, commonStyles.centered, commonStyles.justifyCenter ]}>
        <Grid>
          <Row style={[ commonStyles.container, commonStyles.centered, commonStyles.justifyCenter ]}>
            <Button
              title={'delete user data'.toUpperCase()}
              onPress={() => {
                {
                  this.state.user && this.state.user.userId
                    ? //user logged in
                      (this.storageManager._removeUserData({ userId: this.state.user.userId }),
                      this.setState({ snackRemoveUser: true }))
                    : //user logged out
                      this.setState({ snackUserLoggedOut: true });
                }
              }}
              icon={{
                name: 'trash',
                type: 'font-awesome',
                size: 20,
                color: Colors.white
              }}
              rounded
              backgroundColor={Colors.tintColor}
            />
          </Row>
          <Row style={[ commonStyles.container, commonStyles.centered, commonStyles.justifyCenter ]}>
            <Button title="Exit Button" onPress={this.exit_function} />
          </Row>
        </Grid>

        {/* <Snackbar
          visible={this.state.snackRemoveUser}
          message="your data has been removed"
          onRequestClose={() => this.setState({ snackVisible: false })}
        />
        <Snackbar
          visible={this.state.snackUserLoggedOut}
          message="you need to log in first"
          onRequestClose={() => this.setState({ snackVisible: false })}
        /> */}
      </View>
    );
  }
}
