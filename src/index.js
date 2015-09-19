'use strict';

import $              from 'jquery';
import Video          from './ui/video';
import PlaybackButton from './ui/playbackbutton';
import TimeInfo       from './ui/timeinfo';
import Seekbar        from './ui/seekbar';
import PlaybackInfo   from './ui/playbackinfo';

// import './store-test';
import { createStore } from 'redux';
import playerApp from './reducers';

let store = createStore(playerApp);

// Data components
// UI components
PlaybackButton.attachTo('#playback-btn', {store});
TimeInfo.attachTo('#timeinfo', {store});
Seekbar.attachTo('#seekbar', {store});
PlaybackInfo.attachTo('#info', {store});
Video.attachTo('#video', {store});
