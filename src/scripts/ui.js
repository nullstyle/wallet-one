import React from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';

import * as Screen from "scripts/screens.js";

const style = {
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
};

export default class UI extends React.Component {
  render() {
    return <div style={style}>
      <Router>
        <Route path="/" component={Screen.Unlock} />
        <Route path="/home" component={Screen.Home}>
          
        </Route>
        <Route path="/settings" component={Screen.Settings} />
      </Router>
		</div>;
  }
}
