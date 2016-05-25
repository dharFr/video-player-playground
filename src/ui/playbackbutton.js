'use strict';

import flight    from 'flight';
import withStore from 'mixin/with_redux_store';
import {
  togglePlaybackRequested
} from '../actions';
import {
  TOGGLE_PLAYBACK_REQUESTED,
  VIDEO_PAUSE,
  VIDEO_PLAY
} from '../events';

function PlaybackButton() {

  this.shouldComponentUpdate = function(oldState, newState) {
    return oldState.paused !== newState.paused;
  };

  this.update = function() {
    this.$node.html(this.state.paused ? '▶︎' : 'II');
  };

  this.after('initialize', function() {

    // Track changes to the state using advice
    this.after('stateChanged', this.update);

    this.on('click', (e) => {
      this.dispatch(togglePlaybackRequested(this.state.paused));
    });
  });
}
export default flight.component(withStore, PlaybackButton);
