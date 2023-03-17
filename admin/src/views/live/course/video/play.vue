<template>
  <div class="meedu-main-body" v-if="video">
    <div class="float-left navheader">
      <div class="top">
        <div class="d-flex" @click="$router.back()">
          <img class="icon-back" src="../../../../assets/img/icon-back.png" />
          <span>{{ video.title }}</span>
        </div>
        <el-button
          @click="stop"
          :loading="loading"
          type="primary"
          v-if="video.status === 1 && video.service"
        >
          结束直播
        </el-button>
      </div>
    </div>
    <div class="live-banner float-left">
      <div class="live-box">
        <div class="live-item">
          <div class="live-item-video">
            <div class="alert-mask" v-if="video.status === 1 && tip">
              <div class="live-item-tip d-flex">
                OBS推流成功后若此处无画面显示，请稍等后刷新此页
                <img
                  class="icon ml-10"
                  @click="tip = false"
                  src="../../../../assets/img/icon-close.png"
                />
              </div>
            </div>
            <div class="play" v-if="video.status === 1">
              <div
                id="meedu-live-player"
                style="width: 100%; height: 100%"
              ></div>
            </div>
            <div class="alert-message" v-else-if="video.status === 0">
              <div class="message">直播前请完成直播配置</div>
            </div>
            <template v-else-if="video.status === 2">
              <template v-if="!vodPlayerStatus">
                <div class="alert-message">
                  <div
                    class="play-button"
                    @click="showVodPlayer()"
                    v-if="record_exists === 1"
                  >
                    回看直播 {{ record_hour }}{{ record_minute }}:{{
                      record_second
                    }}
                  </div>
                  <div v-else class="message">此直播无回放</div>
                </div>
              </template>
              <div class="play" v-if="record_exists === 1 && vodPlayerStatus">
                <div
                  id="meedu-vod-player"
                  style="width: 100%; height: 100%"
                ></div>
              </div>
            </template>
          </div>
          <div class="replybox float-left">
            <div class="mask" v-if="video.status === 2">直播已结束</div>
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
              <div v-if="item.id === 1">{{ item.name }}</div>
              <div v-else>{{ item.name }}({{ userNum }}人)</div>
              <div class="actline" v-if="currentTab === item.id"></div>
            </div>
          </div>
          <chat-box
            v-show="currentTab === 1"
            :chat="chat"
            :enabledChat="enabledChat"
            :status="video.status"
            :cid="course.id"
            :vid="video.id"
            :room-ban="room_ban"
          ></chat-box>
          <live-watch-user
            v-show="currentTab === 2"
            :course="course"
            :vid="video.id"
            :status="video.status"
            :room-ban="room_ban"
            @change="getNum"
          ></live-watch-user>
        </div>
      </div>
    </div>
    <template v-if="video.status === 1">
      <template v-if="webrtc_play_url">
        <remote-script
          src="https://web.sdk.qcloud.com/player/tcplayerlite/release/v2.4.1/TcPlayer-2.4.1.js"
          @load="initLiveTencentPlayer"
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
      course: [],
      chat: null,
      vodPlayerStatus: false,
      record_exists: 0,
      record_duration: 0,
      livePlayer: null,
      vodPlayer: null,
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
      userNum: 0,
      tip: true,
    };
  },
  computed: {
    enabledChat() {
      if (typeof this.video.status === "undefined") {
        return false;
      }
      return this.video.status === 0 || this.video.status === 1;
    },
    record_hour() {
      let h = parseInt(this.record_duration / 3600);
      if (h === 0) {
        return "";
      } else {
        return h >= 10 ? h + ":" : "0" + h + ":";
      }
    },
    record_minute() {
      let m = parseInt((this.record_duration % 3600) / 60);
      return m >= 10 ? m : "0" + m;
    },
    record_second() {
      let s = (this.record_duration % 3600) % 60;
      return s >= 10 ? s : "0" + s;
    },
  },
  mounted() {
    this.getDetail();
  },
  beforeDestroy() {
    this.livePlayer && this.livePlayer.destroy(true);
    this.vodPlayer && this.vodPlayer.destroy();
  },
  methods: {
    getNum(val) {
      this.userNum = val;
    },
    getDetail() {
      this.$api.Course.Live.Course.Video.Detail(this.video_id).then((res) => {
        this.video = res.data;

        let service = res.data.service;
        if (service) {
          this.form.service = service;
        }
        if (this.video.status === 1) {
          this.submit();
        } else if (this.video.status === 2 || this.video.status === 0) {
          this.getPlayInfo();
        }
      });
    },
    formValidate() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$confirm("确认开始直播？", "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.submit();
            })
            .catch(() => {
              //点击删除按钮的操作
            });
        }
      });
    },
    initVodPlayer(url, poster) {
      let dplayerUrls = [];
      url.forEach((item) => {
        dplayerUrls.push({
          name: item.name,
          url: item.url,
        });
      });
      this.vodPlayer = new window.DPlayer({
        container: document.getElementById("meedu-vod-player"),
        autoplay: false,
        video: {
          quality: dplayerUrls,
          defaultQuality: 0,
          pic: poster,
        },
        bulletSecret: {
          enabled: false,
          text: null,
          size: null,
          color: "red",
          opacity: null,
        },
      });
    },
    showVodPlayer() {
      if (this.record_exists === 1 && this.playUrl.length > 0) {
        this.vodPlayerStatus = true;
        this.$nextTick(() => {
          this.initVodPlayer(this.playUrl, this.course.poster);
        });
      } else {
        this.$message.error("暂无回放");
      }
    },
    tabChange(key) {
      this.currentTab = key;
    },
    submit() {
      if (this.loading) {
        return;
      }
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
          this.loading = false;
          this.getPlayInfo();
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
          this.video = resData.video;
          this.playUrl = resData.play_url;
          this.record_exists = resData.record_exists;
          this.record_duration = resData.record_duration;
          this.webrtc_play_url = resData.web_rtc_play_url;
          if (!this.webrtc_play_url && this.video.status === 1) {
            this.$nextTick(() => {
              this.initLivePlayer();
            });
          }
        })
        .catch((e) => {
          console.log(e);
          this.$message.error(e.message);
        });
    },
    initLivePlayer() {
      this.livePlayer = new window.DPlayer({
        container: document.getElementById("meedu-live-player"),
        autoplay: true,
        live: true,
        video: {
          url: this.playUrl,
          pic: this.course.poster,
        },
        bulletSecret: {
          enabled: false,
          text: null,
          size: null,
          color: "red",
          opacity: null,
        },
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
      this.$confirm("请确认是否结束本次直播？", "警告", {
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
              this.$message.success("已结束直播");
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
      .icon-back {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        cursor: pointer;
      }
      span {
        cursor: pointer;
      }
    }
  }
  .live-banner {
    width: 100%;
    min-height: 922px;
    height: 100vh;
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
          position: relative;

          .play {
            width: 100%;
            height: 100%;
            background-color: #000000;
          }
          .alert-mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 473px;
            display: flex;
            align-items: center;
            justify-content: center;
            .live-item-tip {
              background: rgba(#000, 0.5);
              padding: 15px 10px;
              font-size: 14px;
              font-weight: 400;
              color: #ffffff;
              line-height: 14px;
              border-radius: 4px;
              z-index: 100;

              .icon {
                width: 14px;
                height: 14px;
                cursor: pointer;
                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .alert-message {
            width: 100%;
            height: 473px;
            display: flex;
            align-items: center;
            justify-content: center;
            .play-button {
              width: auto;
              height: auto;
              background: #3ca7fa;
              border-radius: 32px;
              display: inline-block;
              margin-top: -76px;
              cursor: pointer;
              font-size: 14px;
              box-sizing: border-box;
              padding: 15px 20px;
              font-weight: 400;
              line-height: 14px;
              color: #ffffff;
              &:hover {
                opacity: 0.8;
              }
            }

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
          .mask {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(#fff, 0.9);
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: rgba(#000, 0.3);
          }
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
            padding: 0px 30px 28px 30px;
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
          justify-content: space-between;
          box-sizing: border-box;
          padding: 0px 60px;
          .item-tab {
            display: flex;
            width: auto;
            min-width: 50px;
            height: 46px;
            font-size: 16px;
            font-weight: 400;
            color: #333333;
            line-height: 16px;
            flex-direction: column;
            align-items: center;
            box-sizing: border-box;
            padding-top: 15px;
            cursor: pointer;
            position: relative;
            &.active {
              font-weight: 600;
              color: #3ca7fa;
            }
            .actline {
              display: block;
              width: 50px;
              height: 4px;
              background: #3ca7fa;
              margin-top: 11px;
            }
          }
        }
      }
    }
  }
}
</style>
