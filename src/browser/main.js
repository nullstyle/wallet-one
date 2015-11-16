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

injectTapEventPlugin();

let createStoreWithMiddleware = applyMiddleware(thunk, wallet, logger)(createStore)
var store = createStoreWithMiddleware(walletOneApp);

const style = {
  display:       'flex',
  flexDirection: 'row-reverse',
  height:        "100%",
  position:      "relative",
};

let devToolsVisible = false;
global.toggleDevTools = () => {
  devToolsVisible = !devToolsVisible;
  render();
}

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <div style={style}>
        <DevTools isVisible={devToolsVisible} />
        <UI />
      </div>
    </Provider>,
    document.getElementById('app')
  );
}

defer(() => {
  store.dispatch(loadState());
  render();
});
