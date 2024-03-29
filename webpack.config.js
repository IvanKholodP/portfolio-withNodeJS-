const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
		},
	}
	if (isProd) {
		config.minimizer = [
			new TerserPlugin(),
			new CssMinimizerPlugin()
		]
	}
	return config
}

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	context: PATHS.src + '',
	entry: './js/main.js',
	output: {
		path: PATHS.build,
		filename: '[name].js'
	},
	optimization: optimization(),
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},
	stats: {
		children: false,
	},
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
		),
		new CleanWebpackPlugin()
	],
	resolve: {
		extensions: ['.js', '.png']
	},
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.(jpe?g|png|svg)$/i,
				use: 'file-loader'
			},
		]
	}
}