import "stellar-sdk";
let {Keypair} = StellarSdk.StellarBase;

let remote = require("remote");
let wallet = remote.require("./wallet");

export const LOAD_STATE = 'LOAD_STATE';
export const WALLET_CHANGED = 'WALLET_CHANGED';
export const LOAD_ACCOUNT = 'LOAD_ACCOUNT';
export const NEW_ACCOUNT = 'NEW_ACCOUNT';
export const REFRESH = 'REFRESH';
export const LOAD_MORE_HISTORY = 'LOAD_MORE_HISTORY';

export function loadState() {
  return {
    type: LOAD_STATE,
    wallet: wallet.load(),
  }
}

export function walletChanged(newWallet) {
  return {
    type: WALLET_CHANGED,
  };
}

export function loadAccount(address, seed) {
  window.location.hash = "/home";
  return {
    type: LOAD_ACCOUNT,
    address,
    seed,
  }
}

export function newRandomAccount() {
  let kp = Keypair.random();
  return {
    type: NEW_ACCOUNT,
    keypair: kp,
  };
}

export function refresh() {
  return { type: REFRESH };
}

export function loadMoreHistory() {
  return { type: LOAD_MORE_HISTORY };
}
