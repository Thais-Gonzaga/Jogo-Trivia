import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getGravatarApi from '../services/getGravatarApi';
import submitAction from '../redux/actions';

class Header extends Component {
  saveImg = (gravatarImg) => {
    const { dispatch } = this.props;
    const img = getGravatarApi(gravatarImg);
    dispatch(submitAction('IMG_GRAVATAR', img));
  };

  render() {
    const { name, score, gravatarImg } = this.props;
    return (
      <div>
        <img
          src={ this.saveImg(gravatarImg) }
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
