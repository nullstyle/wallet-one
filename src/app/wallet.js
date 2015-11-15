var app = require('app');
var fs = require("fs");

const walletPath = app.getPath('userData') + "/wallet.js"

const defaultWallet = {
  current: "",
  byAddress: {},
}

exports.save = function(state) {
  if (!state) state = defaultWallet;

  fs.writeFileSync(walletPath, JSON.stringify(state, null, '  '));
};

exports.load = function() {
  if (fs.existsSync(walletPath)) {
    var raw = fs.readFileSync(walletPath);
    return JSON.parse(raw.toString());
  } else {
    return defaultWallet;
  }
};

