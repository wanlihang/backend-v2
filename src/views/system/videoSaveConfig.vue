<template>
  <div class="meedu-main-body" v-loading="loading">
    <back-bar class="mb-30" title="视频"></back-bar>
    <div class="float-left">
      <el-form ref="form" label-width="205px">
        <div class="title">阿里云视频</div>
        <el-form-item :key="61" label="阿里云视频Region">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-select
                class="w-300px"
                v-model="form.config['meedu.upload.video.aliyun.region']"
                @change="saveHost"
              >
                <el-option
                  v-for="(item, index) in aliRegions"
                  :key="index"
                  :label="item.title"
                  :value="item.key"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="62" label="阿里云视频AccessKeyId">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['meedu.upload.video.aliyun.access_key_id']"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="63" label="阿里云视频AccessKeySecret">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="
                  form.config['meedu.upload.video.aliyun.access_key_secret']
                "
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <div class="title">腾讯云视频</div>
        <el-form-item :key="64" label="腾讯云视频AppId">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['tencent.vod.app_id']"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="65" label="腾讯云视频SecretId">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['tencent.vod.secret_id']"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="66" label="腾讯云视频SecretKey">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['tencent.vod.secret_key']"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="67" label="腾讯云播放key">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['meedu.system.player.tencent_play_key']"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <div class="title">播放格式白名单</div>
        <el-form-item :key="2068" label="视频播放格式白名单">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-select
                class="w-300px"
                multiple
                v-model="
                  form.config['meedu.system.player.video_format_whitelist']
                "
              >
                <el-option
                  v-for="(item, index) in definition"
                  :key="index"
                  :label="item.title"
                  :value="item.key"
                >
                </el-option>
              </el-select>
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
export default {
  data() {
    return {
      key: "视频",
      config: null,
      loading: false,
      form: {
        config: {
          "meedu.upload.video.aliyun.region": null,
          "meedu.upload.video.aliyun.host": null,
          "meedu.upload.video.aliyun.access_key_id": null,
          "meedu.upload.video.aliyun.access_key_secret": null,
          "tencent.vod.app_id": null,
          "tencent.vod.secret_id": null,
          "tencent.vod.secret_key": null,
          "meedu.system.player.tencent_play_key": null,
          "meedu.system.player.video_format_whitelist": null,
        },
      },
      aliRegions: [
        {
          title: "华东1（杭州）/ 华东2（上海）",
          key: "cn-shanghai",
          host: "vod.cn-shanghai.aliyuncs.com",
        },
        {
          title: "华北2（北京）",
          key: "cn-beijing",
          host: "vod.cn-beijing.aliyuncs.com",
        },
        {
          title: "华北3（张家口）",
          key: "cn-zhangjiakou",
          host: "vod.cn-zhangjiakou.aliyuncs.com",
        },
        {
          title: "华南1（深圳）",
          key: "cn-shenzhen",
          host: "vod.cn-shenzhen.aliyuncs.com",
        },
      ],
      definition: [
        {
          title: "mp4",
          key: "mp4",
        },
        {
          title: "m3u8",
          key: "m3u8",
        },
      ],
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
    lowerCase(str) {
      let arr = str.split("");
      let newStr = "";
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= "A" && arr[i] <= "Z") newStr += arr[i].toLowerCase();
        else newStr += arr[i];
      }
      return newStr;
    },
    saveHost(key) {
      let it = this.aliRegions.find((o) => o.key === key);
      this.form.config["meedu.upload.video.aliyun.host"] = it.host;
    },
    getConfig() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.config = null;
      this.$api.System.Config.All().then((res) => {
        let configData = res.data["视频"];
        for (let index in configData) {
          if (configData[index].key === "meedu.upload.video.aliyun.region") {
            this.form.config["meedu.upload.video.aliyun.region"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.upload.video.aliyun.host"
          ) {
            this.form.config["meedu.upload.video.aliyun.host"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.upload.video.aliyun.access_key_id"
          ) {
            this.form.config["meedu.upload.video.aliyun.access_key_id"] =
              configData[index].value;
          } else if (
            configData[index].key ===
            "meedu.upload.video.aliyun.access_key_secret"
          ) {
            this.form.config["meedu.upload.video.aliyun.access_key_secret"] =
              configData[index].value;
          } else if (configData[index].key === "tencent.vod.app_id") {
            this.form.config["tencent.vod.app_id"] = configData[index].value;
          } else if (configData[index].key === "tencent.vod.secret_id") {
            this.form.config["tencent.vod.secret_id"] = configData[index].value;
          } else if (configData[index].key === "tencent.vod.secret_key") {
            this.form.config["tencent.vod.secret_key"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.system.player.tencent_play_key"
          ) {
            this.form.config["meedu.system.player.tencent_play_key"] =
              configData[index].value;
          }
        }
        let configPlayData = res.data["播放器配置"];
        for (let index in configPlayData) {
          if (
            configPlayData[index].key ===
            "meedu.system.player.video_format_whitelist"
          ) {
            if (
              configPlayData[index].value &&
              configPlayData[index].value.length > 0
            ) {
              let value = this.lowerCase(configPlayData[index].value);
              this.form.config["meedu.system.player.video_format_whitelist"] =
                value.split(",");
            }
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
      if (this.form.config["meedu.system.player.video_format_whitelist"]) {
        this.form.config["meedu.system.player.video_format_whitelist"] =
          this.form.config["meedu.system.player.video_format_whitelist"].join(
            ","
          );
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
