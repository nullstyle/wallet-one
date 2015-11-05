import React from 'react';
import {
	AppBar, Tabs, Tab, FloatingActionButton, LeftNav, Dialog,
	TextField, SelectField, 
} from 'material-ui';

import {
	MenuItem, SubheaderMenuItem, LinkMenuItem, Menu
} from "material-ui/lib/menu";

import MenuDivider from "material-ui/lib/menus/menu-divider";

import palette from 'scripts/palette';
import BalanceList from './balance_list';
import TransactionList from './transaction_list';
import AddIcon from "material-ui/lib/svg-icons/content/add"
import {SendButton} from 'scripts/components/widgets';

const style = {
	backgroundColor: palette.main,
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


			<SendButton onClick={() => this.refs.sendForm.show()} />

			<FloatingActionButton 
				style={addGatewayStyle} 
				backgroundColor={palette.secondaryButton}>
				<AddIcon />
			</FloatingActionButton>

			<LeftNav ref="nav" docked={false}>
				<Menu 
					onItemTap={(e,i,m) => this.switchAccount(m.id)}
					menuItems={[
						{ text: 'Accounts',  type: MenuItem.Types.SUBHEADER},
						{ text: 'Account 1', id: "1"},
						{ text: 'Account 2', id: "2"},
						]}
					/>
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

	switchAccount(accountId) {
		window.location.hash = `/accounts/${accountId}/`;
		this.refs.nav.close();
	}
}
