<template>
  <div class="meedu-main-body" v-loading="loading">
    <back-bar class="mb-30" title="播放器配置"></back-bar>
    <div class="float-left">
      <el-form ref="form" label-width="205px">
        <div class="title">播放器封面</div>
        <el-form-item :key="98" label="播放器封面">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <upload-image
                v-model="form.config['meedu.system.player_thumb']"
                :name="form.name"
                :can-clear="true"
                :width="480"
                :height="270"
                helper="播放封面是在录播课播放未开始时显示的。推荐尺寸：1920x1080"
              ></upload-image>
            </div>
          </div>
        </el-form-item>
        <div class="title">跑马灯</div>
        <el-form-item :key="99" label="开关">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-switch
                v-model="
                  form.config['meedu.system.player.enabled_bullet_secret']
                "
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="1913" label="内容">
          <div class="float-left d-flex" style="margin-left: 3px">
            <div>
              <el-input
                placeholder="此处填写跑马灯内容"
                class="w-300px"
                v-model="form.config['meedu.system.player.bullet_secret.text']"
              ></el-input>
            </div>
            <div class="d-flex ml-10">
              <span class="helper-text">添加变量：</span>
              <el-link class="ml-10" @click="addMobile" type="primary"
                >学员手机号</el-link
              >
              <el-link class="ml-10" @click="addID" type="primary"
                >学员ID</el-link
              >
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="1914" label="文字大小">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                type="number"
                class="w-200px"
                v-model="form.config['meedu.system.player.bullet_secret.size']"
              >
                <template slot="append">px</template>
              </el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="1915" label="文字颜色">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-color-picker
                v-model="form.config['meedu.system.player.bullet_secret.color']"
              ></el-color-picker>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="1916" label="文字透明度">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div class="w-400px">
              <el-slider
                v-model="
                  form.config['meedu.system.player.bullet_secret.opacity']
                "
                :max="1"
                :step="0.1"
                show-stops
              >
              </el-slider>
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
import UploadImage from "@/components/upload-image";
export default {
  components: {
    UploadImage,
  },
  data() {
    return {
      key: "播放器配置",
      config: null,
      loading: false,
      form: {
        config: {
          "meedu.system.player_thumb": null,
          "meedu.system.player.enabled_bullet_secret": null,
          "meedu.system.player.bullet_secret.text": null,
          "meedu.system.player.bullet_secret.size": null,
          "meedu.system.player.bullet_secret.color": null,
          "meedu.system.player.bullet_secret.opacity": null,
        },
      },
    };
  },
  mounted() {
    this.getConfig();
  },
  methods: {
    addMobile() {
      this.form.config["meedu.system.player.bullet_secret.text"] +=
        "${user.mobile}";
    },
    addID() {
      this.form.config["meedu.system.player.bullet_secret.text"] +=
        "${user.id}";
    },
    getConfig() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.config = null;
      this.$api.System.Config.All().then((res) => {
        let configData = res.data["播放器配置"];
        for (let index in configData) {
          if (configData[index].key === "meedu.system.player_thumb") {
            this.form.config["meedu.system.player_thumb"] =
              configData[index].value;
          } else if (
            configData[index].key ===
            "meedu.system.player.enabled_bullet_secret"
          ) {
            this.form.config["meedu.system.player.enabled_bullet_secret"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.system.player.bullet_secret.text"
          ) {
            this.form.config["meedu.system.player.bullet_secret.text"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.system.player.bullet_secret.size"
          ) {
            this.form.config["meedu.system.player.bullet_secret.size"] =
              configData[index].value;
          } else if (
            configData[index].key === "meedu.system.player.bullet_secret.color"
          ) {
            this.form.config["meedu.system.player.bullet_secret.color"] =
              configData[index].value;
          } else if (
            configData[index].key ===
            "meedu.system.player.bullet_secret.opacity"
          ) {
            this.form.config["meedu.system.player.bullet_secret.opacity"] =
              parseFloat(configData[index].value);
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
