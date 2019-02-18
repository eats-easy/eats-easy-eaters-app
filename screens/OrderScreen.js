import React from 'react';
import { Button, ScrollView, TouchableNativeFeedback, Image, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';
import DishStatusStepper from '../components/DishStatusStepper';
import StorageManager from '../services/storage_manager';
import orderScreenStyles from '../styles';

export default class OrderScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			restaurant: null,
			order: [],
			data: [],
			status: 'loading',
			orderStatus: 0
		};
	}

	async removeOrderItem(dishId) {
		var found = false;

		let order = [];

		for (let item of this.state.order) {
			if (!found && item && item.dishId && item.dishId === dishId) {
				found = true;
			} else {
				order.push(item);
			}
		}

		this.setState({
			order: order
		});

		await dataManager._storeOrderData(this.state.order);
	}

	async createOrder() {
		this.setState({
			orderStatus: 1
		});
	}

	componentWillMount() {
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
		return this.state.restaurant && this.state.restaurant.restaurantId ? (
			<View style={styles.container}>
				<View style={styles.dishStatus}>
					<DishStatusStepper status={this.state.orderStatus} />
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
										this._removeAll();
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

const styles = orderScreenStyles;
