import urls from '../constants/Urls';
const url = urls.apiRootUrl + urls.apiOrders;

export const postApiPayment = async (data) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    const resJson = await res.json();
    console.log(resJson);
    return resJson;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
