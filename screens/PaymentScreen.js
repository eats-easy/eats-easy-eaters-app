import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

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
		return <View style={styles.container}>{this.state.order.map(this.renderItem)}</View>;
	}

	renderItem = (dish, i) => {
		return (
			<Text key={'dish_' + i}>
				{i + 1}. {dish.dishName ? dish.dishName : 'Unknown'}
			</Text>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		backgroundColor: '#fff'
	}
});
