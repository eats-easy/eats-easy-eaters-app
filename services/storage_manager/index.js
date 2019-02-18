import { AsyncStorage } from 'react-native';

const dataManager = {
	_retrieveAllOrdersData: async () => {
		try {
			const orderArr = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:orders'));
			return orderArr;
		} catch (error) {
			console.warn('Error retrieving data');
		}
	},
	_retrieveAllOrdersOfRest: async (restaurantId) => {
		try {
			let orderArr = [];
			const allOrders = _retrieveAllOrdersData();

			allOrders.map((x) => {
				if (x.restId == restaurantId) orderArr.push(x);
			});

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
	_storeOrdersData: async (orders) => {
		try {
			await AsyncStorage.setItem('@RestaurantViewStore:orders', JSON.stringify(orders));
		} catch (error) {
			console.warn('Error storing data');
		}
	},
	_addToOrderData: async (newOrders) => {
		try {
			const orders = _retrieveAllOrderData();
			orders.push(...newOrders);

			_storeOrdersData();
		} catch (error) {
			console.warn('Error storing data');
		}
	},
	_removeDishFromOrders: async (dishId) => {
		try {
			const orderCurr = _retrieveAllOrderData();
			var found = false;

			let orders = [];

			for (let item of orderCurr) {
				if (!found && item.dishId === dishId) {
					found = true;
				} else {
					orders.push(item);
				}
			}

			_storeOrdersData(orders);

			return orders;
		} catch (error) {
			console.warn(error);
		}
	},
	_removeAllOrdersOfRest: async (restaurantId) => {
		try {
			// TODO: Remove only current restaurant's order data
		} catch (error) {
			console.warn('Error removing data');
		}
	},
	_removeAllOrders: async () => {
		try {
			await AsyncStorage.setItem('@RestaurantViewStore:orders', '');
		} catch (error) {
			console.warn('Error removing data');
		}
	}
};

export default dataManager;
