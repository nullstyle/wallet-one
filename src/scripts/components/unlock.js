import React from 'react';
import { connect } from 'react-redux';

import {RaisedButton} from "material-ui";
import {SplashScreen} from "./widgets";
import palette from "scripts/palette";
import {loadAccount} from "scripts/actions/index";

const unlockButtonStyles = {

}

class Unlock extends React.Component {

	componentWillMount() {

  }

  render() {
    const { dispatch } = this.props 

    return <SplashScreen color={palette.main}>
			<RaisedButton 
				label="Unlock" 
				primary={true} 
				style={unlockButtonStyles}
				onMouseUp={() => this.handleUnlock(dispatch)}
				onTouchEnd={() => this.handleUnlock(dispatch)}
				/>		
		</SplashScreen>;
  }

	handleUnlock(dispatch) {
    dispatch(loadAccount("GBS43BF24ENNS3KPACUZVKK2VYPOZVBQO2CISGZ777RYGOPYC2FT6S3K"));
    window.location.hash = "/home"
	}
}

function select(state) {
  return {}; //TODO: return list of accounts known to this client
}

export default connect(select)(Unlock)
