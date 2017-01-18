const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './srw-rdr.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'srw.pixlr.bundle.min.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    }
};
