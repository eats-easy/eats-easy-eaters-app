import React from 'react';
import { Button, AsyncStorage, ScrollView, TouchableNativeFeedback, Image, Text, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';
import DishStatusStepper from '../components/DishStatusStepper';

// import { getApiRestaurantMenu } from '../network/getApiRestaurantMenu';

export default class OrderScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			restaurant: null,
			order: [],
			data: [],
			status: 'loading'
		};
	}

	async removeOrderItem(dishId) {
		var found = false;

		let order = await this.state.order.map((x) => {
			if (!found && x && x.dishId && x.dishId === dishId) {
				found = true;
			} else {
				return x;
			}
		});

		this.setState({
			order: order
		});

		await this._storeOrderData();
	}

	async createOrder() {}

	_storeOrderData = async () => {
		// TODO: Create service that makes all the store/retrieve actions
		try {
			await AsyncStorage.setItem('@RestaurantViewStore:order', JSON.stringify(this.state.order));
		} catch (error) {
			// TODO: Log error saving data
		}
	};

	_retrieveData = async () => {
		try {
			const restaurant = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:restaurant'));
			const order = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:order'));

			this.setState({
				restaurant: restaurant,
				order: order.map((x) => {
					if (x.restId == restaurant.restaurantId) return x;
				})
			});
		} catch (error) {
			// TODO: Log error retrieving data
		}
	};

	async componentWillMount() {
		try {
			this._retrieveData();
		} catch (err) {
			console.error(err);
			this.setState({
				status: 'failed'
			});
		}
	}

	render() {
		return this.state.restaurant && this.state.restaurant.name ? (
			<View style={styles.container}>
				<View style={styles.dishStatus}>
					<DishStatusStepper />
				</View>
				<Grid>
					<Row style={styles.row}>
						<Col style={styles.column}>
							<ScrollView>{this.state.order.map(this.renderItem)}</ScrollView>
						</Col>
					</Row>
				</Grid>
				<View style={{ height: 60, padding: 10 }}>
					<Grid>
						<Row style={styles.row}>
							<Col>
								<TouchableNativeFeedback style={styles.buttonClear} onPress={this._retrieveData}>
									<Text style={styles.text}>{'Reload'.toUpperCase()}</Text>
								</TouchableNativeFeedback>
							</Col>
							<Col>
								<TouchableNativeFeedback
									style={styles.buttonClear}
									onPress={() => {
										this.setState({ order: [] });
										this._storeOrderData();
									}}
								>
									<Text style={styles.text}>{'Remove all'.toUpperCase()}</Text>
								</TouchableNativeFeedback>
							</Col>
							<Col>
								<Button
									onPress={() => {
										this._storeOrderData();
										this.createOrder();
										// this.props.navigation.navigate({
										//   routeName : 'PaymentStack',
										// });
									}}
									icon={<Icon name="arrow-right" size={15} color="white" />}
									title="Order"
									disabled={this.state.order.length == 0}
								/>
							</Col>
						</Row>
					</Grid>
				</View>
			</View>
		) : (
			<LoadingCircle />
		);
	}

	renderItem = (dish, i) => {
		return dish ? (
			<View key={'dish_' + i} style={{ flex: 1 }}>
				<Row style={styles.row}>
					<Grid>
						<Row style={styles.rowList}>
							<Col size={3} style={styles.columnList}>
								<Image style={{ width: 100, height: 80 }} source={{ uri: dish.imageUrl }} />
							</Col>
							<Col size={6} style={styles.columnList}>
								<Text style={styles.mediumStrong}>{dish.dishName}</Text>
								<Text style={styles.small}>{dish.description}</Text>
								<Text style={styles.small}>{dish.price} NIS</Text>
							</Col>
							<Col size={1} style={styles.columnList}>
								<Icon
									name="remove-shopping-cart"
									onPress={() => {
										this.removeOrderItem(dish.dishId);
									}}
								/>
							</Col>
						</Row>
					</Grid>
				</Row>
			</View>
		) : (
			<View key={'no_dish_' + i} />
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		backgroundColor: '#fff'
	},
	row: {
		flex: 1,
		margin: 0,
		paddingBottom: 8
	},
	column: {
		flex: 1
	},
	rowList: {
		flex: 1,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.0,

		elevation: 1,
		backgroundColor: '#fff'
	},
	columnList: {
		flex: 1,
		justifyContent: 'center',
		padding: 4,
		backgroundColor: '#fff'
	},
	mediumStrong: {
		fontSize: 18,
		fontWeight: '800'
	},
	small: { fontSize: 14 },
	smallRight: { fontSize: 14, textAlign: 'right' },
	micro: { fontSize: 10 },
	buttonClear: {
		elevation: 0,
		backgroundColor: '#ccc',
		borderRadius: 0,
		color: '#000'
	},
	text: {
		textAlign: 'center',
		padding: 8,
		color: '#000',
		fontWeight: '400'
	},
	trackerCol: {
		backgroundColor: '#ccc',
		color: '#888',
		margin: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	trackerColReady: {
		backgroundColor: '#71F570',
		color: '#888',
		margin: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	dishStatus: {
		height: 62,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.18,
		shadowRadius: 4.0,

		elevation: 2,
		backgroundColor: '#fff'
	}
});
