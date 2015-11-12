import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import walletOneApp from './reducers/index';
import {loadState} from './actions/index';
import wallet from "./middleware/wallet";
import logger from "./middleware/logger";

import App from './components/app';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let createStoreWithMiddleware = applyMiddleware(thunk, wallet, logger)(createStore)
var store = createStoreWithMiddleware(walletOneApp);

store.dispatch(loadState());


ReactDOM.render(
  <Provider store={store}>
    <App />  
  </Provider>,	
  document.getElementById('app')
);

