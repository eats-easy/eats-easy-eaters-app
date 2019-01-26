import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Tile } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";

import { getApiRestaurantMenu } from "../network/getApiRestaurantMenu";

export default class MenuScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      restName: null,
      restaurantId: null,
      data: [],
      status: "loading"
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.data !== {} && this.state.status !== "loading" ? (
          /* (
          <Grid>
            <Col style={styles.column}>
              {this.state.data.map(this.renderItem)}
            </Col>
          </Grid>
        ) */
          <Text>Loaded</Text>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }

  async componentWillMount() {
    try {
      this.setState({
        restName: this.props.navigation
          .dangerouslyGetParent()
          .getParam("restName"),
        restaurantId: this.props.navigation
          .dangerouslyGetParent()
          .getParam("restaurantId")
      });
      const dishes = await getApiRestaurantMenu(this.state.restaurantId);

      console.warn(dishes);
      this.setState({
        data: dishes || [],
        status: "loaded"
      });
    } catch (err) {
      console.error(err);
      this.setState({
        data: [],
        status: "failed"
      });
    }
  }

  renderItem = (dish, i) => {
    return (
      <View key={"dish_" + i} style={{ flex: 1 }}>
        <Row style={styles.row}>
          <Tile
            imageSrc={{ uri: dish.imageUrl }}
            title={dish.dishName}
            contentContainerStyle={{ height: 100 }}
            onPress={() => null}
          >
            <Text>{dish.description}</Text>
          </Tile>
        </Row>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#fff"
  },
  row: {
    flex: 1
  },
  column: {
    flex: 1,
    marginBottom: 8
  }
});
