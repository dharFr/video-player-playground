'use strict';

import flight    from 'flight';
import withStore from 'mixin/with_redux_store';
import withFlightCompat from 'mixin/with_flight_compat';
import { bindActionCreators } from 'redux';
import * as PlayerActionCreators from '../actions';
import {
  togglePlaybackRequested,
  videoPlay,
  videoPause,
  videoDurationChange,
  videoTimeUpdate
} from '../actions';
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

  this.shouldComponentUpdate = function(oldState, newState) {
    return (
      oldState.paused !== newState.paused ||
      newState.playbackRequest !== null ||
      newState.seekRequest !== null
    );
  };

  this.update = function() {
    switch (this.state.playbackRequest) {
      case 'play':
        this.video.play();
        break;
      case 'pause':
        this.video.pause();
        break;
    }

    if (this.state.seekRequest !== null) {
      this.video.currentTime = this.state.seekRequest;
    }
  };

  this.after('initialize', function() {

    this.on('click', (e) => {
      this.dispatch(togglePlaybackRequested(this.state.paused));
    });

    this.on('play', (e) => {
      this.dispatch(videoPlay());
    });

    this.on('pause', (e) => {
      this.dispatch(videoPause());
    });

    this.on('durationchange', (e) => {
      this.dispatch(videoDurationChange(this.video.duration));
    });

    this.on('timeupdate', (e) => {
      this.dispatch(videoTimeUpdate(this.video.currentTime));
    });

    this.after('stateChanged', this.update);
    this.video = this.$node[0];
  });

}
export default flight.component(withStore, withFlightCompat, Video);