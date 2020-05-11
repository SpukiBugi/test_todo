const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const CleanWebpackPlugin = require("clean-webpack-plugin");

let webpackConfig = {
  mode: "development",
  entry: path.resolve( __dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: '[name].js',
    publicPath: './',
  },

  resolve: {
    alias: {},
  },
  
  optimization: {
    runtimeChunk: 'single'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "TodoTest",
      template: "./src/index.html.template",
      filename: 'index.html',
    }),
    new VueLoaderPlugin(),
    new CleanObsoleteChunks(
      {
        verbose: false,
        deep: true
      }
    ),
    new CleanWebpackPlugin([
      "./www/*.js",
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            scss: "vue-style-loader!css-loader!sass-loader"
          }
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/plugin-syntax-dynamic-import", "@babel/transform-async-to-generator"],
        },
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              // Provide path to the file with resources
              resources: [
                path.resolve(__dirname, "src/assets/scss/_colors.scss"),
                path.resolve(__dirname, "src/assets/scss/_variables.scss"),
              ],
            },
          },
        ]
      },
    ]
  },

  watchOptions: {
    aggregateTimeout: 500,
    poll: 3000,
    ignored: /node_modules/
  },

  devServer: {
    contentBase: path.join(__dirname, 'www'),
    port: 8080,
    historyApiFallback: true,
  },
};

module.exports = (env, argv) => {
  const prod = env.production;

  webpackConfig.resolve.alias = {
    "@": path.resolve(__dirname, 'src'),
  };

  if (!prod) {
    webpackConfig.watch = true;
    webpackConfig.watchOptions = {
      aggregateTimeout: 1000,
      poll: 3000,
      ignored: ['node_modules', 'www'],
    };
  }
  
  return webpackConfig;
};
