<template>
  <div>
    <!-- 切换语言 -->
    <el-dropdown
      class="languagebox"
      size="small"
      placement="bottom"
      trigger="click"
      @command="batchOperate"
    >
      <el-button class="search-btn">
        <img src="../../assets/login/yuyan@2x.png" />
        <span>{{ $t("login.langtext") }}</span>
      </el-button>
      <el-dropdown-menu
        slot="dropdown"
        class="sellanguage"
        style="margin-right: 30px"
      >
        <el-dropdown-item command="changezh">简体中文</el-dropdown-item>
        <el-dropdown-item command="changeen">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
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
          <h3 class="title">{{ $t("login.title") }}</h3>
          <el-form-item prop="username">
            <el-input
              type="text"
              v-model="ruleForm2.username"
              auto-complete="off"
              :placeholder="$t('login.tipmes1')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="ruleForm2.password"
              auto-complete="off"
              :placeholder="$t('login.tipmes2')"
            ></el-input>
          </el-form-item>
          <!-- <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox> -->
          <el-form-item style="width: 100%">
            <el-button
              type="primary"
              style="width: 100%"
              @click="handleSubmit"
              :loading="logining"
              >{{ $t("login.login") }}</el-button
            >
          </el-form-item>
        </el-form>
      </div>
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
          { required: true, message: localStorage.getItem('Logintip1') || '请您输入管理员账号', trigger: "blur" },
        ],
        password: [
          { required: true, message: localStorage.getItem('Logintip2') || '请您输入密码', trigger: "blur" },
        ],
      },
      checked: true,
      lang: localStorage.getItem('LANGUAGE') || 'zh',
    };
  },
  methods: {
    handleSubmit(event) {
      console.log(event);
      this.loading = true;
      this.$api.Auth.Login(this.ruleForm2).then((resp) => {
        if (resp.status == 0) {
          //Utils.saveLocal("token", resp.data.token);
          localStorage.setItem("astoken", resp.data.token);
          localStorage.setItem("user", this.ruleForm2.username); //保存登录名
          this.$router.push({ path: "/index" }); //跳到首页
        }
        this.loading = false;
      });
    },
    batchOperate(command) {
      switch (command) {
        case "changezh":
          this.changezh();
          break;
        case "changeen":
          this.changeen();
          break;
      }
    },
    // 对应选项事件
    changezh() {
      this.lang = "zh";
      this.$i18n.locale = this.lang;
      localStorage.setItem("LANGUAGE", this.lang);
      localStorage.setItem('Logintip1',"请您输入管理员账号");
      localStorage.setItem('Logintip2',"请您输入密码");    
    },
    changeen() {
      this.lang = "en";
      this.$i18n.locale = this.lang;
      localStorage.setItem("LANGUAGE", this.lang);
      localStorage.setItem('Logintip1',"Please enter the administrator account number");
      localStorage.setItem('Logintip2',"Please enter your password"); 
    },
    changeLanguage() {
      if (this.lang === "zh") {
        this.lang = "en";
        this.$i18n.locale = this.lang;
        localStorage.setItem("LANGUAGE", this.lang);
      } else {
        this.lang = "zh";
        this.$i18n.locale = this.lang;
        localStorage.setItem("LANGUAGE", this.lang);
      }
    },
  },
};
</script>
 
<style lang="less" scoped>
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
  box-sizing: border-box;
}
.right_content {
  width: 529px;
  height: 100%;
  box-sizing: border-box;
}
.login-page {
  margin-left: 0;
  width: 529px;
  height: 100%;
  padding: 35px 35px 0px 49px;
  background: #fff;
  box-sizing: border-box;
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
.languagebox {
  float: right;
  width: 140px;
  height: 26px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  margin-top: 30px;
  padding-right: 30px;
  .el-button {
    width: 140px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: none;
  }
  img {
    width: 26px;
    height: 26px;
    margin-right: 10px;
  }
  span {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    vertical-align: super;
  }
}
.el-dropdown-menu {
  width: 166px;
  height: 136px;
  background: #ffffff;
  box-shadow: 0px 4px 10px 0px rgba(102, 102, 102, 0.2);
  border-radius: 8px;
  border: none;
  box-sizing: border-box;
  margin-top: 20px;
  padding: 20px 0;
  .el-dropdown-menu__item {
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 36px;
  }
}
</style>
