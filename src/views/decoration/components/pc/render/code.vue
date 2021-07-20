<template>
  <div class="float-left">
    <div v-if="config.html" v-html="config.html"></div>
    <div class="code-empty" v-else>代码块</div>
  </div>
</template>

<script>
export default {
  props: ["config"],
};
</script>


<style lang="less" scoped>
.code-empty {
  width: 100%;
  height: 100px;
  float: left;
  line-height: 100px;
  text-align: center;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.8);
  background-color: rgba(0, 0, 0, 0.08);
}
</style>