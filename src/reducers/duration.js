'use strict';

import {
  VIDEO_DURATION_CHANGE
} from '../events';

export default function duration(state = 0, action) {
  switch(action.type) {
    case VIDEO_DURATION_CHANGE:
      return action.duration;
    default:
      return state;
  }
}
