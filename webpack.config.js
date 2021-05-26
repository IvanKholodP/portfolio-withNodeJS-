const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const PATHS = {
	src: path.resolve(__dirname, './front/src'),
	build: path.resolve(__dirname, './front/build')
};

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}
	if (isProd) {
		config.minimizer = [
			new TerserPlugin,
			new OptimizeCssAssetsPlugin
		]
	}
	return config
}

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	context: PATHS.src + '',
	entry: ['./js/main.js', './styles/style.scss'],
	output: {
		path: PATHS.build,
		filename: '[name].js'
	},
	optimization: optimization(),
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new CopyPlugin(
			{
				patterns: [{
					from: path.resolve(__dirname, "front/src/img"),
					to: path.resolve(__dirname, "front/build/img")
				}]
			}
		)
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.s[ac]ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.(jpg|png|svg)$/,
				use: ['file-loader']
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
}