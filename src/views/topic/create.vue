<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="创建话题文章"></back-bar>
    <div class="float-left">
      <div class="form-box broder-top-left-radius">
        <el-form ref="form" :model="course" :rules="rules" label-width="200px">
          <el-form-item prop="cid" label="分类">
            <div class="d-flex">
              <div>
                <el-select v-model="course.cid">
                  <el-option
                    v-for="(item, index) in chapters"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="ml-10">
                <el-link
                  @click="
                    $router.push({
                      name: 'TopicCategory',
                    })
                  "
                  type="primary"
                  >分类管理</el-link
                >
              </div>
            </div>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input
              v-model="course.title"
              class="w-100"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item prop="thumb" label="封面">
            <upload-image
              v-model="course.thumb"
              width="400"
              name="上传封面"
            ></upload-image>
          </el-form-item>
          <el-form-item label="显示" prop="is_show">
            <el-switch
              v-model="course.is_show"
              :active-value="true"
              :inactive-value="false"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="价格">
            <el-input
              type="number"
              placeholder="单位：元"
              v-model="course.charge"
              class="w-200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员免费" v-if="course.charge > 0">
            <el-switch
              v-model="course.is_vip_free"
              :active-value="true"
              :inactive-value="false"
            >
            </el-switch>
          </el-form-item>

          <el-form-item label="排序时间" prop="sorted_at">
            <el-date-picker
              v-model="course.sorted_at"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="请选择日期"
              :picker-options="expireTimeOption"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="free_content_render" label="免费内容">
            <mavon-editor
              class="w-100"
              v-on:change="getfreecontent"
            ></mavon-editor>
          </el-form-item>
          <el-form-item prop="render_content" label="文章内容">
            <mavon-editor class="w-100" v-on:change="getcontent"></mavon-editor>
          </el-form-item>

          <el-form-item label="SEO关键字">
            <el-input
              class="w-100"
              type="textarea"
              v-model="course.seo_keywords"
              placeholder="SEO关键字"
            ></el-input>
          </el-form-item>
          <el-form-item label="SEO描述">
            <el-input
              class="w-100"
              type="textarea"
              v-model="course.seo_description"
              placeholder="SEO描述"
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
            <el-button @click="$router.back()">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MavonEditor from "@/components/md-editor";
import UploadImage from "@/components/upload-image";

export default {
  components: {
    MavonEditor,
    UploadImage,
  },
  data() {
    return {
      course: {
        cid: null,
        free_content: null,
        thumb: null,
        free_content_render: null,
        is_need_login: 0,
        is_show: false,
        is_vip_free: false,
        charge: null,
        title: null,
        seo_description: null,
        seo_keywords: null,
        sorted_at: null,
        original_content: null,
        render_content: null,
      },
      rules: {
        cid: [
          {
            required: true,
            message: "分类不能为空",
            trigger: "blur",
          },
        ],
        thumb: [
          {
            required: true,
            message: "请上传封面",
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
            message: "标题不能为空",
            trigger: "blur",
          },
        ],

        render_content: [
          {
            required: true,
            message: "内容不能为空",
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
      chapters: [],
      loading: false,
    };
  },
  mounted() {
    this.params();
  },
  methods: {
    getcontent: function (pureContent, renderContent) {
      this.course.original_content = pureContent;
      this.course.render_content = renderContent;
    },
    getfreecontent: function (pureContent, renderContent) {
      this.course.free_content = pureContent;
      this.course.free_content_render = renderContent;
    },
    params() {
      this.$api.Course.Topic.Topic.Create().then((res) => {
        this.chapters = res.data;
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
      this.$api.Course.Topic.Topic.Store(this.course)
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