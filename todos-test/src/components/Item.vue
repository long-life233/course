<template>
    <li>
        <label>
            <input :checked="todo?.isCompleted" type="checkbox" />
            <span>{{todo?.title}}</span>
        </label>
        <button class="btn btn-danger">删除</button>
    </li>
</template>

<script lang="ts">
import { defineComponent,PropType  } from 'vue';
import Todo from '../types/todo';

export default defineComponent({
    props: {
        // todo: Object as ()=> Todo // 函数返回的是Todo类型
        todo: {
            type: Object as PropType<Todo>
        }
    }
});
</script>


<style scoped>
/*item*/
li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
}

li label {
    float: left;
    cursor: pointer;
}

li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
}

li button {
    float: right;
    margin-top: 3px;
}

li:before {
    content: initial;
}

li:last-child {
    border-bottom: none;
}
</style>