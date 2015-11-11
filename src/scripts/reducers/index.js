import { combineReducers } from 'redux';


import currentAccount from "./current_account";

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
  currentAccount,
})

export default walletOneApp;


