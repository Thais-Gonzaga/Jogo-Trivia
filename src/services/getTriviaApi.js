const getToken = 'https://opentdb.com/api_token.php?command=request';

const getTriviaApi = async (token) => {
  const API = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(API);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

const getTokenApi = async () => {
  const response = await fetch(getToken);
  const json = await response.json();

  const token = json.response_code === 0 && json.token;
  localStorage.setItem('token', token);
  return getTriviaApi(token);
};

export default getTokenApi;
