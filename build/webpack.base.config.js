var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    module: {
        rules: [
            { test: /\.vue$/, loader: 'vue-loader' }, 
            { test: /\.js$/, loader: 'babel-loader',exclude: /node_modules/ },
            { test: /\.scss$/, loader: 'style!css!autoprefixer!sass'}
        ]
    }
    // devServer: {
    //     inline: true,
    //     port: 9098,
    //     historyApiFallback: true,
    //     compress: true, 
    //     proxy: {
    //         '/api': {
    //             //target: 'http://127.0.0.1:3000',
    //             target: 'http://api.dawntech.top:3000',
    //             //target: 'http://10.5.1.165:12800',
    //             pathRewrite: {'^/api' : ''}
    //         }
    //     }
    // }
}