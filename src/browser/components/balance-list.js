import React from 'react';
import {List, ListItem, ListDivider} from 'material-ui';
import {
  reduce,
  sortBy,
  each,
  without,
  map,
} from 'lodash';
import {addSpecs} from "b:spec";

const style = {
};

const balanceAmountStyle = {
	position: 'absolute',
	display: 'block',
	right: 16,
};

const nativeSym = "0";

export default class BalanceList extends React.Component {
  render() {
    if (this.props.summary.isUnfunded) return (<div />);

    let data = balancesByGateway(this.props.summary);
    let lines = map(data.sorted, (gateway, id) => {
      let assets = data.byGateway[gateway];
      return <Gateway key={id} gateway={gateway} assets={assets} />;
    });

    return <div>{lines}</div>;
  }
}

let Gateway = (props) => {
  let {gateway, assets} = props
  let balanceItems = map(assets, (a,i) => <Asset key={i} asset={a} />);
  if (gateway === nativeSym) {
    return <div>{balanceItems}</div>;
  } else {
		return <List subheader={gateway}>{balanceItems}</List>;
  }
}

let Asset = (props) => {
  let {asset_code, balance, asset_type} = props.asset;
  if (asset_type === "native") asset_code = "XLM";

	return <ListItem primaryText={asset_code} >
		<div style={balanceAmountStyle}>{balance}</div>
	</ListItem>;
}

function balancesByGateway(summary) {
  let byGateway = reduce(summary.balances, (acc, balance) => {
    let grouping = balance.issuer || nativeSym;
    let balances = acc[grouping] || [];
    balances.push(balance);
    acc[grouping] = balances;
    return acc;
  }, {});

  let keys = Object.keys(byGateway);

  if (keys.length === 0) {
    return {};
  }

  let sorted = sortBy(keys);
  sorted = [nativeSym].concat(without(sorted, nativeSym));


  return {byGateway, sorted};
}

export function specs(s) {

  let {expect} = s;

  // unit tests are just like normal mocha tests
  // and do not plug into the application life cycle
  // they only get run when the test suite is triggered
  //
  // unit tests are for simple, pure functions.
  let {describe} = s.unit;

  describe(balancesByGateway, context => {
    context("unfunded account summary", it => {
      let summary = {isUnfunded: true};
      it("returns an empty map", subject => {
        expect(subject(summary)).to.deep.equal({});
      });
    });

    context("only native balance", it => {
      let summary = {balances: [{
        asset_code: "native",
        amount: "100.00",
      }]};

      it("indexes the balance at 0", subject => {
        let {byGateway} = subject(summary);
        expect(byGateway).to.be.an('object');
        expect(byGateway['0'][0]).to.equal(summary.balances[0]);
      });

      it("sets a sorted value", subject => {
        let {sorted} = subject(summary);
        expect(sorted).to.have.length(1);
        expect(sorted[0]).to.equal('0');
      })
    });
  });

  // component tests are used to test dumb components
  // you specify a matcher object that is to be matched
  // against the props supplied to the component. when
  // running in debug mode, the developer will be notified
  // if the component is ever run with props that would trigger
  // a test failure.  by hooking into the debug mode, we help
  // ensure that the test suite reflects real life situations.
  // in addition, we can provide a report that shows how often
  // your test cases occur in the wild.
  describe = s.component.describe;

  // matchers are used for two purposes: generating test data for explicit
  // test runs and triggering runtime checks when in debug mode.  a matcher
  // thus implements two functions.  `generate` is provided with a seed
  // number that may be used the generate test data.  `validate` returns a
  // boolean indicating whether the provided value matches the format of
  // the generated values.
  let {string, or, falsey} = s.match;
  // testing plugins get registered in the `x` object
  let {amount} = s.x.stellar;


  describe(Asset, context => {
    context("native asset", {
      asset_type: "native",
      asset_code: or(string(), falsey()),
      balance: amount(),
    }, it => {
      // the argument provided to the test function
      // is a component initialized with the props that
      // where generated or matched by the test context.
      it("renders the code as xlm", bl => {
        // call lifecycle methods on the component
        let dom = bl.render();

        //TODO: some sort of nice expectation library on the dom
      });
    });

    context("credit asset", {
      asset_type: or("credit_alphanum4", "credit_alphanum12"),
      asset_code: string(),
      balance: amount(),
    }, it => { });


  });
}
addSpecs(specs);
