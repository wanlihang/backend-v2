<template>
  <div class="meedu-main-body" v-loading="loading">
    <back-bar class="mb-30" title="微信公众号"></back-bar>
    <div class="float-left">
      <el-form ref="form" label-width="205px">
        <div class="title">基础配置</div>
        <el-form-item :key="870" label="AppId">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['meedu.mp_wechat.app_id']"
              ></el-input>
            </div>
            <div class="mt-5">
              <div class="form-helper-text" v-if="appUrl">
                <span>微信公众号URL：{{ appUrl }}/api/wechat/serve</span>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="871" label="AppSecret">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['meedu.mp_wechat.app_secret']"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="872" label="Token">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['meedu.mp_wechat.token']"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="873" label="AesKey">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['meedu.mp_wechat.aes_key']"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <div class="title">登录配置</div>
        <el-form-item :key="1696" label="启用授权登录">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-switch
                v-model="form.config['meedu.mp_wechat.enabled_oauth_login']"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="1833" label="启用PC扫码登录">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-switch
                v-model="form.config['meedu.mp_wechat.enabled_scan_login']"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="1844" label="扫码登录成功回复信息">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-400px"
                type="textarea"
                :rows="6"
                resize="none"
                show-word-limit
                maxlength="200"
                v-model="form.config['meedu.mp_wechat.scan_login_alert']"
              >
              </el-input>
            </div>
          </div>
        </el-form-item>
        <div class="title">手机端分享</div>
        <el-form-item :key="1834" label="启用微信分享">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-switch
                v-model="form.config['meedu.mp_wechat.enabled_share']"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="1835" label="微信分享标题">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['meedu.mp_wechat.share.title']"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="1836" label="微信分享描述">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['meedu.mp_wechat.share.desc']"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="1837" label="微信分享图片">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <upload-image
                v-model="form.config['meedu.mp_wechat.share.imgUrl']"
                name="微信分享图片"
                class="w-200px"
              ></upload-image>
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
import { mapState } from "vuex";
import UploadImage from "@/components/upload-image";

export default {
  components: {
    UploadImage,
  },
  data() {
    return {
      key: "微信公众号",
      config: null,
      appUrl: null,
      loading: false,
      form: {
        config: {
          "meedu.mp_wechat.app_id": null,
          "meedu.mp_wechat.app_secret": null,
          "meedu.mp_wechat.token": null,
          "meedu.mp_wechat.aes_key": null,
          "meedu.mp_wechat.enabled_oauth_login": null,
          "meedu.mp_wechat.enabled_scan_login": null,
          "meedu.mp_wechat.scan_login_alert": null,
          "meedu.mp_wechat.enabled_share": null,
          "meedu.mp_wechat.share.title": null,
          "meedu.mp_wechat.share.desc": null,
          "meedu.mp_wechat.share.imgUrl": null,
        },
      },
    };
  },
  computed: {
    ...mapState(["enabledAddons"]),
  },
  mounted() {
    if (this.enabledAddons) {
      this.getConfig();
    }
  },
  methods: {
    getConfig() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.config = null;
      this.$api.System.Config.All().then((res) => {
        let configData = res.data["微信公众号"];
        for (let index in configData) {
          if (configData[index].key === "meedu.mp_wechat.app_id") {
            this.form.config["meedu.mp_wechat.app_id"] =
              configData[index].value;
          } else if (configData[index].key === "meedu.mp_wechat.app_secret") {
            this.form.config["meedu.mp_wechat.app_secret"] =
              configData[index].value;
          } else if (configData[index].key === "meedu.mp_wechat.token") {
            this.form.config["meedu.mp_wechat.token"] = configData[index].value;
          } else if (configData[index].key === "meedu.mp_wechat.aes_key") {
            this.form.config["meedu.mp_wechat.aes_key"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.mp_wechat.enabled_oauth_login"
          ) {
            this.form.config["meedu.mp_wechat.enabled_oauth_login"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.mp_wechat.enabled_scan_login"
          ) {
            this.form.config["meedu.mp_wechat.enabled_scan_login"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.mp_wechat.scan_login_alert"
          ) {
            this.form.config["meedu.mp_wechat.scan_login_alert"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.mp_wechat.enabled_share"
          ) {
            this.form.config["meedu.mp_wechat.enabled_share"] =
              configData[index].value;
          } else if (configData[index].key === "meedu.mp_wechat.share.title") {
            this.form.config["meedu.mp_wechat.share.title"] =
              configData[index].value;
          } else if (configData[index].key === "meedu.mp_wechat.share.desc") {
            this.form.config["meedu.mp_wechat.share.desc"] =
              configData[index].value;
          } else if (configData[index].key === "meedu.mp_wechat.share.imgUrl") {
            this.form.config["meedu.mp_wechat.share.imgUrl"] =
              configData[index].value;
          }
        }
        let sysData = res.data["系统"];
        for (let index in sysData) {
          if (sysData[index].key === "app.url") {
            this.appUrl = sysData[index].value;
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
