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
			status: 'loading'
		};
	}

	async componentWillMount() {
		try {
		} catch (err) {
			console.error(err);
			this.setState({
				status: 'failed'
			});
		}
	}

	render() {
		return this.state.restaurant && this.state.restaurant.restaurantId ? (
			<View style={commonStyles.container}>
				<View style={dishStatusStepperStyles.dishStatusContainer}>
					<DishStatusStepper />
				</View>
			</View>
		) : (
			<LoadingCircle />
		);
	}
}
