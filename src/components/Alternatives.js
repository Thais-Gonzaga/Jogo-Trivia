import { arrayOf, bool, func, string } from 'prop-types';
import React, { Component } from 'react';

class Alternatives extends Component {
  testeCorrect = (alternative, correct) => (alternative === correct
    ? 'correct' : 'incorrect');

  teste = (alternative, correct, index) => (alternative === correct
    ? 'correct-answer' : `wrong-answer-${index}`);

  render() {
    const { optionsState, color,
      colorIncorret, isDisabled, correct, changeColor, arr } = this.props;
    console.log(arr);
    return (
      <div>
        <div className="divButtons" data-testid="answer-options">
          {optionsState && (

            arr.map((alternative, index) => (

              <button
                key={ index }
                type="button"
                data-testid={ this.teste(alternative, correct, index) }
                name={ this.testeCorrect(alternative, correct) }
                onClick={ changeColor }
                disabled={ isDisabled }
                className={ 'divButtons' && alternative === correct
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

export default Alternatives;

Alternatives.propTypes = {
  optionsState: bool,
  color: string,
  colorIncorret: string,
  isDisabled: bool,
  correct: string,
  changeColor: func,
  arr: arrayOf(string),
  // teste: func,
}.isRequired;
