import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Tile } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import { withNavigation } from "react-navigation";
import { getApiAllRestaurants } from "../../network/getApiAllRestaurants";

class SearchRestaurantResultGrid extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      status: "loading"
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.data !== {} && this.state.status !== "loading" ? (
          <Grid>
            <Col style={styles.column}>
              {this.state.data.map(this.renderItem)}
            </Col>
          </Grid>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }

  async componentWillMount() {
    try {
      const restaurants = await getApiAllRestaurants();
      this.setState({
        data: restaurants || [],
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

  renderItem = (rest, i) => {
    return (
      <View key={"rest_" + i} style={{ flex: 1 }}>
        <Row style={styles.row}>
          <Tile
            imageSrc={{ uri: rest.image_url }}
            title={rest.name}
            contentContainerStyle={{ height: 100 }}
            onPress={() =>
              this.props.navigation.navigate({
                routeName: "Restaurant",
                action: this.props.navigation.navigate({
                  routeName: "MenuStack",
                  params: {
                    restName: rest.name,
                    restaurantId: rest.restaurantId
                  }
                })
              })
            }
          >
            <Text>{rest.address}</Text>
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

export default withNavigation(SearchRestaurantResultGrid);
