import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
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

    if (!table) {
      table = { tableId: -99999 };
    }

    this.setState({ restaurant, tables, table });
  }

  async pickTableHandler(table) {
    try {
      this.storageManager._storeTableData(table);
    } catch (err) {
      console.warn('Got an error in pickTableHandler', err);
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
            <DialogButton text="CANCEL" onPress={() => this.props.close()} />
            <DialogButton text="OK" onPress={() => this.props.close()} />
          </DialogFooter>
        }
        width={400}
        height={587}
      >
        <DialogContent>
          <View height={450}>
            <ScrollView>
              {this.state.tables.map((value, index) => {
                return (
                  <View key={'picker_' + index} style={commonStyles.marginSmall}>
                    <Button
                      // title={'[ID: ' + value.tableId + '] ' + value.tableCodeName.toUpperCase()}
                      title={value.tableCodeName.toUpperCase()}
                      onPress={async () => {
                        this.pickTableHandler(value);
                        this.setState({ table: value });
                        setTimeout(() => this.props.close(), 500);
                      }}
                      rounded
                      backgroundColor={this.state.table.tableId === value.tableId ? Colors.tintColor : Colors.lightGrey}
                      color={this.state.table.tableId === value.tableId ? Colors.white : Colors.tintColor}
                    />
                  </View>
                );
              })}
              <Text
                style={
                  this.state.error ? (
                    [ commonStyles.textSmall, { color: Colors.red, paddingTop: 24 } ]
                  ) : (
                    { display: 'none' }
                  )
                }
              >
                Something went wrong, please try again...
              </Text>
            </ScrollView>
          </View>
        </DialogContent>
      </Dialog>
    );
  }
}
