import React from 'react';
import { TouchableNativeFeedback, TextInput, Text, View, ScrollView } from 'react-native';
import { Icon, Button, CheckBox, Slider } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { withNavigation } from 'react-navigation';
import SearchRestaurantResultGrid from './subscreens/SearchRestaurantResultGrid';
import { commonStyles, searchRestaurantStyles } from '../styles';
import Colors from '../constants/Colors';

const types = [ 'Asian', 'Italian', 'Israeli', 'Pizza', 'Meat', 'Vegan' ];

class SearchRestaurantScreen extends React.Component {
  constructor() {
    super();

    let selectedTypes = [];

    for (var type of types) selectedTypes[type] = true;

    this.state = {
      filterExpanded: false,
      searching: false,
      selectedTypes: selectedTypes,
      value: 50
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Find a restaurant near you',
      headerLeft: (
        <Icon
          onPress={() =>
            this.props.navigation.navigate({
              routeName: 'AppOptions',
              action: this.props.navigation.navigate({
                routeName: 'UserProfileStack'
                /*               params: {
                //restaurant: restaurant
              } */
              })
            })}
          name="menu"
          size={30}
        />
      )
    };
  };

  handleSearch() {
    // TODO: Create an API search call with filter
  }

  render() {
    return (
      <View>
        <View style={{ height: this.state.filterExpanded ? 400 : 55 }}>
          <Grid style={[ searchRestaurantStyles.searchBar, commonStyles.shadowMedium ]}>
            <Row style={{ height: 50 }}>
              <Col style={[ commonStyles.justifyCenter, commonStyles.stretch ]}>
                <TextInput
                  style={[ commonStyles.input, commonStyles.textSmall ]}
                  underlineColorAndroid="transparent"
                  placeholder="Start typying a name or type..."
                  placeholderTextColor={Colors.lightGrey}
                  autoCapitalize="none"
                  // onChangeText={this.handleInput}
                />
              </Col>
              {!this.state.filterExpanded && (
                <Col style={commonStyles.miniIcons}>
                  <TouchableNativeFeedback onPress={() => this.handleSearch()}>
                    <Icon name="search" size={25} />
                  </TouchableNativeFeedback>
                </Col>
              )}
              <Col style={commonStyles.miniIcons}>
                <TouchableNativeFeedback
                  onPress={() =>
                    this.setState({
                      filterExpanded: !this.state.filterExpanded
                    })}
                >
                  <Icon name="filter-list" size={25} />
                </TouchableNativeFeedback>
              </Col>
            </Row>
            <Row>
              <Col>
                {this.state.filterExpanded && (
                  <View style={[ commonStyles.container, commonStyles.textCenter ]}>
                    <Grid>
                      <Row size={6}>
                        <Col style={commonStyles.justifyCenter}>
                          {types.map((type, i) => i % 2 === 0 && this.renderCheckBox(type, i))}
                        </Col>
                        <Col style={commonStyles.justifyCenter}>
                          {types.map((type, i) => i % 2 !== 0 && this.renderCheckBox(type, i))}
                        </Col>
                      </Row>
                      <Row
                        style={{
                          paddingLeft: 10,
                          paddingRight: 10
                        }}
                        size={3}
                      >
                        <Col
                          style={[
                            commonStyles.justifyCenter,
                            commonStyles.container,
                            { paddingTop: 10, paddingBottom: 0 }
                          ]}
                        >
                          <Slider
                            value={this.state.value}
                            onValueChange={(value) => this.setState({ value })}
                            minimumValue={0.1}
                            maximumValue={50}
                            thumbTintColor={Colors.tintColor}
                          />
                          <Text>Distance: {Number(this.state.value).toFixed(1)} km</Text>
                        </Col>
                      </Row>
                      <Row style={[ commonStyles.justifyCenter, commonStyles.centered ]} size={2}>
                        <Button
                          title={'Search'.toUpperCase()}
                          onPress={async () => {
                            this.handleSearch();
                            this.setState({ searching: true });
                            setTimeout(() => {
                              this.setState({
                                searching: false,
                                filterExpanded: !this.state.filterExpanded
                              });
                            }, 2000);
                          }}
                          icon={{
                            name: this.state.searching ? 'spinner' : 'search',
                            type: 'font-awesome',
                            size: 15,
                            color: 'white'
                          }}
                          rounded
                          disabled={this.state.searching}
                          backgroundColor={Colors.tintColor}
                        />
                      </Row>
                    </Grid>
                  </View>
                )}
              </Col>
            </Row>
          </Grid>
        </View>
        <ScrollView>
          <SearchRestaurantResultGrid />
        </ScrollView>
      </View>
    );
  }

  renderCheckBox(type, i) {
    return (
      <CheckBox
        key={'check_' + i}
        center
        title={type}
        checkedIcon="check-circle"
        uncheckedIcon="circle-o"
        checkedColor={Colors.tintColor}
        checked={this.state.selectedTypes[type]}
        onPress={() => {
          this.state.selectedTypes[type] = !this.state.selectedTypes[type];
          this.forceUpdate();
        }}
      />
    );
  }
}

export default withNavigation(SearchRestaurantScreen);
