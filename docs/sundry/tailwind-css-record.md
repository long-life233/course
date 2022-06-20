# tailwind记录

## CDN安装
```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

## 安装vscode插件

PostCSS Language Support，防止vscode警告

Tailwind CSS IntelliSense，语法提示

## 条件功能类
例如，悬浮时颜色变深
```html
<button class="bg-sky-600 hover:bg-sky-700 ...">
  Save changes
</button>
```
```shell
伪类
    like :hover, :focus, :first-child, and :required
伪元素
     like ::before, ::after, ::placeholder, and ::selection
媒体查询
    like responsive breakpoints, dark mode, and prefers-reduced-motion
属性选择器
    like [dir="rtl"] and [open]
```
可以被堆积到一块
```html
<button class="dark:md:hover:bg-fuchsia-600 ...">
  Save changes
</button>
```

## Hover, focus, and active
Hover, focus, and active

例子
```html
<button class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
  Save changes
</button>
```

还有更多伪类:visited, :focus-within, :focus-visible, and more.

更多伪类链接地址：https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-class-reference

## First, last, odd, and even
第一个，最后一个，奇数，偶数
```html
<li class="flex py-4 first:pt-0 last:pb-0" v-for="item in list">
    <img class="h-10 w-10 rounded-full" src="{person.imageUrl}" alt="" />
    <div class="ml-3 overflow-hidden">
        <p class="text-sm font-medium text-slate-900">{person.name}</p>
        <p class="text-sm text-slate-500 truncate">{person.email}</p>
    </div>
</li>
```
其它：:only-child, :first-of-type, :empty, and more.

更多：https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-class-reference

## 表单状态
https://tailwindcss.com/docs/hover-focus-and-other-states#form-states

required, invalid, and disabled

:read-only, :indeterminate, :checked, and more.

## 基于父类状态
给父类添加`group`类，子元素添加`group-*`类
```html
<a href="#" class="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500">
  <div class="flex items-center space-x-3">
    <svg class="h-6 w-6 stroke-sky-500 group-hover:stroke-white" fill="none" viewBox="0 0 24 24"><!-- ... --></svg>
    <h3 class="text-slate-900 group-hover:text-white text-sm font-semibold">New project</h3>
  </div>
  <p class="text-slate-500 group-hover:text-white text-sm">Create a new project from a variety of starting templates.</p>
</a>
```

## 基于兄弟元素
https://tailwindcss.com/docs/hover-focus-and-other-states

给某个元素添加`peer`类，另一个兄弟元素添加`peer-*`类
```html
<form>
  <label class="block">
    <span class="block text-sm font-medium text-slate-700">Email</span>
    <input type="email" class="peer ..."/>
    <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
      Please provide a valid email address.
    </p>
  </label>
</form>
```
Won't work, only previous siblings can be marked as peers
```html
<label>
  <span class="peer-invalid:text-red-500 ...">Email</span>
  <input type="email" class="peer ..."/>
</label>
```

## 伪元素
https://tailwindcss.com/docs/hover-focus-and-other-states#before-and-after


::before and ::after
```html
<label class="block">
  <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
    Email
  </span>
  <input type="email" name="email" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" />
</label>

<blockquote class="text-2xl font-semibold italic text-center text-slate-900">
  When you look
  <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
    <span class="relative text-white">annoyed</span>
  </span>
  all the time, people think that you're busy.
</blockquote>
```

## Placeholder text
Placeholder文本

```html
<label class="relative block">
  <span class="sr-only">Search</span>
  <span class="absolute inset-y-0 left-0 flex items-center pl-2">
    <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"><!-- ... --></svg>
  </span>
  <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/>
</label>
```

## 文件选择按钮
```html
<form class="flex items-center space-x-6">
  <div class="shrink-0">
    <img class="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" />
  </div>
  <label class="block">
    <span class="sr-only">Choose profile photo</span>
    <input type="file" class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "/>
  </label>
</form>
```

## 列表项的标记
```html
<ul role="list" class="marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-500">
  <li>5 cups chopped Porcini mushrooms</li>
  <li>1/2 cup of olive oil</li>
  <li>3lb of celery</li>
</ul>
```

## 高亮选中文本
会应用到所有高亮元素上

```html
<div class="selection:bg-fuchsia-300 selection:text-fuchsia-900">
  <p>
    So I started to walk into the water. I won't lie to you boys, I was
    terrified. But I pressed on, and as I made my way past the breakers
    a strange calm came over me. I don't know if it was divine intervention
    or the kinship of all living things but I tell you Jerry at that moment,
    I <em>was</em> a marine biologist.
  </p>
</div>
```

## 第一行和第一个字母
https://tailwindcss.com/docs/hover-focus-and-other-states#first-line-and-first-letter

```html
<p class="first-line:uppercase first-line:tracking-widest
  first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900
  first-letter:mr-3 first-letter:float-left
">
  Well, let me tell you something, funny boy. Y'know that little stamp, the one
  that says "New York Public Library"? Well that may not mean anything to you,
  but that means a lot to me. One whole hell of a lot.
</p>
```

## 对话框背景
https://tailwindcss.com/docs/hover-focus-and-other-states#dialog-backdrops

不知道啥意思

## 媒体查询-响应式断点
移动端渲染3列，中型屏幕渲染4列，大屏幕渲染6列
```html
<div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
  <!-- ... -->
</div>
```

## 喜欢的颜色主题
https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-color-scheme

```html
<div class="bg-white dark:bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
  <div>
    <span class="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
      <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><!-- ... --></svg>
    </span>
  </div>
  <h3 class="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
  <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">
    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
  </p>
</div>
```

## 竖屏、横屏媒体查询
https://tailwindcss.com/docs/hover-focus-and-other-states#viewport-orientation  

```html
<div>
  <div class="portrait:hidden">
    <!-- ... -->
  </div>
  <div class="landscape:hidden">
    <p>
      This experience is designed to be viewed in landscape. Please rotate your
      device to view the site.
    </p>
  </div>
</div>
```