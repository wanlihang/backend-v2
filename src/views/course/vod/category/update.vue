<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑课程分类"></back-bar>
    <div class="float-left">
      <el-form ref="form" :model="user" :rules="rules" label-width="200px">
        <el-form-item label="升序" prop="sort">
          <el-input
            type="number"
            v-model="user.sort"
            class="w-200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类名" prop="name">
          <el-input v-model="user.name" class="w-200px"></el-input>
        </el-form-item>
        <el-form-item label="显示" prop="is_show">
          <el-switch
            v-model="user.is_show"
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
          <el-button @click="formValidate" :loading="loading" type="primary">
            保存
          </el-button>
        </div>
        <div class="ml-24">
          <el-button @click="$router.back()">
            取消
          </el-button>
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
        id: this.$route.query.id,
        sort: 0,
        name: null,
        is_show: 0,
        parent_id: 0,
      },
      rules: {
        sort: [
          {
            required: true,
            message: "升序不能为空",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "分类名不能为空",
            trigger: "blur",
          },
        ],
      },

      loading: false,
    };
  },
  mounted() {
    this.detail();
  },
  methods: {
    detail() {
      this.$api.Course.Vod.Categories.Detail(this.user.id).then((res) => {
        var data = res.data;
        this.user.name = data.name;
        this.user.sort = data.sort;
        this.user.is_show = data.is_show;
        this.parent_id = data.parent_id;
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
      this.$api.Course.Vod.Categories.Update(this.user.id, this.user)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$router.push({ name: "CourseCategories" });
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>