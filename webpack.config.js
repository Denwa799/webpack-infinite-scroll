const path = require('path')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';

    return {
        mode: isDevelopment ? 'development' : 'production',
        entry: ["./src/index.tsx"],
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].[hash].js"
        },
        devtool: 'inline-source-map',
        devServer: {
            port: 3000
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss']
        },
        plugins: [
            new HtmlWebpackPlugin({template: "./public/index.html"}),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin(
                {
                filename: '[name].[hash].css',
                chunkFilename: '[id].[hash].css',
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
                        }
                    }
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        isDevelopment
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                modules: true
                            }
                        },
                        "sass-loader"
                    ]
                },
                {
                    test: /\.(jpg|jpeg|png|svg|gif)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource'
                }
            ]
        }
    }
}