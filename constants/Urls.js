export default {
  apiRootUrl: 'https://eats-easy-spring.herokuapp.com/api/',
  // apiRootUrl: 'http://192.168.2.140:8080/api/',
  apiVersionUrl: 'whoami',
  apiAllRestaurants: 'restaurants',
  apiFilteredRestaurants: 'restaurants/filtered',
  apiOrders: 'orders',
  apiOrderItem: 'orderitems',
  apiUsers: 'users',
  apiSignIn: 'users/signin',
  apiSignUp: 'users/signup',
  apiServiceCall: 'callwaiter',
  apiPayments: 'payments',
  apiRestaurantMenu: (id) => {
    return 'restaurants/' + id + '/menu';
  },
  apiFreeTables: (id) => {
    return 'restaurants/' + id + '/freeTables';
  },
  apiOrdersByUserIdAndRestId: (userId, restId) => {
    return 'orders/' + userId + '/' + restId;
  },
  wsRootUrl: 'https://eats-easy-spring.herokuapp.com/stomp'
  // wsRootUrl: 'http://192.168.2.140:8080/stomp',

  // wsNewOrder: 'orders/new',
  // wsNewServiceCall: 'callwaiter/new',
  // wsOrdersStatusUpdate: 'orders/statusUpdate'
};
