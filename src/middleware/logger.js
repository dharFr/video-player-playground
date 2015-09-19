'use strict';

const logger = store => next => action => {
  console.groupCollapsed('dispatching', action.type);
  console.log('Action:', action);
  let result = next(action);
  console.log('Next State:', store.getState());
  console.groupEnd();
  return result;
};

export default logger;