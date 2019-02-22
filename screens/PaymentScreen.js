import React from 'react';
import { Text, View } from 'react-native';
import { commonStyles } from '../styles';

export default class PaymentScreen extends React.Component {
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
		return (
			<View style={commonStyles.container}>
				{this.state.order.map(this.renderItem)}
			</View>
		);
	}

	renderItem = (dish, i) => {
		return (
			<Text key={'dish_' + i}>
				{i + 1}. {dish.dishName ? dish.dishName : 'Unknown'}
			</Text>
		);
	};
}
