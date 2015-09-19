'use strict';

import { createStore } from 'redux';
import playerApp from './reducers';
import {
  pauseRequested,
  playRequested,
  seekRequested,
  togglePlayback,
  videoDurationChange,
  videoPause,
  videoPlay,
  videoTimeUpdate
} from './actions';

let store = createStore(playerApp);
// let store = createStore(playerApp, window.STATE_FROM_SERVER);

// Log the initial state
console.log(store.getState());

// Every time the state changes, log it
let unsubscribe = store.subscribe(() =>{
  console.log(store.getState());
});

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
unsubscribe();