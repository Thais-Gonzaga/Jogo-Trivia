const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  questions: [],
  alternatives: [],
  correct: [],
  imgGravatar: '',
  code: 0,
  currentTime: 30,
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
      alternatives: payload.results.map((e) => (
        e.incorrect_answers.includes(e.correct_answer)
          ? e.incorrect_answers : [...e.incorrect_answers, e.correct_answer])),
      correct: payload.results.map((e) => e.correct_answer),
    };
  case 'SCORE':
    return {
      ...state,
      score: state.score + payload,
      assertions: state.assertions + 1,
    };
  case 'IMG_GRAVATAR':
    return {
      ...state,
      imgGravatar: payload,
    };
  case 'RESET_SCORE':
    return {
      ...state,
      score: payload,
    };
  case 'TIMER':
    return {
      ...state,
      currentTime: state.currentTime - payload,
    };
  case 'TIMER-RESET':
    return {
      ...state,
      currentTime: payload,
    };
  default: return state;
  }
};

export default player;
