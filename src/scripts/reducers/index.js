import { combineReducers } from 'redux';

import accounts from "./accounts";

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
})

export default walletOneApp;


