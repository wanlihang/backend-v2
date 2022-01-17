<template>
  <div class="upload-image-box">
    <div class="buttons">
      <div class="d-flex">
        <div>
          <el-button @click="show = true">
            {{ $t("common.image.upload") }}
          </el-button>
        </div>
        <div class="ml-10" v-if="configPoster && value">
          <el-button @click="clearPoster()">清空</el-button>
        </div>
        <div class="helper ml-30" v-if="helper">{{ helper }}</div>
      </div>
    </div>
    <template v-if="config">
      <div class="preview-box float-left mt-15" v-if="value">
        <img :src="value" />
      </div>
    </template>
    <template v-else>
      <div class="preview-box float-left mt-15" v-if="!status && value">
        <div
          class="newbox"
          :style="{
            'background-image': 'url(' + value + ')',
            width: width + 'px',
            height: height + 'px',
          }"
        ></div>
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
    </template>

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
  props: [
    "value",
    "helper",
    "width",
    "height",
    "status",
    "configPoster",
    "config",
  ],
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
    clearPoster() {
      this.value = null;
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
    width: 100%;
    height: auto;
  }
  .newbox {
    overflow: hidden;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .contain-box {
    max-width: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
  }
}
</style>
