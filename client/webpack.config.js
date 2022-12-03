const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    stats: { children: true },
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      port: process.env.PORT || 3000,
      static: path.resolve(__dirname, 'dist'),
      // hot: 'only',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A simple text editor with local storage and pwa functionality',
        background_color: '#272822',
        fingerprints: false,
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve(__dirname, './src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: 'assets',
          }
        ]
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
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
