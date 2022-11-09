import md5 from 'crypto-js/md5';

const getGravatarApi = (email) => {
  const getEmail = md5(email).toString();
  const API = `https://www.gravatar.com/avatar/${getEmail}`;
  return API;
};

export default getGravatarApi;
