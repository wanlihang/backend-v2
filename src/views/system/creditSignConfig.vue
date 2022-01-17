<template>
  <div class="meedu-main-body" v-loading="loading">
    <back-bar class="mb-30" title="积分签到"></back-bar>
    <div class="float-left">
      <el-form ref="form" label-width="205px">
        <el-form-item :key="1909" label="积分奖励规则">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['meedu.addons.DaySignIn.reward_rule']"
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
      key: "每日签到",
      config: null,
      loading: false,
      form: {
        config: {
          "meedu.addons.DaySignIn.reward_rule": null,
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
        let configData = res.data["每日签到"];
        for (let index in configData) {
          if (configData[index].key === "meedu.addons.DaySignIn.reward_rule") {
            this.form.config["meedu.addons.DaySignIn.reward_rule"] =
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
