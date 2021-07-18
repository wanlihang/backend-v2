<template>
  <div class="config-index-box">
    <slider-set
      v-if="block.sign === 'slider'"
      :block="block"
      @update="update"
    ></slider-set>
    <grid-nav-set
      v-else-if="block.sign === 'grid-nav'"
      :block="block"
      @update="update"
    ></grid-nav-set>
  </div>
</template>
<script>
import SliderSet from "./slider.vue";
import GridNavSet from "./grid-nav.vue";

export default {
  components: {
    SliderSet,
    GridNavSet,
  },
  props: ["block"],
  methods: {
    update() {
      this.$emit("update");
    },
  },
};
</script>

<style lang="less" scoped>
.config-index-box {
  width: 100%;
  height: 100%;
  float: left;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 30px;
}
</style>