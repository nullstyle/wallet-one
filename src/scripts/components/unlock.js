import React from 'react';
import {RaisedButton} from "material-ui";
import {SplashScreen} from "./widgets";
import palette from "scripts/palette";

const unlockButtonStyles = {

}

export default class Unlock extends React.Component {

	componentWillMount() {

  }

  render() {
		console.log(palette);
    return <SplashScreen color={palette.main}>
			<RaisedButton 
				label="Unlock" 
				primary={true} 
				style={unlockButtonStyles}
				onMouseUp={this.handleUnlock}
				onTouchEnd={this.handleUnlock}
				/>		
		</SplashScreen>;
  }

	handleUnlock() {
		window.location.hash = "/accounts/123/";
	}
}
