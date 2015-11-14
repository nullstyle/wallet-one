import React from 'react';
import {List, ListItem, ListDivider} from 'material-ui'
import {
  reduce,
  sortBy,
  each,
  without,
  map,
} from 'lodash';

const style = {
};

const balanceAmountStyle = {
	position: 'absolute',
	display: 'block',
	right: 16,
}

const nativeSym = "0";

export default class BalanceList extends React.Component {
  render() {
    if (this.props.summary.isUnfunded) return <div />;
    let data = balancesByGateway(this.props.summary);
    console.log(data);
    let lines = map(data.sorted, (gateway, id) => {
      let assets = data.byGateway[gateway];
      return <Gateway key={id} gateway={gateway} assets={assets} />;
    });
    return <div>{lines}</div>; 
  }
}

let Gateway = (props) => {
  let {gateway, assets} = props;
  let balanceItems = map(assets, (a,i) => <Asset key={i} asset={a} />);
  if (gateway === nativeSym) {
    return <div>{balanceItems}</div>;
  } else {
		return <List subheader={gateway}>{balanceItems}</List>;
  }
}

let Asset = (props) => {
  let {code, balance, asset_type} = props.asset;
  if (asset_type === "native") code = "XLM";

	return <ListItem primaryText={code} >
		<div style={balanceAmountStyle}>{balance}</div>
	</ListItem>;
}

function balancesByGateway(summary) {
  let byGateway = reduce(summary.balances, (acc, balance) => {
    let grouping = balance.asset_issuer || nativeSym;
    let balances = acc[grouping] || [];
    balances.push(balance);
    acc[grouping] = balances;
    return acc;
  }, {});

  let keys = Object.keys(byGateway);
  let sorted = sortBy(keys);
  sorted = [nativeSym].concat(without(sorted, nativeSym));
  

  return {byGateway, sorted};
} 
