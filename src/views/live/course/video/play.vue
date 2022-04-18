<template>
  <div class="meedu-main-body" v-if="video">
    <div class="float-left navheader">
      <div class="top">
        <span>{{ video.title }}</span>
        <el-button
          @click="stop"
          :loading="loading"
          type="primary"
          v-if="video.service"
        >
          结束直播
        </el-button>
      </div>
    </div>
    <div class="live-banner float-left">
      <div class="live-box" v-if="video">
        <div class="live-item">
          <div class="live-item-video">
            <div class="play" v-if="video.status === 1">
              <div
                id="meedu-live-player"
                style="width: 100%; height: 100%"
              ></div>
            </div>
            <div class="alert-message" v-else-if="video.status === 0">
              <div class="message">直播前请完成直播配置</div>
            </div>
          </div>
          <div class="replybox float-left">
            <div class="top">
              <div class="d-flex">
                <div class="tit">直播配置</div>
                <div class="helper-text">
                  <i class="el-icon-info"></i>
                  <span class="ml-5"
                    >将直播配置参数粘贴到您的推流软件配置中，在推流软件中开始推流后直播即开始</span
                  >
                </div>
              </div>
              <div class="d-flex">
                <div class="label">折叠配置</div>
                <el-switch
                  v-model="is_show"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </div>
            </div>
            <div class="form" v-show="is_show === 0">
              <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-width="100px"
              >
                <el-form-item label="直播服务商" prop="service">
                  <el-select
                    :disabled="
                      !(video.service === null || video.service.length === 0)
                    "
                    v-model="form.service"
                  >
                    <el-option
                      v-for="(item, index) in services"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                  <el-button
                    class="ml-10"
                    @click="formValidate"
                    :loading="loading"
                    type="primary"
                    v-if="!video.service"
                  >
                    开始直播
                  </el-button>
                </el-form-item>

                <template v-if="push_url">
                  <el-form-item label="推流地址">
                    <el-input
                      placeholder="推流地址"
                      class="w-300px"
                      v-model="push_url"
                    ></el-input>
                    <el-button
                      type="primary"
                      class="ml-10"
                      @click="copy(push_url)"
                      >复制</el-button
                    >
                  </el-form-item>

                  <el-form-item label="OBS服务器">
                    <el-input
                      placeholder="OBS服务器"
                      class="w-300px"
                      v-model="obs.server"
                    ></el-input>
                    <el-button
                      type="primary"
                      class="ml-10"
                      @click="copy(obs.server)"
                      >复制</el-button
                    >
                  </el-form-item>

                  <el-form-item label="OBS串流秘钥">
                    <el-input
                      placeholder="OBS串流秘钥"
                      class="w-300px"
                      v-model="obs.token"
                    ></el-input>
                    <el-button
                      type="primary"
                      class="ml-10"
                      @click="copy(obs.token)"
                      >复制</el-button
                    >
                  </el-form-item>
                </template>
              </el-form>
            </div>
          </div>
        </div>
        <div class="chat-item">
          <div class="tabs">
            <div
              class="item-tab"
              v-for="(item, index) in tabs"
              :key="index"
              :class="{ active: currentTab === item.id }"
              @click="tabChange(item.id)"
            >
              {{ item.name }}
              <div class="actline" v-if="currentTab === item.id"></div>
            </div>
          </div>
          <chat-box
            v-show="currentTab === 1"
            :chat="chat"
            :enabledChat="enabledChat"
            :status="playVideo.status"
            :cid="course.id"
            :vid="video.id"
            :room-ban="room_ban"
          ></chat-box>
          <live-watch-user
            v-show="currentTab === 2"
            :course="course"
            :vid="video.id"
            :room-ban="room_ban"
          ></live-watch-user>
        </div>
      </div>
    </div>
    <template v-if="playVideo.status === 1">
      <template v-if="webrtc_play_url">
        <remote-script
          src="https://web.sdk.qcloud.com/player/tcplayerlite/release/v2.4.1/TcPlayer-2.4.1.js"
          @load="initLiveTencentPlayer"
        ></remote-script>
      </template>
      <template v-else>
        <remote-script src="/js/xg/index.js"></remote-script>
        <remote-script
          src="/js/xg/hls.min.js"
          @load="initLivePlayer"
        ></remote-script>
      </template>
    </template>
  </div>
