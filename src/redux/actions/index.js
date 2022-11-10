import { getTriviaApi } from '../../services/getTriviaApi';

export default function submitAction(typeAction, value) {
  return {
    type: typeAction,
    payload: value,
  };
}

export const fetchData = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const response = await getTriviaApi(token);
  dispatch(submitAction('QUESTION', response));
};
