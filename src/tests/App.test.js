import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const urls = [ '/game', '/settings', "/ranking", "/feedback"];

describe('teste o componente <App.js />', () => {
  it('Teste se a APP renderiza rotas', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/')
    urls.forEach(async (url)=>{ 
      history.push(url)
      const { location: { pathname } } = history;
      expect(pathname).toBe(url);
    })
  })
})

      