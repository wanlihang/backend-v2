<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="创建管理员角色"></back-bar>
    <div class="float-left">
      <el-form ref="form" :model="user" :rules="rules" label-width="200px">
        <el-form-item label="角色名" prop="display_name">
          <el-input v-model="user.display_name" class="w-200px"></el-input>
        </el-form-item>

        <el-form-item label="Slug" prop="slug">
          <el-input v-model="user.slug" class="w-200px"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input v-model="user.description" class="w-200px"></el-input>
        </el-form-item>

        <div v-for="(item, index) in permissions" :key="index">
          <h1>{{ index }}</h1>
          <el-checkbox-group v-model="user.permission_ids">
            <el-checkbox v-for="it in item" :key="it.id" :label="it.id">{{
              it.display_name
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
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
          <el-button @click="$router.push({ name: 'SystemAdminroles' })"
            >取消</el-button
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
        display_name: null,
        slug: null,
        description: null,
        permission_ids: [],
      },
      rules: {
        display_name: [
          {
            required: true,
            message: "角色名不能为空",
            trigger: "blur",
          },
        ],
        slug: [
          {
            required: true,
            message: "Slug不能为空",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "描述不能为空",
            trigger: "blur",
          },
        ],
      },
      permissions: [],

      loading: false,
    };
  },
  mounted() {
    this.params();
  },
  methods: {
    params() {
      this.$api.System.adminroles.Create().then((res) => {
        this.permissions = res.data.permissions;
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
      this.$api.System.adminroles
        .Store(this.user)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$router.push({ name: "SystemAdminroles" });
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>