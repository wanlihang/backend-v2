<style lang="less" scoped>
.alert-info {
  width: 100%;
  height: auto;
  float: left;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  color: #999999;
}
</style>

<template>
  <div>
    <div class="h-input-group">
      <input type="text" v-model="vid" placeholder="请点击右侧的上传按钮或者直接输入视频文件fileId" />
      <Button color="primary" @click="selectVideo">
        <i class="h-icon-upload"></i> 上传视频<span v-show="process">，进度：{{ process }}</span>
      </Button>
    </div>
    <div class="alert-info">请上传MP4格式视频</div>
    <input type="file" ref="tencentfile" v-show="false" @change="fileChange" />
  </div>
</template>

<script>
import TcVod from 'vod-js-sdk-v6';

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      vid: this.value,
      process: '',
      uploader: null,
      status: false
    };
  },
  methods: {
    fileChange(event) {
      var files = event.target.files;
      if (files.length === 0) {
        return;
      }
      this.status = true;
      this.uploadFile(files[0]);
    },
    uploadFile(videoFile) {
      const tcVod = new TcVod({
        getSignature: function () {
          return R.VideoUpload.TencentAuthToken().then(response => {
            if (response.status !== 0) {
              HeyUI.$Message.error(response.message);
              return null;
            }
            return response.data.signature;
          });
        }
      });
      const uploader = tcVod.upload({
        mediaFile: videoFile
      });
      uploader.on('media_progress', info => {
        this.process = parseInt(info.percent * 100) + '%';
      });

      // 回调结果说明
      // type doneResult = {
      //   fileId: string,
      //   video: {
      //     url: string
      //   },
      //   cover: {
      //     url: string
      //   }
      // }
      uploader
        .done()
        .then(doneResult => {
          console.log(doneResult);
          this.process = '上传成功';
          this.vid = doneResult.fileId;
          this.status = false;
        })
        .catch(function (err) {
          console.log(err);
          HeyUI.$Message.error('上传错误');
        });
    },
    selectVideo() {
      if (this.status) {
        return;
      }
      this.$refs.tencentfile.click();
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.vid = newVal;
    },
    vid(newVal, oldVal) {
      this.$emit('input', newVal);
    }
  }
};
</script>
