import { AsyncStorage } from 'react-native';

const dataManager = {
	_retrieveOrderData: async (restaurantId, orderArr) => {
		try {
			const order = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:order'));

			order.map((x) => {
				if (x.restId == restaurantId) orderArr.push(x);
			});

			return orderArr;
		} catch (error) {
			console.warn('Error retrieving data');
		}
	},
	_retrieveAllOrderData: async () => {
		try {
			const orderArr = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:order'));
			return orderArr;
		} catch (error) {
			console.warn('Error retrieving data');
		}
	},
	_storeRestaurantData: async (restaurant) => {
		try {
			await AsyncStorage.setItem('@RestaurantViewStore:restaurant', JSON.stringify(restaurant));
		} catch (error) {
			console.warn('Error storing data');
		}
	},
	_addToOrderData: async (orderArr) => {
		try {
			const orderCurr = _retrieveAllOrderData();
			orderCurr.push(...orderArr);
			await AsyncStorage.setItem('@RestaurantViewStore:order', JSON.stringify(orderCurr));
		} catch (error) {
			console.warn('Error storing data');
		}
	},
	_removeAllCurrRest: async (restaurantId) => {
		try {
			// TODO: Remove only current restaurant's order data
		} catch (error) {
			console.warn('Error removing data');
		}
	},
	_removeAll: async () => {
		try {
			await AsyncStorage.setItem('@RestaurantViewStore:order', '');
		} catch (error) {
			console.warn('Error removing data');
		}
	}
};

export default dataManager;
