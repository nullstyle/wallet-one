import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router'

import App from './components/app';
import Settings from './components/settings';
import Account from './components/account';
import NoMatch from './components/no-match';
import Unlock from './components/unlock';
import Home from './components/home';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
			<IndexRoute component={Unlock}/>
      <Route path="accounts/:accountId/" component={Account}>
				<Route path="home" component={Home}/>
				<Route path="settings" component={Settings}/>
			</Route>
    </Route>
  </Router>,	
  document.getElementById('app')
);

