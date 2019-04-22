import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Tile } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { withNavigation } from 'react-navigation';
import { getApiAllRestaurants } from '../../network/getApiAllRestaurants';
import { getApiFilteredRestaurants } from '../../network/getApiFilteredRestaurants';
import { commonStyles, searchRestaurantStyles } from '../../styles';

import LoadingCircle from '../../components/LoadingCircle';

class SearchRestaurantResultGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      searchExp: '',
      data: []
    };
  }

  async componentDidMount() {
    console.log('componentDidMount', this.state);
    let restaurants;
    if (this.state.searchExp === '') restaurants = await getApiAllRestaurants();
    else restaurants = await getApiFilteredRestaurants(this.state.searchExp);
    this.setState({
      data: restaurants || [],
      status: 'loaded'
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate', this.state);
    if (prevState.searchExp !== this.state.searchExp) {
      let restaurants;
      if (this.state.searchExp === '') restaurants = await getApiAllRestaurants();
      else restaurants = await getApiFilteredRestaurants(this.state.searchExp);
      this.setState({
        data: restaurants || [],
        status: 'updated'
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps', prevState);
    if (nextProps.searchExp !== prevState.searchExp) {
      return { searchExp: nextProps.searchExp };
    } else return null;
  }

  render() {
    return (
      <View style={[ commonStyles.container, commonStyles.paddingNone ]}>
        {this.state.data !== {} && this.state.status !== 'loading' ? (
          <Grid>
            <Col style={commonStyles.column}>{this.state.data.map(this.renderItem)}</Col>
          </Grid>
        ) : (
          <LoadingCircle />
        )}
      </View>
    );
  }

  renderItem = (restaurant, i) => {
    const isLast = i + 1 == this.state.data.length;
    return (
      <View key={'restaurant_' + i} style={commonStyles.flexed}>
        <Row style={commonStyles.row}>
          <View style={[ commonStyles.shadowMedium, { marginBottom: 10 }, isLast ? commonStyles.tileLast : {} ]}>
            <Tile
              imageSrc={{ uri: restaurant.image_url }}
              title={restaurant.name}
              contentContainerStyle={{ height: 100 }}
              onPress={() =>
                this.props.navigation.navigate({
                  routeName: 'Restaurant',
                  action: this.props.navigation.navigate({
                    routeName: 'MenuStack',
                    params: {
                      restaurant: restaurant
                    }
                  })
                })}
            >
              <Text>{restaurant.address}</Text>
            </Tile>
          </View>
        </Row>
      </View>
    );
  };
}

export default withNavigation(SearchRestaurantResultGrid);
