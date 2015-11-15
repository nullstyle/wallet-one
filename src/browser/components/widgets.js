import React from 'react';
import {extend} from 'lodash'
import {FloatingActionButton} from 'material-ui';
import SendIcon from "material-ui/lib/svg-icons/editor/attach-money";

// Loading is a loading screen
export function Loading(props) {
	return <div>Loading...</div>
}

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
