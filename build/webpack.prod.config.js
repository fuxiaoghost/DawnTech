var path = require('path');
var webpack = require('webpack');
const base = require('./webpack.base.config');

module.exports = Object.assign({}, base, {
    output: Object.assign({}, base.output, {
        filename: 'bundle.app.[hash].js',
        chunkFilename: 'chunk.[id].[hash].js'
    }),
    plugins: (base.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ]),
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000'
            }
        }
    }
});