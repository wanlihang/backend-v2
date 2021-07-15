<template>
  <div class="float-left">
    <div class="form-box broder-top-left-radius">
      <el-form ref="form" :model="chapter" :rules="rules" label-width="200px">
        <el-form-item label="章节名" prop="title">
          <el-input v-model="chapter.title" class="w-200px"></el-input>
        </el-form-item>
        <el-form-item label="升序" prop="sort">
          <el-input
            type="number"
            v-model="chapter.sort"
            class="w-200px"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="bottom-menus">
      <div class="bottom-menus-box">
        <div>
          <el-button @click="$router.push({ name: 'CourseChapters',query: { course_id: chapter.course_id },})"
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
      chapter: {
        course_id: this.$route.query.course_id,
        sort: null,
        title: null,
      },
      rules: {
        sort: [
          {
            required: true,
            message: "升序不能为空",
            trigger: "blur",
          },
        ],
        title: [
          {
            required: true,
            message: "章节名不能为空",
            trigger: "blur",
          },
        ],
      },

      loading: false,
    };
  },
  mounted() {},
  methods: {
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
      this.$api.Course.Vod.Chapters.Store(this.chapter.course_id,this.chapter)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$router.push({ name: "CourseChapters",query: { course_id: this.chapter.course_id }, });
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>