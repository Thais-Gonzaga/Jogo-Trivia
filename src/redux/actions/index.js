// import getTokenApi from '../../services/getTriviaApi';

export default function submitAction(typeAction, value) {
  return {
    type: typeAction,
    payload: value,
  };
}
