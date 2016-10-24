'use strict';

var AssetsPlugin = require('assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    debug: true,
    devtool: "source-map", // or "inline-source-map"
    entry: "./src/scripts/entry.js",
    output: {
        path: __dirname + '/dist',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            // {
            //     test: /\.scss$/,
            //     loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            // },
            {
                test: /\.css$/, loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader"
                })
            },
            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract({
            //         fallbackLoader: 'style-loader', // backup loader when not building .css file
            //         loader: 'css-loader?sourceMap&root=.',
            //         // publicPath: '../../../../'
            //     })
            // },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css?sourceMap!sass?sourceMap',
                    publicPath: '../../../../'
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                loader: 'url-loader?limit=2000&name=img/[name]_[hash:6].[ext]',
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=2000&mimetype=application/font-woff&name=font/[name]_[hash:6].[ext]'
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=2000&name=font/[name]_[hash:6].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new AssetsPlugin({
            path: __dirname + '/dist',
            filename: 'webpack-assets.json',
            prettyPrint: true
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            // title: METADATA.title,
            chunksSortMode: 'dependency',
            // metadata: METADATA,
            // "files": {
            //     "css": [ 'style/main.scss' ],
            // }
        }),
        new ExtractTextPlugin("styles.css"),
        // new ExtractTextPlugin({
        //     filename: 'css/[name]_[hash:6].css',
        //     allChunks: true
        // }),
    ],
    devServer: {
        port: 3000,
        host: 'localhost',
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        // hot: true,
        inline: true,
        outputPath: __dirname + '/dist',
    },
    node: {
        global: 'window',
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};