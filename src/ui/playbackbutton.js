'use strict';

import flight    from 'flight';
import withState from 'with-state';

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
      this.trigger('toggle_playback_requested');
    });

    this.on('#root', 'video_play', (e) => {
      this.mergeState({
        paused: false
      });
    });

    this.on('#root', 'video_pause', (e) => {
      this.mergeState({
        paused: true
      });
    });
  });
}
export default flight.component(withState, PlaybackButton);
