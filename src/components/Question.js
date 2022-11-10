import React, { Component } from 'react';
import { string, shape, arrayOf } from 'prop-types';
import { connect } from 'react-redux';

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
    };
    this.shuffleArray = this.shuffleArray.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.teste = this.teste.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    setInterval(() => this.time(), ONE_SECOND);
    this.setState({
      optionsState: true,
    });
  }

  time = () => {
    const { currentTime } = this.state;
    this.setState((prevState) => ({
      currentTime: prevState.currentTime - 1,
      isDisabled: false,
    }));
    console.log(currentTime);
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

  changeColor() {
    this.setState({ color: 'correct-color', colorIncorret: 'wrong-color' });
  }

  teste(alternative, correct, index) {
    if (alternative === correct) {
      return 'correct-answer';
    }
    return `wrong-answer-${index}`;
  }

  render() {
    const { questionSelect } = this.props;
    const { color, colorIncorret, isDisabled, currentTime, optionsState } = this.state;
    const { category, question, type, correct_answer: correct,
      incorrect_answers: incorrect } = questionSelect;
    const arr = incorrect;
    if (!optionsState) {
      arr.push(correct);
      this.shuffleArray(arr);
      this.shuffleArray(bool);
    }

    return (
      <div>
        <h1 data-testid="question-category">{category}</h1>
        <p data-testid="question-text">{question}</p>
        {
          optionsState && (
            <div className="divButtons" data-testid="answer-options">

              { type === 'boolean'
                ? bool.map((alternative, index) => (
                  <>
                    <button
                      key={ index }
                      type="button"
                      name={ alternative === correct
                        ? 'correct' : 'incorrect' }
                      data-testid={ this.teste(alternative, correct, index) }
                      onClick={ this.changeColor }
                      disabled={ isDisabled }
                      className={ 'divButtons' && alternative === correct
                        ? color : colorIncorret }
                    >
                      {alternative}
                    </button>
                    <br />
                    <br />
                  </>
                ))
                : (
                  arr.map((alternative, index) => (
                    <button
                      key={ index }
                      type="button"
                      data-testid={ this.teste(alternative, correct, index) }
                      onClick={ this.changeColor }
                      disabled={ isDisabled }
                      className={ 'divButtons' && alternative === correct
                        ? color : colorIncorret }
                    >
                      {alternative}
                    </button>

                  ))
                )}
            </div>
          )
        }
        <div>{currentTime}</div>
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
