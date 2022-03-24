import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

module.exports = {
	entry: './src/index.ts',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /[\.js]$/,
				exclude: /node_module/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.ts$/,
				exclude: /node_module/,
				use: {
					loader: 'ts-loader',
				},
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.jpeg$/,
				use: [{ loader: 'file-loader' }],
			},
		],
	},
	resolve: {
		modules: [path.join(__dirname, 'src'), 'node_modules'],
		extensions: ['.ts', '.js'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
		new MiniCssExtractPlugin({ filename: 'app.css' }),
	],
	devServer: {
		host: 'localhost',
		port: 5500,
	},
	mode: 'development',
};
