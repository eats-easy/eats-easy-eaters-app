import urls from '../constants/Urls';
const url = urls.apiRootUrl;

export const getApiFreeTables = async (id) => {
  try {
    const res = await fetch(url + urls.apiFreeTables(id));
    const resJson = await res.json();
    console.log(resJson);
    return resJson;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
