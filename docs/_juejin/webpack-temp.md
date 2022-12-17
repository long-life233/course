## webpack 5
1. 在多入口的时候设置 optimization.runtimeChunk: 'single'

有什么用？chunk 是什么？

多个模块构成一个 chunk，一般来讲，一个 chunk 对应一个 bundle。
什么时候不一般？比如我配置了 devtool: 'source-map'，这时候虽然只有一个 chunk，但是却有两个 bundle（包含一个 source-map 文件）。

动态导入会单独生成一个 chunk


2. 在设置 publicPath 为 / 时会导致直接打开打包后的 index.html 找不到图片、字体等资源。

但通过 live-server 打开可以找到对应资源。

```js
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    clean: true,
    // publicPath: '/', // 静态资源公共路径
  }
```

3. 对于模块的理解
一个模块就像一个函数，一个文件，只会被执行一次。

所以导出一个对象，两个模块对对其属性修改，修改的是同一个对象。

4. webpack-dev-server 配置 static 有什么用？
static 默认值为 'public'。
假设你使用 webpack-dev-server 启动了一个服务器地址 localhost:8080，然后你还在 public 目录下放了一张名为 test.png
的图片。
你就可以直接通过 localhost:8080/test.png 访问到这张图片。

5. defer 脚本的作用

## 注意事项
运行 webpack5 最低 nodejs 版本为 10.13.0

## 起步
webpack 就是一个打包工具。根据你的 webpack 配置文件，把你的代码进行一系列处理，变成服务器可访问的资源。

开发时和准备生产上线时的配置文件可能不一样，所以大多数时候，若干不同的环境会配置若干不同的配置文件。

但你学习的话使用相同的配置文件也是可以的。

比如说使用下面这个配置文件。

能够处理 css、图片、字体文件。
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname,'./'), // entry 会将此目录作为根目录
  devtool: 'source-map',
  entry: {
    main: './src/main.js'
  },
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  mode: 'development'
}
```
然后我们可以使用 webpack-dev-server 这个包，当我们修改文件时自动重新打包，并且生成一个本地服务器地址让打包后的文件可预览。

并且它的打包产物是放在缓存里的，我们看不见。而且大多数时候，其实你并不需要看到打包后的产物。

如果你想看到，就不要使用 webpack-dev-server，直接使用 webpack 构建命令。

先下载 npm install --save-dev webpack-dev-server，然后只需要在 webpack 后面多写个 serve 参数就可以了。

然后执行脚本`"dev": "webpack serve --open"`。

会自动打开浏览器预览打包后的产物。

## 代码分离

一般使用 Entry dependencies 或则 SplitChunksPlugin 去重和分离 chunk。

## 配置 eslint

可以配置 eslint，每次打包的时候会检查代码规范，不符会报错。

还可以安装 vscode 的 eslint 检查工具，这样还未打包的时候就会提示报错。

## 配置 babel
处理 js 兼容性

