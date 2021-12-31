<template>
    <div class="todo-footer">
        <label>
            <input type="checkbox" :checked="footerData.isCheckAll" @change="checkAll(!footerData.isCheckAll)"/>
        </label>
        <span>
            <span>已完成{{footerData.checkNum}}</span> / 全部{{footerData.allNum}}
        </span>
        <button class="btn btn-danger" @click="delCheck">清除已完成任务</button>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
      props:{
        footerData:{
          type:Object,
          default:()=>{
            return {}
          }
        },
        deleteCheck:{
          type:Function,
          required:true
        },
        checkAll:{
          type:Function,
          required:true
        }
      },
      setup(props){
        const delCheck = ()=>{
          props.deleteCheck()
        }
        return {
          delCheck
        }
      }
    });
</script>


<style scoped>
  /*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>