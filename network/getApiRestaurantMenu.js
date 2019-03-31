import urls from '../constants/Urls';
const url = urls.apiRootUrl;

export const getApiRestaurantMenu = async (id) => {
  try {
    const res = await fetch(url + urls.apiRestaurantMenu(id));
    const resJson = await res.json();
    return resJson;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
