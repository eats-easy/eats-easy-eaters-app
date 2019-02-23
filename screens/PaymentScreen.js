import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';
import DishStatusStepper from '../components/DishStatusStepper';
import StorageManager from '../services/storage_manager';

import { commonStyles, dishStatusStepperStyles } from '../styles';
import Colors from '../constants/Colors';

export default class PaymentScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			status: 'loading',
			restaurant: null,
			orders: [],
			orderStatus: 0
		};
		this.storageManager = new StorageManager();
	}

	async createPayment() {}

	async componentWillMount() {
		let restaurant = await this.storageManager._retrieveRestaurantData();
		await this.setState({
			status: 'loaded',
			restaurant: restaurant,
			orders: await this.storageManager._retrieveAllOrdersOfRest(
				restaurant.restaurantId
			),
			orderStatus: await this.storageManager._retrieveOrderStatusOfRest(
				restaurant.restaurantId
			)
		});
	}

	render() {
		return this.state.restaurant && this.state.restaurant.restaurantId ? (
			<View style={commonStyles.container}>
				<View style={dishStatusStepperStyles.dishStatusContainer}>
					<DishStatusStepper status={this.state.orderStatus} />
				</View>
				<ScrollView style={commonStyles.flexed}>
					<Grid>
						<Row style={commonStyles.row}>
							<Col style={[ commonStyles.column ]}>
								{this.state.orders.length > 0 ? (
									this.state.orders.map(this.renderItem)
								) : (
									<Text style={[ commonStyles.textCenter, { paddingTop: 30 } ]}>
										No items in your cart...
									</Text>
								)}
							</Col>
						</Row>
					</Grid>
				</ScrollView>
				<View style={{ height: 60, padding: 10 }}>
					<Grid>
						<Row style={commonStyles.row}>
							<Col size={4}>
								<Text
									style={[
										commonStyles.textCenter,
										commonStyles.textMedium,
										commonStyles.textBold,
										{ paddingTop: 10, paddingRight: 10 }
									]}
								>
									Total:{' '}
									{this.state.orders.length > 0 ? (
										this.state.orders
											.reduce((total, item) => {
												return total + parseFloat(item.price);
											}, 0)
											.toFixed(2)
									) : (
										0
									)}{' '}
									NIS
								</Text>
							</Col>
							<Col
								size={1}
								style={[ commonStyles.justifyCenter, commonStyles.centered ]}
							>
								<Icon
									raised
									name="refresh"
									type="font-awesome"
									size={20}
									color={Colors.black}
									onPress={async () => {
										let orders = await this.storageManager._retrieveAllOrdersOfRest(
											this.state.restaurant.restaurantId
										);
										this.setState({
											orders: orders
										});
									}}
								/>
							</Col>
							<Col
								size={4}
								style={[ commonStyles.justifyCenter, commonStyles.centered ]}
							>
								<Button
									title={'Pay now!'.toUpperCase()}
									onPress={async () => {
										// TODO: Send order
										await this.storageManager._addToOrdersStatusesData({
											restaurantId: this.state.restaurant.restaurantId,
											orderStatus: (this.state.orderStatus + 1) % 6
										});
										let newOrderStatus = await this.storageManager._retrieveOrderStatusOfRest(
											this.state.restaurant.restaurantId
										);
										this.setState({ orderStatus: newOrderStatus });
									}}
									icon={{
										name: 'credit-card',
										type: 'font-awesome',
										size: 15,
										color: 'white'
									}}
									rounded
									disabled={this.state.orders.length == 0}
									backgroundColor={Colors.tintColor}
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
			<View
				key={'dish_' + i}
				style={[
					commonStyles.container,
					{
						height: 30,
						margin: 10,
						borderBottomColor: Colors.lightGrey,
						borderBottomWidth: 1
					}
				]}
			>
				<Row style={commonStyles.row}>
					<Grid>
						<Row style={commonStyles.rowList}>
							<Col
								size={6}
								style={[ commonStyles.columnList, commonStyles.justifyCenter ]}
							>
								<Text style={commonStyles.textSmall}>{dish.dishName}</Text>
							</Col>
							<Col
								size={1}
								style={[ commonStyles.columnList, commonStyles.justifyCenter ]}
							>
								<Text
									style={[ commonStyles.textSmall, commonStyles.textRight ]}
								>
									{parseFloat(dish.price).toFixed(2)}
								</Text>
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
