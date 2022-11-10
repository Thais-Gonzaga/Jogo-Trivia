import React, { Component } from 'react';
import { string, shape, arrayOf } from 'prop-types';

const bool = ['True', 'False'];

class Question extends Component {
  constructor() {
    super();
    this.state = {
      color: 'all',
      colorIncorret: 'all',
    };
    this.shuffleArray = this.shuffleArray.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.teste = this.teste.bind(this);
  }

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
    const { color, colorIncorret } = this.state;
    const { category, question, type, correct_answer: correct,
      incorrect_answers: incorrect } = questionSelect;
    const arr = incorrect;
    arr.push(correct);
    this.shuffleArray(arr);
    this.shuffleArray(bool);

    return (
      <div>
        <h1 data-testid="question-category">{category}</h1>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">

          { type === 'boolean'
            ? bool.map((alternative, index) => (
              <button
                key={ index }
                type="button"
                name={ alternative === correct
                  ? 'correct' : 'incorrect' }
                data-testid={ this.teste(alternative, correct, index) }
                onClick={ this.changeColor }
                className={ alternative === correct
                  ? color : colorIncorret }
              >
                {alternative}
              </button>
            ))
            : (
              arr.map((alternative, index) => (
                <button
                  key={ index }
                  type="button"
                  data-testid={ this.teste(alternative, correct, index) }
                  onClick={ this.changeColor }
                  className={ alternative === correct
                    ? color : colorIncorret }
                >
                  {alternative}
                </button>

              ))
            )}

        </div>
      </div>
    );
  }
}

export default Question;

Question.propTypes = {
  questionSelect: arrayOf(shape),
  category: string,
  question: string,
  type: string,
  correct_answer: string,
  incorrect_answers: arrayOf(string),
}.isRequired;
