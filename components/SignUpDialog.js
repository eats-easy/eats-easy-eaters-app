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
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.visible !== prevState.visible) {
      return { visible: nextProps.visible };
    } else if (nextProps.signUpError !== prevState.signUpError) {
      return { signUpError: nextProps.signUpError };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.visible !== this.props.visible) {
      this.setState({ visible: this.props.visible });
    }
    if (prevProps.signUpError !== this.props.signUpError) {
      this.setState({ signUpError: this.props.signUpError });
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
            <DialogButton text="CANCEL" onPress={() => this.props.signUpHandler('cancel')} />
            <DialogButton
              text="SIGN UP"
              onPress={() =>
                this.props.signUpHandler('sign-up', {
                  phone: this.state.phoneValue,
                  password: this.state.passwordValue,
                  passwordAgain: this.passwordAgainValue,
                  username: this.state.userName,
                  lastname: this.state.lastName,
                  firstname: this.state.firstName,
                  email: this.state.email
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
            secureTextEntry={true}
            value={this.state.userName}
            onChange={(evt) => this.setState({ userName: evt.nativeEvent.text })}
          />
          <TextInput
            style={[ commonStyles.input, commonStyles.textBig, { paddingTop: 24, paddingBottom: 0, margin: 0 } ]}
            underlineColorAndroid="transparent"
            placeholder="First name"
            placeholderTextColor={Colors.grey}
            autoCapitalize="none"
            secureTextEntry={true}
            value={this.state.firstName}
            onChange={(evt) => this.setState({ firstName: evt.nativeEvent.text })}
          />
          <TextInput
            style={[ commonStyles.input, commonStyles.textBig, { paddingTop: 24, paddingBottom: 0, margin: 0 } ]}
            underlineColorAndroid="transparent"
            placeholder="Last name"
            placeholderTextColor={Colors.grey}
            autoCapitalize="none"
            secureTextEntry={true}
            value={this.state.lastName}
            onChange={(evt) => this.setState({ lastName: evt.nativeEvent.text })}
          />
          <TextInput
            style={[ commonStyles.input, commonStyles.textBig, { paddingTop: 24, paddingBottom: 0, margin: 0 } ]}
            underlineColorAndroid="transparent"
            placeholder="Email"
            placeholderTextColor={Colors.grey}
            autoCapitalize="none"
            secureTextEntry={true}
            value={this.state.email}
            onChange={(evt) => this.setState({ evt: evt.nativeEvent.text })}
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
