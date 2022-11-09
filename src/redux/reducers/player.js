const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '0',
  gravatarEmail: '',
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

  default:
    return state;
  }
};

export default player;
