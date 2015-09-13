'use strict';

import flight from 'flight';
import withState from 'with-state';
import {
  SEEK_REQUESTED,
  VIDEO_DURATION_CHANGE,
  VIDEO_TIME_UPDATE
} from '../events';

function Seekbar() {

  // Define an instance's `initialState`
  this.initialState({
    duration : 0,
    time     : 0
  });

  this.update = function() {

    if (this.$node.attr('max') !== this.state.duration) {
      this.$node.attr('max', this.state.duration);
    }

    if (this.$node.val() !== this.state.time){
      this.$node.val(this.state.time);
    }
  };

  this.bindVideoEvents = function() {
    this.on('#root', VIDEO_DURATION_CHANGE, this.onDurationChange);
    this.on('#root', VIDEO_TIME_UPDATE, this.onTimeUpdate);
  };

  this.unbindVideoEvents = function() {
    this.off('#root', VIDEO_DURATION_CHANGE, this.onDurationChange);
    this.off('#root', VIDEO_TIME_UPDATE, this.onTimeUpdate);
  };

  this.onDurationChange = function(e, data) {
    this.mergeState({
      duration : data.duration,
      time     : 0
    });
  };

  this.onTimeUpdate = function(e, data) {
    this.mergeState({
      time     : data.time
    });
  };

  this.after('initialize', function() {

    // Track changes to the state using advice
    this.after('stateChanged', this.update);

    this.bindVideoEvents();

    // Start drag
    this.on('mousedown', (e) => {
      this.unbindVideoEvents();
    });

    // Stop drag
    this.on('mouseup', (e) => {
      this.trigger(SEEK_REQUESTED, {time: this.$node.val()});
      this.bindVideoEvents();
    });
  });
}
export default flight.component(withState, Seekbar);