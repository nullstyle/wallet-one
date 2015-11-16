import { combineReducers } from 'redux';

import accounts from "./accounts";
import summaries from "./summaries";
import spec from "b:spec/reducer";

// const initialState = {


//   newPayment: {
//     rawDestination: null,
//     resolvedDestination: {
//       address: "",
//       isCreated: null,
//       memo: null,
//       desiredAssets: [],
//     },
//     destinationAsset: {
//       asset_type: "native"
//     },
//     destinationAmount: ""
//   },

//   newGateway: {
//     rawDomain: null,
//     resolvedGateway: {
//       assets: []
//     }
//   },
// };

const walletOneApp = combineReducers({
  accounts,
  summaries,
  spec,
})

export default walletOneApp;
