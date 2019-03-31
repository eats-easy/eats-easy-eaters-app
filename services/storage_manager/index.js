import { AsyncStorage } from 'react-native';

export default class StorageManager {
  // -------------------------------------------------------------------------
  // Restaurant
  // -------------------------------------------------------------------------

  _retrieveRestaurantData = async () => {
    try {
      const restaurant = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:restaurant'));
      // console.warn('_retrieveRestaurantData', restaurant);
      return restaurant;
    } catch (error) {
      console.warn('_retrieveRestaurantData: Error retrieving data', error);
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

  // -------------------------------------------------------------------------
  // Orders
  // -------------------------------------------------------------------------

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
      return retOrders;
    } catch (error) {
      console.warn('_retrieveAllOrdersOfRest: Error retrieving data', error);
    }
  };

  _storeOrdersData = async (orders) => {
    try {
      await AsyncStorage.setItem('@RestaurantViewStore:orders', JSON.stringify(orders));
    } catch (error) {
      console.warn('_storeOrdersData: Error storing data', error);
    }
  };

  _addToOrdersData = async (newOrder) => {
    try {
      const orders = (await this._retrieveAllOrdersData()) || [];
      orders.push(newOrder);
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
      const orders = (await this._retrieveAllOrdersData()) || [];
      let newOrders = [];

      for (let item of orders) {
        if (item.restId !== restaurantId) {
          newOrders.push(item);
        }
      }

      await this._storeOrdersData(newOrders);
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

  // -------------------------------------------------------------------------
  // Orders statuses
  // -------------------------------------------------------------------------

  _retrieveAllOrderStatuses = async () => {
    try {
      const retOrderStatuses = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:ordersStatuses'));
      return retOrderStatuses;
    } catch (error) {
      console.warn('_retrieveOrderStatuses: Error retrieving data', error);
    }
  };

  _retrieveOrderStatusOfRest = async (restaurantId) => {
    try {
      const ordersStatuses = (await this._retrieveAllOrderStatuses()) || [];
      let retOrderStatus = 0;

      for (let item of ordersStatuses) {
        if (item.restaurantId === restaurantId) {
          retOrderStatus = item.orderStatus;
          break;
        }
      }
      return retOrderStatus;
    } catch (error) {
      console.warn('_retrieveOrderStatusOfRest: Error retrieving data', error);
    }
  };

  _storeOrdersStatusesData = async (orders) => {
    try {
      await AsyncStorage.setItem('@RestaurantViewStore:ordersStatuses', JSON.stringify(orders));
    } catch (error) {
      console.warn('_storeOrdersStatusesData: Error storing data', error);
    }
  };

  _addToOrdersStatusesData = async (newOrder) => {
    try {
      const ordersStatuses = (await this._retrieveAllOrderStatuses()) || [];
      let found = false;

      for (let i = 0; i < ordersStatuses.length; i++) {
        if (ordersStatuses[i].restaurantId === newOrder.restaurantId) {
          found = true;
          ordersStatuses[i].orderStatus = newOrder.orderStatus;
          break;
        }
      }

      if (!found) ordersStatuses.push(newOrder);

      await this._storeOrdersStatusesData(ordersStatuses);
    } catch (error) {
      console.warn('_addToOrdersStatusesData: Error storing data', error);
    }
  };

  _removeOrderStatusOfRest = async (restaurantId) => {
    try {
      const ordersStatuses = (await this._retrieveAllOrderStatuses()) || [];
      let newOrdersStatuses = [];

      for (let item of ordersStatuses) {
        if (item.restId !== restaurantId) {
          newOrdersStatuses.push(item);
        }
      }

      await this._storeOrdersStatusesData(newOrdersStatuses);
    } catch (error) {
      console.warn('_removeOrderStatusOfRest: Error removing data', error);
    }
  };

  _removeAllOrdersStatuses = async () => {
    try {
      await this._storeOrdersStatusesData([]);
    } catch (error) {
      console.warn('_removeAllOrdersStatuses: Error removing data', error);
    }
  };

  // -------------------------------------------------------------------------
  // User
  // -------------------------------------------------------------------------

  _retrieveUserData = async () => {
    try {
      const retUser = await JSON.parse(await AsyncStorage.getItem('@MainStore:user'));
      return retUser;
    } catch (error) {
      console.warn('_retrieveUserData: Error retrieving data', error);
    }
  };

  _storeUserData = async (user) => {
    try {
      await AsyncStorage.setItem('@MainStore:user', JSON.stringify(user));
    } catch (error) {
      console.warn('_storeUserData: Error storing data', error);
    }
  };

  _removeUserData = async () => {
    try {
      await this._storeUserData(null);
    } catch (error) {
      console.warn('_removeUserData: Error removing data', error);
    }
  };

  // -------------------------------------------------------------------------
  // table
  // -------------------------------------------------------------------------

  _retrieveTableData = async () => {
    try {
      const table = await JSON.parse(await AsyncStorage.getItem('@RestaurantViewStore:table'));
      console.log(table);
      return table;
    } catch (error) {
      console.warn('__retrieveTableData: Error retrieving data', error);
    }
  };

  _storeTableData = async (table) => {
    try {
      await AsyncStorage.setItem('@RestaurantViewStore:table', JSON.stringify(table));
    } catch (error) {
      console.warn('_storeTableData: Error storing data', error);
    }
  };
}
