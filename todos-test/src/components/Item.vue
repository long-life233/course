<template>
    <li @mouseenter="moveIn" @mouseleave="moveOut" :style="'background-color:'+liBgColor">
        <label>
            <input :checked="todo?.isCompleted" @change="changeCheck(index)" type="checkbox" />
            <span>{{todo?.title}}</span>
        </label>
        <button class="btn btn-danger" v-show="flag" @click="deleteTodo(index)">删除</button>
    </li>
</template>

<script lang="ts">
import { computed, defineComponent,PropType ,ref ,inject} from 'vue';
import Todo from '../types/todo';

export default defineComponent({
    props: {
        // todo: Object as ()=> Todo // 函数返回的是Todo类型
        todo: {
            type: Object as PropType<Todo>
        },
        index:{
            type:Number,
            required:true
        }
    },
    setup(){
        // 定义移入标识，true代表移入
        const flag = ref(false)
        // 定义移入移出的事件方法
        const moveIn = ()=>{
            flag.value = true
        }
        // 定义移入移出的事件方法
        const moveOut = ()=>{
            flag.value = false
        }
        // li背景颜色
        const liBgColor = computed(()=>{
            return flag.value?'#ddd':''
        })

        // 接收祖组件app传递过来的deleteTodo方法
        const  deleteTodo:any = inject('deleteTodo')
        // 接收祖组件app传递过来的改变check选中方法
        const changeCheck:any = inject('changeCheck')
        return {
            flag,
            liBgColor,
            moveIn,
            moveOut,
            deleteTodo,
            changeCheck
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