<template>
  <div class="meedu-main-body" v-loading="loading">
    <back-bar class="mb-30" title="编辑管理员角色"></back-bar>

    <div class="float-left" v-if="user">
      <el-form ref="form" :model="user" :rules="rules" label-width="200px">
        <el-form-item label="角色名" prop="display_name">
          <el-input v-model="user.display_name" class="w-300px"></el-input>
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
          <el-button @click="formValidate" :loading="loading" type="primary">
            保存
          </el-button>
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
      id: this.$route.query.id,
      user: null,
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
      permissionsTransform: [],
    };
  },
  computed: {
    selectedPermissionIds() {
      let selectedIds = [];

      this.selectedPermissions.forEach((item) => {
        selectedIds.push(item[1]);
      });

      return selectedIds;
    },
  },
  mounted() {
    this.params();
  },
  methods: {
    params() {
      this.loading = true;
      this.$api.System.adminroles.Create().then((res) => {
        this.permissions = res.data.permissions;

        let p = [];
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

        this.permissionsTransform = p;

        this.getDetail();
      });
    },
    getDetail() {
      this.$api.System.adminroles.Detail(this.id).then((res) => {
        this.user = res.data;
        let selectedPermissions = [];

        res.data.permission_ids.forEach((item) => {
          for (let i = 0; i < this.permissionsTransform.length; i++) {
            for (
              let j = 0;
              j < this.permissionsTransform[i].children.length;
              j++
            ) {
              if (item === this.permissionsTransform[i].children[j].value) {
                selectedPermissions.push([
                  this.permissionsTransform[i].value,
                  item,
                ]);
                return;
              }
            }
          }
        });

        this.selectedPermissions = selectedPermissions;

        // 加载结束
        this.loading = false;
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
        .Update(this.id, data)
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