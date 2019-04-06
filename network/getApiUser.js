import urls from '../constants/Urls';
const url = urls.apiRootUrl + urls.apiUsers;

export const getApiUser = async (id) => {
  try {
    const res = await fetch(url + '/' + id);
    const resJson = await res.json();
    return resJson;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
