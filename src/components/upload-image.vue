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

    <div class="preview-box float-left mt-15" v-if="!status && value">
      <template v-if="isBook">
        <img :src="value" :width="width" :height="height" />
      </template>
      <template v-else>
        <div
          class="newbox"
          :style="{
            width: width + 'px',
            height: height + 'px',
          }"
        >
          <img :src="value" />
        </div>
      </template>
    </div>
    <div class="preview-box float-left mt-15" v-if="status && value">
      <div
        class="contain-box"
        :style="{
          'background-image': 'url(' + value + ')',
          width: width + 'px',
          height: height + 'px',
        }"
      ></div>
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
  props: ["value", "helper", "width", "height", "status", "isBook"],
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
    display: block;
    vertical-align: middle;
  }
  .newbox {
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
      display: block;
      vertical-align: middle;
    }
  }

  .contain-box {
    max-width: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
  }
}
</style>
