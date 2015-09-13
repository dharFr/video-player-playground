'use strict';

import flight    from 'flight';
import withState from 'with-state';
import {
  TOGGLE_PLAYBACK_REQUESTED,
  VIDEO_PAUSE,
  VIDEO_PLAY
} from '../events';

function PlaybackButton() {

  // Define an instance's `initialState`
  this.initialState({
    paused: true
  });

  this.update = function() {
    this.$node.html(this.state.paused ? '▶︎' : 'II');
  };

  this.after('initialize', function() {

    // Track changes to the state using advice
    this.after('stateChanged', this.update);

    this.on('click', (e) => {
      this.trigger(TOGGLE_PLAYBACK_REQUESTED, this.state.paused);
    });

    this.on('#root', VIDEO_PLAY, (e) => {
      this.mergeState({
        paused: false
      });
    });

    this.on('#root', VIDEO_PAUSE, (e) => {
      this.mergeState({
        paused: true
      });
    });
  });
}
export default flight.component(withState, PlaybackButton);
