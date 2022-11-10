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

  render() {
    const { questions } = this.props;
    // console.log(questions);
    const { questionsNumber } = this.state;
    if (!questions.length) return 'carregando';
    return (
      <div>
        <Header />

        <Question
          questionSelect={ questions[questionsNumber] }
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
