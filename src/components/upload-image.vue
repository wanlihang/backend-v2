<template>
  <div class="upload-image-box">
    <div class="buttons">
      <el-button @click="show = true">
        {{ $t("common.image.upload") }}
      </el-button>
    </div>
    <div class="helper" v-if="helper">{{ helper }}</div>

    <div class="preview-box" v-if="value">
      <img :src="value" :width="width" :height="height" />
    </div>

    <select-image
      :show="show"
      :from="2"
      @close="show = false"
      @selected="uploadImage"
    ></select-image>
  </div>
</template>
<script>
import SelectImage from "@/components/select-image";

export default {
  components: {
    SelectImage,
  },
  props: ["value", "helper", "img", "width", "height"],
  data() {
    return {
      show: false,
    };
  },
  methods: {
    uploadImage(imgUrl) {
      this.$emit("input", imgUrl);
      this.show = false;
    },
  },
};
</script>

<style lang="less" scoped>
.upload-image-box {
  display: inline-block;

  .buttons,
  .helper,
  .preview-box {
    width: 100%;
    height: auto;
    float: left;
    margin-bottom: 15px;
  }

  .helper {
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    line-height: 1;
    font-weight: normal;
  }

  .preview-box {
    margin-bottom: 0;

    img {
      max-width: 100%;
      border-radius: 3px;
    }
  }
}
</style>