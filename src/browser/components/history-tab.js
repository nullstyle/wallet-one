import React from 'react';
import {List, ListItem, ListDivider, Tab} from 'material-ui';
import ReceiveIcon from "material-ui/lib/svg-icons/content/add-circle-outline";
import SendIcon from "material-ui/lib/svg-icons/content/remove-circle-outline";

import {AccountName, Age} from "b:components";

export default class HistoryTab extends React.Component {
  render() {
    let lines = [
      <Payment />,
      <ListDivider />,
      <PathPayment />,
      <ListDivider />,
      <CreateAccount />,
      <ListDivider />,
    ];

    return <List>{lines}</List>;
  }
}

const Payment = (props) => {
  let {source_account, ledger_closed_at} = props;
  source_account = "GASDASDASDAASDASDASDKMASKMASDKMASKDM";
  ledger_closed_at = "2015-10-09T00:40:04Z";

  let style = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }
  let messageStr = `10.0 XLM from ${source_account}`;
  let message = <div style={style}>
    <strong>10023.00 XLM</strong>
    &nbsp; from &nbsp;
    {source_account}
  </div>;

  return <ListItem
    primaryText={message}
    leftIcon={<ReceiveIcon />}
    rightIcon={<Age of={ledger_closed_at} />}
    />;
}

const PathPayment = (props) => {
  return <ListItem
    primaryText="path payment"
    leftIcon={<SendIcon />}
     />
}

const CreateAccount = (props) => {
  return <ListItem
    primaryText="create account"
    leftIcon={<SendIcon />}
     />
}


// History item designs
// Conceptually, the history tab can be in one of 4 modes:
//   - transaction
//   - operation
//   - payments
//   - effects
//
//  When in transaction mode, one
