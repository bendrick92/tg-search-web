export const createApiFetch = (url) => {
  return fetch(`https://${process.env.REACT_APP_TGS_API_HOST}/api/v1${url}`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};