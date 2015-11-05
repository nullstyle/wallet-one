import React from 'react';

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
			{this.props.children}
		</div>;
  }
}
