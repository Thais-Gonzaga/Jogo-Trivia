import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  saveScore = () => {
    const localStorageHistorico = localStorage.getItem('ranking');
    const historico = JSON.parse(localStorageHistorico);
    const { score, name, imgGravatar } = this.props;
    const data = {
      imgGravatar,
      name,
      score,
    };
    if (historico) {
      localStorage.setItem('ranking', JSON.stringify([...historico, data]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([data]));
    }
  };

  render() {
    const { assertions, score } = this.props;
    const THREE = 3;
    return (
      <div>
        <Header />
        <div>
          { (assertions < THREE
            ? <p data-testid="feedback-text">Could be better...</p>
            : <p data-testid="feedback-text">Well Done!</p>)}
        </div>
        <div data-testid="feedback-total-score">{score}</div>
        <div data-testid="feedback-total-question">{assertions}</div>
        {/* thais criu para funcionar req18 */}
        <Link to="/ranking">
          <button
            type="button"
            onClick={ this.saveScore }
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
        {/* thais criu para funcionar req18 */}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  name: PropTypes.string,
  // imgGravatar: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  imgGravatar: state.player.imgGravatar,
});

export default connect(mapStateToProps)(Feedback);
