import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Game from '../pages/Game';
import { questionsResponse } from './helpers/mockQuestions';

const alternativesArray = questionsResponse.results
  .map((result) => [result.correct_answer, ...result.incorrect_answers]);

describe('Testa a página de Feedback', () => {
  test('Se o ranking é mantido após o reload', async () => {
    const INITIAL_STATE = {
      player: {
        name: 'Teste',
        assertions: 0,
        score: 0,
        gravatarEmail: 'teste@trybe.com',
        questions: questionsResponse.results,
        alternatives: alternativesArray,
        correct: [],
        imgGravatar: '',
        code: 0,
      },
    };
    renderWithRouterAndRedux(
      <Game />,
      INITIAL_STATE,
      '/game',
    );

    // const { alternatives } = store.getState().player;

    const primeiraQeuestao = await screen.findByText(/Science & Nature/);
    expect(primeiraQeuestao).toBeInTheDocument();
  });
  test('Se o ranking é mantido após o reload', async () => {
    const INITIAL_STATE = {
      player: {
        questions: questionsResponse.results,
        alternatives: alternativesArray,
        code: 0,
      },
    };
    renderWithRouterAndRedux(
      <Game />,
      INITIAL_STATE,
      '/game',
    );
    const btnGraviton = screen.getByText('Graviton');
    userEvent.click(btnGraviton);
    // const btnNext = await screen.findByText('Next');
    // userEvent.click(btnNext);
    // const btnTrue = await screen.findByText('True');
  });
});
