export default {
  apiRootUrl: 'https://eats-easy-spring.herokuapp.com/api/',
  apiVersionUrl: 'whoami',
  apiAllRestaurants: 'restaurants',
  apiOrders: 'orders',
  apiUsers: 'users',
  apiRestaurantMenu: (id) => {
    return 'restaurants/' + id + '/menu';
  }
};
