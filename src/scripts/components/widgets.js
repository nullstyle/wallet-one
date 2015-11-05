import React from 'react';
import {extend} from 'lodash'

const splashStyles = {
	width: '100%',
	height: '100%',
	margin: '0',
	padding: '0',
}

export function SplashScreen(props) {
	let styles = extend(splashStyles, {
		background: props.color,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	})
	return <div style={styles}>{props.children}</div>
}
