import React from 'react';
import { connect } from 'react-redux';
import {
  AppBar, Tabs, Tab, FloatingActionButton, 
} from 'material-ui';
import AddIcon from "material-ui/lib/svg-icons/content/add"


import palette from 'scripts/palette';
import {
  BalanceList,
  TransactionList,
  AccountMenu,
  SendForm,
  Loading,
} from "scripts/components";

import {loadAccount, loadAccountSummary} from 'scripts/actions/index'

const style = {
  backgroundColor: palette.main,
};

const addGatewayStyle = {
  position: 'absolute',
  backgroundColor: palette.secondaryButton,
  bottom: 24,
  left: 24,
};


class Home extends React.Component {

  render() {
    let {accounts, dispatch, summaries} = this.props;
    let summary = summaries.byAddress[accounts.current];
    
    if (!summary) {
      dispatch(loadAccountSummary({address: accounts.current}));
      return <Loading />
    }

    return <div>
      <AppBar
        title={accounts.current}
        style={style}
        onLeftIconButtonTouchTap={() => this.handleNavOpen()} />

      <Tabs tabItemContainerStyle={style}>
        <Tab label="Balances">
          <BalanceList summary={summary} />
        </Tab>
        <Tab label="Transactions">
          <TransactionList />
        </Tab>
      </Tabs>

      {this.props.children}

      <FloatingActionButton 
        style={addGatewayStyle} 
        backgroundColor={palette.secondaryButton}>
        <AddIcon />
      </FloatingActionButton>

      <AccountMenu ref={m => this._menu = m}
        accounts={accounts}
        onSelect={m => dispatch(loadAccount(m))}
        />

      <SendForm />

    </div>;
  }

  handleNavOpen() {
    this._menu.toggle();
  }

}

function select(state) {
  return state; 
}

export default connect(select)(Home);
