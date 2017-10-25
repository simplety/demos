const webpack = require("webpack");
const path = require("path");

module.exports = {

  entry: {
    index: "./www/src/js/app/index.js",
    experience: "./www/src/js/app/experience.js"
  },
  output: {
    path: __dirname + '/www/dist/js',
    publicPath: "./www/dist/js",
    library: "finland",
    chunkFilename:'[chunkhash]_[id].js',
  	hashDigestLength: 2,
    filename: '[name].js',
    libraryTarget: "umd",
  },
  resolve:{
    alias: {
      "jquery": __dirname + "/www/src/js/lib/jquery.min.js"
    }
  },
  devtool: "source-map",
  devServer: {
    contentBase: "./www/dist", //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    inline: true, //实时刷新
    hot: true
  },
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     $: "jquery",
  //     jQuery: "jquery",
  //     "window.jQuery": "jquery"
  //   })
  // ],
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [{
            loader: 'expose-loader',
            options: 'jQuery'
        },{
            loader: 'expose-loader',
            options: '$'
        }]
      },
      {
        test: /\.js[x]?&/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.css$/,
        use: [
            {
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }
        ]
      },
    ],
  }
}