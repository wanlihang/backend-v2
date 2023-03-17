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
      v-else-if="block.sign === 'h5-vod-v1' || block.sign === 'pc-vod-v1'"
      :block="block"
      @update="update"
    ></vod-v1-set>
    <live-v1-set
      v-else-if="block.sign === 'h5-live-v1' || block.sign === 'pc-live-v1'"
      :block="block"
      @update="update"
    ></live-v1-set>
    <book-v1-set
      v-else-if="block.sign === 'h5-book-v1' || block.sign === 'pc-book-v1'"
      :block="block"
      @update="update"
    ></book-v1-set>
    <topic-v1-set
      v-else-if="block.sign === 'h5-topic-v1' || block.sign === 'pc-topic-v1'"
      :block="block"
      @update="update"
    ></topic-v1-set>
    <learn-path-v1-set
      v-else-if="
        block.sign === 'h5-learnPath-v1' || block.sign === 'pc-learnPath-v1'
      "
      :block="block"
      @update="update"
    ></learn-path-v1-set>
    <ms-v1-set
      v-else-if="block.sign === 'h5-ms-v1' || block.sign === 'pc-ms-v1'"
      :block="block"
      @update="update"
    ></ms-v1-set>
    <tg-v1-set
      v-else-if="block.sign === 'h5-tg-v1' || block.sign === 'pc-tg-v1'"
      :block="block"
      @update="update"
    ></tg-v1-set>
    <code-set
      v-else-if="block.sign === 'code'"
      :block="block"
      @update="update"
    ></code-set>
    <blank-set
      v-else-if="block.sign === 'blank'"
      :block="block"
      @update="update"
    ></blank-set>
    <mp-wechat-set
      v-else-if="block.sign === 'mp-wechat'"
      :block="block"
      @update="update"
    ></mp-wechat-set>
    <image-group-set
      v-else-if="block.sign === 'image-group'"
      :block="block"
      @update="update"
    ></image-group-set>
    <gzh-v1-set
      v-else-if="block.sign === 'h5-gzh-v1'"
      :block="block"
      @update="update"
    ></gzh-v1-set>
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
import MsV1Set from "./ms-v1.vue";
import TgV1Set from "./tg-v1.vue";
import CodeSet from "./code.vue";
import BlankSet from "./blank.vue";
import MpWechatSet from "./mp-wechat.vue";
import ImageGroupSet from "./image-group.vue";
import GzhV1Set from "./gzh-v1.vue";

export default {
  components: {
    SliderSet,
    GridNavSet,
    VodV1Set,
    LiveV1Set,
    BookV1Set,
    TopicV1Set,
    LearnPathV1Set,
    MsV1Set,
    TgV1Set,
    CodeSet,
    BlankSet,
    MpWechatSet,
    ImageGroupSet,
    GzhV1Set,
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
