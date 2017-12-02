var path = require('path');
var webpack = require('webpack');
const base = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = Object.assign({}, base, {
    entry: {
        app: './src/client-entry.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'app.js',
        chunkFilename: 'app.[chunkhash].js'
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.VUE_ENV': '"client"',
            'process.BROWSER': true
        })
    ]
});