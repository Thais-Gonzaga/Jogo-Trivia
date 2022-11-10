import React, { Component } from 'react';
import { string, shape, arrayOf } from 'prop-types';

const bool = ['True', 'False'];

class Question extends Component {
  constructor() {
    super();
    this.shuffleArray = this.shuffleArray.bind(this);
  }

  // função https://acervolima.com/como-embaralhar-uma-matriz-usando-javascript/
  shuffleArray(arr) {
    for (let index = arr.length - 1; index > 0; index -= 1) {
      const sort = Math.floor(Math.random() * (index + 1));
      [arr[index], arr[sort]] = [arr[sort], arr[index]];
    }
    return arr;
  }

  render() {
    const { questionSelect } = this.props;
    console.log(questionSelect);
    const { category, question, type,
      correct_answer: correct,
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
              alternative === correct ? (
                <button
                  key={ index }
                  type="button"
                  data-testid="correct-answer"
                >
                  {alternative}
                </button>
              )
                : (
                  <button
                    key={ index }
                    type="button"
                    data-testid={ `wrong-answer-${index}` }
                  >
                    {alternative}
                  </button>
                )
            ))
            : (
              arr.map((alternative, index) => (
                alternative === correct ? (
                  <button
                    key={ index }
                    type="button"
                    data-testid="correct-answer"
                  >
                    {alternative}
                  </button>
                )
                  : (
                    <button
                      key={ index }
                      type="button"
                      data-testid={ `wrong-answer-${index}` }
                    >
                      {alternative}
                    </button>
                  )
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
