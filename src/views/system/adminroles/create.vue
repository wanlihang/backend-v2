<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="添加管理员角色"></back-bar>
    <div class="float-left">
      <el-form ref="form" :model="user" :rules="rules" label-width="200px">
        <el-form-item label="角色名" prop="display_name">
          <el-input v-model="user.display_name" class="w-300px"></el-input>
        </el-form-item>

        <el-form-item label="Slug" prop="slug">
          <el-input v-model="user.slug" class="w-300px"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input v-model="user.description" class="w-300px"></el-input>
        </el-form-item>

        <el-form-item label="权限">
          <el-cascader
            class="w-100"
            filterable
            v-model="selectedPermissions"
            :options="permissionsTransform"
            :props="{ multiple: true }"
            clearable
          ></el-cascader>
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
      permissions: null,
      loading: false,
      selectedPermissions: [],
    };
  },
  computed: {
    permissionsTransform() {
      let p = [];
      if (this.permissions) {
        for (let i in this.permissions) {
          let children = [];

          for (let j = 0; j < this.permissions[i].length; j++) {
            children.push({
              value: this.permissions[i][j].id,
              label: this.permissions[i][j].display_name,
            });
          }

          p.push({
            value: i,
            label: i,
            children: children,
          });
        }
      }

      return p;
    },
    selectedPermissionIds() {
      let ids = [];
      this.selectedPermissions.forEach((item) => {
        ids.push(item[1]);
      });

      return ids;
    },
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

      let data = {};
      Object.assign(data, this.user, {
        permission_ids: this.selectedPermissionIds,
      });

      this.$api.System.adminroles
        .Store(data)
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