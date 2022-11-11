const getToken = 'https://opentdb.com/api_token.php?command=request';

export const getTriviaApi = async (token) => {
  const API = `https://opentdb.com/api.php?amount=5&token=${token}`;
  // da6609372a83e9db5ca490c7c725f9ed1083fd10b6964710e1292acb1e3a921c
  const response = await fetch(API);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

const getTokenApi = async () => {
  const response = await fetch(getToken);
  const json = await response.json();

  const token = json.response_code === 0 && json.token;
  localStorage.setItem('token', token);
};

export default getTokenApi;
