var path = require('path');
var webpack = require('webpack');
const base = require('./webpack.base.config');

module.exports = Object.assign({}, base, {
    target: 'node',
    devtool: false,
    entry: './src/server-entry.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'server.js',
        chunkFilename: 'server.[chunkhash].js',
        libraryTarget: 'commonjs2'
    },
    // 外部依赖，不需要打包进server-bundle.js
    externals: Object.keys(require('../package.json').dependencies),
    plugins: (base.plugins || []).concat([
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.DefinePlugin({
            'process.env.VUE_ENV': '"server"',
            'process.BROWSER': false
        })
    ])
});