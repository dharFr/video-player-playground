'use strict';

function withStore() {
  /*jshint validthis: true */

  this.attributes({
    store: null
  });
  this._unsubscribe = null;
  this.state = null;

  this.dispatch = function(action) {
    this.attr.store.dispatch(action);
  };

  this.getState = function() {
    this.attr.store.getState();
  };

  this.subscribe = function() {

    this.unsubscribe = this.attr.store.subscribe(() => {
      let oldState = this.state;
      this.state = this.attr.store.getState();
      if (this.shouldComponentUpdate(oldState, this.state)) {
        this.stateChanged();
      }
    });
  };

  // this.shouldComponentUpdate = (oldState, newState) => true;
  this.stateChanged = () => {};
  this.unsubscribe = () => {};

  this.after('initialize', function() {

    this.subscribe();

    this.state = this.attr.store.getState();
    this.stateChanged();
  });

  this.before('teardown', function() {
    this.unsubscribe();
  });
}
// return the mixin function
export default withStore;
