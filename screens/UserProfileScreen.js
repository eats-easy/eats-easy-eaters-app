import React from 'react';
import { Text, TextInput, View, BackHandler } from 'react-native';
import { Button } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import SignInDialog from '../components/SignInDialog';
import SignUpDialog from '../components/SignUpDialog';
import StorageManager from '../services/storage_manager';
import { commonStyles } from '../styles';
import Colors from '../constants/Colors';
import { getApiUser } from '../network/getApiUser';
import { putApiUser } from '../network/putApiUser';

export default class AppSettingsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      signInVisible: false,
      signUpVisible: false,
      updateError: false,
      phoneValue: null,
      passwordValue: null,
      passwordAgainValue: null,
      userName: null,
      firstName: null,
      lastName: null,
      email: null
    };
    this.storageManager = new StorageManager();
    this.updateUser = this.updateUser.bind(this);
  }

  exit_function = () => {
    BackHandler.exitApp();
  };

  async componentDidMount() {
    this.loadUser();
  }

  async loadUser() {
    let user = await this.storageManager._retrieveUserData();

    if (user && user.userId !== null) {
      let retUser = await getApiUser(user.userId);
      console.log(JSON.stringify(retUser));
      await this.setState({
        user: user,
        userId: retUser.userId,
        phoneValue: retUser.phone,
        passwordValue: null,
        passwordAgainValue: null,
        userName: retUser.userName,
        firstName: retUser.firstName,
        lastName: retUser.lastName,
        email: retUser.email
      });
    }
  }

  async updateUser(user) {
    try {
      if (
        !user.email ||
        !user.phone ||
        !user.password ||
        !user.firstName ||
        !user.lastName ||
        user.password !== user.passwordAgain
      ) {
        this.setState({ updateError: true });
        setTimeout(() => {
          this.setState({ updateError: false });
        }, 3000);
        return;
      }

      let hashed_passwd = Base64.encode(user.password);

      var userUpdate = {
        userId: this.state.user.userId,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        hashedPasswd: hashed_passwd
      };

      let res = await putApiUser(userUpdate);

      // TODO: Handle rejection
      // if (res === -99999) return;

      // this.setState({ user: { userId: res } });
      // await this.storageManager._storeUserData({ userId: res });
    } catch (err) {
      console.warn('Got an error in updateUser', err);
    }
  }

  render() {
    return (
      <View style={[ commonStyles.flexed, { padding: 50 } ]}>
        {this.state.user && this.state.user.userId !== null ? (
          <Grid>
            <Row>
              <Col style={commonStyles.justifyCenter}>
                <Text style={commonStyles.textMedium}>Phone number:</Text>
              </Col>
              <Col>
                <TextInput
                  style={[ commonStyles.input, commonStyles.textMedium, { paddingTop: 18, margin: 0 } ]}
                  underlineColorAndroid="transparent"
                  placeholder="Phone number"
                  placeholderTextColor={Colors.grey}
                  autoCapitalize="none"
                  maxLength={10}
                  keyboardType="numeric"
                  value={this.state.phoneValue}
                  onChange={(evt) => this.setState({ phoneValue: evt.nativeEvent.text })}
                />
              </Col>
            </Row>
            <Row>
              <Col style={commonStyles.justifyCenter}>
                <Text style={commonStyles.textMedium}>Password:</Text>
              </Col>
              <Col>
                <TextInput
                  style={[
                    commonStyles.input,
                    commonStyles.textMedium,
                    { paddingTop: 18, paddingBottom: 0, margin: 0 }
                  ]}
                  underlineColorAndroid="transparent"
                  placeholder="Password"
                  placeholderTextColor={Colors.grey}
                  autoCapitalize="none"
                  secureTextEntry={true}
                  value={this.state.passwordValue}
                  onChange={(evt) => this.setState({ passwordValue: evt.nativeEvent.text })}
                />
              </Col>
            </Row>
            <Row>
              <Col style={commonStyles.justifyCenter}>
                <Text style={commonStyles.textMedium}>Password again:</Text>
              </Col>
              <Col>
                <TextInput
                  style={[
                    commonStyles.input,
                    commonStyles.textMedium,
                    { paddingTop: 18, paddingBottom: 0, margin: 0 }
                  ]}
                  underlineColorAndroid="transparent"
                  placeholder="Password again"
                  placeholderTextColor={Colors.grey}
                  autoCapitalize="none"
                  secureTextEntry={true}
                  value={this.state.passwordAgainValue}
                  onChange={(evt) => this.setState({ passwordAgainValue: evt.nativeEvent.text })}
                />
              </Col>
            </Row>
            <Row>
              <Col style={commonStyles.justifyCenter}>
                <Text style={commonStyles.textMedium}>Username:</Text>
              </Col>
              <Col>
                <TextInput
                  style={[
                    commonStyles.input,
                    commonStyles.textMedium,
                    { paddingTop: 18, paddingBottom: 0, margin: 0 }
                  ]}
                  underlineColorAndroid="transparent"
                  placeholder="Username"
                  placeholderTextColor={Colors.grey}
                  autoCapitalize="none"
                  value={this.state.userName}
                  onChange={(evt) => this.setState({ userName: evt.nativeEvent.text })}
                />
              </Col>
            </Row>
            <Row>
              <Col style={commonStyles.justifyCenter}>
                <Text style={commonStyles.textMedium}>First name:</Text>
              </Col>
              <Col>
                <TextInput
                  style={[
                    commonStyles.input,
                    commonStyles.textMedium,
                    { paddingTop: 18, paddingBottom: 0, margin: 0 }
                  ]}
                  underlineColorAndroid="transparent"
                  placeholder="First name"
                  placeholderTextColor={Colors.grey}
                  autoCapitalize="none"
                  value={this.state.firstName}
                  onChange={(evt) => this.setState({ firstName: evt.nativeEvent.text })}
                />
              </Col>
            </Row>
            <Row>
              <Col style={commonStyles.justifyCenter}>
                <Text style={commonStyles.textMedium}>Last name:</Text>
              </Col>
              <Col>
                <TextInput
                  style={[
                    commonStyles.input,
                    commonStyles.textMedium,
                    { paddingTop: 18, paddingBottom: 0, margin: 0 }
                  ]}
                  underlineColorAndroid="transparent"
                  placeholder="Last name"
                  placeholderTextColor={Colors.grey}
                  autoCapitalize="none"
                  value={this.state.lastName}
                  onChange={(evt) => this.setState({ lastName: evt.nativeEvent.text })}
                />
              </Col>
            </Row>
            <Row>
              <Col style={commonStyles.justifyCenter}>
                <Text style={commonStyles.textMedium}>Email:</Text>
              </Col>
              <Col>
                <TextInput
                  style={[
                    commonStyles.input,
                    commonStyles.textMedium,
                    { paddingTop: 18, paddingBottom: 0, margin: 0 }
                  ]}
                  underlineColorAndroid="transparent"
                  placeholder="Email"
                  placeholderTextColor={Colors.grey}
                  autoCapitalize="none"
                  value={this.state.email}
                  onChange={(evt) => this.setState({ email: evt.nativeEvent.text })}
                />
              </Col>
            </Row>
            <Row>
              <Col style={[ commonStyles.centered ]}>
                <Text
                  style={
                    this.state.updateError ? (
                      [ commonStyles.textSmall, { color: Colors.red, paddingTop: 10 } ]
                    ) : (
                      { display: 'none' }
                    )
                  }
                >
                  Invalid information
                </Text>
              </Col>
            </Row>
            <Row>
              <Col style={commonStyles.justifyCenter}>
                <Button
                  title={'Sign out'}
                  onPress={() => {
                    this.storageManager._removeUserData(), this.setState({ user: null });
                  }}
                  icon={{
                    name: 'sign-out',
                    type: 'font-awesome',
                    color: Colors.tintColor
                  }}
                  rounded
                  backgroundColor={Colors.white}
                  color={Colors.tintColor}
                />
              </Col>
              <Col style={commonStyles.justifyCenter}>
                <Button
                  title={'Save'.toUpperCase()}
                  onPress={() =>
                    this.updateUser({
                      userId: this.state.user.userId,
                      password: this.state.passwordValue,
                      passwordAgain: this.state.passwordAgainValue,
                      userName: this.state.userName,
                      firstName: this.state.firstName,
                      lastName: this.state.lastName,
                      email: this.state.email,
                      phone: this.state.phoneValue
                    })}
                  icon={{
                    name: 'save',
                    type: 'font-awesome',
                    color: Colors.white
                  }}
                  rounded
                  backgroundColor={Colors.tintColor}
                />
              </Col>
            </Row>
          </Grid>
        ) : (
          <View style={[ commonStyles.centered, commonStyles.justifyCenter ]}>
            <Button
              title={'Sign in'.toUpperCase()}
              onPress={() => {
                this.setState({ signInVisible: true });
              }}
              icon={{
                name: 'sign-in',
                type: 'font-awesome',
                size: 18,
                color: Colors.white
              }}
              rounded
              backgroundColor={Colors.tintColor}
            />
          </View>
        )}
        <SignInDialog
          visible={this.state.signInVisible}
          cancel={async () => {
            let user = await this.storageManager._retrieveUserData();
            this.setState({ signInVisible: false, user });
          }}
          signUpActionHandler={() => {
            this.setState({ signInVisible: false, signUpVisible: true });
          }}
        />
        <SignUpDialog visible={this.state.signUpVisible} cancel={() => this.setState({ signUpVisible: false })} />
      </View>
    );
  }
}
