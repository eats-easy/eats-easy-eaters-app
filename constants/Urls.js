export default {
  apiRootUrl: 'https://eats-easy-spring.herokuapp.com/api/',
  apiVersionUrl: 'whoami',
  apiAllRestaurants: 'restaurants',
  apiOrders: 'orders',
  apiUsers: 'users',
  apiSignIn: 'users/signin',
  urlSignUp: 'users/signup',
  apiRestaurantMenu: (id) => {
    return 'restaurants/' + id + '/menu';
  }
};
