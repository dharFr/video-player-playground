'use strict';

let store;

function withStore() {
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

    this.unsubscribe = store.subscribe(() => {
      let oldState = this.state;
      this.state = store.getState();
      if (this.shouldComponentUpdate(oldState, this.state)) {
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

      this.state = store.getState();
      this.stateChanged();
    }
  });

  this.before('teardown', function() {
    this.unsubscribe();
  });
}
// return the mixin function
export default withStore;
