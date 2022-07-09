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

