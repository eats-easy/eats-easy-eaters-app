import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { commonStyles } from '../styles';
import Colors from '../constants/Colors';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation
} from 'react-native-popup-dialog';
import StorageManager from '../services/storage_manager';
import { Base64 } from 'js-base64';

import { postApiUserSignUp } from '../network/postApiUser';

export default class SignUpDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      signUpError: false,
      phoneValue: null,
      passwordValue: null,
      passwordAgainValue: null,
      userName: null,
      firstName: null,
      lastName: null,
      email: null
    };
    this.storageManager = new StorageManager();
    this.signUpHandler = this.signUpHandler.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.visible !== prevState.visible) {
      return { visible: nextProps.visible };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.visible !== this.props.visible) {
      this.setState({ visible: this.props.visible });
    }
  }

  async signUpHandler(user) {
    try {
      if (
        !user.email ||
        !user.phone ||
        user.phone.length < 9 ||
        !user.password ||
        !user.firstName ||
        !user.lastName ||
        user.password !== user.passwordAgain
      ) {
        this.setState({ signUpError: true });
        setTimeout(() => {
          this.setState({ signUpError: false });
        }, 3000);
        return;
      }

      let hashed_passwd = Base64.encode(user.password);

      var userSignUp = {
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        hashedPasswd: hashed_passwd
      };

      let res = await postApiUserSignUp(userSignUp);

      if (res === -99999) {
        this.setState({ signUpError: true });
        setTimeout(() => {
          this.setState({ signUpError: false });
        }, 3000);
        return;
      }

      this.setState({ user: { userId: res } });
      await this.storageManager._storeUserData({ userId: res });
      this.props.cancel();
    } catch (err) {
      console.warn('Got an error in signUpHandler', err);
    }
  }

  render() {
    return (
      <Dialog
        visible={this.state.visible}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: 'bottom'
          })
        }
        dialogTitle={<DialogTitle title="Sign up" />}
        footer={
          <DialogFooter>
            <DialogButton text="CANCEL" onPress={() => this.props.cancel()} />
            <DialogButton
              text="SIGN UP"
              onPress={() =>
                this.signUpHandler({
                  password: this.state.passwordValue,
                  passwordAgain: this.state.passwordAgainValue,
                  userName: this.state.userName,
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  email: this.state.email,
                  phone: this.state.phoneValue
                })}
            />
          </DialogFooter>
        }
        width={400}
      >
        <DialogContent>
          <TextInput
            style={[ commonStyles.input, commonStyles.textBig, { paddingTop: 24, margin: 0 } ]}
            underlineColorAndroid="transparent"
            placeholder="Phone number"
            placeholderTextColor={Colors.grey}
            autoCapitalize="none"
            maxLength={10}
            keyboardType="numeric"
            value={this.state.phoneValue}
            onChange={(evt) => this.setState({ phoneValue: evt.nativeEvent.text })}
          />
          <TextInput
            style={[ commonStyles.input, commonStyles.textBig, { paddingTop: 24, paddingBottom: 0, margin: 0 } ]}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor={Colors.grey}
            autoCapitalize="none"
            secureTextEntry={true}
            value={this.state.passwordValue}
            onChange={(evt) => this.setState({ passwordValue: evt.nativeEvent.text })}
          />
          <TextInput
            style={[ commonStyles.input, commonStyles.textBig, { paddingTop: 24, paddingBottom: 0, margin: 0 } ]}
            underlineColorAndroid="transparent"
            placeholder="Password again"
            placeholderTextColor={Colors.grey}
            autoCapitalize="none"
            secureTextEntry={true}
            value={this.state.passwordAgainValue}
            onChange={(evt) => this.setState({ passwordAgainValue: evt.nativeEvent.text })}
          />
          <TextInput
            style={[ commonStyles.input, commonStyles.textBig, { paddingTop: 24, paddingBottom: 0, margin: 0 } ]}
            underlineColorAndroid="transparent"
            placeholder="Username"
            placeholderTextColor={Colors.grey}
            autoCapitalize="none"
            value={this.state.userName}
            onChange={(evt) => this.setState({ userName: evt.nativeEvent.text })}
          />
          <TextInput
            style={[ commonStyles.input, commonStyles.textBig, { paddingTop: 24, paddingBottom: 0, margin: 0 } ]}
            underlineColorAndroid="transparent"
            placeholder="First name"
            placeholderTextColor={Colors.grey}
            autoCapitalize="none"
            value={this.state.firstName}
            onChange={(evt) => this.setState({ firstName: evt.nativeEvent.text })}
          />
          <TextInput
            style={[ commonStyles.input, commonStyles.textBig, { paddingTop: 24, paddingBottom: 0, margin: 0 } ]}
            underlineColorAndroid="transparent"
            placeholder="Last name"
            placeholderTextColor={Colors.grey}
            autoCapitalize="none"
            value={this.state.lastName}
            onChange={(evt) => this.setState({ lastName: evt.nativeEvent.text })}
          />
          <TextInput
            style={[ commonStyles.input, commonStyles.textBig, { paddingTop: 24, paddingBottom: 0, margin: 0 } ]}
            underlineColorAndroid="transparent"
            placeholder="Email"
            placeholderTextColor={Colors.grey}
            autoCapitalize="none"
            value={this.state.email}
            onChange={(evt) => this.setState({ email: evt.nativeEvent.text })}
          />
          <Text
            style={
              this.state.signUpError ? (
                [ commonStyles.textSmall, { color: Colors.red, paddingTop: 24 } ]
              ) : (
                { display: 'none' }
              )
            }
          >
            Invalid information
          </Text>
        </DialogContent>
      </Dialog>
    );
  }
}
