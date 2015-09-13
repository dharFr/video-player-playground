'use strict';

import {
  SEEK_REQUESTED,
  VIDEO_TIME_UPDATE
} from '../events';

// seek request. back to 0 once the time has been updated
export default function seekRequest(state = null, action) {
  switch(action.type) {
    case SEEK_REQUESTED:
      return action.time;
    case VIDEO_TIME_UPDATE:
      return null;
    default:
      return state;
  }
}