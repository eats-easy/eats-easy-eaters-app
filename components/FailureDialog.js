import React from 'react';
import { View, Image } from 'react-native';
import { commonStyles } from '../styles';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation
} from 'react-native-popup-dialog';

export default class FailureDialog extends React.Component {
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
        dialogTitle={<DialogTitle title="Failure" />}
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
            <Image source={require('../static/animations/failure_hand.gif')} style={{ width: 300, height: 354 }} />
          </View>
        </DialogContent>
      </Dialog>
    );
  }
}
