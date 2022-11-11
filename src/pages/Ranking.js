import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <Link to="/">
        <button
          type="button"
          data-testid="btn-go-home"
        >
          Home
        </button>
      </Link>
    );
  }
}
export default Ranking;
