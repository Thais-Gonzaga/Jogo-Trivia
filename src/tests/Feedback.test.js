import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const imgGravatarId = 'header-profile-picture';
const namePlayerId = 'header-player-name';
const scoreId = 'header-score';
const feddbackTest = 'feedback-text';

describe('Testa a página de Feedback', () => {
  test('Se o Header é renderizado', () => {
    renderWithRouterAndRedux(<Feedback />);
    const imgGravatar = screen.getByTestId(imgGravatarId);
    const namePlayer = screen.getByTestId(namePlayerId);
    const score = screen.getByTestId(scoreId);

    expect(imgGravatar).toBeInTheDocument();
    expect(namePlayer).toBeInTheDocument();
    expect(score).toBeInTheDocument();
  });

  test('Se o o feedback com menos de 3 acertos é: Could be better...', () => {
    const INITIAL_STATE = {
      player: {
        assertions: 2,
        score: 0,
      },
    };
    const { store } = renderWithRouterAndRedux(
      <Feedback />,
      INITIAL_STATE,
      '/feedback',
    );
    const textFeedback = screen.getByTestId(feddbackTest);
    expect(textFeedback.textContent).toBe('Could be better...');

    const { assertions, score } = store.getState().player;
    const assertionsFeedback = screen.getByTestId('feedback-total-question');
    const scoreFeedback = screen.getByTestId('feedback-total-score');
    expect(parseInt(assertionsFeedback.textContent, 10)).toBe(assertions);
    expect(parseInt(scoreFeedback.textContent, 10)).toBe(score);
  });
  test('Se o o feedback com 3 ou mais acertos é: Well Done!', async () => {
    const INITIAL_STATE = {
      player: {
        assertions: 3,
        score: 0,
      },
    };
    renderWithRouterAndRedux(
      <Feedback />,
      INITIAL_STATE,
      '/feedback',
    );
    const textFeedback = screen.getByTestId(feddbackTest);
    expect(textFeedback.textContent).toBe('Well Done!');
    // act(() => {
    //   global.location.reload(true);
    // })

  });
  test('Se o o feedback com 3 ou mais acertos é: Well Done!', async () => {
    const INITIAL_STATE = {
      player: {
        imgGravatar: '',
        name: 'teste',
        score: 50,
      },
    };
    const { history } = renderWithRouterAndRedux(
      <Feedback />,
      INITIAL_STATE,
      '/feedback',
    );
    
    act(() => {
      history.push('/ranking')
    })
    const name = await screen.findByText('teste');
    expect(name).toBeInTheDocument();
    // act(() => {
      // global.location.reload(true);
    // })
    expect(name).toBeInTheDocument();
  });

  test('Se os itens estão no localStorege', async () => {
    const INITIAL_STATE = {
      player: {
        imgGravatar: '',
        name: 'testeDaTata',
        score: 50,
      },
    };
    const { store } = renderWithRouterAndRedux(
      <Feedback />,
      INITIAL_STATE,
      '/feedback',
    );
      // verifica se ta sem a chave
    expect(localStorage.getItem('ranking')).toBeNull()
    // aperta o botão
    userEvent.click(screen.getByTestId("btn-ranking"))
    // pego o que ta no localStorage
    const save = JSON.parse(localStorage.getItem('ranking'));
    // verifico se o tamanho do array é 1
    expect(save).toHaveLength(1)
    // aperta o botão
    userEvent.click(screen.getByTestId("btn-ranking"))
    // pego o que ta no localStorage
    const save2 = JSON.parse(localStorage.getItem('ranking'));
    // verifico se o tamanho do array é 1
    expect(save2).toHaveLength(2)


  });


});
