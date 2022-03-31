<template>
  <div class="meedu-main-body" v-loading="loading">
    <back-bar class="mb-30" title="短信"></back-bar>
    <div class="float-left">
      <el-form ref="form" label-width="205px">
        <div class="title">短信服务商配置</div>
        <el-form-item :key="23" label="短信服务商">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-select
                class="w-300px"
                v-model="form.config['meedu.system.sms']"
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
        <template v-if="form.config['meedu.system.sms'] === 'aliyun'">
          <el-form-item :key="24" label="阿里云 AccessKeyId">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['sms.gateways.aliyun.access_key_id']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="25" label="阿里云 AccessKeySecret">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['sms.gateways.aliyun.access_key_secret']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="26" label="阿里云 短信签名">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['sms.gateways.aliyun.sign_name']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="27" label="阿里云 密码重置模板ID">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="
                    form.config['sms.gateways.aliyun.template.password_reset']
                  "
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="28" label="阿里云 注册模板ID">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['sms.gateways.aliyun.template.register']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="29" label="阿里云 手机号绑定模板ID">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="
                    form.config['sms.gateways.aliyun.template.mobile_bind']
                  "
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="30" label="阿里云 手机号登录模板ID">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['sms.gateways.aliyun.template.login']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
        </template>
        <template v-else-if="form.config['meedu.system.sms'] === 'tencent'">
          <el-form-item :key="1892" label="腾讯云短信 SdkAppId">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['sms.gateways.tencent.sdk_app_id']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1893" label="腾讯云短信 Region">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-select
                  class="w-300px"
                  v-model="form.config['sms.gateways.tencent.region']"
                >
                  <el-option
                    v-for="(item, index) in regions"
                    :key="index"
                    :label="item.title"
                    :value="item.key"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1894" label="腾讯云短信 SecretId">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['sms.gateways.tencent.secret_id']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1895" label="腾讯云短信 SecretKey">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['sms.gateways.tencent.secret_key']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1896" label="腾讯云短信 SignName">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['sms.gateways.tencent.sign_name']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1897" label="腾讯云 密码重置模板ID">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="
                    form.config['sms.gateways.tencent.template.password_reset']
                  "
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1898" label="腾讯云 注册模板ID">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="
                    form.config['sms.gateways.tencent.template.register']
                  "
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1899" label="腾讯云 手机号绑定模板ID">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="
                    form.config['sms.gateways.tencent.template.mobile_bind']
                  "
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="1900" label="腾讯云 手机号登录模板ID">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['sms.gateways.tencent.template.login']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
        </template>
        <template v-else-if="form.config['meedu.system.sms'] === 'yunpian'">
          <el-form-item :key="31" label="云片ApiKey">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  v-model="form.config['sms.gateways.yunpian.api_key']"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="32" label="云片密码重置模板">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  type="textarea"
                  :rows="3"
                  v-model="
                    form.config['sms.gateways.yunpian.template.password_reset']
                  "
                >
                </el-input>
              </div>
              <div class="mt-5">
                <div class="form-helper-text">
                  <span>注意：云片短信不是填写模板ID，而是填写模板内容</span>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="33" label="云片注册模板">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  type="textarea"
                  :rows="3"
                  v-model="
                    form.config['sms.gateways.yunpian.template.register']
                  "
                >
                </el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="34" label="云片手机号绑定模板">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  type="textarea"
                  :rows="3"
                  v-model="
                    form.config['sms.gateways.yunpian.template.mobile_bind']
                  "
                >
                </el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item :key="35" label="云片手机号登陆模板">
            <div class="j-flex flex-column" style="margin-left: 3px">
              <div>
                <el-input
                  class="w-200px"
                  type="textarea"
                  :rows="3"
                  v-model="form.config['sms.gateways.yunpian.template.login']"
                >
                </el-input>
              </div>
            </div>
          </el-form-item>
        </template>
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
      key: "短信",
      config: null,
      loading: false,
      selects: [
        {
          key: "aliyun",
          title: "阿里云",
        },
        {
          key: "tencent",
          title: "腾讯云",
        },
        {
          key: "yunpian",
          title: "云片",
        },
      ],
      regions: [
        {
          key: "ap-beijing",
          title: "华北地区（北京）",
        },
        {
          key: "ap-guangzhou",
          title: "华南地区（广州）",
        },
        {
          key: "ap-nanjing",
          title: "华东地区（南京）",
        },
      ],
      form: {
        config: {
          "meedu.system.sms": null,
          "sms.gateways.aliyun.access_key_id": null,
          "sms.gateways.aliyun.access_key_secret": null,
          "sms.gateways.aliyun.sign_name": null,
          "sms.gateways.aliyun.template.password_reset": null,
          "sms.gateways.aliyun.template.register": null,
          "sms.gateways.aliyun.template.mobile_bind": null,
          "sms.gateways.aliyun.template.login": null,
          "sms.gateways.tencent.sdk_app_id": null,
          "sms.gateways.tencent.region": null,
          "sms.gateways.tencent.secret_id": null,
          "sms.gateways.tencent.secret_key": null,
          "sms.gateways.tencent.sign_name": null,
          "sms.gateways.tencent.template.password_reset": null,
          "sms.gateways.tencent.template.register": null,
          "sms.gateways.tencent.template.mobile_bind": null,
          "sms.gateways.tencent.template.login": null,
          "sms.gateways.yunpian.api_key": null,
          "sms.gateways.yunpian.template.password_reset": null,
          "sms.gateways.yunpian.template.register": null,
          "sms.gateways.yunpian.template.mobile_bind": null,
          "sms.gateways.yunpian.template.login": null,
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
        let configData = res.data["短信"];
        for (let index in configData) {
          if (configData[index].key === "meedu.system.sms") {
            this.form.config["meedu.system.sms"] = configData[index].value;
          } else if (
            configData[index].key === "sms.gateways.aliyun.access_key_id"
          ) {
            this.form.config["sms.gateways.aliyun.access_key_id"] =
              configData[index].value;
          } else if (
            configData[index].key === "sms.gateways.aliyun.access_key_secret"
          ) {
            this.form.config["sms.gateways.aliyun.access_key_secret"] =
              configData[index].value;
          } else if (
            configData[index].key === "sms.gateways.aliyun.sign_name"
          ) {
            this.form.config["sms.gateways.aliyun.sign_name"] =
              configData[index].value;
          } else if (
            configData[index].key ===
            "sms.gateways.aliyun.template.password_reset"
          ) {
            this.form.config["sms.gateways.aliyun.template.password_reset"] =
              configData[index].value;
          } else if (
            configData[index].key === "sms.gateways.aliyun.template.register"
          ) {
            this.form.config["sms.gateways.aliyun.template.register"] =
              configData[index].value;
          } else if (
            configData[index].key === "sms.gateways.aliyun.template.mobile_bind"
          ) {
            this.form.config["sms.gateways.aliyun.template.mobile_bind"] =
              configData[index].value;
          } else if (
            configData[index].key === "sms.gateways.aliyun.template.login"
          ) {
            this.form.config["sms.gateways.aliyun.template.login"] =
              configData[index].value;
          } else if (
            configData[index].key === "sms.gateways.tencent.sdk_app_id"
          ) {
            this.form.config["sms.gateways.tencent.sdk_app_id"] =
              configData[index].value;
          } else if (configData[index].key === "sms.gateways.tencent.region") {
            this.form.config["sms.gateways.tencent.region"] =
              configData[index].value;
          } else if (
            configData[index].key === "sms.gateways.tencent.secret_id"
          ) {
            this.form.config["sms.gateways.tencent.secret_id"] =
              configData[index].value;
          } else if (
            configData[index].key === "sms.gateways.tencent.secret_key"
          ) {
            this.form.config["sms.gateways.tencent.secret_key"] =
              configData[index].value;
          } else if (
            configData[index].key === "sms.gateways.tencent.sign_name"
          ) {
            this.form.config["sms.gateways.tencent.sign_name"] =
              configData[index].value;
          } else if (
            configData[index].key ===
            "sms.gateways.tencent.template.password_reset"
          ) {
            this.form.config["sms.gateways.tencent.template.password_reset"] =
              configData[index].value;
          } else if (
            configData[index].key === "sms.gateways.tencent.template.register"
          ) {
            this.form.config["sms.gateways.tencent.template.register"] =
              configData[index].value;
          } else if (
            configData[index].key ===
            "sms.gateways.tencent.template.mobile_bind"
          ) {
            this.form.config["sms.gateways.tencent.template.mobile_bind"] =
              configData[index].value;
          } else if (
            configData[index].key === "sms.gateways.tencent.template.login"
          ) {
            this.form.config["sms.gateways.tencent.template.login"] =
              configData[index].value;
          } else if (configData[index].key === "sms.gateways.yunpian.api_key") {
            this.form.config["sms.gateways.yunpian.api_key"] =
              configData[index].value;
          } else if (
            configData[index].key ===
            "sms.gateways.yunpian.template.password_reset"
          ) {
            this.form.config["sms.gateways.yunpian.template.password_reset"] =
              configData[index].value;
          } else if (
            configData[index].key === "sms.gateways.yunpian.template.register"
          ) {
            this.form.config["sms.gateways.yunpian.template.register"] =
              configData[index].value;
          } else if (
            configData[index].key ===
            "sms.gateways.yunpian.template.mobile_bind"
          ) {
            this.form.config["sms.gateways.yunpian.template.mobile_bind"] =
              configData[index].value;
          } else if (
            configData[index].key === "sms.gateways.yunpian.template.login"
          ) {
            this.form.config["sms.gateways.yunpian.template.login"] =
              configData[index].value;
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
