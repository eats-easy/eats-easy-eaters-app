import React from 'react';
import { View, BackHandler } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import StorageManager from '../services/storage_manager';
import { commonStyles } from '../styles';
import Colors from '../constants/Colors';
import { Snackbar } from 'react-native-material-ui';
import { deleteApiUser } from '../network/deleteApiUser';

export default class AppSettingsScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      snackVisible: false
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
    const { snackVisible } = this.state;

    return (
      <View style={[ commonStyles.flexed ]}>
        <Grid>
          <Row style={[ commonStyles.container, commonStyles.centered, commonStyles.justifyCenter ]}>
            <Button
              title={'Delete user data'.toUpperCase()}
              onPress={() => {
                {
                  this.state.user &&
                    this.state.user.userId &&
                    (deleteApiUser(this.state.user.userId),
                    this.storageManager._removeUserData({ userId: this.state.user.userId }),
                    this.setState({ snackVisible: true }));
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
            <Button
              title="Close the app"
              onPress={this.exit_function}
              icon={{
                name: 'close',
                type: 'font-awesome',
                size: 20,
                color: Colors.tintColor
              }}
              rounded
              color={Colors.tintColor}
              backgroundColor={Colors.white}
            />
          </Row>
        </Grid>
        <Snackbar
          visible={snackVisible}
          message="Your data has been removed"
          onRequestClose={() => this.setState({ snackVisible: false })}
        />
      </View>
    );
  }
}
