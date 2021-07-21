<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑直播课程分类"></back-bar>
    <div class="float-left">
      <div class="form-box broder-top-left-radius">
        <el-form ref="form" :model="course" :rules="rules" label-width="200px">
          <el-form-item label="分类名" prop="name">
            <el-input v-model="course.name" class="w-200px"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input
              type="number"
              v-model="course.sort"
              class="w-200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="显示" prop="is_show">
            <el-switch
              v-model="course.is_show"
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      course: {
        id: this.$route.query.id,
        name: null,
        is_show: 1,
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
        is_show: [
          {
            required: true,
            message: "请选择是否显示",
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
      expireTimeOption: {
        disabledDate(date) {
          // 当天可选：date.getTime() < Date.now() - 24 * 60 * 60 * 1000
          //超过此刻可选
          return date.getTime() < Date.now();
        },
      },
      types: null,
      loading: false,
    };
  },
  mounted() {
    this.detail();
  },
  methods: {
    detail() {
      this.$api.Course.Live.Course.Category.Detail(this.course.id).then(
        (res) => {
          var data = res.data;
          this.course.name = data.name;
          this.course.sort = data.sort;
          this.course.is_show = data.is_show;
        }
      );
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
      this.$api.Course.Live.Course.Category.Update(this.course.id, this.course)
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