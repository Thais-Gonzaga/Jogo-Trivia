import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Settings  from '../pages/Settings';

describe('Testa a página de Settings', () => {
  test('verifique se a pagina tem um titulo', () => {
    renderWithRouterAndRedux(<Settings/>);
    const title = screen.getByTestId("settings-title");
    expect(title).toBeInTheDocument();
  })});