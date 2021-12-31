<template>
    <ul class="todo-main">
        <Item v-for="(item,index) in todos" :todo="item" :index="index" :key="item.id"></Item>
    </ul>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Item from "./Item.vue"
    export default defineComponent({
        components:{
            Item
        },
        props:["todos"]
    });
</script>


<style scoped>
    /*main*/
    .todo-main {
        margin-left: 0px;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding: 0px;
    }

    .todo-empty {
        height: 40px;
        line-height: 40px;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding-left: 5px;
        margin-top: 10px;
    }
</style>