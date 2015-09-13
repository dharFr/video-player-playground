'use strict';

import $              from 'jquery';
import Video          from './ui/video';
import PlaybackButton from './ui/playbackbutton';
import TimeInfo       from './ui/timeinfo';
import Seekbar        from './ui/seekbar';
import PlaybackInfo   from './ui/playbackinfo';

// Data components
// UI components
PlaybackButton.attachTo('#playback-btn');
TimeInfo.attachTo('#timeinfo');
Seekbar.attachTo('#seekbar');
PlaybackInfo.attachTo('#info');
Video.attachTo('#video');
