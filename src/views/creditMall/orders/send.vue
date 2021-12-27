<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="积分订单发货"></back-bar>

    <div class="float-left" v-if="form">
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item
          v-if="goods_is_v === 0"
          label="运单号"
          prop="express_number"
        >
          <el-input
            class="w-400px"
            v-model="form.express_number"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="备注">
          <el-input
            v-model="form.remark"
            type="textarea"
            rows="4"
            maxlength="150"
            class="w-500px"
          ></el-input>
        </el-form-item>
      </el-form>

      <div class="bottom-menus">
        <div class="bottom-menus-box">
          <div>
            <el-button @click="formValidate" :loading="loading" type="primary"
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
      id: this.$route.query.id,
      goods_is_v: this.$route.query.goods_is_v,
      form: {
        remark: null,
        express_number: null,
      },
      rules: {
        express_number: [
          {
            required: true,
            message: "运单号",
            trigger: "blur",
          },
        ],
        remark: [
          {
            required: true,
            message: "备注不能为空",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  mounted() {},
  methods: {
    formValidate() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.confirm();
        }
      });
    },
    confirm() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.CreditMall.Order.Send(this.id, this.form)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$router.back();
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>
