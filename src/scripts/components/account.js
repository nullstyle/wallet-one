import React from 'react';

export default class Account extends React.Component {
  render() {
    return <div>
			Account:
			{this.props.params.accountId}	
		</div>;
  }
}
