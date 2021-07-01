<template>
    <div class="child2">
        我是第三个自组件
    </div>
</template>

<script>
    export default {
      name: 'child3',
      mounted(){
          console.log("tab3组件")
      }
    }
</script>