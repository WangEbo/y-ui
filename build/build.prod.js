const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolvePath  = (pathName)=> {
    return path.resolve(__dirname, pathName)
}

module.exports = {
    mode: 'production',
    entry:{
        index: resolvePath('../src/index.js')
    },
    output:{
        filename: '[name][chunkhash:8].js',
        path: resolvePath('../dist')
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', {
                        loader: 'sass-resources-loader',
                        options:{
                            resources: resolvePath('../src/variable.scss')
                        }
                    }
                ],
            },

            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options:{
                            limit: 1024 * 5
                        }
                    }
                ]
            },
            {
                test: /\.(woff|ttf|eot|otf)(\?.*)?$/,
                use: 'url-loader'
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: resolvePath('../index.html'),
            filename: '[name][hash:8].html',
            inject: 'body',
            options:{
                minify: true
            }
        }),
        new CleanWebpackPlugin(),//自动清理构建产物插件
        new MiniCssExtractPlugin({  //将css 文件提取成文件插件
            filename: `[name][contenthash:8].css`
        }),
        new OptimizeCssAssetsWebpackPlugin({    //压缩css 文件插件
            assetNameRegExp: /\.(css|scss)$/g
        })
    ],
    resolve: {
        alias: {
            baseCom: 'src/base',
            'vue$': 'vue/dist/vue.esm.js',
            'utils': 'src/untils'
        }
    }
}