const INITIAL_STATE = {
  name: '',
  assertions: '',
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
    // console.log(payload);
    return {
      ...state,
      questions: payload.results,
      // options: [[payload.results[0].correct_answer,
      //   ...payload.results[0].incorrect_answers], [payload.results[1].correct_answer]],
      //   ...payload.results[1].incorrect_answers], [payload.results[2].correct_answer,
      //   ...payload.results[2].incorrect_answers], [payload.results[3].correct_answer,
      //   ...payload.results[3].incorrect_answers], [payload.results[4].correct_answer,
      //   ...payload.results[4].incorrect_answers]],
      code: payload.response_code,
    };

  case 'SCORE':
    console.log(state.score + payload);
    return {
      ...state,
      score: state.score + payload,
    };

  default:
    return state;
  }
};

export default player;
