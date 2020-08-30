const HtmlWebPackPlugin       = require('html-webpack-plugin'); 
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin            = require("babel-minify-webpack-plugin");
const {CleanWebpackPlugin}   = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ]
    },
    output: {
         // para exportar con hash en main.js
        // esto hace que cuando se hagaun cambio en producion, el arhivo js  force a descargar lo nuevo en el navegador cliente
        filename: 'main.[contentHash].js'
    },
    module: {
        rules: [
            {
                // agregar babel
                test: /\.js$/,
                exclude: /node_modules/,
                // loader: "babel-loader"
                use: [
                    "babel-loader"
                ]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: false }
                    }
                ]
            },
            // par imagenes
            {
                test:  /\.(png|svg|jpg|gif)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: true,
                            name: 'assets/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
            ignoreOrder: false
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin()
    ]

}

