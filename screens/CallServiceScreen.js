import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default class CallServiceScreen extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>Service screen</Text>
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
