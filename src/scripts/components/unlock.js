import React from 'react';
import { connect } from 'react-redux';

import {RaisedButton} from "material-ui";
import {SplashScreen} from "./widgets";
import palette from "scripts/palette";
import {loadState, newRandomAccount} from "scripts/actions/index";


class Unlock extends React.Component {

  render() {
    const { dispatch } = this.props 

    return <SplashScreen color={palette.main}>
			<RaisedButton 
				label="Unlock" 
				primary={true} 
				onMouseUp={() => dispatch(loadState())}
				onTouchEnd={() => dispatch(loadState())}
				/>		
			<RaisedButton 
				label="Create Account" 
				primary={true} 
				onMouseUp={() => dispatch(newRandomAccount())}
				onTouchEnd={() => dispatch(newRandomAccount())}
				/>	
		</SplashScreen>;
  }
}

function select(state) {
  return {}; //TODO: return list of accounts known to this client
}

export default connect(select)(Unlock)
