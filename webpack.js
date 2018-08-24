const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
		app: path.resolve( __dirname, 'src/Index.jsx' ),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	module: {
		rules: [
			{ test: /\.scss$/,
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
