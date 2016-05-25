'use strict';

import Rx from 'rx';

import combineReducers from './combineReducers';
import createStore     from './createStore';

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

import {
  pauseRequested,
  playRequested,
  seekRequested,
  togglePlayback,
  videoDurationChange,
  videoPause,
  videoPlay,
  videoTimeUpdate
} from '../actions';


import currentTime     from '../reducers/currenttime';
import duration        from '../reducers/duration';
import paused          from '../reducers/paused';
import playbackRequest from '../reducers/playbackrequest';
import seekRequest     from '../reducers/seekrequest';


const playerApp = combineReducers({
  currentTime,
  duration,
  paused,
  playbackRequest,
  seekRequest
});

const store = createStore(playerApp, {});
const subscription = store.subscribe(
  function(state) {
    console.log('RX State changed:', state);
  },
  function(err) {
    console.log('RX State Error:', err);
  },
  function() {
    console.log('RX State Completed');
  }
);

store.dispatch(videoDurationChange(25));
store.dispatch(playRequested());
store.dispatch(videoPlay());
store.dispatch(videoTimeUpdate(1));
store.dispatch(videoTimeUpdate(2));
store.dispatch(videoTimeUpdate(3));
store.dispatch(videoTimeUpdate(4));
store.dispatch(seekRequested(20));
store.dispatch(videoTimeUpdate(20));
store.dispatch(videoTimeUpdate(21));
store.dispatch(videoTimeUpdate(23));
store.dispatch(videoTimeUpdate(24));
store.dispatch(videoTimeUpdate(25));

// Stop listening to state updates
store.unsubscribe();


