<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="添加管理员"></back-bar>
    <div class="float-left">
      <el-form ref="form" :model="user" :rules="rules" label-width="200px">
        <el-form-item label="角色">
          <div class="d-flex">
            <div>
              <el-select multiple class="w-300px" v-model="user.role_id">
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
              <p-link
                text="角色管理"
                p="administrator_role"
                type="primary"
                @click="$router.push({ name: 'SystemAdminroles' })"
              >
              </p-link>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="user.name"
            class="w-300px"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="user.email"
            class="w-300px"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <div class="d-flex">
            <div>
              <el-input
                type="password"
                v-model="user.password"
                class="w-300px"
                autocomplete="off"
              ></el-input>
            </div>
            <div class="ml-10 c-red" v-if="user.password">
              {{ this.$utils.passwordRules(user.password) }}
            </div>
          </div>
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
      if (this.$utils.passwordRules(this.user.password)) {
        this.$message.error(
          "密码至少包含大写字母，小写字母，数字，且不少于12位"
        );
        return;
      }
      this.loading = true;
      this.user.password_confirmation = this.user.password;
      this.$api.System.administrator
        .Store(this.user)
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
