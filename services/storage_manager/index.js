import { AsyncStorage } from 'react-native';

export default class StorageManager {
	_retrieveRestaurantData = async () => {
		try {
			const restaurant = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:restaurant'));
			// console.warn('_retrieveRestaurantData', restaurant);
			return restaurant;
		} catch (error) {
			console.warn('_retrieveRestaurantData: Error retrieving data', error);
		}
	};

	_retrieveAllOrdersData = async () => {
		try {
			const orders = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:orders'));
			// console.warn('_retrieveAllOrdersData', orders);
			return orders;
		} catch (error) {
			console.warn('_retrieveAllOrdersData: Error retrieving data', error);
		}
	};

	_retrieveAllOrdersOfRest = async (restaurantId) => {
		try {
			const orders = (await this._retrieveAllOrdersData()) || [];
			let retOrders = [];

			for (let item of orders) {
				if (item.restId === restaurantId) {
					retOrders.push(item);
				}
			}

			// console.warn('_retrieveAllOrdersOfRest', retOrders);
			return retOrders;
		} catch (error) {
			console.warn('_retrieveAllOrdersOfRest: Error retrieving data', error);
		}
	};

	_storeRestaurantData = async (restaurant) => {
		try {
			// console.warn('_storeRestaurantData', restaurant);
			await AsyncStorage.setItem('@RestaurantViewStore:restaurant', JSON.stringify(restaurant));
		} catch (error) {
			console.warn('_storeRestaurantData: Error storing data', error);
		}
	};

	_storeOrdersData = async (orders) => {
		try {
			// console.warn('_storeOrdersData', orders);
			await AsyncStorage.setItem('@RestaurantViewStore:orders', JSON.stringify(orders));
		} catch (error) {
			console.warn('_storeOrdersData: Error storing data', error);
		}
	};

	_addToOrdersData = async (newOrder) => {
		try {
			const orders = (await this._retrieveAllOrdersData()) || [];
			orders.push(newOrder);
			// console.warn('_addToOrdersData', orders);
			await this._storeOrdersData(orders);
		} catch (error) {
			console.warn('_addToOrderData: Error storing data', error);
		}
	};

	_removeDishFromOrders = async (dishId) => {
		try {
			const orders = (await this._retrieveAllOrdersData()) || [];
			let newOrders = [];
			var found = false;

			for (let item of orders) {
				if (!found && item.dishId === dishId) {
					found = true;
				} else {
					newOrders.push(item);
				}
			}

			await this._storeOrdersData(newOrders);

			return newOrders;
		} catch (error) {
			console.warn('_removeDishFromOrders: Error storing data', error);
		}
	};

	_removeAllOrdersOfRest = async (restaurantId) => {
		try {
			const orders = this._retrieveAllOrdersData() || [];
			let newOrders = [];
			var found = false;

			for (let item of orders) {
				if (!found && item.restId === restaurantId) {
					found = true;
				} else {
					newOrders.push(item);
				}
			}

			await this._storeOrdersData(newOrders);

			return newOrders;
		} catch (error) {
			console.warn('_removeAllOrdersOfRest: Error removing data', error);
		}
	};

	_removeAllOrders = async () => {
		try {
			await this._storeOrdersData([]);
		} catch (error) {
			console.warn('_removeAllOrders: Error removing data', error);
		}
	};
}
