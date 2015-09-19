'use strict';

import $              from 'jquery';
import logger         from './middleware/logger';
import Video          from './ui/video';
import PlaybackButton from './ui/playbackbutton';
import TimeInfo       from './ui/timeinfo';
import Seekbar        from './ui/seekbar';
import PlaybackInfo   from './ui/playbackinfo';

// import './store-test';
import { createStore, applyMiddleware } from 'redux';
import playerApp from './reducers';

// applyMiddleware takes createStore() and returns
// a function with a compatible API.
let createStoreWithMiddleware = applyMiddleware(logger)(createStore);

// Use it like you would use createStore()
let store = createStoreWithMiddleware(playerApp);

// Data components
// UI components
PlaybackButton.attachTo('#playback-btn', {store});
TimeInfo.attachTo('#timeinfo', {store});
Seekbar.attachTo('#seekbar', {store});
PlaybackInfo.attachTo('#info', {store});
Video.attachTo('#video', {store});
