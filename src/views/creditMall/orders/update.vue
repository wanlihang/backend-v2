<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑积分订单"></back-bar>

    <div class="float-left" v-if="form">
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="联系名称" prop="user_contact_name">
          <el-input
            class="w-200px"
            v-model="form.user_contact_name"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系手机" prop="user_contact_mobile">
          <el-input
            class="w-200px"
            v-model="form.user_contact_mobile"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系地址" prop="user_contact_address">
          <el-input
            class="w-400px"
            v-model="form.user_contact_address"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item label="运单号" prop="express_number">
          <el-input
            class="w-400px"
            v-model="form.express_number"
            type="text"
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
      form: {
        user_contact_name: null,
        user_contact_mobile: null,
        user_contact_address: null,
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
        user_contact_name: [
          {
            required: true,
            message: "联系名称不能为空",
            trigger: "blur",
          },
        ],
        user_contact_mobile: [
          {
            required: true,
            message: "联系手机不能为空",
            trigger: "blur",
          },
        ],
        user_contact_address: [
          {
            required: true,
            message: "联系地址不能为空",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    formValidate() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.confirm();
        }
      });
    },
    getDetail() {
      this.$api.CreditMall.Order.Detail(this.id).then((res) => {
        this.form.user_contact_address = res.data.user_contact_address;
        this.form.user_contact_mobile = res.data.user_contact_mobile;
        this.form.user_contact_name = res.data.user_contact_name;
        this.form.express_number = res.data.express_number;
      });
    },
    confirm() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.CreditMall.Order.Update(this.id, this.form)
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
