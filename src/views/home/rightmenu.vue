<template>
  <div class="rightmenu">
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 用户名 -->
          <p
            style="
              height: 16px;
              font-size: 16px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
              line-height: 16px;
            "
          >
            {{ fullName }}
            <img class="dropdown" src="../../assets/commen/dropdown.png">
          </p>
          
        </div>
        <!-- 点击弹出部分 -->
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item>
            <span style="display: block" @click="userInfo">账号信息</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display: block" @click="update">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display: block" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form
          ref="ruleForm2"
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input v-model="ruleForm2.oldPwd" />
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input v-model="ruleForm2.pass" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="ruleForm2.checkPass" autocomplete="off" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')"
              >提交</el-button
            >
            <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" hidden>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "rightmenu",
  data() {
    var checkOldPwd = (rule, value, callback) => {};
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginName: "超级管理员",
      fullName: "超级管理员",
      dialogVisible: false,
      userName: "超级管理员",
      ruleForm2: {
        oldPwd: "",
        pass: "",
        checkPass: "",
      },
      rules2: {
        oldPwd: [
          { required: true, message: "请输入原始密码", trigger: "blur" },
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        // oldPwd: [
        //   { validator: checkOldPwd, trigger: 'blur' }
        // ]
      },
    };
  },
  mounted() {
    this.fullName = window.localStorage.getItem("user");
  },
  methods: {
    //异步函数 不阻塞后面执行
    async logout() {
      window.localStorage.removeItem("user");
      this.$router.push("/");
    },
    userInfo() {
      // this.$router.push(`/user/user_info`)
    },
    //修改密码 弹出框
    update() {
      // this.$router.push(`/user/update`)
      this.dialogVisible = true;
    },
    // 修改弹出框相关
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    submitForm(formName) {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
 
 
<style scoped>
.dropdown{
width: 16px;
margin-top: 0px;
margin-left: 20px;
}
.top {
  background: #409eff;
  margin-bottom: 20px;
  padding: 0 60px;
}
.el-dropdown-menu {
  position: absolute;
  top: 43px !important;
  padding: 3px;
  text-align: center;
  width: 130px;
  overflow: visible;
}
.el-dropdown-menu__item {
  line-height: 30px !important;
}
.avatar-wrapper {
  display: flex;
  align-items: center;
  margin-right: 30px;
}
</style>
