import React from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';

import * as Screen from "./screens.js";

const style = {
	flex: 2,
	position: "relative",
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
