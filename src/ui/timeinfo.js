'use strict';

import flight         from 'flightjs';
import withFormatTime from '../mixin/with_format_time.js';

function TimeInfo() {

  this.attributes({
    timeSelector     : '.time',
    durationSelector : '.duration'
  });

  this.after('initialize', function() {

    this.on('#root', 'video_duration_change', (e, data) => {
      this.duration = this.formatTime(data.duration);
      this.durationNode.text(this.duration);
    });

    this.on('#root', 'video_time_update', (e, data) => {
      this.time = this.formatTime(data.time);
      this.timeNode.text(this.time);
    });

    this.time         = this.formatTime(0);
    this.timeNode     = this.select('timeSelector');
    this.duration     = this.formatTime(0);
    this.durationNode = this.select('durationSelector');

    this.timeNode.text(this.time);
    this.durationNode.text(this.duration);
  });
}
export default flight.component(TimeInfo, withFormatTime);