import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { Tile, Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';
import { Snackbar } from 'react-native-material-ui';
import StorageManager from '../services/storage_manager';
import { commonStyles } from '../styles';

import { getApiRestaurantMenu } from '../network/getApiRestaurantMenu';
import Colors from '../constants/Colors';

export default class MenuScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			restaurant: null,
			data: [],
			status: 'loading',
			snackVisible: false
		};
		this.storageManager = new StorageManager();
	}

	async componentWillMount() {
		try {
			await this.setState({
				restaurant: this.props.navigation
					.dangerouslyGetParent()
					.getParam('restaurant')
			});
			await this.storageManager._storeRestaurantData(this.state.restaurant);
			const dishes = await getApiRestaurantMenu(
				this.state.restaurant.restaurantId
			);

			this.setState({
				data: dishes || [],
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

	addDishToOrders(dish) {
		this.setState({ snackVisible: true });
		this.storageManager._addToOrdersData(dish);
		setTimeout(() => {
			this.setState({ snackVisible: false });
		}, 500);
	}

	render() {
		const { snackVisible } = this.state;

		return (
			<View>
				<Snackbar
					visible={snackVisible}
					message="The dish has been added to your order"
					onRequestClose={() => this.setState({ snackVisible: false })}
				/>
				<ScrollView>
					<View style={[ commonStyles.container, { padding: 0 } ]}>
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
				</ScrollView>
			</View>
		);
	}

	renderItem = (dish, i) => {
		return (
			<View key={'dish_' + i} style={commonStyles.flexed}>
				<Row style={[ commonStyles.row, { paddingBottom: 8 } ]}>
					<View style={[ commonStyles.shadowMedium, { height: 460 } ]}>
						<Tile
							style={commonStyles.flexed}
							imageSrc={{ uri: dish.imageUrl }}
							title={dish.dishName}
							onPress={() => {
								this.addDishToOrders(dish);
							}}
						>
							<Grid>
								<Row style={{ padding: 0, marginTop: 0 }}>
									<Col>
										<Text style={commonStyles.textSmall}>
											{dish.description}
										</Text>
									</Col>
									<Col>
										<Text style={commonStyles.textRight}>{dish.price} NIS</Text>
									</Col>
								</Row>
								<Row style={{ paddingTop: 50 }}>
									<Col>
										<Icon name="add-shopping-cart" size={25} />
									</Col>
									<Col>
										<Icon name="comment" disabled color={Colors.lightGrey} />
									</Col>
									<Col>
										<Icon name="thumb-up" disabled color="#ccc" />
									</Col>
									<Col>
										<Icon name="share" disabled color="#ccc" />
									</Col>
								</Row>
							</Grid>
						</Tile>
					</View>
				</Row>
			</View>
		);
	};
}

// TODO: Create global styling service

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 0,
		backgroundColor: '#fff'
	},
	row: {
		flex: 1,
		margin: 0,
		paddingBottom: 8
	},
	tile: {
		shadowColor: '#000',
		shadowOffset: {
			width: 100,
			height: 5
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		backgroundColor: '#fff'
	},
	column: {
		flex: 1
	},
	small: { fontSize: 14 },
	smallRight: { fontSize: 14, textAlign: 'right' },
	micro: { fontSize: 10 }
});
