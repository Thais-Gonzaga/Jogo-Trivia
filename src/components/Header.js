import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getGravatarApi from '../services/getGravatarApi';

class Header extends Component {
  render() {
    const { name, score, gravatarImg } = this.props;
    return (
      <div>
        <img
          src={ getGravatarApi(gravatarImg) }
          data-testid="header-profile-picture"
          alt="GravatarImage"
        />
        <p
          data-testid="header-player-name"
        >
          {name}

        </p>
        <p
          data-testid="header-score"
        >
          {score}
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarImg: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
