import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.handleButton());
  };

  handleButton = () => {
    const { email, name } = this.state;
    const ONE = 1;
    const regex = /\S+@\S+\.\S+/;
    const nome = name.length >= ONE;
    if (regex.test(email) && email && nome) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  render() {
    const { email, name, isDisabled } = this.state;
    return (
      <div>

        <input
          type="email"
          name="email"
          value={ email }
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <input
          type="name"
          name="name"
          value={ name }
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          //   onClick={ () => ()) }
          disabled={ isDisabled }
        >
          Play

        </button>
      </div>
    );
  }
}

export default Login;
