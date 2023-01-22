const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname,'src'),
    entry: {
        main: './index.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "GitHub Search",
            template: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                /*
                {
                    from: './static',
                    to: 'static',
                },
                */
                {
                    from: './favicon.ico',
                    to: './',
                },
                /*
                {
                    from: './CNAME',
                    to: './',
                },
                */
            ],
        })
    ],
    module: {
        rules: [
            {
                test: /\.(sass|css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: () => [
                                    require("autoprefixer")()
                                ],
                            }
                        },
                    },
                    'sass-loader'
                ]
            },
            /*
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/fonts/[name][ext]'
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/img/[name][ext]'
                }
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/icons/[name][ext]'
                }
            },
            */
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'blocks'),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            }
        ],
    }
}