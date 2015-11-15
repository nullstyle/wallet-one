import React from 'react';
import {each, findIndex} from 'lodash';
import { LeftNav, Menu } from 'material-ui';

export default class AccountMenu extends React.Component {

  render() {
    let {accounts} = this.props;

    let menuItems = [{ text: 'Accounts',  type: "SUBHEADER"}];

    each(accounts.byAddress, (account) => {
      let {address, seed} = account;
      menuItems.push({text: address, address, seed})
    });

    let selectedIndex = findIndex(menuItems, {address: accounts.current});

    return <LeftNav ref={n => this._nav = n} docked={false}>
      <Menu 
        onItemTap={(e,i,m) => this.props.onSelect(m)}
        menuItems={menuItems}
        selectedIndex={selectedIndex}
        />
    </LeftNav>;
  }

  toggle() {
    this._nav.toggle();
  }
}
