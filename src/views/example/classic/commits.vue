<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const API_URL = `https://api.github.com/repos/long-life233/course/commits?per_page=10&sha=`

type commitsType = Array<{
  html_url: string;
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    }
  };
  author: {
    html_url: string
  }
}>
const commits = ref<commitsType>(null as unknown as commitsType)

watchEffect(() => {
  fetch(`${API_URL}master`)
    .then(res => res.json())
    .then(data => {
      commits.value= data
    })
})

function formatDate(v: string) {
  return v.replace(/T|Z/g, ' ')
}
</script>
<template>
  <h1>最近我的 course 教程提交记录</h1>
  <div>
    <h2>long-life233/course@master</h2>
  </div>
  <ul>
    <li v-for="{html_url, sha, commit, author} in commits">
      id：<a :href="html_url" target="_blank">{{sha}}</a>
      <div>提交信息：{{commit.message}}</div>
      <div>by：<a :href="author.html_url" target="_blank">{{ commit.author.name }}</a></div>
      <div>at：{{formatDate(commit.author.date)}}</div>
    </li>
  </ul>
</template>
<style lang="scss">

</style>
