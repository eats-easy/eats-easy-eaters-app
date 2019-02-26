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
      visible: false
    };
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

  render() {
    return (
      <Dialog
        visible={this.state.visible}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: 'bottom'
          })
        }
        dialogTitle={<DialogTitle title="Dialog Title" />}
        footer={
          <DialogFooter>
            <DialogButton
              text="CANCEL"
              onPress={() => {
                this.setState({ visible: false });
              }}
            />
            <DialogButton text="OK" onPress={() => {}} />
          </DialogFooter>
        }
        width={400}
      >
        <DialogContent>
          <TextInput
            style={[ commonStyles.input, commonStyles.textSmall ]}
            underlineColorAndroid="transparent"
            placeholder="Phone number"
            placeholderTextColor={Colors.lightGrey}
            autoCapitalize="none"
            // onChangeText={this.handleInput}
          />
          <TextInput
            style={[ commonStyles.input, commonStyles.textSmall ]}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor={Colors.lightGrey}
            autoCapitalize="none"
            // onChangeText={this.handleInput}
          />
        </DialogContent>
      </Dialog>
    );
  }
}
