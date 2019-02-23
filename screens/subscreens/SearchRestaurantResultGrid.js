import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Tile } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { withNavigation } from 'react-navigation';
import { getApiAllRestaurants } from '../../network/getApiAllRestaurants';
import { commonStyles, searchRestaurantStyles } from '../../styles';

import LoadingCircle from '../../components/LoadingCircle';

class SearchRestaurantResultGrid extends Component {
	constructor() {
		super();
		this.state = {
			status: 'loading',
			data: []
		};
	}

	render() {
		return (
			<View style={[ commonStyles.container, commonStyles.paddingNone ]}>
				{this.state.data !== {} && this.state.status !== 'loading' ? (
					<Grid>
						<Col style={commonStyles.column}>
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
				data: restaurants || [],
				status: 'loaded'
			});
		} catch (err) {
			console.error(err);
			this.setState({
				data: [],
				status: 'failed'
			});
		}
	}

	renderItem = (restaurant, i) => {
		const isLast = i + 1 == this.state.data.length;
		return (
			<View key={'restaurant_' + i} style={commonStyles.flexed}>
				<Row style={commonStyles.row}>
					<View
						style={[
							commonStyles.shadowMedium,
							{ marginBottom: 10 },
							isLast ? commonStyles.tileLast : {}
						]}
					>
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
