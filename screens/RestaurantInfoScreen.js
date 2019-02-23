import React from 'react';
import { Image, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LoadingCircle from '../components/LoadingCircle';
import StorageManager from '../services/storage_manager';

import { commonStyles } from '../styles';
import Colors from '../constants/Colors';

export default class RestaurantInfoScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			status: 'loading',
			restaurant: null
		};
		this.storageManager = new StorageManager();
	}

	async componentWillMount() {
		let restaurant = await this.storageManager._retrieveRestaurantData();
		await this.setState({
			status: 'loaded',
			restaurant: restaurant
		});
	}

	render() {
		return this.state.restaurant && this.state.restaurant.restaurantId ? (
			<View style={commonStyles.container}>
				<Grid>
					<Row size={1} style={[ commonStyles.shadowMedium, { margin: 10 } ]}>
						<Image
							style={[ commonStyles.flexed ]}
							source={{
								uri:
									this.state.restaurant.image_url ||
									'http://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg'
							}}
						/>
					</Row>
					<Row style={{ margin: 10, flex: 1, flexDirection: 'column' }}>
						<Text style={[ commonStyles.textHuge, commonStyles.textBold ]}>
							{this.state.restaurant.name}
						</Text>
						<Text style={[ commonStyles.textBig ]}>
							{this.state.restaurant.address}
						</Text>
					</Row>
				</Grid>
			</View>
		) : (
			<LoadingCircle />
		);
	}
}
