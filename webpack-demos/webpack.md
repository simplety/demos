## Webpack
webpack是一个模块打包器(module bundles)。
它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。
优势：
1. webpack 使用异步 I/O 和多层缓存，从而运行得很快，尤其是增量构建。
2. webpack 支持 AMD 和 CommonJs 这两种模块机制。可以通过 AST 来对代码来做静态分析。还可以通过一个运算引擎来做简单表达式运算，从而支持绝大多数的现存 JavaScript 库。
3. webpack 支持把代码库拆分成多块，从而可以按需加载，减少初次加载的耗时。
4. webpack 允许使用加载器来预处理文件，从而可以打包任何文件而不仅是 JavaScript。可以用 node.js 来轻易地自定义加载器。
5. webpack 有着丰富的插件接口，这让 webpack 更具有扩展性，内建插件也大多基于这些接口。

以下是一个webpack.config.js例子

```
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        exclude: 'node_modules',
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ],
  devtool: "source-map" //使debugger在原文件里面打断点
};

module.exports = config;
```
### entry
webpack 创建应用程序所有依赖的关系图(dependency graph)。图的起点被称之为入口起点(entry point)。入口起点告诉 webpack 从哪里开始，并根据依赖关系图确定需要打包的内容。可以将应用程序的入口起点认为是根上下文(contextual root) 或 app 第一个启动文件。

### output
将所有的资源(assets)归拢在一起后，还需要告诉 webpack 在哪里打包应用程序。webpack 的 output 属性描述了如何处理归拢在一起的代码(bundled code)。

output.path
output.library
output.libraryTarget <包规范 通常umd>
output.hashDigestLength <进行hash加密的位数>  [hash]=>对webpack编译环境加密；[chunkhash]=>对chunk内容加密
output.chunkFilename
output.publicPath [server-relative][？？异步加载会产生一个新的chunk，加载是通过动态添加script标签，需制定publicPath]

### loader
Webpack只能处理JavaScript模块，如果要处理其他类型的文件，就需要使用*loader*进行转换。
Loader可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。这样，我们就可以通过require函数加载任何类型的模块或文件，比如 CoffeeScript、JSX、LESS或图片。

### plugin
由于 loader 仅在每个文件的基础上执行转换，而 插件(plugins) 更常用于（但不限于）在打包模块的 “compilation” 和 “chunk” 生命周期执行操作和自定义功能。webpack 的插件系统极其强大和可定制化。

想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。
多数插件可以通过选项(option)自定义，
如果在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 来创建它的一个实例。

### resolve
resolve.alias


