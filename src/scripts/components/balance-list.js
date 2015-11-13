import React from 'react';
import {List, ListItem, ListDivider} from 'material-ui'

const style = {
};

const balanceAmountStyle = {
	position: 'absolute',
	display: 'block',
	right: 16,
}

export default class BalanceList extends React.Component {
  render() {
    return <div>
			<List>
				<BalanceItem code="XLM" amount="100.001" />
			</List>
			<ListDivider />
			<List subheader="onecred.org">
				<BalanceItem code="USD" amount="10.00" />
				<BalanceItem code="EUR" amount="100213.001" />
				<BalanceItem code="JPY" amount="1.13333" />
			</List>
			<ListDivider />
			<List subheader="somewhere.org">
				<BalanceItem code="XLM" amount="10.00" />
			</List>
		</div>;
  }
}

let BalanceItem = (props) => {
	return <ListItem primaryText={props.code} >
		<div style={balanceAmountStyle}>{props.amount}</div>
	</ListItem>
}
