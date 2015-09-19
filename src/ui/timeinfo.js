'use strict';

import flight         from 'flight';
import withFormatTime from 'mixin/with_format_time';
import withStore      from 'mixin/with_store';
import {
  VIDEO_DURATION_CHANGE,
  VIDEO_TIME_UPDATE
} from '../events';

function TimeInfo() {

  this.attributes({
    timeSelector     : '.time',
    durationSelector : '.duration'
  });

  this.shouldComponentUpdate = function(oldState, newState) {
    return (
      oldState.duration    !== newState.duration ||
      oldState.currentTime !== newState.currentTime
    );
  };

  this.update = function() {
    let duration = this.formatTime(this.state.duration);
    if (this.durationNode.text() !== duration) {
      this.durationNode.text(duration);
    }

    let currentTime = this.formatTime(this.state.currentTime);
    if (this.timeNode.text() !== currentTime) {
      this.timeNode.text(currentTime);
    }
  };

  this.after('initialize', function() {

    this.timeNode     = this.select('timeSelector');
    this.durationNode = this.select('durationSelector');

    // Track changes to the state using advice
    this.after('stateChanged', this.update);
  });
}
export default flight.component(withFormatTime, withStore, TimeInfo);