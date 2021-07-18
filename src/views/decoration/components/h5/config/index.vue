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
    <vod-v1-set
      v-else-if="block.sign === 'h5-vod-v1'"
      :block="block"
      @update="update"
    ></vod-v1-set>
    <live-v1-set
      v-else-if="block.sign === 'h5-live-v1'"
      :block="block"
      @update="update"
    ></live-v1-set>
    <book-v1-set
      v-else-if="block.sign === 'h5-book-v1'"
      :block="block"
      @update="update"
    ></book-v1-set>
    <topic-v1-set
      v-else-if="block.sign === 'h5-topic-v1'"
      :block="block"
      @update="update"
    ></topic-v1-set>
    <learn-path-v1-set
      v-else-if="block.sign === 'h5-learnPath-v1'"
      :block="block"
      @update="update"
    ></learn-path-v1-set>
  </div>
</template>
<script>
import SliderSet from "./slider.vue";
import GridNavSet from "./grid-nav.vue";
import VodV1Set from "./vod-v1.vue";
import LiveV1Set from "./live-v1.vue";
import BookV1Set from "./book-v1.vue";
import TopicV1Set from "./topic-v1.vue";
import LearnPathV1Set from "./learnPath-v1.vue";

export default {
  components: {
    SliderSet,
    GridNavSet,
    VodV1Set,
    LiveV1Set,
    BookV1Set,
    TopicV1Set,
    LearnPathV1Set,
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