<script setup>
import { onMounted, reactive, ref } from 'vue'
import { marked } from 'marked'
import TextareaEditor from '@/components/TextareaEditor.vue'
import request from '@/utils/request.js'
import vueMd from '@/assets/vue.md?raw'
import reactMd from '@/assets/react.md?raw'


//#region vue
const vueData = ref('')
const vueEaditor = ref(null)


async function editVue() {
  vueEaditor.value.show()
}

async function getVue() {
  // 发请求
  const res = await request.get('/vue')
  vueData.value = res.data
}


async function saveVue(content) {
  if(!content) {
    return 
  }
  // 发请求
  // await request.post('/vue', {
  //   content
  // })
  getVue()

  localStorage.setItem('vue', content)
}

//#endregion

//#region react
const reactData = ref('')
const reactEaditor = ref(null)

async function editReact() {
  reactEaditor.value.show()
}


async function getReact() {
  // 发请求
  const res = await request.get('/react')
  reactData.value = res.data
}

async function saveReact(content) {
  if(!content) {
    return
  }
  // 发请求
  // await request.post('/react', {
  //   content
  // })
  getReact()

  localStorage.setItem('react', content)
}
//#endregion


onMounted(async () => {
  // 发请求
  getVue()
  getReact()
})
</script>

<template>
  <div class="flex w-full h-screen">
    <div class="shadow-lg shadow-green-500 flex-1 h-full shadow-inner p-3 rounded-lg" style="width:calc(50% - 10rem)">
      <div class="px-4 my-3 flex items-center">
        <div class="w-1 h-10 bg-green-600 rounded-lg"></div>
        <span class="text-5xl font-black mx-5">Vue</span>
        <div @click="editVue" class="px-3 py-1 rounded-lg bg-stone-900 text-white cursor-pointer">编辑</div>
      </div>
      <article class="prose prose-sm max-w-full p-3 bg-slate-200">
        <div v-html="marked(vueData)"></div>
      </article>
    </div>
    <!--  -->
    <div class="h-full flex-none flex justify-center" style="width:10rem">
      <div class="w-3/4 flex justify-center bg-sky-500 self-start my-6 p-2 rounded-md" @click="addBlock">
        添加一个标题
      </div>
    </div>
    <!--  -->
    <div class="shadow-lg shadow-blue-500 flex-1 h-full shadow-inner p-3 rounded-lg" style="width:calc(50% - 10rem)">
      <div class="px-4 my-3 flex items-center">
        <div class="w-1 h-10 bg-green-600 rounded-lg"></div>
        <span class="text-5xl font-black mx-5">React</span>
        <div @click="editReact" class="px-3 py-1 rounded-lg bg-stone-900 text-white cursor-pointer">编辑</div>
      </div>
      <article class="prose prose-sm max-w-full p-3 bg-slate-200">
        <div v-html="marked(reactData)"></div>
      </article>
      
    </div>
  </div>

  <!-- 编辑弹框 -->
  <textarea-editor ref="vueEaditor" :content="vueData" @hide="saveVue"></textarea-editor>
  <textarea-editor ref="reactEaditor" :content="reactData" @hide="saveReact"></textarea-editor>
</template>
