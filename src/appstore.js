'use strict';

import flight         from 'flight';
import withStore      from 'mixin/with_store';

function AppStore() {

  this.attributes({
    store: null
  });
}

export default flight.component(withStore, AppStore);
