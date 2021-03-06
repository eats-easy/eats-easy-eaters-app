import urls from '../constants/Urls';
const url = urls.apiRootUrl + urls.apiUsers;

export const putApiUser = async (data) => {
  try {
    console.log(data);
    const res = await fetch(url + '/' + data.userId, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    const retJson = await res.json();
    console.log('putApiUser', retJson);
    const { userId } = retJson;
    return userId;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
