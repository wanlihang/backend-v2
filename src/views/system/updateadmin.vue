<template>
  <div class="float-left">
    <div class="form-box broder-top-left-radius">
      <el-form ref="form" :model="user" :rules="rules" label-width="200px">
        <el-form-item label="角色">
          <el-select v-model="user.role_id">
            <el-option
              v-for="(item, index) in roles"
              :key="index"
              :label="item.display_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="user.name" class="w-200px"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email" class="w-200px"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="user.password"
            class="w-200px"
            placeholder="不修改请勿填写"
          ></el-input>
        </el-form-item>

        <el-form-item prop="is_ban_login" label="禁止登录">
          <el-switch
            v-model="user.is_ban_login"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
    </div>

    <div class="bottom-menus">
      <div>
        <el-button @click="$router.push({ name: 'SystemAdministrator' })"
          >取消</el-button
        >
      </div>
      <div class="ml-15">
        <el-button @click="formValidate" :loading="loading" type="primary"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        id: this.$route.query.id,
        name: null,
        email: null,
        password: null,
        role_id: null,
        is_ban_login: null,
        last_login_date: null,
        last_login_ip: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur",
          },
        ],
      },
      roles: [],
      loading: false,
    };
  },
  mounted() {
    this.params();
    this.detail();
  },
  methods: {
    detail() {
      this.$api.System.administrator.Detail(this.user.id).then((res) => {
        var data = res.data;
        var roles = data.role_id;
        this.user.is_ban_login = data.is_ban_login;
        this.user.last_login_ip = data.last_login_ip;
        this.user.last_login_date = data.last_login_date;
        this.user.email = data.email;
        this.user.name = data.name;
        // let newbox = [];
        for (var i = 0; i < roles.length; i++) {
          //   newbox.push(roles[i]);
          this.user.role_id = roles[i];
        }
      });
    },
    params() {
      this.$api.System.administrator.Create().then((res) => {
        this.roles = res.data.roles;
      });
    },
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
      if (this.user.password == null) {
        delete this.user.password;
      }
      this.$api.System.administrator
        .Update(this.user.id, this.user)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$router.push({ name: "SystemAdministrator" });
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>