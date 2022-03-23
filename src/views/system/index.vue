<template>
  <div class="config-box" v-loading="loading">
    <div class="options">
      <div class="title">基本配置</div>
      <div class="body">
        <template v-for="(item, index) in groups">
          <div
            class="item"
            v-if="check(item.sign)"
            :key="index"
            @click="goConfig(item.value)"
          >
            <img :src="item.images" />
            <span>{{ item.name }}</span>
          </div>
        </template>
      </div>
    </div>
    <div class="options">
      <div class="title">课程配置</div>
      <div class="body">
        <template v-for="(item, index) in courses">
          <div
            class="item"
            v-if="enabledAddons[item.sign] === 1 || item.sign === ''"
            :key="index"
            @click="goConfig(item.value)"
          >
            <img :src="item.images" />
            <span>{{ item.name }}</span>
          </div>
        </template>
      </div>
    </div>
    <div class="options">
      <div class="title">营销配置</div>
      <div class="body">
        <template v-for="(item, index) in market">
          <div
            class="item"
            v-if="enabledAddons[item.sign] === 1 || item.sign === ''"
            :key="index"
            @click="goConfig(item.value)"
          >
            <img :src="item.images" />
            <span>{{ item.name }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
      groups: [
        {
          name: "网站信息",
          value: "系统",
          images: require("../../assets/images/config/system.png"),
          sign: "",
        },
        {
          name: "移动端H5",
          value: "立春模板",
          images: require("../../assets/images/config/h5.png"),
          sign: "TemplateOne",
        },
        {
          name: "支付配置",
          value: "支付",
          images: require("../../assets/images/config/payment.png"),
          sign: "",
        },
        {
          name: "用户注册",
          value: "会员",
          images: require("../../assets/images/config/role.png"),
          sign: "",
        },
        {
          name: "登录控制",
          value: "登录",
          images: require("../../assets/images/config/login.png"),
          sign: "",
        },
        {
          name: "微信公众号",
          value: "微信公众号",
          images: require("../../assets/images/config/wechat.png"),
          sign: "",
        },
        {
          name: "短信服务",
          value: "短信",
          images: require("../../assets/images/config/message.png"),
          sign: "",
        },
        {
          name: "视频存储",
          value: "视频",
          images: require("../../assets/images/config/video.png"),
          sign: "",
        },
        {
          name: "图片存储",
          value: "图片存储",
          images: require("../../assets/images/config/pic.png"),
          sign: "",
        },
        {
          name: "视频加密",
          value: "视频加密",
          images: require("../../assets/images/config/ali.png"),
          sign: "视频加密",
        },
        {
          name: "微信小程序",
          value: "微信小程序",
          images: require("../../assets/images/config/weixin.png"),
          sign: "",
        },
        {
          name: "随机拍照",
          value: "随机拍照",
          images: require("../../assets/images/config/camera.png"),
          sign: "Snapshot",
        },
        {
          name: "高德地图",
          value: "高德地图",
          images: require("../../assets/images/config/gaode.png"),
          sign: "",
        },
        {
          name: "K12配置",
          value: "K12",
          images: require("../../assets/images/config/k12.png"),
          sign: "XiaoBanKe",
        },
        {
          name: "全局搜索",
          value: "全文搜索",
          images: require("../../assets/images/config/search.png"),
          sign: "",
        },
        {
          name: "插件配置",
          value: "插件配置",
          images: require("../../assets/images/config/import.png"),
          sign: "",
        },
      ],
      courses: [
        {
          name: "播放器配置",
          value: "播放器配置",
          images: require("../../assets/images/config/player.png"),
          sign: "",
        },
        {
          name: "直播服务配置",
          value: "直播",
          images: require("../../assets/images/config/live.png"),
          sign: "Zhibo",
        },
        {
          name: "电子书推荐",
          value: "电子书",
          images: require("../../assets/images/config/book.png"),
          sign: "MeeduBooks",
        },
        {
          name: "图文推荐",
          value: "图文",
          images: require("../../assets/images/config/topic.png"),
          sign: "MeeduTopics",
        },
        {
          name: "问答配置",
          value: "问答",
          images: require("../../assets/images/config/wenda.png"),
          sign: "Wenda",
        },
      ],
      market: [
        {
          name: "注册送会员",
          value: "注册送VIP",
          images: require("../../assets/images/config/sendvip.png"),
          sign: "",
        },
        {
          name: "邀请送会员",
          value: "邀请",
          images: require("../../assets/images/config/invitevip.png"),
          sign: "",
        },
        {
          name: "邀请奖励",
          value: "邀请",
          images: require("../../assets/images/config/invite.png"),
          sign: "",
        },
        {
          name: "三级分销",
          value: "三级分销",
          images: require("../../assets/images/config/multishare.png"),
          sign: "MultiLevelShare",
        },
        {
          name: "团购配置",
          value: "团购",
          images: require("../../assets/images/config/tg.png"),
          sign: "TuanGou",
        },
        {
          name: "积分配置",
          value: "积分",
          images: require("../../assets/images/config/credict.png"),
          sign: "",
        },
      ],
    };
  },
  computed: {
    ...mapState(["enabledAddons"]),
  },
  mounted() {},
  methods: {
    goConfig(value) {
      if (value === "播放器配置") {
        this.$router.push({
          name: "SystemPlayerConfig",
        });
      } else if (value === "积分") {
        this.$router.push({
          name: "SystemCreditSignConfig",
        });
      } else if (value === "直播") {
        this.$router.push({
          name: "SystemLiveConfig",
        });
      } else if (value === "短信") {
        this.$router.push({
          name: "SystemMessageConfig",
        });
      } else if (value === "图片存储") {
        this.$router.push({
          name: "SystemSaveImagesConfig",
        });
      } else if (value === "视频加密") {
        this.$router.push({
          name: "SystemVideoHlsConfig",
        });
      } else if (value === "微信公众号") {
        this.$router.push({
          name: "SystemMpwechatConfig",
        });
      } else {
        this.$router.push({ name: "SystemConfig", query: { key: value } });
      }
    },
    check(sign) {
      if (
        sign === "视频加密" &&
        (this.enabledAddons["AliyunHls"] === 1 ||
          this.enabledAddons["TencentCloudHls"] === 1)
      ) {
        return true;
      } else if (this.enabledAddons[sign] === 1 || sign === "") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.config-box {
  width: 100%;
  height: auto;
  float: left;
  .options {
    width: 100%;
    height: auto;
    background: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(102, 102, 102, 0.05);
    float: left;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 20px;
    margin-bottom: 20px;
    .title {
      width: 100%;
      height: 16px;
      font-size: 16px;
      font-weight: 500;
      color: #333333;
      line-height: 16px;
      margin-bottom: 20px;
    }
    .body {
      width: 100%;
      height: auto;
      box-sizing: border-box;
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      .item {
        width: auto;
        height: 88px;
        background: #f3f4f5;
        box-shadow: 0px 2px 4px 0px rgba(102, 102, 102, 0.05);
        border-radius: 8px;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        padding-left: 30px;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
        img {
          width: 48px;
          height: 48px;
          margin-right: 20px;
        }
        span {
          height: 16px;
          font-size: 16px;
          font-weight: 400;
          color: #333333;
          line-height: 16px;
        }
      }
    }
  }
}
</style>
