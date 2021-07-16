<template>
  <div class="upload-video-box">
    <div class="buttons">
      <el-button type="primary" >
        上传视频<span v-show="process">，进度：{{ process }}</span>
      </el-button>
      <input
        type="file"
        ref="tencentfile"
        v-show="false"
        @change="fileChange"
      />
    </div>
    <div class="helper" v-if="helper">{{ helper }}</div>

    <div class="preview-box" v-if="vid">
      <input type="text" v-model="vid" />
    </div>
  </div>
</template>
<script>
// import SelectVideo from "@/components/select-video";

export default {
  // components: {
  //   SelectVideo,
  // },
  props: ["value", "helper", "video"],
  data() {
    return {
      vid: this.value,
      process: "",
      uploader: null,
      status: false,
    };
  },
  methods: {
    uploadVideo(Url) {
      this.$emit("input", Url);
      this.show = false;
    },
    fileChange(event) {
      var files = event.target.files;
      if (files.length === 0) {
        return;
      }
      this.status = true;
      this.uploadFile(files[0]);
    },
    
  },
};
</script>

<style lang="less" scoped>
.upload-video-box {
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
  .alert-info {
    width: 100%;
    height: auto;
    float: left;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 14px;
    color: #999999;
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