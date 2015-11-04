var Metalsmith = require("metalsmith");
var $ = require("load-metalsmith-plugins")();

Metalsmith(__dirname)
	.source("src/")
  .destination("build/")
	.use($.ignore([
				"**/.*"
	]))
	.use($.sass())
  .build(function(err) {
    if (err) throw err;
  });
