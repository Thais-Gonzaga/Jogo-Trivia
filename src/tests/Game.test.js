import { screen, waitFor} from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Game from '../pages/Game';
import { questionsResponse } from './helpers/mockQuestions';
import React from 'react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../redux/reducers';

const alternativesArray = questionsResponse.results
  .map((result) => [...result.incorrect_answers, result.correct_answer, ]);

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
            const btnNext = await screen.findByText('Next');
            userEvent.click(btnNext);
            const btnTrue = await screen.findByText('True');
          });
          
  test('Se ao clicar na resposta e no botão next, aparece outra questão', async () => {
    global.setInterval = jest.fn()
    global.fetch = jest.fn().mockResolvedValue(Promise.resolve({ json:  () => Promise.resolve(questionsResponse), ok: true}))
    const INITIAL_STATE = {
      player: {
        questions: [],
        alternatives: [],
        code: 0,
      },
    };
    const {getByTestId} = renderWithRouterAndRedux(
      <Game />,
      INITIAL_STATE,
      '/game',
    );
    expect(await screen.findByTestId('correct-answer')).toBeInTheDocument()
    const btnQuiz = getByTestId('correct-answer');
    userEvent.click(btnQuiz)
    expect(await screen.findByTestId('btn-next')).toBeInTheDocument()
    const btnNext = screen.getByRole('button', { name: 'Next' });
    act(() =>  {
      userEvent.click(btnNext);
    })

    expect(await screen.findByTestId('correct-answer')).toBeInTheDocument()
    const btnQuiz2 = getByTestId('correct-answer');
    userEvent.click(btnQuiz2)
    expect(await screen.findByTestId('btn-next')).toBeInTheDocument()
    const btnNext2 = screen.getByRole('button', { name: 'Next' });
    act(() =>  {
      userEvent.click(btnNext2);
    })
    expect(await screen.findByTestId('correct-answer')).toBeInTheDocument()
    const btnQuiz3 = getByTestId('correct-answer');
    userEvent.click(btnQuiz3)
    expect(await screen.findByTestId('btn-next')).toBeInTheDocument()
    const btnNext3 = screen.getByRole('button', { name: 'Next' });
    act(() =>  {
      userEvent.click(btnNext3);
    })
  
  
  });

  test('Se ao clicar em todas as respostas, redireciona para o feedback', async () => {
    global.setInterval = jest.fn()
    global.fetch = jest.fn().mockResolvedValue(Promise.resolve({ json:  () => Promise.resolve(questionsResponse), ok: true}))
    const INITIAL_STATE = {
      player: {
        questions: [],
        alternatives: [],
        code: 0,
      },
    };
    const {getByTestId, history} = renderWithRouterAndRedux(
      <Game />,
      INITIAL_STATE,
      '/game',
    );

    for(let index = 0; index < 5; index += 1){
   
      expect(await screen.findByTestId('correct-answer')).toBeInTheDocument()
      const btnQuiz = getByTestId('correct-answer');
      userEvent.click(btnQuiz)
      expect(await screen.findByTestId('btn-next')).toBeInTheDocument()
      const btnNext = screen.getByRole('button', { name: 'Next' });
      act(() =>  {
        userEvent.click(btnNext);
      })
    }
 
    await waitFor(() => expect(history.location.pathname).toBe('/feedback'))
  
  
  });

  test('Se o ranking é mantido após o reload', async () => {
    global.fetch = jest.fn().mockResolvedValue(Promise.resolve({ json:  () => Promise.resolve({...questionsResponse, response_code: 3}), ok: true}))
    global.setInterval = jest.fn()
   
    const INITIAL_STATE = {
      player: {
        questions: [],
        alternatives: [],
        code: 0,
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

    await waitFor(() => expect(screen.getByTestId('correct-answer')).toBeInTheDocument())
    const question = screen.getByTestId('correct-answer')
    userEvent.click(question);
    expect(localStorage.getItem('token')).toBeNull()  
    expect(history.location.pathname).toBe('/')  
  });
});
