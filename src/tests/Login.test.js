import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';

const inputGravatarEmail = 'input-gravatar-email';
const inputPlayerName = 'input-player-name';
const btnPlay = 'btn-play';

const history ={push: () => {}}
describe('Testa a página de Login', () => {
  test('Se os inputs e o botão são renderizados', () => {
    renderWithRouterAndRedux(<Login history={history}/>);
    const emailInput = screen.getByTestId(inputGravatarEmail);
    const player = screen.getByTestId(inputPlayerName);
    const buttonPlay = screen.getByTestId(btnPlay);

    expect(emailInput).toBeInTheDocument();
    expect(player).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay.disabled).toBe(true);
  });
  test('Se ao escrever nos inputs, o botão é habilitado', () => {
    renderWithRouterAndRedux(<Login history={history}/>);
    const emailInput = screen.getByTestId(inputGravatarEmail);
    const player = screen.getByTestId(inputPlayerName);
    const buttonPlay = screen.getByTestId(btnPlay);
    expect(buttonPlay.disabled).toBe(true);
    userEvent.type(emailInput, 'trybe@teste.com');
    expect(buttonPlay.disabled).toBe(true);
    userEvent.type(player, 'player');
    expect(buttonPlay.disabled).toBe(false);
  });
  test(
    'Se após o clique do botão existe uma chave token no localStorage ',
    async () => {
      renderWithRouterAndRedux(<Login history={history}/>);

      const emailInput = screen.getByTestId(inputGravatarEmail);
      const player = screen.getByTestId(inputPlayerName);
      const buttonPlay = screen.getByTestId(btnPlay);

      userEvent.type(emailInput, 'trybe@teste.com');
      userEvent.type(player, 'player');
      userEvent.click(buttonPlay);

      const tokenLocalStorage = localStorage.getItem('token');
      expect(tokenLocalStorage).not.toBe('null');
    },
  );
});
