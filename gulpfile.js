var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

gulp.task("default", ["webpack-dev-server"]);

gulp.task("build-dev", ["webpack:build-dev"], function () {
	gulp.watch(["app/**/*"], ["webpack:build-dev"]);
});

gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", function (callback) {

	var myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	new webpack(myConfig, function (err, stats) {
		if (err) {
			throw new gutil.PluginError("webpack:build", err);
		}

		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));

		callback();
	});
});

gulp.task("webpack:build-dev", function (callback) {

	var myDevConfig = Object.create(webpackConfig);
	myDevConfig.devtool = "sourcemap";
	myDevConfig.debug = true;

	new webpack(myDevConfig).run(function (err, stats) {
		if (err) {
			throw new gutil.PluginError("webpack:build-dev", err);
		}

		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		}));

		callback();
	});
});

gulp.task("webpack-dev-server", function (callback) {

	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;

	new WebpackDevServer(webpack(myConfig), {
		hot: true,
		inline: true,
		contentBase: myConfig.devServer.buildPath,
		/*publicPath: myConfig.devServer.staticPath,
		historyApiFallback: {
			index: myConfig.devServer.buildPath + myConfig.devServer.staticPath,
		}*/
		historyApiFallback: true,
		stats: {
			colors: true
		}
	}).listen(8080, "localhost", function (err) {
			if (err) {
				throw new gutil.PluginError("webpack-dev-server", err);
			}

			gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
		});

	callback();
});