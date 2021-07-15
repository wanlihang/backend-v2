<template>
  <div class="float-left">
    <div class="form-box broder-top-left-radius">
      <el-form ref="form" :model="user" :rules="rules" label-width="200px">
        <el-form-item label="角色">
          <div class="d-flex">
            <div>
              <el-select multiple v-model="user.role_id">
                <el-option
                  v-for="(item, index) in roles"
                  :key="index"
                  :label="item.display_name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div class="ml-15">
              <el-link
                type="primary"
                @click="$router.push({ name: 'SystemAdminroles' })"
              >
                角色管理
              </el-link>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="user.name" class="w-200px"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email" class="w-200px"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" class="w-200px"></el-input>
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
      <div class="bottom-menus-box">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        role_id: null,
        is_ban_login: null,
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
        password: [
          {
            required: true,
            message: "密码不能为空",
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
  },
  methods: {
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
      this.user.password_confirmation = this.user.password;
      this.$api.System.administrator
        .Store(this.user)
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