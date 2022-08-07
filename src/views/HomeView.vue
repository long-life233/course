<script setup>
import { onMounted, reactive, ref } from 'vue'
import { marked } from 'marked'
import vueMd from '@/docs/vue.md?raw'
import reactMd from '@/docs/react.md?raw'

onMounted(async () => {
  
})
</script>

<template>
  <div class="flex w-full h-screen">
    <div class="shadow-lg shadow-green-500 flex-1 h-full shadow-inner p-3 rounded-lg" style="width:calc(50% - 10rem)">
      <div class="px-4 my-3 flex items-center">
        <div class="w-1 h-10 bg-green-600 rounded-lg"></div>
        <span class="text-5xl font-black mx-5">Vue</span>
      </div>
      <article class="prose prose-sm max-w-full p-3 bg-slate-200">
        <div v-html="marked(vueMd)"></div>
      </article>
    </div>
    <!--  -->
    <div class="h-full flex-none flex justify-center" style="width:10rem">
      <div class="w-3/4 flex justify-center bg-sky-500 self-start my-6 p-2 rounded-md" @click="addBlock">
        ——————
      </div>
    </div>
    <!--  -->
    <div class="shadow-lg shadow-blue-500 flex-1 h-full shadow-inner p-3 rounded-lg" style="width:calc(50% - 10rem)">
      <div class="px-4 my-3 flex items-center">
        <div class="w-1 h-10 bg-green-600 rounded-lg"></div>
        <span class="text-5xl font-black mx-5">React</span>
      </div>
      <article class="prose prose-sm max-w-full p-3 bg-slate-200">
        <div v-html="marked(reactMd)"></div>
      </article>
      
    </div>
  </div>
</template>
