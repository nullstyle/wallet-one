import {combineReducers} from "redux";
import {LOAD_ACCOUNT_SUMMARY} from "b:actions/index";


const summaries = combineReducers({
  byAddress,
});

export default summaries;

function byAddress(state = {}, action) {
  switch(action.type) {
    case LOAD_ACCOUNT_SUMMARY:
      let {address, summary} = action;
      if (!summary) {
        return state
      }

      return Object.assign({}, state, {
        [address]: summary,
      })
    default:
      return state;
  }
}
