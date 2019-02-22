import React from 'react';
import { Button, Text, View } from 'react-native';
import { commonStyles } from '../styles';

import { getApiVersion } from '../network/getApiVersion';

export default class RestaurantInfoScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			apiVersion: {
				majorApiVersion: 0,
				minorApiVersion: 0,
				buildApiVersion: 0
			}
		};
		this.handleChange = this.handleChange.bind(this);
	}

	async handleChange() {
		try {
			const apiVer = await getApiVersion();
			this.setState({
				apiVersion: {
					majorApiVersion: apiVer.majorApiVersion,
					minorApiVersion: apiVer.minorApiVersion,
					buildApiVersion: apiVer.buildApiVersion
				}
			});
		} catch (err) {
			console.error(err);
			this.setState({
				apiVersion: {
					majorApiVersion: 'X',
					minorApiVersion: 'X',
					buildApiVersion: 'X'
				}
			});
		}
	}

	static navigationOptions = { title: '<Restaurant> information' };

	render() {
		return (
			<View style={commonStyles.container}>
				<Text>Info screen</Text>
				<Text>
					API version: V
					{this.state.apiVersion.majorApiVersion +
						'.' +
						this.state.apiVersion.minorApiVersion +
						'.' +
						this.state.apiVersion.buildApiVersion}
				</Text>
				<Text> </Text>
				<Button onPress={this.handleChange} title="Get API version" />
			</View>
		);
	}

	async componentWillMount() {
		try {
			const apiVer = await getApiVersion();
			this.setState({
				apiVersion: {
					majorApiVersion: apiVer.majorApiVersion,
					minorApiVersion: apiVer.minorApiVersion,
					buildApiVersion: apiVer.buildApiVersion
				}
			});
		} catch (err) {
			console.error(err);
			this.setState({
				apiVersion: {
					majorApiVersion: 'X',
					minorApiVersion: 'X',
					buildApiVersion: 'X'
				}
			});
		}
	}
}
