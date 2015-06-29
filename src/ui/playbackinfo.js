'use strict';

import flight from 'flightjs';
import withFormatTime from '../mixin/with_format_time.js';

function PlaybackInfo() {

  this.update = function(prop, value) {

    switch(prop) {
      case 'paused':
        this._paused = value;
        break;
      case 'duration':
        this.duration = this.formatTime(value);
        break;
      case 'time':
        this.time = this.formatTime(value);
        break;
    }
    this.render();
  };

  this.render = function() {
    const markup = `
    Playing: ${this._paused ? 'no' : 'yes'} <br>
    Duration: ${this.duration}<br>
    CurrentTime : ${this.time}`;
    this.$node.html(markup);
  };

  this.after('initialize', function() {

    this.on('#root', 'video_play', (e) => {
      this.update('paused', false);
    });

    this.on('#root', 'video_pause', (e) => {
      this.update('paused', true);
    });

    this.on('#root', 'video_duration_change', (e, data) => {
      this.update('duration', data.duration);
    });

    this.on('#root', 'video_time_update', (e, data) => {
      this.update('time', data.time);
    });

    this._paused  = true;
    this.time     = this.formatTime(0);
    this.duration = this.formatTime(0);
    this.render();
  });
}
export default flight.component(PlaybackInfo, withFormatTime);