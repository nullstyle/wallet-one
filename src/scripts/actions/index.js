import "stellar-sdk";

let {Keypair} = StellarSdk.StellarBase;

let remote = require("remote");
let wallet = remote.require("./wallet");

const server = new StellarSdk.Server({
  hostname:'horizon-testnet.stellar.org', 
  secure: true, 
  port: 443
});


export const LOAD_ACCOUNT = 'LOAD_ACCOUNT';
export function loadAccount({address, seed}) {
  window.location.hash = "/home";
  return {
    type: LOAD_ACCOUNT,
    address,
    seed,
  }
}

export const LOAD_ACCOUNT_SUMMARY = 'LOAD_ACCOUNT_SUMMARY';
export function loadAccountSummary({address}) {
  let action = {
    type: LOAD_ACCOUNT_SUMMARY,
    address
  }

  return dispatch => {
    server.accounts().address(address).call()
      .then(s => {
        action.summary = s;
        dispatch(action);
      })
      .catch(StellarSdk.NotFoundError, e => {
        action.summary = { isUnfunded: true };
        dispatch(action);
      })
  }
}

export const LOAD_MORE_HISTORY = 'LOAD_MORE_HISTORY';
export function loadMoreHistory() {
  return { type: LOAD_MORE_HISTORY };
}

export const LOAD_STATE = 'LOAD_STATE';
export function loadState() {
  return {
    type: LOAD_STATE,
    wallet: wallet.load(),
  }
}

export const NAVIGATED = 'NAVIGATED';
export const navigateHome = navigate("/home");
function navigate(path) {
  return  () => {
    window.location.hash = path;
    return {
      type: NAVIGATED,
      path: path,
    }
  }
}

export const NEW_ACCOUNT = 'NEW_ACCOUNT';
export function newRandomAccount() {
  let kp = Keypair.random();
  return {
    type: NEW_ACCOUNT,
    keypair: kp,
  };
}

export const REFRESH = 'REFRESH';
export function refresh() {
  return { type: REFRESH };
}

export const WALLET_CHANGED = 'WALLET_CHANGED';
export function walletChanged(newWallet) {
  return {
    type: WALLET_CHANGED,
  };
}
