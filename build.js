var Metalsmith = require("metalsmith");
var $ = require("load-metalsmith-plugins")();
var Builder = require('systemjs-builder');
var _ = require("lodash");

const env = process.env.NODE_ENV;
console.log("NODE_ENV: ", env);

const defaultConfig = {
	bundle: false,
	watch: true,
}

const environments = {
	production: {
		bundle: true,
		watch: false,
	}
}

var config = _.extend(defaultConfig, environments[env]);
console.log("config: ", config);

var builder = Metalsmith(__dirname)

// setup builder middleware
builder.use($.define({ config }));
builder.use($.ignore([ "**/.*" ]));
builder.use($.sass());
builder.use($.inPlace({ pattern: "*.html", engine: 'ejs' }));

if (config.watch) {
	builder.use($.watch({
		livereload: true,
		paths: {
			"${source}/browser/**/*": true,
			"${source}/app/**/*": true,
			"${source}/styles/**/*": true,
			"${source}/*": true,
		}
	}));
}

// do the actual build
builder.build(function(err) {
	if (err) throw err;

	if (config.bundle) {
		var bundler = new Builder('build', 'build/config.js');
		bundler.bundle('scripts/main.js', 'build/bundle.js')
			.catch(function(err) {
				console.log('bundle error');
				console.log(err);
			});
	}
});
