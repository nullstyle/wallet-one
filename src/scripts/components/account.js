import React from 'react';
import { connect } from 'react-redux';
import {each, findIndex} from 'lodash';
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
import AccountMenu from './account-menu';
import AddIcon from "material-ui/lib/svg-icons/content/add"
import {SendButton} from 'scripts/components/widgets';
import {loadAccount} from 'scripts/actions/index'

const style = {
  backgroundColor: palette.main,
};

const addGatewayStyle = {
  position: 'absolute',
  backgroundColor: palette.secondaryButton,
  bottom: 24,
  left: 24,
};


class Account extends React.Component {

  render() {
    let {accounts, dispatch} = this.props;

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
        title={accounts.current}
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

      <AccountMenu ref={m => this._menu = m}
        accounts={accounts}
        onSelect={m => dispatch(loadAccount(m))}
        />


      <Dialog title="Send Money" ref="sendForm" actions={sendFormActions}>
        <TextField hintText="Recipient" />
        <TextField hintText="Amount" />
        <SelectField
          value={null}
          hintText="Asset"
          menuItems={sendFormAssets} />
      </Dialog>
    </div>;
  }

  handleNavOpen() {
    this._menu.toggle();
  }

}

function select(state) {
  return state; 
}

export default connect(select)(Account);
