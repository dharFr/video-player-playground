'use strict';

import flight    from 'flight';
import withState from 'with-state';
import {
  PLAY_REQUESTED,
  PAUSE_REQUESTED,
  TOGGLE_PLAYBACK_REQUESTED,
  SEEK_REQUESTED,
  VIDEO_DURATION_CHANGE,
  VIDEO_PAUSE,
  VIDEO_PLAY,
  VIDEO_TIME_UPDATE
} from '../events';

function Video() {

  // Define an instance's `initialState`
  this.initialState({
    paused   : true
  });

  this.isPaused = this.fromState('paused');
  this.setPaused = this.toState('paused');

  this._play = function() {
    this.video.play();
    this.setPaused(false);
  };

  this._pause = function() {
    this.video.pause();
    this.setPaused(true);
  };

  this.play = function() {
    if (this.isPaused()) {
      this._play();
    }
  };

  this.pause = function() {
    if (!this.isPaused()) {
      this._pause();
    }
  };

  this.togglePlayback = function() {
    (this.isPaused()) ? this._play() : this._pause();
  };

  this.after('initialize', function() {

    // Track changes to the state using advice
    // this.after('stateChanged', this.update);

    this.on('click', this.togglePlayback);

    this.on('play', (e) => {
      this.trigger(VIDEO_PLAY);
    });

    this.on('pause', (e) => {
      this.trigger(VIDEO_PAUSE);
    });

    this.on('durationchange', (e) => {
      this.trigger(VIDEO_DURATION_CHANGE, { duration: this.video.duration });
    });

    this.on('timeupdate', (e) => {
      this.trigger(VIDEO_TIME_UPDATE, { time: this.video.currentTime });
    });

    this.on('#root', PLAY_REQUESTED,            this.play);
    this.on('#root', PAUSE_REQUESTED,           this.pause);
    this.on('#root', TOGGLE_PLAYBACK_REQUESTED, this.togglePlayback);

    this.on('#root', SEEK_REQUESTED, (e, data) => {
      this.video.currentTime = data.time;
    });
    this.video = this.$node[0];
  });
}
export default flight.component(withState, Video);