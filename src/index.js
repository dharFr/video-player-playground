'use strict';

import $              from 'jquery';
import logger         from './middleware/logger';
import AppStore       from './appstore';
import Video          from './ui/video';
import PlaybackButton from './ui/playbackbutton';
import TimeInfo       from './ui/timeinfo';
import Seekbar        from './ui/seekbar';
import PlaybackInfo   from './ui/playbackinfo';

// We don't want a distinct ckunk, just conditionnal loading
// load the module right now, use it later if neccessary
require('./rx/createStore');

// const reduxOrRx = 'redux';
const reduxOrRx = 'rx';

if (reduxOrRx === 'redux') {

  require.ensure(['redux'], (require) => {
    gogogo(require('redux'));
  });
}
else {
  require.ensure(['./rx/createStore'], (require) => {
    gogogo({ createStore : require('./rx/createStore').default });
  });
}


import playerApp from './reducers';

// import './redux/store-test';
// import './rx/store-test';

function gogogo({ createStore, applyMiddleware }) {

  let createStoreFunction;

  if (reduxOrRx === 'redux') {
    // applyMiddleware takes createStore() and returns
    // a function with a compatible API.
    createStoreFunction = applyMiddleware(logger)(createStore);
  }
  else {
    createStoreFunction = createStore;
  }

  let store = createStoreFunction(playerApp);


  // Data components
  AppStore.attachTo(document, {store});

  // UI components
  PlaybackButton.attachTo('#playback-btn');
  TimeInfo.attachTo('#timeinfo');
  Seekbar.attachTo('#seekbar');
  PlaybackInfo.attachTo('#info');
  Video.attachTo('#video');
}
