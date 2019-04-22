import urls from '../constants/Urls';
const url = urls.apiRootUrl + urls.apiFilteredRestaurants;

export const  getApiFilteredRestaurants = async (data) => {
  try {
    const res = await fetch(url + data);
    const resJson = await res.json();
    return resJson;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};