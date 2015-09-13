'use strict';

import {
  VIDEO_PAUSE,
  VIDEO_PLAY
} from '../events';

export default function paused(state = true, action) {
  switch(action.type) {
    case VIDEO_PAUSE:
      return true;
    case VIDEO_PLAY:
      return false;
    default:
      return state;
  }
}