<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑直播课程"></back-bar>
    <div class="float-left">
      <div class="form-box broder-top-left-radius">
        <el-form ref="form" :model="course" :rules="rules" label-width="200px">
          <el-form-item label="分类" prop="category_id">
            <el-select v-model="course.category_id">
              <el-option
                v-for="(item, index) in categories"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="讲师" prop="teacher_id">
            <el-select v-model="course.teacher_id">
              <el-option
                v-for="(item, index) in teachers"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程标题" prop="title">
            <el-input v-model="course.title" class="w-200px"></el-input>
          </el-form-item>
          <el-form-item prop="thumb" label="课程封面">
            <upload-image
              v-model="course.thumb"
              width="400"
              name="上传课程封面"
            ></upload-image>
          </el-form-item>
          <el-form-item label="播放封面">
            <upload-image
              v-model="course.poster"
              width="400"
              name="上传播放封面"
            ></upload-image>
          </el-form-item>
          <el-form-item label="价格" prop="charge">
            <el-input v-model="course.charge" class="w-200px"></el-input>
          </el-form-item>
          <el-form-item label="上架时间" prop="published_at">
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
          <el-form-item label="会员免费">
            <el-switch
              v-model="course.vip_can_view"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="显示" prop="is_show">
            <el-switch
              v-model="course.is_show"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>

          <el-form-item label="简短介绍" prop="short_description">
            <el-input
              type="textarea"
              v-model="course.short_description"
              class="w-100"
            ></el-input>
          </el-form-item>
          <el-form-item label="详细介绍">
            <wang-editor
              v-if="course.original_desc"
              class="w-100"
              v-model="course.original_desc"
            ></wang-editor>
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
import UploadImage from "@/components/upload-image";
import WangEditor from "@/components/wangeditor";

export default {
  components: {
    UploadImage,
    WangEditor,
  },
  data() {
    return {
      course: {
        id: this.$route.query.id,
        category_id: null,
        is_show: 1,
        charge: null,
        original_desc: null,
        render_desc: null,
        short_description: null,
        poster: null,
        teacher_id: null,
        published_at: null,
        vip_can_view: 0,
        title: null,
        thumb: null,
      },
      rules: {
        title: [
          {
            required: true,
            message: "课程标题不能为空",
            trigger: "blur",
          },
        ],
        category_id: [
          {
            required: true,
            message: "请选择分类",
            trigger: "blur",
          },
        ],
        teacher_id: [
          {
            required: true,
            message: "请选择讲师",
            trigger: "blur",
          },
        ],
        charge: [
          {
            required: true,
            message: "价格不能为空",
            trigger: "blur",
          },
        ],
        short_description: [
          {
            required: true,
            message: "简短介绍不能为空",
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
            message: "请选择上架时间",
            trigger: "blur",
          },
        ],
        thumb: [
          {
            required: true,
            message: "请上传课程封面",
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
      categories: [],
      teachers: [],
      loading: false,
    };
  },
  mounted() {
    this.create();
    this.detail();
  },
  methods: {
    create() {
      this.$api.Course.Live.Course.Create().then((res) => {
        var data = res.data;
        this.categories = data.categories;
        this.teachers = data.teachers;
      });
    },
    detail() {
      this.$api.Course.Live.Course.Detail(this.course.id).then((res) => {
        var data = res.data;
        this.course.category_id = data.category_id;
        this.course.is_show = data.is_show;
        this.course.charge = data.charge;
        this.course.original_desc = data.original_desc;
        this.course.render_desc = data.render_desc;
        this.course.short_description = data.short_description;
        this.course.poster = data.poster;
        this.course.thumb = data.thumb;
        this.course.teacher_id = data.teacher_id;
        this.course.published_at = data.published_at;
        this.course.vip_can_view = data.vip_can_view;
        this.course.title = data.title;
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
      this.course.render_desc = this.course.original_desc;
      this.$api.Course.Live.Course.Update(this.course.id, this.course)
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