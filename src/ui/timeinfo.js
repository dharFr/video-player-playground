'use strict';

import flight         from 'flight';
import withFormatTime from 'mixin/with_format_time.js';
import withState      from 'with-state';
import {
  VIDEO_DURATION_CHANGE,
  VIDEO_TIME_UPDATE
} from '../events';

function TimeInfo() {

  this.attributes({
    timeSelector     : '.time',
    durationSelector : '.duration'
  });

  // Define an instance's `initialState`
  this.initialState({
    time     : this.formatTime(0),
    duration : this.formatTime(0)
  });

  this.update = function() {
    if (this.durationNode.text() !== this.state.duration) {
      this.durationNode.text(this.state.duration);
    }

    if (this.timeNode.text() !== this.state.time) {
      this.timeNode.text(this.state.time);
    }
  };

  this.after('initialize', function() {

    // Track changes to the state using advice
    this.after('stateChanged', this.update);

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

    this.timeNode     = this.select('timeSelector');
    this.durationNode = this.select('durationSelector');
  });
}
export default flight.component(withFormatTime, withState, TimeInfo);