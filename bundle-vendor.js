var Builder = require('systemjs-builder');
var bundler = new Builder('src', 'src/config.js');

bundler.bundle('scripts/vendor.js', 'src/vendor.bundle.js')
  .catch(function(err) {
    console.log('bundle error');
    console.log(err);
  });
