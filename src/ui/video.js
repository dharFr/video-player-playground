'use strict';

import flight    from 'flight';
import withState from 'with-state';

function Video() {

  // Define an instance's `initialState`
  this.initialState({
    paused   : true
  });

  this.isPaused = this.fromState('paused');
  this.setPaused = this.toState('paused');

  this.togglePlayback = function() {
    if (this.isPaused()) {
      this.video.play();
      this.setPaused(false);
    }
    else
    {
      this.video.pause();
      this.setPaused(true);
    }
  };

  this.after('initialize', function() {

    // Track changes to the state using advice
    // this.after('stateChanged', this.update);

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
    this.video = this.$node[0];
  });
}
export default flight.component(withState, Video);