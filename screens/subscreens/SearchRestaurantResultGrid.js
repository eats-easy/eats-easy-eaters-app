import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { data } from "../../mock_data/mockDishImages";
import { withNavigation } from "react-navigation";

class SearchRestaurantResultGrid extends Component {
  constructor() {
    super();
    this.state = {
      columns: 2,
      padding: 5,
      data: data
    };
  }

  render() {
    return (
      <Grid>
        <Col style={styles.column}>
          {this.state.data.map(rest => (
            <Row key={rest.uri + "_row"} style={styles.row}>
              <TouchableNativeFeedback onPress={this._navigateToRestaurant}>
                <Image
                  source={{ uri: rest.uri }}
                  key={rest.uri}
                  style={styles.image}
                />
              </TouchableNativeFeedback>
            </Row>
          ))}
        </Col>
      </Grid>
    );
  }

  _navigateToRestaurant = () => {
    this.props.navigation.navigate("Restaurant");
  };
}

const styles = StyleSheet.create({
  row: {
    flex: 1
  },
  column: {
    flex: 1,
    marginBottom: 8
  },
  image: {
    flex: 1,
    height: 180,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8
  }
});

export default withNavigation(SearchRestaurantResultGrid);
