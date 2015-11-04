var Metalsmith = require("metalsmith");
var $ = require("load-metalsmith-plugins")();

Metalsmith(__dirname)
	.use($.watch({
		livereload: true,
		paths: {
			"${source}/scripts/**/*": true,
			"${source}/styles/**/*": true,
			"${source}/*": true,
		}
	}))
	.use($.ignore([
				"**/.*"
	]))
	.use($.sass())
  .build(function(err) {
    if (err) throw err;
  });
