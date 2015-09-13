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
} from '../events';

// 'play'|'pause' back to null once the playback has been updated
function playbackRequest(state = null, action) {
  switch(action.type) {
    case PLAY_REQUESTED:
      return 'play';
    case PAUSE_REQUESTED:
      return 'pause';
    case TOGGLE_PLAYBACK_REQUESTED:
      return (action.paused) ? 'play' : 'pause';
    case VIDEO_PAUSE:
      return (state == 'pause') ? null : state;
    case VIDEO_PLAY:
      return (state == 'play') ? null : state;
    default:
      return state;
  }
}

function paused(state = true, action) {
  switch(action.type) {
    case VIDEO_PAUSE:
      return true;
    case VIDEO_PLAY:
      return false;
    default:
      return state;
  }
}

// seek request. back to 0 once the time has been updated
function seekRequest(state = 0, action) {
  switch(action.type) {
    case SEEK_REQUESTED:
      return action.time;
    case VIDEO_TIME_UPDATE:
      return 0;
    default:
      return state;
  }
}

function currentTime(state = 0, action) {
  switch(action.type) {
    case VIDEO_TIME_UPDATE:
      return action.time;
    default:
      return state;
  }
}


function duration(state = 0, action) {
  switch(action.type) {
    case VIDEO_TIME_UPDATE:
      return action.time;
    default:
      return state;
  }
}

const playerApp = combineReducers({
  playbackRequest,
  paused,
  seekRequest,
  currentTime,
  duration
});