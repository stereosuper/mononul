const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = (env, options) => {
    const MODE = options.mode;
    const LAMBDA_FUNCTIONS_PORT = 9000;
    return {
        entry: './src/js/main.js',
        output: {
            path: `${path.resolve(__dirname)}/dest`,
            filename: 'main.js',
        },
        devtool: MODE === 'development' ? 'source-map' : '',
        devServer: {
            host: process.env.HOST || '0.0.0.0',
            port: process.env.PORT || 8080,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            proxy: {
                '/.netlify': {
                    target: `http://localhost:${LAMBDA_FUNCTIONS_PORT}`,
                    pathRewrite: { '^/.netlify/functions': '' },
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.(css|sass|scss)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: loader => [
                                    require('autoprefixer')({
                                        browsers: ['last 2 versions'],
                                    }),
                                ],
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                // sourceMap: true
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|gif|svg|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
            ],
        },
        node: {
            fs: 'empty', // avoids error messages
        },
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: 'src/*.html',
                    flatten: true,
                },
                {
                    from: 'src/img/',
                    to: 'img/',
                },
            ]),
            new MiniCssExtractPlugin({
                filename: 'main.css',
            }),
            new BrowserSyncPlugin(
                // BrowserSync options
                {
                    // browse to http://localhost:3000/ during development
                    host: 'localhost',
                    port: 3000,
                    // proxy the Webpack Dev Server endpoint
                    // (which should be serving on http://localhost:3100/)
                    // through BrowserSync
                    proxy: 'http://localhost:8080/',
                    files: [
                        {
                            match: ['**/*.html'],
                        },
                    ],
                }
            ),
        ],
    };
};

module.exports = config;
