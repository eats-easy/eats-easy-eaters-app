import React from 'react';
import { Text, View, TouchableNativeFeedback } from 'react-native';
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

export default class TablePickerDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      error: false,
      restaurant: null,
      tables: [],
      table: null
    };
    this.storageManager = new StorageManager();
    this.pickTableHandler = this.pickTableHandler.bind(this);
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
  }

  async componentDidMount() {
    let restaurant = await this.storageManager._retrieveRestaurantData();
    let tables = await this.storageManager._retrieveTablesDataOfRest(restaurant.restaurantId);
    let table = await this.storageManager._retrieveTableData();

    // console.log(tables, table);

    this.setState({ restaurant, tables, table });
  }

  async pickTableHandler(table) {
    try {
      this.storageManager._storeTableData(table);
    } catch (err) {
      console.warn('Got an error in pickInHandler', err);
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
        dialogTitle={<DialogTitle title="Pick a table" />}
        footer={
          <DialogFooter>
            <DialogButton text="CANCEL" onPress={() => this.props.cancel()} />
            <DialogButton text="OK" onPress={() => this.props.cancel()} />
          </DialogFooter>
        }
        width={400}
      >
        <DialogContent>
          {this.state.tables.map((value, index) => {
            return (
              <View key={'picker_' + index}>
                <TouchableNativeFeedback
                  key={index}
                  onPress={() => this.setPickerValue(value.tableId)}
                  style={{ paddingTop: 4, paddingBottom: 4 }}
                >
                  <Text>{value.tableCodeName}</Text>
                </TouchableNativeFeedback>
              </View>
            );
          })}
          <Text
            style={
              this.state.error ? [ commonStyles.textSmall, { color: Colors.red, paddingTop: 24 } ] : { display: 'none' }
            }
          >
            Something went wrong, please try again...
          </Text>
        </DialogContent>
      </Dialog>
    );
  }
}
