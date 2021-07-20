<template>
  <div
    class="blank-box"
    :style="{
      height: config.height + 'px',
      'background-color': config.bgcolor,
    }"
  ></div>
</template>

<script>
export default {
  props: ["config"],
};
</script>

<style lang="less" scoped>
.blank-box {
  width: 100%;
  height: auto;
  float: left;
}
</style>