import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
	entry: './src/index.ts',
	output: {
		path: '/dist',
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /[\.js]$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
				},
			},
		],
	},
	resolve: {
		modules: ['/src', 'node_modules'],
		extensions: ['.ts', '.js'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
	],
	devServer: {
		host: 'localhost',
		port: 5500,
	},
	mode: 'development',
};
