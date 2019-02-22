import React from 'react';
import {
	TouchableNativeFeedback,
	TextInput,
	View,
	ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { withNavigation } from 'react-navigation';
import SearchFilters from '../components/SearchFilters';
import SearchRestaurantResultGrid from './subscreens/SearchRestaurantResultGrid';
import { commonStyles, searchRestaurantStyles } from '../styles';
import Colors from '../constants/Colors';

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
				<Icon
					onPress={() => navigation.navigate('DrawerOpen')}
					name="menu"
					size={30}
				/>
			)
		};
	};

	handleInput() {
		// TODO: Create an API search call with filter
	}

	render() {
		return (
			<View>
				<View style={{ height: this.state.filterExpanded ? 350 : 55 }}>
					<Grid
						style={[
							searchRestaurantStyles.searchBar,
							commonStyles.shadowMedium
						]}
					>
						<Row style={{ height: 50 }}>
							<Col style={[ commonStyles.justifyCenter, commonStyles.stretch ]}>
								<TextInput
									style={[ commonStyles.input, commonStyles.textSmall ]}
									underlineColorAndroid="transparent"
									placeholder="Start typying a name or type..."
									placeholderTextColor={Colors.lightGrey}
									autoCapitalize="none"
									onChangeText={this.handleInput}
								/>
							</Col>
							<Col style={commonStyles.miniIcons}>
								<Icon name="search" size={25} />
							</Col>
							<Col style={commonStyles.miniIcons}>
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
						<Row style={commonStyles.stretch}>
							<Col style={{ paddingLeft: 10, paddingRight: 10 }}>
								{this.state.filterExpanded ? <SearchFilters /> : []}
							</Col>
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

export default withNavigation(SearchRestaurantScreen);
