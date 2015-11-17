import React from 'react';
import {extend} from 'lodash'
import {FloatingActionButton} from 'material-ui';
import SendIcon from "material-ui/lib/svg-icons/editor/attach-money";

import {age} from "b:time";

export function Age(props) {
	let {of} = props
	return <div style={{whiteSpace: "nowrap"}}>
		{age(of)}
	</div>
}

// Loading is a loading screen
export function Loading(props) {
	return <div>Loading...</div>
}


// SendButton provides a floating action button with a dollar sign icon
export function SendButton(props) {
	return <FloatingActionButton
		style={sendStyle}
		onTouchTap={props.onClick}>
		<SendIcon />
	</FloatingActionButton>
}

const sendStyle = {
	position: 'absolute',
	bottom: 24,
	right: 24,
};

// SplashScreen filles it's parent
export function SplashScreen(props) {
	let styles = extend(splashStyles, {
		background: props.color,
	})
	return <div style={styles}>{props.children}</div>
}

const splashStyles = {
	width:          '100%',
	height:         '100%',
	margin:         '0',
	padding:        '0',
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
	position:       'absolute',
}
