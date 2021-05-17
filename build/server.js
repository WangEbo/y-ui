const HtmlWebpackPlugin = require('html-webpack-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, dir)
}
console.log(resolve('src'));

const babelConfig = {
    presets: ["@babel/preset-env", "@vue/babel-preset-jsx"]
}
module.exports = {
    mode: process.env == 'prod' ? 'production' : 'development',
    devtool: 'source-map',
    entry: resolve('../src/index.js'),   //主文件入口
    output: {           //输出文件路劲
        path: resolve('dist'),
        filename: '[name].js'
    },
    module: {            //loader 解析规则
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'url-loader',

            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: [
                    resolve('../src'),
                    resolve('../test'),
                ],
                options: babelConfig
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {

                }
            },
            {
                test: /\.(woff|ttf|eot|otf)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        //使用  sass-resource-loader 配置 全局scss变量，options下的resources指定全局scss文件路径，须为字符串或数组
                        options: {
                            resources: [resolve('../src/variable.scss')]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [      //webpack插件， 想要使用需要先安装对应的包，然后 new 创建一个
        new HtmlWebpackPlugin({
            template: resolve('../index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new vueLoaderPlugin(),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://localhost:8899`],
            },
            onErrors(severity, errors){
                console.log(errors);
            }
        })
    ],
    devServer: {     //开发服务器
        port: '8899',
        hot: true,
        host: '0.0.0.0',
    },
    resolve: {
        alias: {
            baseCom: resolve('../src/base'),
            'vue$': 'vue/dist/vue.esm.js',
            'utils': resolve('../src/utils')
        }
    }
}