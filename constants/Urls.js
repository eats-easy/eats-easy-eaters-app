export default {
  apiRootUrl: 'https://eats-easy-spring.herokuapp.com/api/',
  // apiRootUrl: 'http://192.168.2.140:8080/api/',
  apiVersionUrl: 'whoami',
  apiAllRestaurants: 'restaurants',
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
  wsRootUrl: 'wss://eats-easy-spring.herokuapp.com/socket/websocket/',
  // wsRootUrl: 'ws://192.168.2.140:8080/socket/websocket/',
  wsNewOrder: 'orders/new',
  wsNewServiceCall: 'callwaiter/new',
  wsOrdersStatusUpdate: 'orders/statusUpdate'
};
