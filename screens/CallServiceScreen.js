import React from 'react';
import { View } from 'react-native';
import LoadingCircle from '../components/LoadingCircle';
import DishStatusStepper from '../components/DishStatusStepper';
import { commonStyles, dishStatusStepperStyles } from '../styles';

export default class CallServiceScreen extends React.Component {
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

	async componentWillMount() {
		await this.setState({
			status: 'loaded',
			restaurant: await this.storageManager._retrieveRestaurantData()
		});
	}

	render() {
		return this.state.restaurant && this.state.restaurant.restaurantId ? (
			<View style={commonStyles.container}>
				<View style={dishStatusStepperStyles.dishStatusContainer}>
					<DishStatusStepper status={this.state.orderStatus} />
				</View>
			</View>
		) : (
			<LoadingCircle />
		);
	}
}
