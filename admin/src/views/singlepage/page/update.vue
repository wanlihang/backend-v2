<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑单页"></back-bar>

    <div class="float-left" v-if="form">
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="页面标识" prop="sign">
          <div class="d-flex">
            <div>
              <el-input v-model="form.sign" class="w-200px"></el-input>
            </div>
            <div class="ml-10">
              <helper-text
                text="请填写英文字母+数字组合的一串字符串"
              ></helper-text>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="标题" prop="title">
          <div class="d-flex">
            <div>
              <el-input v-model="form.title" class="w-600px"></el-input>
            </div>
            <div class="ml-10">
              <helper-text
                text="指定该页面在浏览器标签栏显示的标题"
              ></helper-text>
            </div>
          </div>
        </el-form-item>

        <el-form-item prop="is_inherit" label="继承布局">
          <div class="d-flex">
            <div>
              <el-switch
                v-model="form.is_inherit"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </div>
            <div class="ml-10">
              <helper-text
                text="是否继承网站已有的布局（头部+导航栏+底部）"
              ></helper-text>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="页面内容" v-if="richText" prop="content">
          <div class="changeContent" @click="changeContent">纯文本</div>
          <quill-editor :height="400" v-model="form.content"></quill-editor>
        </el-form-item>
        <el-form-item label="页面内容" v-else prop="content">
          <div class="changeContent" @click="changeContent">富文本</div>
          <el-input
            type="textarea"
            rows="4"
            v-model="form.content"
            class="w-100"
          ></el-input>
        </el-form-item>
        <el-form-item label="Seo关键字" prop="seo_keywords">
          <el-input
            type="textarea"
            rows="4"
            v-model="form.seo_keywords"
            class="w-400px"
          ></el-input>
        </el-form-item>

        <el-form-item label="Seo描述" prop="seo_description">
          <el-input
            type="textarea"
            rows="4"
            v-model="form.seo_description"
            class="w-400px"
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
</template>
<script>
import QuillEditor from "@/components/quill-editor";

export default {
  components: {
    QuillEditor,
  },
  data() {
    return {
      id: this.$route.query.id,
      form: null,
      richText: true,
      rules: {
        sign: [
          {
            required: true,
            message: "页面标识不能为空",
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
        content: [
          {
            required: true,
            message: "内容不能为空",
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
      this.$api.Singlepage.Page.Detail(this.id).then((res) => {
        this.form = res.data;
      });
    },
    changeContent() {
      this.richText = !this.richText;
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
      this.$api.Singlepage.Page.Update(this.id, this.form)
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