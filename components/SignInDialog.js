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

export default class SignInDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      signInError: false,
      phoneValue: null,
      passwordValue: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.visible !== prevState.visible) {
      return { visible: nextProps.visible };
    } else if (nextProps.signInError !== prevState.signInError) {
      return { signInError: nextProps.signInError };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.visible !== this.props.visible) {
      this.setState({ visible: this.props.visible });
    }
    if (prevProps.signInError !== this.props.signInError) {
      this.setState({ signInError: this.props.signInError });
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
        dialogTitle={<DialogTitle title="Sign in or sign up" />}
        footer={
          <DialogFooter>
            <DialogButton text="CANCEL" onPress={() => this.props.signInHandler('cancel')} />
            <DialogButton
              text="SIGN IN/UP"
              onPress={() =>
                this.props.signInHandler('sign-in', {
                  phone: this.state.phoneValue,
                  password: this.state.passwordValue
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
          <Text
            style={
              this.state.signInError ? (
                [ commonStyles.textSmall, { color: Colors.red, paddingTop: 24 } ]
              ) : (
                { display: 'none' }
              )
            }
          >
            Phone or password are incorrect
          </Text>
          <Text style={[ commonStyles.textSmall, { paddingTop: 24 } ]}>
            <Text>Don't have a user? Click</Text>{' '}
            <Text style={{ color: Colors.blue, textDecorationLine: 'underline' }}>here</Text> <Text>to create one</Text>{' '}
          </Text>
        </DialogContent>
      </Dialog>
    );
  }
}
