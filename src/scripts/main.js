import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'

import App from './components/app';
import Settings from './components/settings';
import Account from './components/account';
import NoMatch from './components/no-match';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="settings" component={Settings}/>
      <Route path="accounts/:accountId" component={Account} />
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>,	
  document.getElementById('app')
);

