const merge = require('webpack-merge');
const base = require('./webpack.base.conf.js');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = merge(base, {
    mode: 'production',
    plugins:[
        new CleanWebpackPlugin(['dist'],{root: path.resolve(__dirname,"../")}),
        new UglifyJSPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname,'../dist/index.html'),
            template: 'index.html',
            inject: true,
            minify:{
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }

        })
    ]
})