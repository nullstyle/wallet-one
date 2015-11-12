import {combineReducers} from "redux";
import {LOAD_ACCOUNT, LOAD_STATE, NEW_ACCOUNT} from "scripts/actions/index";

const noAccount = "";

const accounts = combineReducers({
  byAddress,
  current,
  loaded,
});

export default accounts;

function byAddress(state = {}, action) {
  switch(action.type) {
    case LOAD_STATE:
      return action.wallet.byAddress || state;
    case NEW_ACCOUNT:
      let address = action.keypair.address();
      let seed = action.keypair.seed();

      return Object.assign({}, state, {
        [address]: { address, seed }
      })
    default:
      return state;
  }
}

function current(state = noAccount, action) {
  switch(action.type) {
    case LOAD_STATE:
      if (state) return state;
      
      
      let fromWallet = action.wallet.current;
      if (fromWallet in action.wallet.byAddress) {
        return fromWallet;
      }
      return Object.keys(action.wallet.byAddress)[0] || noAccount;
    case LOAD_ACCOUNT:
      return action.address
    default:
      return state;
  }
}

function loaded(state = false, action) {
   switch(action.type) {
    case LOAD_STATE:
      return true
    default:
      return state;
  }
}

    
