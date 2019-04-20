import urls from '../constants/Urls';
const url = urls.apiRootUrl;

export const getApiOrderStatusByRestIdAndUserId = async (userId, restId) => {
  try {
    const res = await fetch(url + urls.apiOrdersByUserIdAndRestId(userId, restId));
    const resJson = await res.json();
    return resJson;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
