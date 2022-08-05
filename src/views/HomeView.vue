<script setup>
import { onMounted, reactive, ref } from 'vue'
import { marked } from 'marked'
import TextareaEditor from '@/components/TextareaEditor.vue'

const vueData = reactive({
  name: "vue",
  blocks: [
    {
      title: "zasdf",
      content: `# hello world`
    }
  ]
})


const reactData = reactive({
  naem: "react",
  blocks: [
    {
      title: "hello world",
      content: "fasfsd"
    },
    {
      title: "启动",
      content: "fasfsd"
    },
    {
      title: "语法asfdsdf",
      content: "fasfsd"
    }
  ]
})


const textareEditor = ref(null)

function editContent(item) {
  console.log(item.content, 'asdf', textareEditor.value.show(item) );
  // textareEditor.value.show(item)
}

onMounted(() => {
  // textareEditor.value = 'textareEditor'  
  vueData.blocks.sort((item1, item2) => {
    return item1.title.localeCompare(item2.title)
  })

  reactData.blocks.sort((item1, item2) => {
    return item1.title.localeCompare(item2.title)
  })
})
</script>

<template>
  <div class="flex w-full h-screen">
    <div class="shadow-lg shadow-green-500 flex-1 h-full shadow-inner p-3 rounded-lg" style="width:calc(50% - 10rem)">
      <div class="font-black text-5xl italic flex justify-center">vue</div>
      <template v-for="(item, index) in vueData.blocks" :key="index">
        <div class="px-4 my-3 flex items-center">
          <div class="w-1 h-10 bg-green-600 rounded-lg"></div>
          <span class="text-5xl font-black mx-5">{{ item.title }}</span>
          <div @click="editContent(item)" class="px-3 py-1 rounded-lg bg-stone-900 text-white">编辑</div>
        </div>
        <article class="prose prose-sm max-w-full p-3 bg-slate-200">
          <div v-html="marked(item.content)"></div>
        </article>
      </template>
    </div>
    <!--  -->
    <div class="h-full flex-none flex justify-center" style="width:10rem">
      <div class="w-3/4 flex justify-center bg-sky-500 self-start my-6 p-2 rounded-md" @click="addBlock">
        添加一个标题
      </div>
    </div>
    <!--  -->
    <div class="shadow-lg shadow-blue-500 flex-1 h-full shadow-inner p-3 rounded-lg" style="width:calc(50% - 10rem)">
      <!-- <div class="font-black text-5xl">react</div>
      <block v-for="(item, index) in reactData.blocks" :key="index">
        <div class="text-2xl font-black my-3">{{item.title}}</div>
        <div class="w-full flex-wrap">{{item.content}}</div>
      </block> -->
    </div>
  </div>

  <!-- 编辑弹框 -->
  <textarea-editor ref="textareEditor"></textarea-editor>
</template>
