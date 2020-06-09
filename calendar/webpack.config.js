const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
module.exports = { 
	// 入口
	entry: { 
		"main": "./js/app.js"
	},
	module: {
		rules: [{
			test: /\.css$/, // 正则匹配以.css结尾的文件
			use: ['style-loader', 'css-loader'] // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
		}, ]
	},
	output: {
		filename: "./bundle.js"
	},
	plugins: [ 
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			template: './calendar.html'
		})
	],
	watch: true, //文件见识改动自动产出build.js
}
