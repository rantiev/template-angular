'use strict';
const path = require('path');

const PATHS = {
    app: path.join(__dirname, '/app'),
    build: path.join(__dirname, '/build'),
    static: '/static'
};

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StringReplacePlugin = require("string-replace-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const buildMode = ~process.argv.indexOf('-prod') ? 'prod' : 'dev';
const bundleName = `[name].[hash]${buildMode === 'prod' ? '.min' : ''}`;
const jsBundleName = `${bundleName}.js`;
const cssBundleName = `${bundleName}.css`;

const buildCfg = {
    replacements: {
        prod: {
            apiUrl: 'http://google.com/api',
            googleId: '100500',
            booblId: '15'
        },
        dev: {
            apiUrl: 'http://app.com:3000',
            googleId: '100700',
            booblId: '17'
        }
    }
};

const replaceConfig = {
    replacements: []
};

for (var i in buildCfg.replacements[buildMode]) {

    (function () {

        var findStr = new RegExp(i + ":\\s*'.*?'");
        var replacementStr = i + ":'" + buildCfg.replacements[buildMode][i] + "'";

        replaceConfig.replacements.push({
            pattern: findStr,
            replacement: function (match) {
                return replacementStr;
            }
        });

    })();

}

let webpackConfig = {
    entry: PATHS.app + '/app.js',
    output: {
        path: PATHS.build,
        //publicPath: PATHS.static,
        filename: jsBundleName
    },
    devServer: {
        buildPath: PATHS.build,
        staticPath: PATHS.static,
    },
    //cache: true,
    debug: true,
    watch: false,
    module: {
        loaders: [{
            test: /\.js$/,
            loader: StringReplacePlugin.replace('babel-loader?presets[]=es2015', replaceConfig)
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'autoprefixer-loader?browsers=last 5 version', 'sass-loader'])
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(['css-loader'])
        }, {
            test: /\.html$/,
            loader: 'underscore-template-loader'
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff2"
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&minetype=application/octet-stream"
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&minetype=image/svg+xml"
        }]
    },
    plugins: [
        new ExtractTextPlugin(cssBundleName),
        new CleanWebpackPlugin([`${PATHS.build}`], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new HtmlWebpackPlugin({
            title: 'SPA App',
            filename: 'index.html',
            template: 'tpl/index.html',
            inject: 'body',
            minify: buildMode === 'prod' ? {
                removeComments: true,
                collapseWhitespace: true
            } : false,
            favicon: 'img/favicon.ico',
            buildMode: buildMode,
            analytics: {
                google: true
            }
        }),
        new StringReplacePlugin(),
    ]/*,
    resolveLoader: {
        modulesDirectories: [
            'node_modules/'
        ]
    }*/
};

module.exports = webpackConfig;
