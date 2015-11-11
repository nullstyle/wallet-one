import {LOAD_ACCOUNT} from "scripts/actions/index";

const initialState = {
  seed: null,
  address: null,
  balances: {},
  history: [],
};

export default function currentAccount(state = initialState, action) {
  switch(action.type) {
    case LOAD_ACCOUNT:
      const {seed, address} = action
      return {
        seed,
        address,
        balances: {},
        history: [],
      };
    default:
      return state;
  }
}
