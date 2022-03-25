<template>
  <div class="meedu-main-body" v-loading="loading">
    <back-bar class="mb-30" title="积分配置"></back-bar>
    <div class="float-left">
      <el-form ref="form" label-width="205px">
        <el-form-item :key="1909" label="积分签到奖励规则">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['meedu.addons.DaySignIn.reward_rule']"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="88" label="注册奖励">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['meedu.member.credit1.register']"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="89" label="邀请奖励">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['meedu.member.credit1.invite']"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="90" label="看完课程">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['meedu.member.credit1.watched_course']"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="91" label="看完视频">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['meedu.member.credit1.watched_video']"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item :key="92" label="支付订单">
          <div class="j-flex flex-column" style="margin-left: 3px">
            <div>
              <el-input
                class="w-200px"
                v-model="form.config['meedu.member.credit1.paid_order']"
              ></el-input>
            </div>
            <div class="mt-5">
              <div class="form-helper-text">
                <span
                  >注意，支付订单的积分奖励与上面不同，它是根据订单金额*百分比奖励的，所以这里应该填写百分比。举个例子：订单支付金额100元，这里填写0.1，则用户奖励10积分。</span
                >
              </div>
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
      key2: "积分",
      config: null,
      loading: false,
      form: {
        config: {
          "meedu.addons.DaySignIn.reward_rule": null,
          "meedu.member.credit1.register": null,
          "meedu.member.credit1.invite": null,
          "meedu.member.credit1.watched_course": null,
          "meedu.member.credit1.watched_video": null,
          "meedu.member.credit1.paid_order": null,
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
        let newConfig = res.data["积分"];
        for (let index in newConfig) {
          if (newConfig[index].key === "meedu.member.credit1.register") {
            this.form.config["meedu.member.credit1.register"] =
              newConfig[index].value;
          } else if (newConfig[index].key === "meedu.member.credit1.invite") {
            this.form.config["meedu.member.credit1.invite"] =
              newConfig[index].value;
          } else if (
            newConfig[index].key === "meedu.member.credit1.watched_course"
          ) {
            this.form.config["meedu.member.credit1.watched_course"] =
              newConfig[index].value;
          } else if (
            newConfig[index].key === "meedu.member.credit1.watched_video"
          ) {
            this.form.config["meedu.member.credit1.watched_video"] =
              newConfig[index].value;
          } else if (
            newConfig[index].key === "meedu.member.credit1.paid_order"
          ) {
            this.form.config["meedu.member.credit1.paid_order"] =
              newConfig[index].value;
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
