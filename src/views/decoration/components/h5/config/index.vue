<template>
  <div class="float-left">
    <slider-set v-if="block.sign === 'slider'" :block="block"></slider-set>
  </div>
</template>
<script>
import SliderSet from "./slider.vue";

export default {
  components: {
    SliderSet,
  },
  props: ["block"],
  mounted() {
    console.log(this.block.sign);
  },
};
</script>