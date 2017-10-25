const path = require('path');
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.txt$/,
      exclude: __dirname + "node_modules",
      use: "babel-loader?presets[]=es2015&presets[]=react"
    }]
  },
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.common.js"
    }
  },
  devtool: 'source-map',
  devServer: {
    publicPath: path.join('/dist/')
  }
};