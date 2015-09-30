'use strict';

function withFlightCompat() {
  /*jshint validthis: true */

  this.after('dispatch', function(action) {

    let data = {};
    Object.keys(action)
      .filter  (k => k !== 'type')
      .forEach (k => data[k] = action[k]);

    this.trigger(action.type, data);
  });
}
// return the mixin function
export default withFlightCompat;
