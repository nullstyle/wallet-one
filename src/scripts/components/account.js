import React from 'react';
import {
	AppBar, Tabs, Tab, FloatingActionButton, LeftNav, MenuItem, Dialog,
	TextField, SelectField,
} from 'material-ui';
import palette from 'scripts/palette';
import BalanceList from './balance_list';
import TransactionList from './transaction_list';
import SendIcon from "material-ui/lib/svg-icons/editor/attach-money"
import AddIcon from "material-ui/lib/svg-icons/content/add"

const style = {
	backgroundColor: palette.main,
};

const sendStyle = {
	position: 'absolute',
	bottom: 24,
	right: 24,
};

const addGatewayStyle = {
	position: 'absolute',
	backgroundColor: palette.secondaryButton,
	bottom: 24,
	left: 24,
};



export default class Account extends React.Component {

	constructor(props) {
    super(props);
    this.state = {asset: null};
  }

  render() {
		let sendFormAssets = [
			{payload: 0, text: 'XLM'},
			{payload: 1, text: 'USD/GCDSRTDSFRSD...'},
			{payload: 1, text: 'JPY/onecred.org'},
		]

		let sendFormActions = [
			{ text: 'Cancel' },
			{ text: 'Submit', onTouchTap: () => {console.log("beep")} }
		]

    return <div>
			<AppBar
				title={this.props.params.accountId}
				style={style}
				onLeftIconButtonTouchTap={() => this.handleNavOpen()} />
			<Tabs tabItemContainerStyle={style}>
				<Tab label="Balances">
					<BalanceList />
				</Tab>
				<Tab label="Transactions">
					<TransactionList />
				</Tab>
			</Tabs>
			{this.props.children}

			<FloatingActionButton 
				style={sendStyle}
				onTouchTap={() => this.refs.sendForm.show()}>
				<SendIcon />
			</FloatingActionButton>

			<FloatingActionButton 
				style={addGatewayStyle} 
				backgroundColor={palette.secondaryButton}>
				<AddIcon />
			</FloatingActionButton>

			<LeftNav ref="nav" docked={false}>
				<MenuItem index={0}>Menu Item</MenuItem>
				<MenuItem index={1}><a href="/link">Link</a></MenuItem>
			</LeftNav>

			<Dialog title="Send Money" ref="sendForm" actions={sendFormActions}>
				<TextField hintText="Recipient" />
				<TextField hintText="Amount" />
				<SelectField
					value={this.state.asset}
					hintText="Asset"
					menuItems={sendFormAssets} />
			</Dialog>
		</div>;
  }

	handleNavOpen() {
		this.refs.nav.toggle();
	}
}
