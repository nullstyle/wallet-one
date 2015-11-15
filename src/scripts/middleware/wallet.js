import {diff} from "deep-diff";
import {mapValues, pick, defer} from "lodash";

import {walletChanged} from "b:actions/index";

let remote = require("remote");
let wallet = remote.require("./wallet");

const walletMiddleware = store => next => action => {
  let currentState = store.getState();
  let result = next(action);
  let nextState = store.getState();

  if (!currentState) return result;
  if (!currentState.accounts.loaded) return result;


  let currentWallet = makeWallet(currentState);
  let nextWallet = makeWallet(nextState);

  let changed = diff(currentWallet, nextWallet);

  if (changed) {
    wallet.save(nextWallet);
    defer(() => store.dispatch(walletChanged()))
  }

  return result;
}

export default walletMiddleware;

function makeWallet(state) {
  let {byAddress, current} = state.accounts;

  byAddress = mapValues(byAddress, a => pick(a, 'address', 'seed'));
  return {byAddress, current};
}
