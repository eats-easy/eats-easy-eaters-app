import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Tile } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { withNavigation } from 'react-navigation';
import { getApiAllRestaurants } from '../../network/getApiAllRestaurants';

import LoadingCircle from '../../components/LoadingCircle';

class SearchRestaurantResultGrid extends Component {
  constructor() {
    super();
    this.state = {
      data   : [],
      status : 'loading',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.data !== {} && this.state.status !== 'loading' ? (
          <Grid>
            <Col style={styles.column}>
              {this.state.data.map(this.renderItem)}
            </Col>
          </Grid>
        ) : (
          <LoadingCircle />
        )}
      </View>
    );
  }

  async componentWillMount() {
    try {
      const restaurants = await getApiAllRestaurants();
      this.setState({
        data   : restaurants || [],
        status : 'loaded',
      });
    } catch (err) {
      console.error(err);
      this.setState({
        data   : [],
        status : 'failed',
      });
    }
  }

  renderItem = (restaurant, i) => {
    return (
      <View key={'restaurant_' + i} style={{ flex: 1 }}>
        <Row style={styles.row}>
          <View style={styles.tile}>
            <Tile
              imageSrc={{ uri: restaurant.image_url }}
              title={restaurant.name}
              contentContainerStyle={{ height: 100 }}
              onPress={() =>
                this.props.navigation.navigate({
                  routeName : 'Restaurant',
                  action    : this.props.navigation.navigate({
                    routeName : 'MenuStack',
                    params    : {
                      restaurant : restaurant,
                    },
                  }),
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

const styles = StyleSheet.create({
  container : {
    flex            : 1,
    padding         : 0,
    backgroundColor : '#fff',
  },
  row       : {
    flex          : 1,
    margin        : 0,
    paddingBottom : 8,
  },
  tile      : {
    shadowColor     : '#000',
    shadowOffset    : {
      width  : 100,
      height : 5,
    },
    shadowOpacity   : 0.22,
    shadowRadius    : 2.22,
    elevation       : 3,
    backgroundColor : '#fff',
  },
  column    : {
    flex : 1,
  },
});

export default withNavigation(SearchRestaurantResultGrid);
