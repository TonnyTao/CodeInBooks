const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            ASSET_FOLDER: JSON.stringify(
                'production' === process.env.NODE_ENV ? 'build/asset' : 'asset'
            )
        },
    }),
    new HtmlWebpackPlugin({
        inject: true,
        filename: './index.html',
        template: './public/index.html',
        excludeChunks: ['404'],
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }
    }),
    new CleanWebpackPlugin(['build'], {
        root: path.resolve(__dirname, '../'),
        verbose: true,
        dry: false,
        exclude: []
    }),

    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false
        }
    }))
}

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
                'style-loader',
                'css-loader',
            ]
        }, {
            test: /\.(jpg|png|svg|ttf)$/,
            loader: 'url-loader?limit=1024000',
        }, {
            test: /\.html$/,
            loader: 'html-loader?minimize=false&limit=1024000',
        }],
    },
    plugins: plugins,
    devServer: {
        contentBase: 'build',
        port: 8000,
        historyApiFallback: true,
    },
}
