import React from 'react';
import PropTypes from 'prop-types'
import { subscribe } from 'sinkro'
import { sportStars$ } from '../../state/streams'
import Player from '../Player'
import './styles.css';

export const App = ({ sportStars }) => (
  <div className="app">
      {
          sportStars.map((player) => (<Player key={player.shortname} player={player} />))
      }
  </div>
);

App.propTypes = {
    sportStars: PropTypes.array
}

App.defaultProps = {
    sportStars: []
}

export default subscribe(
    {
        sportStars: sportStars$
    }
)(App)
