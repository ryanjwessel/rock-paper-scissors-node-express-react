const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
		app: path.resolve( __dirname, 'src/Index.jsx' ),
	},
	plugins: [
		new CleanWebpackPlugin(['public/dist']),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'public/dist')
	},
	module: {
		rules: [
			{ test: /\.(scss|css)$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				}
			}
		]
	},
	mode: 'production',
	optimization: {
		minimizer: [
			new UglifyJSPlugin({
				uglifyOptions: {
					compress: true,
					ecma: 6,
					output: {
						comments: false,
					},
					sourceMap: false,
				}
			})
		]
	},
};
