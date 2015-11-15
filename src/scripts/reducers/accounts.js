import {combineReducers} from "redux";
import {LOAD_ACCOUNT, LOAD_STATE, NEW_ACCOUNT} from "b:actions/index";
import {addTests} from "b:test";

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


export function tests(t) {
  let {expect} = t;
  let {describe} = t.reducer;

  describe(byAddress, context => {
    context({
      state: {},
      action: {
        type: LOAD_STATE,
        wallet: {
          byAddress: {"123": 3}
        }
      }
    }, it => {
      it("replaces the state", (state, action) => {
        expect(state).to.equal(action.wallet.byAddress);
      });
    });
  });

  describe(loaded, context => {
    // for reducer tests, context takes both a
    // state matcher spec and an action matcher spec.

    context({
      state: false,
      action: {type:LOAD_STATE},
    }, it => {

      // it specifiers in reducer tests are provided with the
      // state, the action, and the previous state, which can
      // each be easily expected upon.
      it("moves state to true", (state, action, prev) => {
        expect(state).to.be.true;
      });

    });
  });
}
addTests(tests);
