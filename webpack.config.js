const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  devServer: {
    port: 3000
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: "./assets/favicons/favicon.ico" 
    }),
    new CleanWebpackPlugin(),    
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/assets/favicons/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],

  module: {
    rules: [
      {
        test: /\.[html|pug]$/i,
        use: ['html-loader', 'pug-html-loader'],
      },
      {
        test: /\.css$/, 
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/, 
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              
            },
          },
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(svg|png|ico|xml|json)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|eot|svg)$/i,
        type: 'asset/resource',
      }
    ]
  }
}