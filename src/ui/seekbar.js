'use strict';

import flight    from 'flight';
import withState from 'with-state';
import withStore from 'mixin/with_redux_store';
import {
  seekRequested
} from '../actions';
import {
  SEEK_REQUESTED,
  VIDEO_DURATION_CHANGE,
  VIDEO_TIME_UPDATE
} from '../events';

function Seekbar() {

  this.shouldComponentUpdate = function(oldState, newState) {
    return (
      oldState.duration    !== newState.duration ||
      oldState.currentTime !== newState.currentTime
    );
  };

  this.update = function() {

    if (this.$node.attr('max') !== this.state.duration) {
      this.$node.attr('max', this.state.duration);
    }

    if (this.$node.val() !== this.state.currentTime){
      this.$node.val(this.state.currentTime);
    }
  };

  this.after('initialize', function() {

    // Track changes to the state using advice
    this.after('stateChanged', this.update);

    // Start drag
    this.on('mousedown', (e) => {
      this.unsubscribe();
    });

    // Stop drag
    this.on('mouseup', (e) => {
      this.dispatch(seekRequested(this.$node.val()));
      this.subscribe();
    });
  });
}
export default flight.component(withState, withStore, Seekbar);