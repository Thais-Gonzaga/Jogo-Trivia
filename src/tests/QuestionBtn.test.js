import { screen, waitFor} from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Game from '../pages/Game';
import { questionsResponse } from './helpers/mockQuestions';
import React from 'react';
import userEvent from '@testing-library/user-event';

jest.setTimeout(30000);

const alternativesArray = questionsResponse.results
  .map((result) => [...result.incorrect_answers, result.correct_answer]);

describe('Testa a página de Feedback', () => {
  test('Se ao chegar a zero, os botões são desabilitados', async () => {
    const INITIAL_STATE = {
      player: {
        questions: questionsResponse.results,
        alternatives: alternativesArray,
        code: 0,
        currentTime: 0,
      },
    };
    renderWithRouterAndRedux(
      <Game />,
      INITIAL_STATE,
      '/game',
    );
    const vinteNove = await screen.findByText('0');
    const btnGraviton = await screen.findByText('Graviton');
    const btnNext = await screen.findByText('Next');
    expect(btnGraviton.disabled).toBe(true);
    userEvent.click(btnGraviton);
  });
});
