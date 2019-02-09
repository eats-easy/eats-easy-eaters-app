import React from 'react';
import { TouchableNativeFeedback, TextInput, StyleSheet, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { withNavigation } from 'react-navigation';
import SearchFilters from '../components/SearchFilters';
import SearchRestaurantResultGrid from './subscreens/SearchRestaurantResultGrid';

class SearchRestaurantScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			filterExpanded: false
		};
	}

	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: 'Find a restaurant near you',
			headerLeft: (
				<Icon onPress={() => navigation.navigate('DrawerOpen')} name="menu" size={30} style={{ marginLeft: 10 }} />
			)
		};
	};

	render() {
		return (
			<View>
				<View style={{ height: this.state.filterExpanded ? 350 : 55 }}>
					<Grid style={[ styles.searchBar, { flex: 1 } ]}>
						<Row style={{ height: 50 }}>
							<Col
								style={{
									justifyContent: 'center',
									alignItems: 'stretch'
								}}
							>
								<TextInput
									style={[
										styles.input,
										{
											fontSize: 16,
											flex: 1
										}
									]}
									underlineColorAndroid="transparent"
									placeholder="Start typying a name or type..."
									placeholderTextColor="#ddd"
									autoCapitalize="none"
									onChangeText={this.handleEmail}
								/>
							</Col>
							<Col style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
								<Icon name="search" size={25} />
							</Col>
							<Col style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
								<TouchableNativeFeedback
									onPress={() =>
										this.setState({
											filterExpanded: !this.state.filterExpanded
										})}
								>
									<Icon name="filter-list" size={25} />
								</TouchableNativeFeedback>
							</Col>
						</Row>
						<Row style={{ alignContent: 'stretch' }}>
							<Col style={{ paddingLeft: 10 }}>{this.state.filterExpanded ? <SearchFilters /> : []}</Col>
						</Row>
					</Grid>
				</View>
				<ScrollView>
					<SearchRestaurantResultGrid />
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		backgroundColor: '#fff'
	},
	input: {
		margin: 15,
		height: 25,
		borderWidth: 0
	},
	searchBar: {
		flex: 1,
		paddingLeft: 0,
		paddingRight: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.18,
		shadowRadius: 4.0,
		marginBottom: 7,
		elevation: 2,
		backgroundColor: '#fff'
	}
});

export default withNavigation(SearchRestaurantScreen);
