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

  renderItem = (rest, i) => {
    return (
      <Row key={"rest_" + i + "_row"} style={styles.row}>
        <TouchableNativeFeedback
          key={"rest_" + i}
          onPress={() =>
            this.props.navigation.navigate("Restaurant", {
              restName: "<Rest name>"
            })
          }
        >
          <Image
            source={{ uri: rest.uri }}
            key={rest.uri}
            style={styles.image}
          />
        </TouchableNativeFeedback>
      </Row>
    );
  };

  render() {
    return (
      <Grid>
        <Col style={styles.column}>{this.state.data.map(this.renderItem)}</Col>
      </Grid>
    );
  }
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
