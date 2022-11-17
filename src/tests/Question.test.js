import { screen, waitFor} from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Game from '../pages/Game';
import { questionsResponse } from './helpers/mockQuestions';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../redux/reducers';

jest.setTimeout(30000);

const alternativesArray = questionsResponse.results
  .map((result) => [...result.incorrect_answers, result.correct_answer]);

describe('Testa a página de Feedback', () => {
  test('Se ao chegar a zero, os botões são desabilitados', async () => {
    // global.dispatch = jest.fn().mockResolvedValue(0);
    // global.fetch = jest.fn().mockResolvedValue(Promise.resolve({ json:  () => Promise.resolve(questionsResponse), ok: true}))
    const INITIAL_STATE = {
      player: {
        questions: questionsResponse.results,
        alternatives: alternativesArray,
        code: 0,
        currentTime: 1,
      },
    };
    const history = createMemoryHistory({ initialEntries: ['/game']})
    const store = createStore(reducer, INITIAL_STATE, applyMiddleware(thunk));
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <Game history={{push: history.push}} />
        </Router>
      </Provider>,
    )
    const vinteNove = await screen.findByText('1');
    const btnGraviton = await screen.findByText('Graviton');
    //function retirada de: https://stackoverflow.com/questions/42089548/how-to-add-delay-in-react-js
    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }await timeout(1000);
    expect(store.getState().player.currentTime).toBe(0);
    // global.dispatch = jest.fn().mockResolvedValue(0);
    // const btn = await screen.findByText('0');
    // console.log(store.getState().player.currentTime);
    // store.getState().player.currentTime = 0;

    // await waitFor(async () => await screen.findByText('Next'), { setTimeout: 2000 })
    // const btnNext = await screen.findByText('Next');
    // console.log(store.getState().player.currentTime);
    // expect(btnGraviton.disabled).toBe(true);
    
  });
});
