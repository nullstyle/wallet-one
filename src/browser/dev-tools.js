import React from 'react';
import { connect } from 'react-redux';
import {
	Paper, List, ListItem,
} from "material-ui";

import ActionDone from "material-ui/lib/svg-icons/action/done";

import {SpecMenu} from "./spec/components";
import {specStatusChanged} from "./spec/actions";
import spec, {loadSpecs, runSpecs} from "./spec";


const devToolStyles = {
	flex:          1,
	maxWidth:      300,
	minWidth:      200,
	height:        "100%",
	display:       "flex",
	flexDirection: "column",
	zIndex:        10,
};

class DevTools extends React.Component {
	componentWillMount() {
		loadSpecs();
		let cases = spec.cases;
		let action = specStatusChanged(cases);
		this.props.dispatch(action);
	}

  render() {
		let display = this.props.isVisible ? 'flex' : 'none';
		let style = Object.assign({}, devToolStyles, {display});
    return <Paper id="devtools" zDepth={3} style={style}>
			<List subheader="Developer Tools">
				<SpecMenu
					cases={this.props.cases}
					onTouchTap={c => this.handleTap(c)}
					/>
			</List>
		</Paper>;
  }

	handleTap(category) {
		runSpecs(category);
		let cases = spec.cases;
		let action = specStatusChanged(cases);
		this.props.dispatch(action);
	}
}

function select(state) {
	let {cases} = state.spec;
	return {cases};
}

export default connect(select)(DevTools);
