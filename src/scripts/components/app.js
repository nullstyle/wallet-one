import React from 'react';
import {AppBar, Tabs, Tab} from 'material-ui';
import { Router, Route, Link } from 'react-router'

export default class App extends React.Component {
  render() {
    return <div>
			<AppBar
				title="Wallet One"
				onLeftIconButtonTouchTap={this.handleNavOpen} />
			here
			{this.props.children}
		</div>;
  }

	handleNavOpen() {
		console.log("here")
	}
}
