import urls from '../constants/Urls';
const url = urls.apiRootUrl + urls.apiFilteredRestaurants;

export const getApiFilteredRestaurants = async (query) => {
  try {
    console.log(url + '/' + query);
    const res = await fetch(url + '/' + query);
    if (res.status !== 200) return [];
    const resJson = await res.json();
    return resJson;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
