import urls from '../constants/Urls';
const url = urls.apiRootUrl + urls.apiVersionUrl;

export const getApiVersion = async () => {
  try {
    const res = await fetch(url);
    const resJson = await res.json();
    return resJson;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
