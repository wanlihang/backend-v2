<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑直播课程内容安排"></back-bar>
    <div class="float-left">
      <div class="form-box broder-top-left-radius">
        <el-form ref="form" :model="course" :rules="rules" label-width="200px">
          <el-form-item label="章节" prop="chapter_id">
            <el-select v-model="course.chapter_id">
              <el-option
                v-for="(item, index) in filterData.chapters"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="course.title" class="w-100"></el-input>
          </el-form-item>
          <el-form-item label="直播时间" prop="published_at">
            <el-date-picker
              v-model="course.published_at"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="请选择日期"
              :picker-options="expireTimeOption"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="是否显示" prop="is_show">
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
        course_id: this.$route.query.course_id,
        title: null,
        chapter_id: null,
        is_show: 1,
        published_at: null,
      },
      rules: {
        chapter_id: [
          {
            required: true,
            message: "请选择章节",
            trigger: "blur",
          },
        ],
        title: [
          {
            required: true,
            message: "标题不能为空",
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
        published_at: [
          {
            required: true,
            message: "直播时间不能为空",
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
      filterData: {
        chapters: [],
      },
      types: null,
      loading: false,
    };
  },
  mounted() {
    this.params();
    this.detail();
  },
  methods: {
    params() {
      this.$api.Course.Live.Course.Video.Create().then((res) => {
        var data = res.data.chapters[this.course.course_id];
        this.filterData.chapters = data;
      });
    },
    detail() {
      this.$api.Course.Live.Course.Video.Detail(this.course.id).then((res) => {
        var data = res.data;
        this.course.title = data.title;
        this.course.chapter_id = data.chapter_id;
        this.course.is_show = data.is_show;
        this.course.published_at = data.published_at;
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
      this.$api.Course.Live.Course.Video.Update(this.course.id, this.course)
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