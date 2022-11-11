import React, { Component } from 'react';
import { shape, func, number, arrayOf, string } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import { fetchData } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questionsNumber: 0,
    };
    this.onNext = this.onNext.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchData());
  }

  componentDidUpdate() {
    const { code, history } = this.props;

    const numb = 3;
    if (code === numb) {
      history.push('/');
      localStorage.removeItem('token');
    }
  }

  onNext() {
    const { questions } = this.props;
    this.setState((state) => ({
      questionsNumber: state.questionsNumber === questions.length - 1
        ? this.pushSettings(state) : state.questionsNumber + 1,
    }));
  }

  pushSettings = (state) => {
    const { history } = this.props;
    history.push('/feedback');
    return state.questionsNumber;
  };

  // função https://acervolima.com/como-embaralhar-uma-matriz-usando-javascript/
  shuffleArray(arr) {
    for (let index = arr.length - 1; index > 0; index -= 1) {
      const sort = Math.floor(Math.random() * (index + 1));
      [arr[index], arr[sort]] = [arr[sort], arr[index]];
    }
    return arr;
  }

  render() {
    const { questions, alternatives, correct } = this.props;
    const { questionsNumber } = this.state;
    const correctSelect = correct[questionsNumber];
    const alternativesSelect = alternatives[questionsNumber];
    if (!questions.length || !alternatives.length) return 'carregando';
    return (
      <div>
        <Header />

        <Question
          questionSelect={ questions[questionsNumber] }
          onNext={ this.onNext }
          alternatives={ this.shuffleArray(alternativesSelect) }
          correct={ correctSelect }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  code: state.player.code,
  questions: state.player.questions,
  alternatives: state.player.alternatives,
  correct: state.player.correct,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  history: shape({
    push: func,
  }),
  dispatch: func,
  questions: arrayOf(shape),
  alternatives: arrayOf(string),
  correct: arrayOf(string),
  code: number,
}.isRequired;

Game.defaultProps = {
  questions: [{}],
  alternatives: [''],
  correct: [''],
};
