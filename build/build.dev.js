const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

const resolvePath  = (pathName)=> {
    return path.resolve(__dirname, pathName)
}

module.exports = {
    mode: 'development',
    entry:{
        index: resolvePath('../src/index.js')
    },
    output:{
        filename: '[name].js',
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
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader', {
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
            filename: '[name].html',
            inject: 'body'
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        alias: {
            baseCom: 'src/base',
            'vue$': 'vue/dist/vue.esm.js',
            'utils': 'src/untils'
        }
    }
}