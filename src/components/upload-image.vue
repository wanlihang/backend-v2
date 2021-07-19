<template>
  <div class="upload-image-box">
    <div class="buttons">
      <div class="d-flex">
        <div>
          <el-button @click="show = true">
            {{ $t("common.image.upload") }}
          </el-button>
        </div>
        <div class="helper ml-30" v-if="helper">{{ helper }}</div>
      </div>
    </div>

    <div class="preview-box float-left mt-15" v-if="value">
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

  .buttons {
    width: 100%;
    height: auto;
    float: left;
  }

  .helper {
    width: auto;
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    line-height: 14px;
    font-weight: normal;
  }
}

.preview-box {
  img {
    max-width: 100%;
  }
}
</style>