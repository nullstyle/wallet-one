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
import DevTools from './dev-tools.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
import spec, * as s2 from './spec';
global.spec = spec;
spec.fn = s2;

injectTapEventPlugin();

let createStoreWithMiddleware = applyMiddleware(thunk, wallet, logger)(createStore)
var store = createStoreWithMiddleware(walletOneApp);

const style = {
  display:       'flex',
  flexDirection: 'row-reverse',
  height:        "100%",
  position:      "relative",
};

defer(() => {
  store.dispatch(loadState());

  ReactDOM.render(
    <Provider store={store}>
      <div style={style}>
        <DevTools />
        <UI />
      </div>
    </Provider>,
    document.getElementById('app')
  );
});
