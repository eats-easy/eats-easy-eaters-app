import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import SearchRestaurantResultGrid from './subscreens/SearchRestaurantResultGrid';
import { withNavigation } from 'react-navigation';

class SearchRestaurantScreen extends React.Component {
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
				<View style={{ height: 60 }}>
					<View style={styles.searchBar}>
						{/* <Input
							placeholder="INPUT WITH CUSTOM ICON"
							leftIcon={<Icon name="search" size={30} style={{ marginRight: 10 }} />}
            /> */}
					</View>
				</View>
				<ScrollView>
					<SearchRestaurantResultGrid onPress={this._showMoreApp} />
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
	searchBar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
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
