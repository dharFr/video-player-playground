'use strict';

import flight from 'flightjs';

function Seekbar() {

  this.bindVideoEvents = function() {
    this.on('#root', 'video_duration_change', this.onDurationChange);
    this.on('#root', 'video_time_update', this.onTimeUpdate);
  };

  this.unbindVideoEvents = function() {
    this.off('#root', 'video_duration_change', this.onDurationChange);
    this.off('#root', 'video_time_update', this.onTimeUpdate);
  };

  this.onDurationChange = function(e, data) {
      this.$node.attr('max', data.duration);
      this.$node.val(0);
  };

  this.onTimeUpdate = function(e, data) {
    this.$node.val(data.time);
  };

  this.after('initialize', function() {

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

    this.$node.val(0);
  });
}
export default flight.component(Seekbar);