import urls from '../constants/Urls';
const url = urls.apiRootUrl + urls.apiUsers;
const urlSignIn = url + urls.apiSignIn;

export const postApiUser = async (data) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    const { userId } = await res.json();
    return userId;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export const postApiUserSignIn = async (data) => {
  try {
    const res = await fetch(urlSignIn, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    const { userId } = await res.json();
    return userId;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
