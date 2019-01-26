import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default class OrderScreen extends React.Component {
	static navigationOptions = { title: 'Order details' };

	render() {
		return (
			<View style={styles.container}>
				<Text>Order screen</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		backgroundColor: '#fff'
	}
});
