import urls from '../constants/Urls';
const url = urls.apiRootUrl + urls.apiServiceCall;

export const postApiServiceCall = async (data) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    const { callId } = await res.json();
    return callId;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
