<template>
  <div class="change-password-box">
    <div class="form">
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-position="top"
      >
        <el-form-item label="原密码" prop="old_password">
          <el-input
            type="password"
            v-model="form.old_password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password">
          <el-input
            type="password"
            v-model="form.new_password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="new_password_confirmation">
          <el-input
            type="password"
            v-model="form.new_password_confirmation"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        old_password: null,
        new_password: null,
        new_password_confirmation: null,
      },
      rules: {
        old_password: [
          {
            required: true,
            message: "请输入原密码",
            trigger: "blur",
          },
        ],
        new_password: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur",
          },
        ],
        new_password_confirmation: [
          {
            required: true,
            message: "请再输入一次新密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.new_password !== this.form.new_password_confirmation) {
            this.$message.error("两次输入新密码不一致");
            return;
          }

          this.$api.Administrator.ChangePassword(this.form)
            .then(() => {
              this.$message.success(this.$t("common.success"));
            })
            .catch((e) => {
              this.$message.error(e.message);
            });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.change-password-box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  background-color: white;
  padding: 50px;

  .form {
      width: 400px;
      height: auto;
      margin: 0 auto;
  }
}
</style>