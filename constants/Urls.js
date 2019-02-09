export default {
	apiRootUrl: 'https://eats-easy-spring.herokuapp.com/api/',
	apiVersionUrl: 'whoami',
	apiAllRestaurants: 'restaurants',
	apiRestaurantMenu: (id) => {
		return 'restaurants/' + id + '/menu';
	}
};