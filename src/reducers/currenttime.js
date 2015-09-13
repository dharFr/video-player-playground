'use strict';

import {
  VIDEO_TIME_UPDATE
} from '../events';

export default function currentTime(state = 0, action) {
  switch(action.type) {
    case VIDEO_TIME_UPDATE:
      return action.time;
    default:
      return state;
  }
}