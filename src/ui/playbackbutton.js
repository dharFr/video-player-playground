'use strict';

import flight from 'flight';

function PlaybackButton() {

  this.showPlayIcon = function() {
    this.$node.html('▶︎');
  };

  this.showPauseIcon = function() {
    this.$node.html('II');
  };

  this.after('initialize', function() {

    this.on('click', (e) => {
      this.trigger('toggle_playback_requested');
    });

    this.on('#root', 'video_play', (e) => {
      this.showPauseIcon();
    });

    this.on('#root', 'video_pause', (e) => {
      this.showPlayIcon();
    });
  });
}
export default flight.component(PlaybackButton);
