<template>
    <div class="child2">
        我是第二个自组件
    </div>
</template>

<script>
    export default {
      name: 'child2',
      mounted(){
          console.log("tab2组件")
      }
    }
</script>