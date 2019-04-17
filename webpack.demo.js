const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'demo'),
    entry: {
        demo: [
            './src/js/demo.js',
            './src/sass/bundles/demo.scss'
        ],
        // 'error.css': './src/sass/bundles/error.scss',
    },
    output: {
        filename: (chunkData) => {
            return chunkData.chunk.name == 'demo' ? '[name].js' : '[name]';
        },
        path: path.resolve(__dirname, 'demo', 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'demo'),
        index: './demo/index.html',
    },
};
