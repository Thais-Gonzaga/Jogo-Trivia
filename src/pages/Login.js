import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import submitAction from '../redux/actions';
import getTokenApi from '../services/getTriviaApi';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      gravatarEmail: '',
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
    const { gravatarEmail, name } = this.state;
    const ONE = 1;
    const regex = /\S+@\S+\.\S+/;
    const nome = name.length >= ONE;
    if (regex.test(gravatarEmail) && gravatarEmail && nome) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleClick = async () => {
    const { gravatarEmail, name } = this.state;
    const { dispatch, history } = this.props;
    dispatch(submitAction('EMAIL-LOGIN', gravatarEmail));
    dispatch(submitAction('NAME-LOGIN', name));
    await getTokenApi();
    history.push('/game');
  };

  render() {
    const { gravatarEmail, name, isDisabled } = this.state;
    return (
      <div>

        <input
          type="email"
          name="gravatarEmail"
          value={ gravatarEmail }
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
          onClick={ this.handleClick }
          disabled={ isDisabled }
        >
          Play
        </button>

        <Link to="/settings">

          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações

          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(Login);
