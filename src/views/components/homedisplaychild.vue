<template>
    <div class="child1">
        我是第一个自组件
    </div>
</template>

<script>
    export default {
      name: 'child1',
      mounted(){
          console.log("tab1组件")
      }
    }
</script>