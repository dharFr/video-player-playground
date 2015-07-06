'use strict';

import flight from 'flight';
import withState from 'with-state';

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
    this.on('#root', 'video_duration_change', this.onDurationChange);
    this.on('#root', 'video_time_update', this.onTimeUpdate);
  };

  this.unbindVideoEvents = function() {
    this.off('#root', 'video_duration_change', this.onDurationChange);
    this.off('#root', 'video_time_update', this.onTimeUpdate);
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
      this.trigger('seek_requested', {time: this.$node.val()});
      this.bindVideoEvents();
    });
  });
}
export default flight.component(withState, Seekbar);