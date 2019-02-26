export default {
  apiRootUrl: 'https://eats-easy-spring.herokuapp.com/api/',
  apiVersionUrl: 'whoami',
  apiAllRestaurants: 'restaurants',
  apiOrders: 'orders',
  apiRestaurantMenu: (id) => {
    return 'restaurants/' + id + '/menu';
  }
};
