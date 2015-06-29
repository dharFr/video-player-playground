'use strict';

import $              from 'jquery';
import Video          from './ui/video.js';
import PlaybackButton from './ui/playbackbutton.js';
import TimeInfo       from './ui/timeinfo.js';
import Seekbar        from './ui/seekbar.js';
import PlaybackInfo   from './ui/playbackinfo.js';

// Data components
// UI components
PlaybackButton.attachTo('#playback-btn');
TimeInfo.attachTo('#timeinfo');
Seekbar.attachTo('#seekbar');
PlaybackInfo.attachTo('#info');
Video.attachTo('#video');
