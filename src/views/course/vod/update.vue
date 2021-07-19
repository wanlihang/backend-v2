<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑点播课程"></back-bar>
    <div class="float-left">
      <div class="form-box broder-top-left-radius">
        <el-form ref="form" :model="course" :rules="rules" label-width="200px">
          <el-form-item prop="category_id" label="分类">
            <div class="d-flex">
              <div>
                <el-select v-model="course.category_id">
                  <el-option
                    v-for="(item, index) in categories"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="ml-15">
                <el-link
                  type="primary"
                  @click="$router.push({ name: 'CourseCategories' })"
                >
                  分类管理
                </el-link>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="价格" prop="charge">
            <el-input
              type="number"
              placeholder="单位：元"
              v-model="course.charge"
              class="w-200px"
            ></el-input>
          </el-form-item>

          <el-form-item label="上架时间" prop="published_at">
            <el-date-picker
              v-model="course.published_at"
              type="datetime"
              format="yyyy-MM-dd hh:mm"
              value-format="yyyy-MM-dd hh:mm"
              placeholder="请选择日期"
              :picker-options="expireTimeOption"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="显示" prop="is_show">
            <el-switch
              v-model="course.is_show"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="课程名" prop="title">
            <el-input v-model="course.title" class="w-100"></el-input>
          </el-form-item>
          <el-form-item label="评论开关" prop="comment_status">
            <el-select v-model="course.comment_status">
              <el-option
                v-for="(item, index) in comments"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="thumb" label="课程封面">
            <upload-image
              v-model="course.thumb"
              helper="长宽比4:3，建议尺寸：400x300像素"
              width="400"
              height="300"
              name="上传封面"
            ></upload-image>
          </el-form-item>
          <el-form-item prop="short_description" label="简短介绍">
            <el-input
              class="w-100"
              type="textarea"
              v-model="course.short_description"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="original_desc"
            label="详细介绍"
            v-if="course.original_desc"
          >
            <wang-editor
              class="w-100"
              v-model="course.original_desc"
            ></wang-editor>
          </el-form-item>
          <el-form-item label="SEO描述">
            <el-input
              class="w-100"
              type="textarea"
              v-model="course.seo_description"
            ></el-input>
          </el-form-item>
          <el-form-item label="SEO关键字">
            <el-input
              class="w-100"
              type="textarea"
              v-model="course.seo_keywords"
            ></el-input>
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
            <el-button @click="$router.push({ name: 'Vod' })">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import WangEditor from "@/components/wangeditor";
import UploadImage from "@/components/upload-image";

export default {
  components: {
    WangEditor,
    UploadImage,
  },
  data() {
    return {
      course: {
        id: this.$route.query.id,
        published_at: null,
        is_show: 0,
        is_rec: 0,
        charge: null,
        title: null,
        category_id: null,
        comment_status: null,
        thumb: null,
        description: null,
        short_description: null,
        original_desc: null,
        render_desc: null,
        slug: null,
        seo_description: "",
        seo_keywords: "",
        user_count: null,
        user_id: null,
        is_free: null,
      },
      rules: {
        category_id: [
          {
            required: true,
            message: "分类不能为空",
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
        published_at: [
          {
            required: true,
            message: "上架时间不能为空",
            trigger: "blur",
          },
        ],
        is_show: [
          {
            required: true,
            message: "请选择显示",
            trigger: "blur",
          },
        ],
        title: [
          {
            required: true,
            message: "课程名不能为空",
            trigger: "blur",
          },
        ],
        comment_status: [
          {
            required: true,
            message: "评论开关不能为空",
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
        short_description: [
          {
            required: true,
            message: "简短介绍不能为空",
            trigger: "blur",
          },
        ],
        original_desc: [
          {
            required: true,
            message: "详细介绍不能为空",
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
      comments: [
        {
          id: 0,
          name: "关闭评论",
        },
        {
          id: 1,
          name: "所有人均可评论",
        },
        {
          id: 2,
          name: "订阅后可评论",
        },
      ],
      categories: [],
      loading: false,
    };
  },
  mounted() {
    this.params();
    this.detail();
  },
  methods: {
    detail() {
      this.$api.Course.Vod.Detail(this.course.id).then((res) => {
        var data = res.data;
        this.course.original_desc = data.original_desc;
        this.course.title = data.title;
        this.course.render_desc = data.render_desc;
        this.course.comment_status = data.comment_status;
        this.course.category_id = data.category_id;
        this.course.charge = data.charge;
        this.course.seo_description = data.seo_description;
        this.course.seo_keywords = data.seo_keywords;
        this.course.short_description = data.short_description;
        this.course.slug = data.slug;
        this.course.thumb = data.thumb;
        this.course.is_show = data.is_show;
        this.course.published_at = data.published_at;
        this.course.user_count = data.user_count;
        this.course.user_id = data.user_id;
        this.course.is_free = data.is_free;
      });
    },
    params() {
      this.$api.Course.Vod.Create().then((res) => {
        this.categories = res.data.categories;
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
      this.$api.Course.Vod.Update(this.course.id, this.course)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$router.push({ name: "Vod" });
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>