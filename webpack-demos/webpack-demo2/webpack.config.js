//const path = require("path");

module.exports = {
  entry: './src/cats.js',
  output: {
    //path: path.resolve(__dirname, "./dist/js"),
    path: __dirname + "/bin",
    filename: '[name].js'
  }
};
