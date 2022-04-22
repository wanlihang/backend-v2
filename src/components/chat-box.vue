<template>
  <div class="chat-contanier">
    <div class="chat-box" :class="{ end: status === 2 }" ref="chatBox">
      <template v-if="chatRecords.length > 0">
        <div class="bullet-chat active" v-if="!over">
          <div class="addmore" @click="getMoreChatRecords()">加载更多</div>
        </div>
      </template>
      <div
        class="bullet-chat"
        v-for="(item, index) in chatRecords"
        :key="index"
        :id="item.id"
      >
        <template v-if="item.local">
          <div class="alert-message">
            <span class="text-block">{{ item.content }}</span>
          </div>
        </template>

        <template v-else>
          <div class="nickname" :class="{ teacher: item.msg_body.tec }">
            {{ item.msg_body.nick_name }}
          </div>
          <div class="message-content">
            <div class="chat-content">
              {{ item.msg_body.content }}
            </div>
            <el-dropdown trigger="click">
              <div class="config"><i class="el-icon-more-outline"></i></div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="delChatItem(index, item.id)"
                  >删除</el-dropdown-item
                >
                <el-dropdown-item
                  v-if="!item.msg_body.tec && status !== 2"
                  @click.native="banUser(item.msg_body)"
                >
                  <span>禁言</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
      </div>
    </div>
    <div
      class="reply-box"
      :class="{ active: status !== 2 }"
      v-if="status !== 2"
    >
      <div class="input">
        <el-input
          v-model="message.content"
          class="w-100"
          placeholder="此处填写你的内容"
          @keyup.enter.native="submitMessage()"
        ></el-input>
      </div>
      <div class="bottom">
        <div class="d-flex">
          <div class="label">全员禁言</div>
          <el-switch
            class="ml-10"
            v-model="all_ban"
            :active-value="1"
            :inactive-value="0"
            @change="roomAct"
          >
          </el-switch>
        </div>
        <el-button type="primary" size="mini" @click="submitMessage()"
          >发送</el-button
        >
      </div>
    </div>
    <remote-script
      src="https://cdn.aodianyun.com/dms/rop_client.js"
      @load="initADY"
      v-if="enabledAllowedADY"
    ></remote-script>
  </div>
