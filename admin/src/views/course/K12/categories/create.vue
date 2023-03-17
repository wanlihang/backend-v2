<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="添加大小班分类"></back-bar>
    <div class="float-left">
      <div class="form-box broder-top-left-radius">
        <el-form ref="form" :model="course" :rules="rules" label-width="200px">
          <el-form-item label="父级">
            <div class="d-flex">
              <div>
                <el-select class="w-300px" v-model="course.parent_id">
                  <el-option
                    v-for="item in categories"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="分类名" prop="name">
            <el-input v-model="course.name" class="w-200px"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <div class="d-flex">
              <div>
                <el-input
                  type="number"
                  v-model="course.sort"
                  class="w-200px"
                ></el-input>
              </div>
              <div class="ml-10">
                <helper-text
                  text="请输入整数。小数排在前，大数排在后。"
                ></helper-text>
              </div>
            </div>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      course: {
        name: null,
        parent_id: null,
        sort: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: "分类名不能为空",
            trigger: "blur",
          },
        ],
        sort: [
          {
            required: true,
            message: "排序不能为空",
            trigger: "blur",
          },
        ],
      },
      categories: [],
      loading: false,
    };
  },
  mounted() {
    this.create();
  },
  methods: {
    create() {
      this.$api.xiaoBanKe.CourseCategory.Create().then((res) => {
        var data = res.data;
        this.categories = data.categories;
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
      this.$api.xiaoBanKe.CourseCategory.Store(this.course)
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