import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';

describe('Testa a página de Ranking', () => {
  test('Se o ranking é mantido após o reload', async () => {
    const INITIAL_STATE = {
      player: {
        imgGravatar: '',
        name: 'teste',
        score: 50,
      },
    };
    localStorage.setItem('ranking', JSON.stringify([INITIAL_STATE.player]));
    renderWithRouterAndRedux(
      <Ranking />,
      INITIAL_STATE,
      '/ranking',
    );

    const name = await screen.findByText('teste');
    const score = screen.getByTestId('player-score-0');
    expect(name).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    window.location.reload(true);
    expect(name).toBeInTheDocument();
  });
  test('Se o ranking está em ordem decrescente', async () => {
    const INITIAL_STATE = [{
      imgGravatar: '',
      name: 'cinquenta',
      score: 50,
    }, {
      imgGravatar: '',
      name: 'cem',
      score: 100,
    }, {
      imgGravatar: '',
      name: 'vinte',
      score: 20,
    }, {
      imgGravatar: '',
      name: 'vinte2',
      score: 20,
    }];
    localStorage.setItem('ranking', JSON.stringify(INITIAL_STATE));
    renderWithRouterAndRedux(
      <Ranking />,
      INITIAL_STATE,
      '/ranking',
    );
    const nameZero = screen.getByTestId('player-name-0');
    const scoreZero = screen.getByTestId('player-score-0');

    const nameUm = screen.getByTestId('player-name-1');
    const scoreUm = screen.getByTestId('player-score-1');

    const nameDois = screen.getByTestId('player-name-2');
    const scoreDois = screen.getByTestId('player-score-2');

    const nameTres = screen.getByTestId('player-name-3');
    const scoreTres = screen.getByTestId('player-score-3');

    expect(nameZero.textContent).toBe('cem');
    expect(scoreZero.textContent).toBe('100');

    expect(nameUm.textContent).toBe('cinquenta');
    expect(scoreUm.textContent).toBe('50');

    expect(nameDois.textContent).toBe('vinte');
    expect(scoreDois.textContent).toBe('20');

    expect(nameTres.textContent).toBe('vinte2');
    expect(scoreTres.textContent).toBe('20');
  });
});
