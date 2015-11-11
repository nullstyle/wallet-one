import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import walletOneApp from './reducers/index.js';

import App from './components/app';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

var loadedState = undefined;
var store = createStore(walletOneApp, loadedState);

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />  
  </Provider>,	
  document.getElementById('app')
);

