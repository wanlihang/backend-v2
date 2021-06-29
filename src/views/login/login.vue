<template>
  <!-- 一个提交按钮对应一个el-form    model表单数据对象  rules表单验证规则 -->
  <div class="login-container">
    <div class="left_content"></div>
    <div class="right_content">
      <el-form
        :model="ruleForm2"
        :rules="rules2"
        status-icon
        ref="ruleForm2"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-page"
      >
        <h3 class="title">登录MeEdu后台管理</h3>
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="ruleForm2.username"
            auto-complete="off"
            placeholder="请输入管理员账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm2.password"
            auto-complete="off"
            placeholder="请输入账户密码"
          ></el-input>
        </el-form-item>
        <!-- <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox> -->
        <el-form-item style="width: 100%">
          <el-button
            type="primary"
            style="width: 100%"
            @click="handleSubmit"
            :loading="logining"
            >立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
 
<script>

export default {
  name: "login",
  data() {
    return {
      logining: false,
      ruleForm2: {
        username: "",
        password: "",
      },
      rules2: {
        username: [
          { required: true, message: "请您输入管理员账号", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请您输入密码", trigger: "blur" },
        ],
      },
      checked: true,
    };
  },
  methods: {
    handleSubmit(event) {
      console.log(event);
      this.loading = true;
      this.$api.Auth.Login(this.ruleForm2).then((resp) => {
        if (resp.status==0) {
          //Utils.saveLocal("token", resp.data.token);
          localStorage.setItem('astoken',resp.data.token)
          localStorage.setItem("user", this.ruleForm2.username); //保存登录名
          this.$router.push({ path: "/account" }); //跳到账号管理
        }
        this.loading = false;
      });
    },
  },
};
</script>
 
<style scoped>
#app {
  position: relative;
}
.login-container {
  width: 1000px;
  height: 600px;
  background: #ffffff;
  box-shadow: 20px 20px 100px 0px rgba(85, 102, 119, 0.1);
  border-radius: 4px;
  -webkit-border-radius: 4px;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;
}
.left_content {
  width: 471px;
  height: 100%;
  background: url(../../assets/login/loginleft_banner.png) no-repeat;
  background-size: 100% 100%;
}
.right_content {
  width: 529px;
  height: 100%;
}
.login-page {
  margin-left: 0;
  width: 529px;
  height: 100%;
  padding: 35px 35px 0px 49px;
  background: #fff;
}
.right_content .title {
  width: auto;
  height: 24px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000000;
  line-height: 24px;
  margin-top: 65px;
  margin-bottom: 80px;
}
/deep/.el-input__inner {
  width: 380px;
  height: 48px;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
}
/deep/.el-input__inner:focus {
  border: 1px solid #3ca7fa;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
.el-button--primary {
  width: 380px !important;
  height: 48px;
  background: #3ca7fa;
  border-color: #3ca7fa !important;
  border-radius: 4px;
  margin-top: 30px;
  font-size: 16px !important;
  font-weight: 400 !important;
}
.el-form-item {
  margin-bottom: 50px !important;
}
</style>
