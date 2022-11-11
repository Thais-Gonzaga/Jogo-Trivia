import { arrayOf, bool, func, string } from 'prop-types';
import React, { Component } from 'react';

class Alternatives extends Component {
  testeCorrect = (alternative, correct) => (alternative === correct
    ? 'correct' : 'incorrect');

  render() {
    const { optionsState, color,
      colorIncorret, isDisabled, type, correct, changeColor,
      arr,
      boolArray,
      teste } = this.props;
    return (
      <div>
        {
          optionsState && (
            <div className="divButtons" data-testid="answer-options">

              { type === 'boolean'
                ? boolArray.map((alternative, index) => (
                  <>
                    <button
                      key={ index }
                      type="button"
                      name={ this.testeCorrect(alternative, correct) }
                      data-testid={ teste(alternative, correct, index) }
                      onClick={ changeColor }
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
                      data-testid={ teste(alternative, correct, index) }
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
          )
        }
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
  type: string,
  correct: string,
  changeColor: func,
  arr: arrayOf(string),
  boolArray: arrayOf(string),
  teste: func,
}.isRequired;
