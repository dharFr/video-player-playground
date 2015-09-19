'use strict';

import flight         from 'flight';
import withFormatTime from 'mixin/with_format_time';
import withStore      from 'mixin/with_store';
import {
  VIDEO_DURATION_CHANGE,
  VIDEO_PAUSE,
  VIDEO_PLAY,
  VIDEO_TIME_UPDATE
} from '../events';

function PlaybackInfo() {

  this.shouldComponentUpdate = function(oldState, newState) {
    return (
      oldState.paused      !== newState.paused ||
      oldState.duration    !== newState.duration ||
      oldState.currentTime !== newState.currentTime
    );
  };

  this.update = function() {
    const currentTime = this.formatTime(this.state.currentTime);
    const duration    = this.formatTime(this.state.duration);

    this.$node.html(`
      Playing: ${this.state.paused ? 'no' : 'yes'} <br>
      Duration: ${duration}<br>
      CurrentTime : ${currentTime}
    `);
  };

  this.after('initialize', function() {

    // Track changes to the state using advice
    this.after('stateChanged', this.update);
  });
}
export default flight.component(withFormatTime, withStore, PlaybackInfo);