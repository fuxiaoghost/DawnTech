var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pkg = require('../package.json');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.app.js',
        chunkFilename: 'chunk.[id].js'
    },
    module: {
        rules: [
            { test: /\.vue$/, loader: 'vue-loader' }, 
            { test: /\.js$/, loader: 'babel-loader',exclude: /node_modules/ },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!sass-loader",
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        inline: true,
        port: 9098,
        historyApiFallback: true,
        compress: true, 
        proxy: {
            '/api': {
                target: 'http://prod-api-lb-100411289.cn-north-1.elb.amazonaws.com.cn',
                //target: 'http://10.5.1.165:12800',
                pathRewrite: {'^/api' : ''}
            }
        }
    }

}