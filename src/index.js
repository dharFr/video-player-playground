'use strict';

import $              from 'jquery';
import logger         from './middleware/logger';
import AppStore       from './appstore';
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
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

// Use it like you would use createStore()
const store = createStoreWithMiddleware(playerApp);

// Data components
AppStore.attachTo(document, {store});

// UI components
PlaybackButton.attachTo('#playback-btn');
TimeInfo.attachTo('#timeinfo');
Seekbar.attachTo('#seekbar');
PlaybackInfo.attachTo('#info');
Video.attachTo('#video');
