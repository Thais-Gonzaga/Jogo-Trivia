const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '0',
  gravatarEmail: '',
  questions: [],
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
    // console.log(payload);
    return {
      ...state,
      questions: payload.results,
      code: payload.response_code,
    };

  default:
    return state;
  }
};

export default player;
