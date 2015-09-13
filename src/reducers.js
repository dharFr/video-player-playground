'use strict';

import { combineReducers } from 'redux';
import {
  PAUSE_REQUESTED,
  PLAY_REQUESTED,
  SEEK_REQUESTED,
  TOGGLE_PLAYBACK_REQUESTED,
  VIDEO_DURATION_CHANGE,
  VIDEO_PAUSE,
  VIDEO_PLAY,
  VIDEO_TIME_UPDATE
} from './events';

import currentTime     from './reducers/currenttime';
import duration        from './reducers/duration';
import paused          from './reducers/paused';
import playbackRequest from './reducers/playbackrequest';
import seekRequest     from './reducers/seekrequest';

const playerApp = combineReducers({
  currentTime,
  duration,
  paused,
  playbackRequest,
  seekRequest
});

export default playerApp;
