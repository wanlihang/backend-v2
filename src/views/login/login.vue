<template>
  <div>
    <div class="login-container">
      <div class="left_content"></div>
      <div class="right_content">
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          label-position="left"
          label-width="0px"
          class="demo-ruleForm login-page"
        >
          <h3 class="title">{{ $t("login.title") }}</h3>
          <el-form-item prop="username">
            <el-input
              type="text"
              v-model="form.username"
              auto-complete="off"
              :placeholder="$t('login.tipmes1')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              @keyup.enter.native="formValidate"
              type="password"
              v-model="form.password"
              auto-complete="off"
              :placeholder="$t('login.tipmes2')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <div class="d-flex">
              <el-input
                class="input-short"
                type="text"
                v-model="form.captcha"
                auto-complete="off"
                placeholder="请输入图形验证码"
              ></el-input>
              <div class="captcha">
                <img
                  class="captcha-img"
                  :src="captcha.img"
                  mode="widthFix"
                  @click="getCaptcha"
                />
              </div>
            </div>
          </el-form-item>
          <el-form-item style="width: 100%">
            <el-button
              type="primary"
              style="width: 100%"
              @click="formValidate"
              :loading="logining"
            >
              {{ $t("login.login") }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  name: "login",
  data() {
    return {
      logining: false,
      form: {
        username: "",
        password: "",
        captcha: "",
      },
      checked: true,
      captcha: {
        key: null,
        img: null,
      },
      rules: {
        username: [
          {
            required: true,
            message: this.$t("login.username_required"),
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: this.$t("login.password_required"),
            trigger: "blur",
          },
        ],
        captcha: [
          {
            required: true,
            message: "请您输入图形验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    if (this.$utils.getToken()) {
      this.goDashboard();
    }
    this.getCaptcha();
  },
  methods: {
    ...mapMutations(["loginHandle"]),
    formValidate() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.handleSubmit();
        }
      });
    },
    getCaptcha() {
      this.$api.Auth.Captcha().then((res) => {
        this.captcha = res.data;
      });
    },
    handleSubmit() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Auth.Login({
        username: this.form.username,
        password: this.form.password,
        image_key: this.captcha.key,
        image_captcha: this.form.captcha,
      })
        .then((resp) => {
          let token = resp.data.token;

          this.$utils.saveToken(token);

          this.$api.Administrator.Detail().then((res) => {
            this.loginHandle(res.data);
            this.goDashboard();
          });
        })
        .catch((e) => {
          this.loading = false;
          this.form.captcha = "";
          this.getCaptcha();
          this.$message.error(e.message);
        });
    },
    goDashboard() {
      this.$router.push({ name: "Dashboard" });
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
.input-short {
  width: 250px;
  /deep/.el-input__inner {
    width: 250px;
    height: 48px;
    border-radius: 4px;
    border: 1px solid #e5e5e5;
  }
}
.captcha {
  width: 120px;
  height: 48px;
  margin-left: 10px;
  cursor: pointer;
  img {
    width: 120px;
    height: 48px;
  }
}
</style>
