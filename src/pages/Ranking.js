import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      historico: [],
    };
  }

  componentDidMount() {
    const localStorageHistorico = localStorage.getItem('ranking');
    const historico = JSON.parse(localStorageHistorico);
    const historicoOrdem = historico
      .sort((a, b) => {
        const menosUm = -1;
        if (a.score > b.score) {
          return menosUm;
        }
        if (a.score < b.score) {
          return 1;
        } return 0;
      });
      // a.score < b.score ? -1 : a.score > b.score ? 1 : 0});
    console.log(historicoOrdem);
    this.setState({ historico: historicoOrdem });
  }

  render() {
    const { historico } = this.state;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { historico && (
            historico.map((jogada, index) => (
              <li key={ index }>
                <img src={ jogada.imgGravatar } alt={ jogada.name } />
                <p data-testid={ `player-name-${index}` }>{ jogada.name }</p>
                <p data-testid={ `player-score-${index}` }>{ jogada.score }</p>
              </li>
            )))}
        </ul>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Home
          </button>
        </Link>
      </>
    );
  }
}
export default Ranking;