</template>

<script>
import ChatBox from "@/components/chat-box.vue";
import LiveWatchUser from "@/components/live-watch-user.vue";

export default {
  components: {
    ChatBox,
    LiveWatchUser,
  },
  data() {
    return {
      video_id: this.$route.query.video_id,
      video: null,
      loading: false,
      push_url: null,
      is_show: 0,
      form: {
        service: null,
      },
      services: [
        {
          name: "腾讯云",
          id: "tencent",
        },
        {
          name: "阿里云",
          id: "aliyun",
        },
      ],
      obs: {
        server: null,
        token: null,
      },
      rules: {
        service: [
          {
            required: true,
            message: "请选择直播服务商",
            trigger: "blur",
          },
        ],
      },
      playUrl: null,
      webrtc_play_url: null,
      playVideo: [],
      course: [],
      chat: null,
      record_exists: 0,
      record_duration: 0,
      livePlayer: null,
      curDuration: 0,
      currentTab: 1,
      tabs: [
        {
          name: "聊天",
          id: 1,
        },
        {
          name: "成员",
          id: 2,
        },
      ],
      room_ban: 0,
    };
  },
  computed: {
    enabledChat() {
      if (typeof this.playVideo.status === "undefined") {
        return false;
      }
      return this.playVideo.status === 0 || this.playVideo.status === 1;
    },
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$api.Course.Live.Course.Video.Detail(this.video_id).then((res) => {
        this.video = res.data;

        let service = res.data.service;
        if (!service) {
          service = null;
        }

        this.form.service = service;

        if (this.form.service) {
          this.submit();
        }
      });
    },
    formValidate() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    tabChange(key) {
      this.currentTab = key;
    },
    submit() {
      this.loading = true;
      this.$api.Course.Live.Course.Video.Play({
        video_id: this.video_id,
        service: this.form.service,
      })
        .then((res) => {
          // 推流地址
          this.push_url = res.data.push_url;
          this.room_ban = res.data.room_ban;
          console.log(this.push_url);

          // OBS推流地址解析
          if (this.push_url.substring(0, 6) === "srt://") {
            this.obs.server = this.push_url;
            this.obs.token = null;
          } else {
            let obs = this.push_url.split("meedu/");
            this.obs.server = obs[0] + "meedu/";
            this.obs.token = obs[1];
          }

          this.video.service = this.form.service;
          this.getPlayInfo();
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
    getPlayInfo() {
      this.$api.Course.Live.Course.Video.PlayInfo({
        video_id: this.video_id,
      })
        .then((res) => {
          let resData = res.data;
          this.chat = resData.chat;
          this.course = resData.course;
          this.playVideo = resData.video;
          this.playUrl = resData.play_url;
          this.record_exists = resData.record_exists;
          this.record_duration = resData.record_duration;
          this.webrtc_play_url = resData.web_rtc_play_url;
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
    initLivePlayer() {
      this.livePlayer = new window.HlsJsPlayer({
        id: "meedu-live-player",
        url: this.playUrl,
        isLive: true,
        autoplay: true,
        poster: this.course.poster,
        height: 473,
        width: 840,
        closeVideoTouch: true,
        closeVideoClick: true,
      });
      this.livePlayer.on("timeupdate", () => {
        this.curDuration = parseInt(this.livePlayer.currentTime);
      });
      this.livePlayer.on("ended", () => {
        this.curDuration = parseInt(this.livePlayer.currentTime);
      });
    },
    initLiveTencentPlayer() {
      const that = this;
      this.livePlayer = new window.TcPlayer("meedu-live-player", {
        m3u8: this.webrtc_play_url,
        autoplay: true,
        poster: this.course.poster,
        height: 473,
        width: 840,
        listener: function (msg) {
          if (msg.type == "timeupdate") {
            that.curDuration = parseInt(msg.timeStamp / 1000);
          } else if (msg.type == "ended") {
            that.curDuration = parseInt(msg.timeStamp / 1000);
          }
        },
      });
    },
    copy(url) {
      var input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("Copy");
      document.body.removeChild(input);
      this.$message.success("复制成功");
    },
    stop() {
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.loading) {
            return;
          }
          this.loading = true;
          this.$api.Course.Live.Course.Video.Stop({
            video_id: this.video_id,
            service: this.form.service,
          })
            .then(() => {
              this.loading = false;
              this.$message.success("已停止直播");
              this.$router.back();
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
  },
};
</script>
<style lang="less" scoped>
.el-form-item {
  margin-bottom: 20px !important;
  &:last-child {
    margin-bottom: 0px !important;
  }
}
.meedu-main-body {
  padding: 0px;
  background: #f4fafe;
  margin-bottom: 0px;
  .navheader {
    width: 100%;
    height: 68px;
    background: #ffffff;
    .top {
      width: 1200px;
      height: 68px;
      margin: 0 auto;
      font-size: 14px;
      font-weight: 500;
      color: #333333;
      line-height: 16px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }
  .live-banner {
    width: 100%;
    height: 100%;
    padding: 50px 0px;
    box-sizing: border-box;
    -moz-background-size: 100% 100%;
    background-size: 100% 100%;
    .live-box {
      width: 1200px;
      height: auto;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      .live-item {
        width: 840px;
        height: auto;
        position: relative;
        display: flex;
        flex-direction: column;
        .live-item-video {
          width: 100%;
          height: 473px;
          background-color: #000000;

          .play {
            width: 100%;
            height: 100%;
            background-color: #000000;
          }

          .alert-message {
            width: 100%;
            height: 473px;
            display: flex;
            align-items: center;
            justify-content: center;
            .message {
              background: rgba(255, 255, 255, 0.3);
              padding: 10px 20px;
              font-size: 16px;
              font-weight: 400;
              color: #ffffff;
              line-height: 22px;
              border-radius: 4px;
            }
          }
        }
        .replybox {
          width: 100%;
          height: 326px;
          position: relative;
          margin-top: 20px;
          .top {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 30px;
            background: #ffffff;
            .tit {
              font-size: 16px;
              font-weight: 500;
              color: #333333;
              line-height: 16px;
              margin-right: 30px;
            }
            .helper-text {
              font-size: 12px;
            }
            .label {
              font-size: 14px;
              font-weight: 400;
              color: #666666;
              line-height: 14px;
              margin-right: 15px;
            }
          }
          .form {
            box-sizing: border-box;
            padding: 0px 30px 30px 30px;
            background: #ffffff;
          }
        }
      }
      .chat-item {
        width: 340px;
        height: auto;
        background-color: #fff;
        float: left;
        margin-left: 20px;
        .tabs {
          width: 100%;
          height: 46px;
          display: flex;
          flex-direction: row;
          position: relative;
          border-bottom: 1px solid #e5e5e5;
          justify-content: center;
          .item-tab {
            width: 50px;
            height: 16px;
            font-size: 16px;
            font-weight: 400;
            color: #333333;
            line-height: 16px;
            margin-top: 15px;
            margin-right: 120px;
            text-align: center;
            &:last-child {
              margin-right: 0px;
            }
            cursor: pointer;
            position: relative;
            &.active {
              font-weight: 600;
              color: #3ca7fa;
            }
            .actline {
              width: 50px;
              height: 4px;
              background: #3ca7fa;
              position: absolute;
              left: 0px;
              top: 27px;
            }
          }
        }
      }
    }
  }
}
</style>
