'use strict';

let store;

function withReduxStore() {
  /*jshint validthis: true */

  this._unsubscribe = null;
  this.state = null;

  this.dispatch = function(action) {
    store.dispatch(action);
  };

  this.getState = function() {
    store.getState();
  };

  this.subscribe = function() {

    this.unsubscribe = store.subscribe((state) => {
      let oldState = this.state;
      this.state = state || store.getState();
      if (oldState == null || this.shouldComponentUpdate(oldState, this.state)) {
        this.stateChanged();
      }
    });
  };

  // this.shouldComponentUpdate = (oldState, newState) => true;
  this.stateChanged = () => {};
  this.unsubscribe = () => {};

  this.after('initialize', function() {

    if (store == null && this.attr.store == null) {
      throw new Error('Redux store is not defined');
    }
    else if (store == null && this.attr.store) {
      store = this.attr.store;
    }
    else {
      this.subscribe();

      if (typeof store.getState == 'function') {
        this.state = store.getState();
        this.stateChanged();
      }
    }
  });

  this.before('teardown', function() {
    this.unsubscribe();
  });
}
// return the mixin function
export default withReduxStore;
