<template>
  <el-tooltip
    class="cursor-pointer"
    effect="dark"
    :content="helper"
    placement="top-start"
  >
    <span>{{ text }} <i class="el-icon-question"></i></span>
  </el-tooltip>
</template>
<script>
export default {
  props: ["text", "helper"],
};
</script>
<style lang="less" scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>