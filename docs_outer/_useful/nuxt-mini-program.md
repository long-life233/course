# Nuxt MiniProgram

the Chinese nuxt documentation[https://www.nuxtjs.cn/]

base on nuxt2,vue2.

## Create Project

```shell
npx create-nuxt-app <name>
```

## Create Login and Regist Pages
create Login.vue an Regist.vue under `/pages`,nuxt will create route automatically.

1. login.vue
```vue
<template>
  <div>
    <form class="Container">
      <div>用户名:</div>
      <input type="text" v-model="name">
      <div>密码:</div>
      <input type="password" v-model="password">
      <div></div>
      <button @click="summit">登录</button>
      <nuxt-link to="/register">注册</nuxt-link>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    summit(){
      alert("登录成功！")
    }
  }
}
</script>
```
2. regist.vue
```vue
<template>
  <div>
    <form class="Container">
      <div>用户名:</div>
      <input type="text" v-model="name">
      <div>密码:</div>
      <input type="password" v-model="password1">
      <div>再次确认密码:</div>
      <input type="password" v-model="password2">
      <div></div>
      <button @click="summit">注册</button>
      <nuxt-link to="/login">有账号，直接去登录</nuxt-link>
    </form>
  </div>
</template>

<script>
  export default {
    methods: {
      summit(){
        alert("注册成功！")
      }
    }
  }
</script>
```
additionally,in `/pages/index.vue`
```vue
<template>
  <nuxt-link to="/login">您还未登录，请先登录</nuxt-link>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
```

## npm run dev

npm run dev,you will see success!