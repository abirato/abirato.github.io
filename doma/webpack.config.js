const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
  	contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'html-loader',
        loader: 'pug-loader',
      },
      //{test:/\.html$/,loader: 'html-loader',},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              //outputPath: '[folder]'
            },
          }
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/index.pug',
      filename: 'index.html'
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: 'src/scss/images', to: 'images' },
    //     { from: 'src/scss/fonts', to: 'fonts' },
    //   ],
    // })
  ]
};
