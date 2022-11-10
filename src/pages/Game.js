import React, { Component } from 'react';
import { shape, func, number, arrayOf } from 'prop-types';
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
    this.setState((state) => ({
      questionsNumber: state.questionsNumber + 1,
    }));
  }

  render() {
    const { questions } = this.props;
    const { questionsNumber } = this.state;
    if (!questions.length) return 'carregando';
    return (
      <div>
        <Header />

        <Question
          questionSelect={ questions[questionsNumber] }
          onNext={ this.onNext }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  code: state.player.code,
  questions: state.player.questions,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  history: shape({
    push: func,
  }),
  dispatch: func,
  questions: arrayOf(shape),
  code: number,
}.isRequired;

Game.defaultProps = {
  questions: [{}],
};
