'use strict';

import Rx from 'rx';

export default function createStore(reducer, initState) {

  const intent$ = new Rx.Subject();
  let state = initState;

  const store$ = intent$.map(action => {
    state = reducer(state, action);
    return state;
  });

  return {
    dispatch(action) {
      intent$.onNext(action);
    },
    subscribe(...args) {
      return store$.subscribe(...args);
    },
    unsubscribe() {
      intent$.onCompleted();
    }
  };
}