</template>
<script>
export default {
  props: ["chat", "enabledChat", "status", "cid", "vid", "roomBan"],
  data() {
    return {
      chatChannel: null,
      chatUser: null,
      ADYParams: {
        sub_key: null,
        pub_key: null,
        channel: null,
        user: {
          id: null,
          name: null,
          avatar: null,
        },
      },
      chatRecords: [],
      pagination: {
        page: 1,
        size: 100,
      },
      pageLoading: false,
      over: false,
      total: 0,
      enabledScrollBottom: false,
      newId: null,
      all_ban: null,
      message: {
        content: null,
      },
    };
  },
  computed: {
    enabledAllowedADY() {
      return this.enabledChat && this.chat;
    },
  },
  watch: {
    chatRecords() {
      if (this.enabledScrollBottom) {
        this.chatBoxScrollBottom();
      }
    },
    roomBan() {
      this.all_ban = this.roomBan;
    },
    chat(data) {
      // 初始化聊天服务
      if (data) {
        this.chatChannel = data.channel;
        this.chatUser = data.user;
        this.ADYParams.sub_key = data.aodianyun.sub_key;
        this.ADYParams.pub_key = data.aodianyun.pub_key;
        this.ADYParams.channel = data.channel;
        this.ADYParams.user.id = data.user.id;
        this.ADYParams.user.name = data.user.name;
        this.ADYParams.user.avatar = data.user.avatar;
      }
      this.enabledScrollBottom = true;
      this.getChatRecords();
    },
  },
  beforeDestroy() {
    // 断开聊天室
    if (window.ROP) {
      window.ROP.Leave();
    }
  },
  mounted() {},
  methods: {
    getMoreChatRecords() {
      this.enabledScrollBottom = false;
      this.pagination.page++;
      this.getChatRecords();
    },
    getChatRecords() {
      if (this.pageLoading || this.over) {
        return;
      }
      this.pageLoading = true;
      this.$api.Course.Live.Course.Video.Chat(
        this.cid,
        this.vid,
        this.pagination
      )
        .then((res) => {
          this.total = res.data.total;
          if (res.data.data[0]) {
            this.newId = res.data.data[0].id;
          }
          let chatData = res.data.data.reverse();
          this.chatRecords.unshift(...chatData);
          if (this.pagination.size !== res.data.data.length) {
            this.over = true;
          }
          this.pageLoading = false;
          if (this.pagination.page > 1) {
            this.moveScroll();
          }
        })
        .catch((e) => {
          this.pageLoading = false;
          this.$message.error(e.message);
        });
    },
    moveScroll() {
      setTimeout(() => {
        this.$refs["chatBox"].scrollTop = document.getElementById(
          this.newId
        ).offsetTop;
      }, 150);
    },
    chatBoxScrollBottom() {
      setTimeout(() => {
        this.$refs["chatBox"].scrollTop = this.$refs["chatBox"].scrollHeight;
      }, 150);
    },
    initADY() {
      let pubKey = this.ADYParams.pub_key;
      let subKey = this.ADYParams.sub_key;
      let channel = this.ADYParams.channel;
      let id = this.ADYParams.user.id;
      let nickname = this.ADYParams.user.name;
      let avatar = this.ADYParams.user.avatar;
      console.log(pubKey);
      if (pubKey === null) {
        return;
      }

      window.ROP.Enter(pubKey, subKey, id, true);
      window.ROP.On("enter_suc", () => {
        window.ROP.Subscribe(channel);
        // 发送新用户上线消息
        window.ROP.Publish(
          JSON.stringify({
            t: "connect",
            v: "",
            u: {
              id: id,
              nickname: nickname,
              avatar: avatar,
            },
          }),
          channel
        );
      });
      window.ROP.On("enter_fail", (err) => {
        this.chanEvt("connect-fail", err);
      });
      window.ROP.On("offline", (err) => {
        this.chanEvt("connect-off", err);
      });
      window.ROP.On("losed", () => {
        this.chanEvt("connect-lose");
      });
      window.ROP.On("reconnect", () => {
        this.chanEvt("connect-reconnect");
      });
      window.ROP.On("connectold", () => {
        this.chanEvt("connect-repeat");
      });
      window.ROP.On("publish_data", (data, topic) => {
        if (topic !== channel) {
          return;
        }
        this.enabledScrollBottom = true;
        let message = JSON.parse(data);
        if (message.t === "message") {
          let msgV = JSON.parse(message.v);
          this.chatRecords.push({
            msg_body: msgV,
          });
        } else if (message.t === "connect") {
          this.chatRecords.push({
            local: 1,
            content: message.u.nickname + "已加入",
          });
        }
      });
    },
    chanEvt(e, data) {
      this.enabledScrollBottom = true;
      const mesMap = {
        "connect-success": "已加入聊天室",
        enter_fail: "无法加入聊天室",
        offline: "已断开连接",
        losed: "已断开连接",
        reconnect: "已重新连接",
        connectold: "异地登录",
        "connect-repeat": "异地登录",
        "connect-lose": "已断开链接",
      };

      this.chatRecords.push({
        local: 1,
        content: mesMap[e],
      });
    },
    delChatItem(index, id) {
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
          let ids = [];
          ids.push(id);
          this.$api.Course.Live.Course.Video.ChatDestoryMulti({
            ids: ids,
          })
            .then(() => {
              this.loading = false;
              this.chatRecords.splice(index, 1);
              this.$message.success(this.$t("common.success"));
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
    banUser(item) {
      if (this.loading) {
        return;
      }
      let params = {
        course_id: this.cid,
        video_id: this.vid,
        act: "user-ban",
        user_id: item.id,
      };
      this.loading = true;
      this.$api.Course.Live.Course.Video.RoomAction(params)
        .then((res) => {
          this.$message.success(this.$t("common.success"));
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
    roomAct(val) {
      if (this.loading) {
        return;
      }
      let act = null;
      if (val === 1) {
        act = "room-ban";
      } else {
        act = "room-un-ban";
      }
      let params = {
        course_id: this.cid,
        video_id: this.vid,
        act: act,
      };
      this.loading = true;
      this.$api.Course.Live.Course.Video.RoomAction(params)
        .then((res) => {
          if (this.all_ban === 1) {
            this.$message.success("已全局禁言");
          } else {
            this.$message.success("已全局解除禁言");
          }
          this.loading = false;
        })
        .catch((e) => {
          if (this.all_ban === 1) {
            this.all_ban = 0;
          } else {
            this.all_ban = 1;
          }
          this.loading = false;
          this.$message.error(e.message);
        });
    },
    submitMessage() {
      if (!this.message.content) {
        this.$message.error("请输入消息内容");
        return;
      }
      this.saveChat(this.message.content);
      this.message.content = null;
    },
    saveChat(content) {
      this.$api.Course.Live.Course.Video.SendMessage({
        course_id: this.cid,
        video_id: this.vid,
        content: content,
        duration: this.curDuration,
      }).catch((e) => {
        this.$message.error(e.message);
      });
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.input .el-input__inner {
  height: 50px;
  border: none;
  padding-left: 0;
}
/deep/.input .el-input__inner:focus {
  border: none;
}
.el-dropdown {
  height: 14px;
}
.chat-contanier {
  width: 100%;
  float: left;
  height: auto;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  .chat-box {
    width: 100%;
    float: left;
    height: 678px;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 15px 15px 0 15px;
    &.end {
      height: 775px;
    }

    .bullet-chat {
      width: 100%;
      height: auto;
      float: left;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 15px;
      }
      &.active {
        display: flex;
        justify-content: center;
      }
      .addmore {
        display: inline-block;
        width: auto;
        height: auto;
        font-size: 13px;
        font-weight: 400;
        color: #666666;
        line-height: 18px;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }

      .alert-message {
        width: 100%;
        height: auto;
        float: left;
        text-align: center;

        .text-block {
          width: auto;
          height: auto;
          padding: 7px 12px;
          background: #cccccc;
          border-radius: 15px;
          display: inline-block;
          font-size: 12px;
          line-height: 12px;
          font-weight: 400;
          color: #ffffff;
        }
      }

      .nickname {
        width: 100%;
        height: auto;
        float: left;
        font-size: 13px;
        font-weight: 400;
        color: #666666;
        line-height: 18px;
        margin-bottom: 5px;
        &.teacher {
          width: auto;
          font-size: 12px;
          font-weight: 400;
          color: #ffffff;
          line-height: 12px;
          padding: 5px 10px;
          background: #3ca7fa;
          border-radius: 2px;
        }
      }
      .message-content {
        width: 100%;
        height: auto;
        float: left;
        display: flex;
        justify-content: space-between;
        .chat-content {
          width: auto;
          height: auto;
          float: left;
          background: #e1f1fd;
          box-sizing: border-box;
          padding: 8px 10px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 400;
          color: #333333;
          line-height: 18px;
          word-break: break-all;
        }
        .config {
          margin-left: 15px;
          width: 26px;
          height: 14px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #dddddd;
          cursor: pointer;
          i {
            color: #fff;
          }
        }
      }
    }
  }
  .reply-box {
    width: 100%;
    float: left;
    padding: 15px;
    height: 58px;
    border-top: 1px solid #e5e5e5;
    box-sizing: border-box;
    margin-top: 35px;
    &.active {
      margin-top: 0px;
      height: 98px;
      padding: 0px 15px 15px 15px;
    }

    .bottom {
      width: 100%;
      height: 28px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .label {
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 14px;
      }
      .submit {
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
