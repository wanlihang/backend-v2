<template>
  <div class="meedu-main-body" v-loading="loading">
    <back-bar class="mb-30" title="直播"></back-bar>
    <div class="float-left">
      <el-form ref="form" label-width="205px">
        <div class="title">直播服务商配置</div>
        <el-form-item :key="1485" label="选择直播服务商">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-select
                class="w-300px"
                v-model="form.config['meedu.addons.zhibo.default_service']"
              >
                <el-option
                  v-for="(item, index) in selects"
                  :key="index"
                  :label="item.title"
                  :value="item.key"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-form-item>
        <template
          v-if="form.config['meedu.addons.zhibo.default_service'] === 'aliyun'"
        >
          <el-form-item :key="1487" label="阿里云播流域名">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['meedu.addons.zhibo.aliyun.play_domain']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1488" label="阿里云推流域名">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['meedu.addons.zhibo.aliyun.push_domain']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1489" label="阿里云AccessKeyId">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['meedu.addons.zhibo.aliyun.access_key']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1490" label="阿里云AccessKeySecret">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="
                    form.config['meedu.addons.zhibo.aliyun.access_secret']
                  "
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1491" label="阿里云PlayKey">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['meedu.addons.zhibo.aliyun.play_key']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1492" label="阿里云PushKey">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['meedu.addons.zhibo.aliyun.push_key']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1503" label="阿里云录制回调key">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="
                    form.config['meedu.addons.zhibo.aliyun.record.callback.key']
                  "
                ></el-input>
              </div>
              <div class="mt-5">
                <div class="form-helper-text">
                  <span
                    >回调地址：{{
                      appUrl
                    }}addons/zhibo/api/v1/aliyun/callback</span
                  >
                </div>
              </div>
            </div>
          </el-form-item>
        </template>
        <template
          v-else-if="
            form.config['meedu.addons.zhibo.default_service'] === 'tencent'
          "
        >
          <el-form-item :key="1494" label="腾讯云AppId">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['meedu.addons.zhibo.tencent.app_id']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1495" label="腾讯云SecretId">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['meedu.addons.zhibo.tencent.secret_id']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1496" label="腾讯云SecretKey">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['meedu.addons.zhibo.tencent.secret_key']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1497" label="腾讯云播流域名">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="
                    form.config['meedu.addons.zhibo.tencent.play_domain']
                  "
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1498" label="腾讯云推流域名">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="
                    form.config['meedu.addons.zhibo.tencent.push_domain']
                  "
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1499" label="腾讯云PlayKey">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['meedu.addons.zhibo.tencent.play_key']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1500" label="腾讯云PushKey">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['meedu.addons.zhibo.tencent.push_key']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1505" label="腾讯云录制回调秘钥">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="
                    form.config[
                      'meedu.addons.zhibo.tencent.record.callback.key'
                    ]
                  "
                ></el-input>
              </div>
              <div class="mt-5">
                <div class="form-helper-text">
                  <span
                    >回调地址：{{
                      appUrl
                    }}addons/zhibo/api/v1/tencent/callback</span
                  >
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1911" label="腾讯云SRT推流">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-switch
                  v-model="form.config['meedu.addons.zhibo.tencent.srt_push']"
                  active-value="1"
                  inactive-value="0"
                >
                </el-switch>
              </div>
              <div class="mt-5">
                <div class="form-helper-text">
                  <span
                    >SRT推流有更低的丢包率，效果更好。要求OBS的版本>=22</span
                  >
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1912" label="腾讯云WebRtc播放">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-switch
                  v-model="
                    form.config['meedu.addons.zhibo.tencent.webrtc_play']
                  "
                  active-value="1"
                  inactive-value="0"
                >
                </el-switch>
              </div>
              <div class="mt-5">
                <div class="form-helper-text">
                  <span>该播放方式毫秒级延迟。</span>
                </div>
              </div>
            </div>
          </el-form-item>
        </template>
        <div class="title">直播间聊天室服务商配置</div>
        <el-form-item :key="1506" label="奥点云DMS pub_key">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['meedu.addons.zhibo.aodianyun.pub_key']"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="1507" label="奥点云DMS sub_key">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['meedu.addons.zhibo.aodianyun.sub_key']"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="1508" label="奥点云DMS s_key">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['meedu.addons.zhibo.aodianyun.s_key']"
              ></el-input>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div class="bottom-menus">
        <div class="bottom-menus-box">
          <div>
            <el-button @click="save" :loading="loading" type="primary"
              >保存</el-button
            >
          </div>
          <div class="ml-24">
            <el-button @click="$router.back()">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      key: "直播",
      config: null,
      appUrl: null,
      loading: false,
      selects: [
        {
          key: "aliyun",
          title: "阿里云直播",
        },
        {
          key: "tencent",
          title: "腾讯云直播",
        },
      ],
      form: {
        config: {
          "meedu.addons.zhibo.default_service": null,
          "meedu.addons.zhibo.aliyun.play_domain": null,
          "meedu.addons.zhibo.aliyun.push_domain": null,
          "meedu.addons.zhibo.aliyun.access_key": null,
          "meedu.addons.zhibo.aliyun.access_secret": null,
          "meedu.addons.zhibo.aliyun.play_key": null,
          "meedu.addons.zhibo.aliyun.push_key": null,
          "meedu.addons.zhibo.aliyun.record.callback.key": null,
          "meedu.addons.zhibo.aliyun.record.region": null,
          "meedu.addons.zhibo.tencent.app_id": null,
          "meedu.addons.zhibo.tencent.secret_id": null,
          "meedu.addons.zhibo.tencent.secret_key": null,
          "meedu.addons.zhibo.tencent.play_domain": null,
          "meedu.addons.zhibo.tencent.push_domain": null,
          "meedu.addons.zhibo.tencent.play_key": null,
          "meedu.addons.zhibo.tencent.push_key": null,
          "meedu.addons.zhibo.tencent.record.callback.key": null,
          "meedu.addons.zhibo.tencent.srt_push": null,
          "meedu.addons.zhibo.tencent.webrtc_play": null,
          "meedu.addons.zhibo.aodianyun.pub_key": null,
          "meedu.addons.zhibo.aodianyun.sub_key": null,
          "meedu.addons.zhibo.aodianyun.s_key": null,
        },
      },
    };
  },
  mounted() {
    this.getConfig();
  },
  methods: {
    getConfig() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.config = null;
      this.$api.System.Config.All().then((res) => {
        let configData = res.data["直播"];
        for (let index in configData) {
          if (configData[index].key === "meedu.addons.zhibo.default_service") {
            this.form.config["meedu.addons.zhibo.default_service"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.aliyun.play_domain"
          ) {
            this.form.config["meedu.addons.zhibo.aliyun.play_domain"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.aliyun.push_domain"
          ) {
            this.form.config["meedu.addons.zhibo.aliyun.push_domain"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.aliyun.access_key"
          ) {
            this.form.config["meedu.addons.zhibo.aliyun.access_key"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.aliyun.access_secret"
          ) {
            this.form.config["meedu.addons.zhibo.aliyun.access_secret"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.aliyun.play_key"
          ) {
            this.form.config["meedu.addons.zhibo.aliyun.play_key"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.aliyun.push_key"
          ) {
            this.form.config["meedu.addons.zhibo.aliyun.push_key"] =
              configData[index].value;
          } else if (
            configData[index].key ===
            "meedu.addons.zhibo.aliyun.record.callback.key"
          ) {
            this.form.config["meedu.addons.zhibo.aliyun.record.callback.key"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.aliyun.record.region"
          ) {
            this.form.config["meedu.addons.zhibo.aliyun.record.region"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.tencent.app_id"
          ) {
            this.form.config["meedu.addons.zhibo.tencent.app_id"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.tencent.secret_id"
          ) {
            this.form.config["meedu.addons.zhibo.tencent.secret_id"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.tencent.secret_key"
          ) {
            this.form.config["meedu.addons.zhibo.tencent.secret_key"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.tencent.play_domain"
          ) {
            this.form.config["meedu.addons.zhibo.tencent.play_domain"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.tencent.push_domain"
          ) {
            this.form.config["meedu.addons.zhibo.tencent.push_domain"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.tencent.play_key"
          ) {
            this.form.config["meedu.addons.zhibo.tencent.play_key"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.tencent.push_key"
          ) {
            this.form.config["meedu.addons.zhibo.tencent.push_key"] =
              configData[index].value;
          } else if (
            configData[index].key ===
            "meedu.addons.zhibo.tencent.record.callback.key"
          ) {
            this.form.config["meedu.addons.zhibo.tencent.record.callback.key"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.tencent.srt_push"
          ) {
            this.form.config["meedu.addons.zhibo.tencent.srt_push"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.tencent.webrtc_play"
          ) {
            this.form.config["meedu.addons.zhibo.tencent.webrtc_play"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.aodianyun.pub_key"
          ) {
            this.form.config["meedu.addons.zhibo.aodianyun.pub_key"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.aodianyun.sub_key"
          ) {
            this.form.config["meedu.addons.zhibo.aodianyun.sub_key"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.addons.zhibo.aodianyun.s_key"
          ) {
            this.form.config["meedu.addons.zhibo.aodianyun.s_key"] =
              configData[index].value;
          }
        }

        let configSysData = res.data["系统"];
        for (let index in configSysData) {
          if (configSysData[index].key === "app.url") {
            let appUrl = configSysData[index].value;
            if (appUrl.substr(appUrl.length - 1, 1) === "/") {
              this.appUrl = appUrl;
            } else {
              this.appUrl = appUrl + "/";
            }
            break;
          }
        }

        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    },
    save() {
      if (this.loading) {
        return;
      }
      this.loading = true;

      this.$api.System.Config.Save(this.form).then(() => {
        this.$message.success(this.$t("common.success"));
        this.loading = false;

        this.getConfig();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-form-item {
  margin-bottom: 30px !important;
}
.meedu-main-body {
  width: 100%;
}
.title {
  width: 100%;
  height: 16px;
  border-left: 4px solid #3ca7fa;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  color: #333333;
  padding-left: 10px;
  margin-top: 20px;
  margin-bottom: 30px;
}
</style>
