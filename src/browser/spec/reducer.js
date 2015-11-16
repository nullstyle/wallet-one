import { combineReducers } from 'redux';
import {SPEC_STATUS_CHANGED} from './actions';

const specs = combineReducers({
  cases
})

export default specs;

function cases(state=[], action) {
  switch (action.type) {
    case SPEC_STATUS_CHANGED:
      return action.cases;
    default:
      return state;
  }
  return state;
}
