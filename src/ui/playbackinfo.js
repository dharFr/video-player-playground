'use strict';

import flight         from 'flight';
import withFormatTime from 'mixin/with_format_time.js';
import withState      from 'with-state';

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

    this.on('#root', 'video_play', (e) => {
      this.mergeState({ paused: false });
    });

    this.on('#root', 'video_pause', (e) => {
      this.mergeState({ paused: true });
    });

    this.on('#root', 'video_duration_change', (e, data) => {
      this.mergeState({
        duration: this.formatTime(data.duration)
      });
    });

    this.on('#root', 'video_time_update', (e, data) => {
      this.mergeState({
        time: this.formatTime(data.time)
      });
    });
  });
}
export default flight.component(withFormatTime, withState, PlaybackInfo);