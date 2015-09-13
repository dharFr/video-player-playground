'use strict';
import {
  PLAY_REQUESTED,
  PAUSE_REQUESTED,
  TOGGLE_PLAYBACK_REQUESTED,
  VIDEO_PAUSE,
  VIDEO_PLAY
} from '../events';

// 'play'|'pause' back to null once the playback has been updated
export default function playbackRequest(state = null, action) {
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