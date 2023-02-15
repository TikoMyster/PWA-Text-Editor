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
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: "Jate"
      }),
      
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Jate",
        short_name: 'Text Editor',
        description: 'Text Editor for offline/ online use',
        background_color: '#0099ff',
        theme_color: '#0099ff',
        start_url: './',
        publicPath: './',
        icons: [{
          src: path.resolve("src/images/logo.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
      }],

      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      
    ],

    module: {
      rules: [{
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/transform-runtime", "@babel/plugin-proposal-object-reset-spread"],
          },
        },
      },
        
      ],
    },
  };
};
