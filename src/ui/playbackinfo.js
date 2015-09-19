'use strict';

import flight         from 'flight';
import withFormatTime from 'mixin/with_format_time';
import withState      from 'with-state';
import {
  VIDEO_DURATION_CHANGE,
  VIDEO_PAUSE,
  VIDEO_PLAY,
  VIDEO_TIME_UPDATE
} from '../events';

function PlaybackInfo() {

  // Define an instance's `initialState`
  this.initialState({
    paused   : true,
    time     : this.formatTime(0),
    duration : this.formatTime(0)
  });

  this.update = function() {
    this.$node.html(`
      Playing: ${this.state.paused ? 'no' : 'yes'} <br>
      Duration: ${this.state.duration}<br>
      CurrentTime : ${this.state.time}
    `);
  };

  this.after('initialize', function() {

    // Track changes to the state using advice
    this.after('stateChanged', this.update);

    this.on('#root', VIDEO_PLAY, (e) => {
      this.mergeState({ paused: false });
    });

    this.on('#root', VIDEO_PAUSE, (e) => {
      this.mergeState({ paused: true });
    });

    this.on('#root', VIDEO_DURATION_CHANGE, (e, data) => {
      this.mergeState({
        duration: this.formatTime(data.duration)
      });
    });

    this.on('#root', VIDEO_TIME_UPDATE, (e, data) => {
      this.mergeState({
        time: this.formatTime(data.time)
      });
    });
  });
}
export default flight.component(withFormatTime, withState, PlaybackInfo);