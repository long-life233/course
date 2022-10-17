uniapp中vue-i18n的简单使用

## 安装

```shell
npm install vue-i18n
```
main.js文件中
```js
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// 准备翻译的语言环境信息
const messages = {
  en: {
    i18n_tpje7hyr_1651741146224_info: '测试%{var}'
    // ... 会有很多翻译
  },
  zh: {
    i18n_tpje7hyr_1651741146224_info : '测试%{var}'
    // ... 会有很多翻译
  },
  ja: { 
    i18n_tpje7hyr_1651741146224_info: '試験%{var}'
    // ... 会有很多翻译
  }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: 'zh', // 设置地区，默认中文，对应messages中的key
  messages, // 设置地区信息
})


// 通过 `i18n` 选项创建 Vue 实例
new Vue({ i18n }).$mount('#app')
```

## 使用
在vue的template模板中进行内容替换，使用如下：

*具名格式*
```js
<p>{{ $t('i18n_tpje7hyr_1651741146224_info', { var: 'hello' }) }}</p>
// 显示：测试hello

// ×
<p>{{ $t('i18n_tpje7hyr_1651741146224_info'.replace('%var', '<span color="red">nice</span>')}}</p>
// 测试nice (注意这种方式不会在小程序上起作用，因为小程序不支持v-html指令。)
```

*列表格式*
```js
const messages = {
  en: {
    i18n_tpje7hyr_1651741146224_info: '{0} world, {1} world'
  }
}

<p>{{ $t('i18n_tpje7hyr_1651741146224_info', ['hello', 'hello2']) }}</p>
or
<p>{{ $t('i18n_tpje7hyr_1651741146224_info', {'0': 'hello', '1': 'hello2'}) }}</p>

// 输出
<p>hello world， hello2 world</p>
```

*message的翻译值可以是HTML字符串*

(注意这种方式不会在小程序上起作用，因为小程序不支持v-html指令。)
```js
const messages = {
  en: {
    message: {
      hello: 'hello <br> world'
    }
  }
}

<p v-html="$t('message.hello')"></p>
```


## 检查
有时候翻译的key还没有，我们就会暂时把要需要翻译的内容写在$t里。
```js
$t('我是要翻译的内容')
```



可以使用vue-i18n-extract插件，可以检查缺失键列表。
```js
// 下载
npm install --save-dev vue-i18n-extract

// 在根目录添加配置文件
vue-i18n-extract.config.js

// 添加内容
module.exports = {
  vueFiles: './src/**/*.?(js|vue|ts|jsx|tsx)', // The Vue.js file(s) you want to extract i18n strings from. It can be a path to a folder or to a file. It accepts glob patterns. (ex. *, ?, (pattern|pattern|pattern)
  languageFiles: './src/locale/**/*.?(json)', // The language file(s) you want to compare your Vue.js file(s) to. It can be a path to a folder or to a file. It accepts glob patterns (ex. *, ?, (pattern|pattern|pattern)
  output: 'output.json', // false | string => Use if you want to create a json file out of your report. (ex. output.json)
  add: false,
  remove: false,
  dynamic: false
}

// 执行脚本，就可以检查出没有翻译的内容了。
npx vue-i18n-extract
```