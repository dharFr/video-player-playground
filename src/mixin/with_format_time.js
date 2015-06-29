'use strict';

function _splitTime(num) {

  const secNum  = parseInt(num, 10);
  const hours   = Math.floor(secNum / 3600);
  const minutes = Math.floor((secNum - (hours * 3600)) / 60);
  const seconds = secNum - (hours * 3600) - (minutes * 60);

  return [hours, minutes, seconds];
}

function _zeroPad(num) {
  return (num < 10) ? `0${num}` : num;
}

function withFormatTime() {
  /*jshint validthis: true */

  this.formatTime = function(num) {
    const [hours, minutes, seconds] = _splitTime(num);
    let time = `${_zeroPad(minutes)}:${_zeroPad(seconds)}`;

    if (hours > 0) {
      time = `${hours}:${time}`;
    }

    return time;
  };
}


// return the mixin function
export default withFormatTime;
