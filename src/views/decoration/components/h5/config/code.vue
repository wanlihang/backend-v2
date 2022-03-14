<template>
  <div class="vod-v1-box" v-if="config">
    <div class="title">
      <div class="text">代码块</div>
    </div>

    <div class="config-item">
      <div class="config-item-title">代码内容</div>
      <div class="config-item-body">
        <el-input
          type="textarea"
          placeholder="请输入代码"
          :autosize="{ minRows: 10 }"
          v-model="config.html"
        ></el-input>
      </div>
    </div>

    <div class="float-left footer-button">
      <el-button type="primary" class="w-100" :loading="loading" @click="save">
        保存
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["block"],
  data() {
    return {
      config: null,
      loading: false,
    };
  },
  mounted() {
    this.config = this.block.config_render;
  },
  methods: {
    save() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.ViewBlock.Update(this.block.id, {
        sort: this.block.sort,
        config: this.config,
      })
        .then(() => {
          this.loading = false;
          this.$message.success(this.$t("common.success"));
          this.$emit("update");
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.vod-v1-box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  position: relative;
  padding-bottom: 40px;

  .footer-button {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 400px;
    height: 70px;
    background: #ffffff;
    border-top: 1px solid #e5e5e5;
    box-sizing: border-box;
    padding: 15px 30px;
  }

  .title {
    width: 100%;
    height: auto;
    float: left;
    box-sizing: border-box;
    border-left: 5px solid #3ca7fa;
    padding-left: 10px;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    line-height: 16px;
    margin-bottom: 30px;
  }

  .config-item {
    width: 100%;
    height: auto;
    float: left;
    box-sizing: border-box;
    padding-top: 30px;
    padding-bottom: 30px;
    border-top: 1px solid #f1f2f9;

    .config-item-title {
      width: 100%;
      height: auto;
      float: left;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: 600;
      color: #333333;
      line-height: 14px;
      padding-bottom: 30px;
    }

    .config-item-body {
      width: 100%;
      height: auto;
      float: left;
      box-sizing: border-box;
    }
  }
}
</style>
