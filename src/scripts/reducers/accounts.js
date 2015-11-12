import {combineReducers} from "redux";
import {LOAD_ACCOUNT, LOAD_STATE, NEW_ACCOUNT} from "scripts/actions/index";

const noAccount = "";

const initialState = {
  current: noAccount,
  byAddress: { },
  loaded: false,
};

const accounts = combineReducers({
  byAddress,
  current,
});

export default accounts;

function byAddress(state = initialState.byAddress, action) {
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

function current(state = initialState.current, action) {
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

function loaded(state = initialState.loaded, action) {
   switch(action.type) {
    case LOAD_STATE:
      return true
    default:
      return state;
  }
}

    
