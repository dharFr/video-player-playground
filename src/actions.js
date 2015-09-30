'use strict';

/**
 * Action types (aka Flight events)
 */
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

/**
 * Action creators
 */
export function pauseRequested() {
  return { type: PAUSE_REQUESTED };
}

export function playRequested() {
  return { type: PLAY_REQUESTED };
}

export function seekRequested(time) {
  return { type: SEEK_REQUESTED, time };
}

export function togglePlaybackRequested(paused) {
  return { type: TOGGLE_PLAYBACK_REQUESTED, paused };
}

export function videoDurationChange(duration) {
  return { type: VIDEO_DURATION_CHANGE, duration };
}

export function videoPause() {
  return { type: VIDEO_PAUSE };
}

export function videoPlay() {
  return { type: VIDEO_PLAY };
}

export function videoTimeUpdate(time) {
  return { type: VIDEO_TIME_UPDATE, time };
}