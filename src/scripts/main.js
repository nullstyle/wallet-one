import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { defer } from 'lodash';

import walletOneApp from './reducers/index';
import {loadState} from './actions/index';
import wallet from "./middleware/wallet";
import logger from "./middleware/logger";

import UI from './ui.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
import test, {runUnits} from 'test';
global.test = test;
global.runUnits = runUnits;
console.log(test);

let {expect} = test;
test.unit.describe("x", c => {
  c("y", i => {
    i("z", () => {
      expect(3).to.equal(4);
      expect(3).to.equal(3);
      expect(3).to.equal(5);
    })
  })
})

injectTapEventPlugin();

let createStoreWithMiddleware = applyMiddleware(thunk, wallet, logger)(createStore)
var store = createStoreWithMiddleware(walletOneApp);


defer(() => {
  store.dispatch(loadState());

  ReactDOM.render(
    <Provider store={store}>
      <UI />
    </Provider>,
    document.getElementById('app')
  );
});
