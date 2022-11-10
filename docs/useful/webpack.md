# 軟件使用說明

code是上課階段的所有代碼

第二個是課件。解壓縮包，是文檔。

第三个是exe文件，后面可能会使用，注意一下就行了。（具体是在高级优化，压缩图片的时候会用到）

## 处理css资源
https://webpack.js.org/guides/asset-management/#loading-css

```js
npm install --save-dev style-loader css-loader
```
webpack.config.js
```js
 const path = require('path');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
 };
```
如果还要处理less资源

https://webpack.js.org/loaders/less-loader
```js
npm install less less-loader --save-dev

module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
};
```

## 处理图片资源
这样就可以再css里使用背景图片、使用new Image创建图片并指定src为导入的图片了
```js
module: {
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
    ],
},


import Icon from './icon.png';
const myIcon = new Image();
myIcon.src = Icon;

element.appendChild(myIcon);
```

## 更改输出文件目录
```js
 const path = require('path');

 module.exports = {
  entry: './src/index.js',
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
   output: {
    filename: 'bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
   },
 };
```

## 自动清空上次打包内容

```js
output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
},
```

## 处理字体图标资源
```js
   module: {
     rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
        },
     ],
   },

@font-face {
    font-family: 'MyFont';
    src: url('./my-font.woff2') format('woff2'),
         url('./my-font.woff') format('woff');
    font-weight: 600;
    font-style: normal;
}

.hello {
    color: red;
    font-family: 'MyFont';
    background: url('./icon.png');
}
```

## 处理数据资源
比如所json（可以直接导入）、xml等等。

https://webpack.js.org/guides/asset-management/#loading-data

## 处理js资源

## 配置eslint
https://webpack.js.org/plugins/eslint-webpack-plugin/#getting-started

```js
// npm install eslint eslint-webpack-plugin --save-dev

const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  // ...
  plugins: [new ESLintPlugin({})],
  // ...
};

// npm init @eslint/config
// 配置生成一个eslint配置文件
```

eslint能做什么事？
```shell
To check syntax only   仅仅检查代码语法是否有错误

To check syntax and findProblems   检查代码语法并且给出提示

。。。。。。。。。。。。。。。。。。 enforce code style   强制代码风格（比如所末尾必须有分号；）
```
> 什么是语法错误？js引擎再解析js代码时，遇到问题导致程序崩溃
> vscode安装一个eslint插件，每次写代码都会调用lint命令，如果不符合eslint规范，就会给出提示。

## 配置bable
https://webpack.js.org/loaders/babel-loader/

babel，将es6代码转换为向后兼容的代码。

```js
// npm install -D babel-loader @babel/core @babel/preset-env

module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

## HtmlWebpackPlugin
https://webpack.js.org/plugins/html-webpack-plugin/

自动生成一个html文件，引入打包后的js文件。

## 吧css放入单独的文件中
https://webpack.js.org/plugins/mini-css-extract-plugin/
```js
// npm install --save-dev mini-css-extract-plugin

// body {
//   background: green;
// }

// import "./style.css";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

## css兼容性处理
https://webpack.js.org/loaders/postcss-loader/#getting-started

```js
# npm install --save-dev postcss-loader postcss-preset-env postcss

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
```

## css压缩
https://webpack.js.org/plugins/css-minimizer-webpack-plugin/

```js
// npm install css-minimizer-webpack-plugin --save-dev

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

  plugins: [new CssMinimizerPlugin()],
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
```

## html、js压缩
production模式下自动开启

## 高级优化

## 提示报错信息
开启sourcemap，报错会提示到准确位置。

https://webpack.js.org/configuration/devtool/

```js
  devServer: {
    static: './dist',
  },
  devtool: 'eval', // 开发模式推荐eval，生产模式推荐(none)
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
    new MiniCssExtractPlugin(),
    new CssMinimizerPlugin()
  ],
```
## 开发模式下启用HMR
https://webpack.js.org/configuration/dev-server/#devserverhot

<!-- 默认开启 -->
```js
module.exports = {
  //...
  devServer: {
    hot: true,
  },
};
```

## 使用oneOf
https://webpack.js.org/configuration/module/#ruleoneof

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /inline/, // foo.css?inline
            use: 'url-loader',
          },
          {
            resourceQuery: /external/, // foo.css?external
            use: 'file-loader',
          },
        ],
      },
    ],
  },
};
```

## 使用exclude/include
排除检查、或只检查某些文件目录。比如bable、eslint。
```js
    {
        test: /\.js$/,
        // exclude: /node_modules/, // 排除node_modules代码不编译
        include: path.resolve(__dirname, "../src"), // 也可以用包含
        loader: "babel-loader",
    },
