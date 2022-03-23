<template>
  <div class="meedu-main-body" v-loading="loading">
    <back-bar class="mb-30" title="播放器配置"></back-bar>
    <div class="float-left">
      <el-form ref="form" label-width="205px">
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
        <el-form-item :key="99" label="跑马灯（防止录屏）">
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
</style>
