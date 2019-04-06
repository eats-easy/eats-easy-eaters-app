import React from 'react';
import { View, Image, Text } from 'react-native';
import { Animated, Easing } from 'react-native';
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

export default class SuccessDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      progress: new Animated.Value(0)
    };
    this.storageManager = new StorageManager();
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

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear
    }).start();
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
        dialogTitle={<DialogTitle title="Success" />}
        footer={
          <DialogFooter>
            <DialogButton text="CANCEL" onPress={() => this.props.cancel()} />
            <DialogButton text="OK" onPress={() => this.props.cancel()} />
          </DialogFooter>
        }
        width={400}
      >
        <DialogContent>
          <View style={[ commonStyles.justifyCenter, commonStyles.centered ]}>
            <Image source={require('../static/animations/success_400x300.gif')} />
          </View>
        </DialogContent>
      </Dialog>
    );
  }
}
