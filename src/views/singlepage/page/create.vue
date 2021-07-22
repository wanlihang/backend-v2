<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="添加单页"></back-bar>
    <div class="float-left">
      <el-form ref="form" :model="user" :rules="rules" label-width="200px">
        <el-form-item label="唯一标识" prop="sign">
          <el-input v-model="user.sign" class="w-200px"></el-input>
        </el-form-item>

        <el-form-item label="标题" prop="title">
          <el-input v-model="user.title" class="w-200px"></el-input>
        </el-form-item>

        <el-form-item label="Seo关键字" prop="seo_keywords">
          <el-input v-model="user.seo_keywords" class="w-200px"></el-input>
        </el-form-item>
        <el-form-item label="Seo描述" prop="seo_description">
          <el-input v-model="user.seo_description" class="w-200px"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <wang-editor class="w-100" v-model="user.content"></wang-editor>
        </el-form-item>
        <el-form-item prop="is_inherit" label="继承布局">
          <el-switch
            v-model="user.is_inherit"
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
</template>
<script>
import WangEditor from "@/components/wangeditor";

export default {
  components: {
    WangEditor,
  },
  data() {
    return {
      user: {
        sign: null,
        title: null,
        seo_keywords: null,
        seo_description: null,
        content: null,
        is_inherit: 1,
      },
      rules: {
        sign: [
          {
            required: true,
            message: "唯一标识不能为空",
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
        seo_keywords: [
          {
            required: true,
            message: "Seo关键字不能为空",
            trigger: "blur",
          },
        ],
        is_inherit: [
          {
            required: true,
            message: "请选择继承布局",
            trigger: "blur",
          },
        ],
        seo_description: [
          {
            required: true,
            message: "Seo描述不能为空",
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
      this.$api.Singlepage.Page.Store(this.user)
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