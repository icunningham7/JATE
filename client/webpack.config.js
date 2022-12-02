const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      port: process.env.PORT || 3000,
      static: path.resolve(__dirname, 'dist'),
      hot: 'only',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A simple text editor with local storage and pwa functionality',
        background_color: '#272822',
        icons: [
          {
            src: path.resolve(__dirname, './src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512]
          }
        ]
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            },
          }
        }
      ],
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  };
};