```

## 开启缓存
开发每次打包都会对js文件尽心babel编译、eslint检查，比较耗时。可以使用编译、检查后的缓存，再次打包会跟快。

```js
    {
        test: /\.js$/,
        // exclude: /node_modules/, // 排除node_modules代码不编译
        include: path.resolve(__dirname, "../src"), // 也可以用包含
        loader: "babel-loader",
        options: {
        cacheDirectory: true, // 开启babel编译缓存
        cacheCompression: false, // 缓存文件不要压缩
        },
    },
// 
    new ESLintWebpackPlugin({
        // 指定检查文件的根目录
        context: path.resolve(__dirname, "../src"),
        exclude: "node_modules", // 默认值
        cache: true, // 开启缓存
        // 缓存目录
        cacheLocation: path.resolve(
            __dirname,
            "../node_modules/.cache/.eslintcache"
        ),
    }),
```

## 开启多进程打包
Thread
https://webpack.js.org/loaders/thread-loader/

只当项目体积非常大的时候使用。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        use: [
          'thread-loader',
          // your expensive loader (e.g babel-loader)
        ],
      },
    ],
  },
};
```

## treeShaking

默认开启这个功能

print.js到处两个函数
```js
export const a = () => {
  // console.log('hello');
  let a = () => {
    console.log('asfdsafsd');
  }
  a()
};

export const b = () => {
  console.log(1234);
}
```
index.js中只会打包引入且使用的模块。

但是有个问题，index.js会吧a函数体复制过来，在index、print里有两份重复的a函数代码
```js
import {a,b} from './print';
```

> 问题：为什么webpack没有压缩js文件？
原因是webpack认为，如果配置了minimizer，就表示开发者在自定以压缩插件，无论是配置minimizer是TRUE还是FALSE，内部的JS压缩器就会被覆盖掉。


## babel优化
https://webpack.js.org/loaders/babel-loader/#babel-is-injecting-helpers-into-each-file-and-bloating-my-code

babel将助手注入到每个文件，使得体积非常庞大。

```js
install -D @babel/plugin-transform-runtime

rules: [
  // the 'transform-runtime' plugin tells Babel to
  // require the runtime instead of inlining it.
  {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-runtime']
      }
    }
  }
]
```

## 图片压缩
https://webpack.js.org/plugins/image-minimizer-webpack-plugin/

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
    ],
  },
  optimization: {
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  plugins: extendDefaultPlugins([
                    {
                      name: "removeViewBox",
                      active: false,
                    },
                    {
                      name: "addAttributesToSVGElement",
                      params: {
                        attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                      },
                    },
                  ]),
                },
              ],
            ],
          },
        },
      }),
    ],
  },
};
```

## 优化代码运行时性能

## 代码分割

### 多入口代码分割
```js
  entry: {
    index: './src/index.js',
    print: './src/print.js'
  },
```
如果index引入print里的函数，打包后这两个文件都会有此函数，导致代码重复。

该怎么解决呢？

https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

### 按需加载、动态导入
个人理解：把import语句写到函数体内，当函数执行时再去引入那个模块。

### 多入口代码分割
差不多，只需要配置chunks为all就可以了。

## preload、prefetch
https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules

再点击某个按钮时，弹出弹框
```js
// webpack will add the prefetch hint once the parent chunk has been loaded.
import(/* webpackPrefetch: true */ './path/to/LoginModal.vue');
```

## 使用缓存
缓存一些静态资源。

```js
1、一些问题：将来发布新版本，内容发生改变，浏览器还是读缓存

2、使用hash技术：
    fullhash,改动一个文件，全部文件的hash值都要改变。
    chunkhash，由于js和css由同一个chunk引入，因此也会相互影响。
    contenthash，文件内容改变，该文件的hash才会改变

  output: {
    path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
    // [contenthash:8]使用contenthash，取8位长度
    filename: "static/js/[name].[contenthash:8].js", // 入口文件打包输出资源命名方式
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js", // 动态导入输出资源命名方式
    assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
    clean: true,
  },
```
但是，如果一个文件被引入到另外一个文件，这个文件改变，会牵连另外一个文件改变。这时候可以将hash值单独保存在一个文件中。

```js
optimization: {
    // 提取runtime文件
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`, // runtime文件命名规则
    },
  },
```

## core-js
babel能对js进行兼容性处理，比如能将箭头函数转化为普通函数。但是对于一些es6高级特新像Promise、includes、async等等方法它没办法转换。

所以要使用到babel的polyfill。

自动按需加载

npm i core-js

babel.config.js
```js
module.exports = {
  // 智能预设：能够编译ES6语法
  presets: [
    [
      "@babel/preset-env",
      // 按需加载core-js的polyfill
      { useBuiltIns: "usage", corejs: { version: "3", proposals: true } },
    ],
  ],
};
```

## pwa离线访问技术

一种离线也能访问的技术

npm i workbox-webpack-plugin -D

const WorkboxPlugin = require("workbox-webpack-plugin");

plugins: [
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
]

修改main.js
```js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
```