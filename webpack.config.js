const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 导入, 在内存中生成index页面插件
const webpack = require("webpack");

// 创建一个插件示例对象
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'), // 源文件
    filename: 'index.html' // 生成内存中首页的名称
});
const jQueryPlugin = new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
});

// webpack 默认只打包.js后缀名类型的文件，其他需要配置第三方的loader
module.exports = {
    mode: 'development', // development production
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "main.js",
    },
    // 在webpack4.x中，一大特性就是约定大于配置，默认打包入口路径是 src/index.js
    plugins: [
        htmlWebpackPlugin,
        jQueryPlugin
    ],
    // 所有第三方模块的配置规则
    module: {
        // 第三方匹配规则
        rules: [
            { 
                test: /\.js|jsx$/, 
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        // 表示这几个文件的后缀名可以省略不写
        extensions: ['.js', '.jsx', 'json']
    }
}
