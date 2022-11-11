import React, { Component } from 'react';
import { string, shape, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import submitAction from '../redux/actions';
import Alternatives from './Alternatives';

const bool = ['True', 'False'];

class Question extends Component {
  constructor() {
    super();
    this.state = {
      color: 'all',
      colorIncorret: 'all',
      isDisabled: true,
      currentTime: 30,
      optionsState: false,
      onClick: false,
    };
    this.shuffleArray = this.shuffleArray.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.teste = this.teste.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    setInterval(() => this.time(), ONE_SECOND);
    this.setState({
      optionsState: true,
    });
  }

  onClick() {
    const { onNext } = this.props;
    onNext();
    this.setState({
      onClick: false, color: 'all', colorIncorret: 'all', currentTime: 30 });
  }

  time = () => {
    const { currentTime } = this.state;
    this.setState((prevState) => ({
      currentTime: prevState.currentTime - 1,
      isDisabled: false,
    }));
    if (currentTime <= 0) {
      this.setState(() => ({
        isDisabled: true,
      }));
    }
  };

  // função https://acervolima.com/como-embaralhar-uma-matriz-usando-javascript/
  shuffleArray(arr) {
    for (let index = arr.length - 1; index > 0; index -= 1) {
      const sort = Math.floor(Math.random() * (index + 1));
      [arr[index], arr[sort]] = [arr[sort], arr[index]];
    }
    return arr;
  }

  changeColor({ target }) {
    const { dispatch, questionSelect } = this.props;
    const { currentTime } = this.state;
    const values = { um: 1, dois: 2, tres: 3 };
    this.setState({ color: 'correct-color',
      colorIncorret: 'wrong-color',
      onClick: true });
    const responseAnswer = target.name;
    const { difficulty } = questionSelect;
    let valueDifficult = 0;
    if (difficulty === 'easy') valueDifficult = values.um;
    if (difficulty === 'medium') valueDifficult = values.dois;
    if (difficulty === 'hard') valueDifficult = values.tres;
    const dez = 10;
    const count = (dez + (currentTime * valueDifficult));
    if (responseAnswer === 'correct') dispatch(submitAction('SCORE', count));
  }

  teste(alternative, correct, index) {
    if (alternative === correct) {
      return 'correct-answer';
    }
    return `wrong-answer-${index}`;
  }

  render() {
    const { questionSelect } = this.props;
    const { color, colorIncorret, onClick,
      isDisabled, currentTime, optionsState } = this.state;
    const { category, question, type, correct_answer: correct,
      incorrect_answers: incorrect } = questionSelect;
    const arr = incorrect;
    if (!incorrect.includes(correct)) incorrect.push(correct);
    if (!optionsState) {
      this.shuffleArray(arr);
      this.shuffleArray(bool);
    }

    return (
      <div>
        <h1 data-testid="question-category">{category}</h1>
        <p data-testid="question-text">{question}</p>

        <Alternatives
          optionsState={ optionsState }
          color={ color }
          colorIncorret={ colorIncorret }
          isDisabled={ isDisabled }
          type={ type }
          correct={ correct }
          changeColor={ this.changeColor }
          arr={ arr }
          boolArray={ bool }
          teste={ this.teste }
        />

        <div>{currentTime}</div>
        {
          onClick
        && (
          <button
            className="next-btn"
            data-testid="btn-next"
            onClick={ this.onClick }
            type="button"
          >
            Next
          </button>
        )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  score: player.score,
});

export default connect(mapStateToProps)(Question);

Question.propTypes = {
  questionSelect: arrayOf(shape),
  category: string,
  question: string,
  type: string,
  correct_answer: string,
  incorrect_answers: arrayOf(string),
}.isRequired;
