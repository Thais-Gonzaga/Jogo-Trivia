const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  questions: [],
  // options: [],
  code: 0,
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case 'EMAIL-LOGIN':
    return {
      ...state,
      gravatarEmail: payload,
    };
  case 'NAME-LOGIN':
    return {
      ...state,
      name: payload,
    };

  case 'QUESTION':
    return {
      ...state,
      questions: payload.results,
      code: payload.response_code,
    };

  case 'SCORE':
    console.log(state.score + payload);
    return {
      ...state,
      score: state.score + payload,
      assertions: state.assertions + 1,
    };

  default:
    return state;
  }
};

export default player;
