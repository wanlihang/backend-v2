<template>
  <div class="upload-image-box">
    <div class="buttons">
      <div class="d-flex">
        <div>
          <el-button @click="show = true">
            {{ $t("common.image.upload") }}
          </el-button>
        </div>
        <div class="ml-10" v-if="canClear && value">
          <el-button @click="clearPoster()">清空</el-button>
        </div>
        <div class="helper ml-30" v-if="helper">{{ helper }}</div>
      </div>
    </div>
    <div class="preview-box float-left mt-15" v-if="value">
      <template v-if="width && height">
        <div
          class="contain-box"
          v-if="containBox"
          :style="{
            'background-image': 'url(' + value + ')',
            width: width + 'px',
            height: height + 'px',
          }"
        ></div>
        <div
          class="normal-box"
          v-else
          :style="{
            'background-image': 'url(' + value + ')',
            width: width + 'px',
            height: height + 'px',
          }"
        ></div>
      </template>
      <template v-else>
        <img :src="value" />
      </template>
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
  props: ["value", "helper", "width", "height", "containBox", "canClear"],
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
      this.$emit("input", null);
    },
  },
};
</script>

<style lang="less" scoped>
.upload-image-box {
  display: flex;
  flex-direction: column;

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
  .normal-box {
    overflow: hidden;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .contain-box {
    overflow: hidden;
    max-width: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
  }
}
</style>
