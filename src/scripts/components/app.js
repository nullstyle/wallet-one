import React from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';


import Settings from './settings';
import Account from './account';
import Unlock from './unlock';

const style = {
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
};

export default class App extends React.Component {
  render() {
    return <div style={style}>
      <Router>
        <Route path="/" component={Unlock} />
        <Route path="/home" component={Account}>
          
        </Route>
        <Route path="/settings" component={Settings} />
      </Router>
		</div>;
  }
}
