'use strict';

import flight from 'flightjs';

function Video() {

  this.togglePlayback = function() {
    if (this._paused) {
      this.video.play();
      this._paused = false;
    }
    else
    {
      this.video.pause();
      this._paused = true;
    }
  };

  this.after('initialize', function() {

    this.video   = this.$node[0];
    this._paused = true;

    this.on('click', this.togglePlayback);

    this.on('play', (e) => {
      this.trigger('video_play');
    });

    this.on('pause', (e) => {
      this.trigger('video_pause');
    });

    this.on('durationchange', (e) => {
      this.trigger('video_duration_change', { duration: this.video.duration });
    });

    this.on('timeupdate', (e) => {
      this.trigger('video_time_update', { time: this.video.currentTime });
    });

    this.on('#root', 'toggle_playback_requested', this.togglePlayback);

    this.on('#root', 'seek_requested', (e, data) => {
      this.video.currentTime = data.time;
    });
  });
}
export default flight.component(Video);