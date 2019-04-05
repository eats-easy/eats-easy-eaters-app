export default {
  apiRootUrl: 'https://eats-easy-spring.herokuapp.com/api/',
  apiVersionUrl: 'whoami',
  apiAllRestaurants: 'restaurants',
  apiOrders: 'orders',
  apiOrderItem: 'orderitems',
  apiUsers: 'users',
  apiSignIn: 'users/signin',
  apiSignUp: 'users/signup',
  apiServiceCall: 'callwaiter',
  apiPayments: 'payments',
  apiDeleteUser: (id) => {
    'users/' + id;
  },
  apiRestaurantMenu: (id) => {
    return 'restaurants/' + id + '/menu';
  },
  apiFreeTables: (id) => {
    return 'restaurants/' + id + '/freeTables';
  }
};
