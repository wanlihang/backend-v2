<template>
  <div class="meedu-dialog-mask">
    <div class="meedu-dialog-box">
      <div class="meedu-dialog-header">添加公告</div>
      <div class="meedu-dialog-body">
        <el-form ref="form" :model="form" :rules="rules" label-width="200px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>

          <el-form-item label="内容" prop="announcement">
            <quill-editor
              :height="400"
              v-model="form.announcement"
            ></quill-editor>
          </el-form-item>
        </el-form>
      </div>
      <div class="meedu-dialog-footer">
        <el-button type="primary" @click="formValidate" :loading="loading">
          确定
        </el-button>
        <el-button @click="close" class="ml-30">取消</el-button>
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
      loading: false,
      form: {
        title: null,
        announcement: null,
      },
      parentNavs: [],
      rules: {
        title: [
          {
            required: true,
            message: "请输入链接名",
            trigger: "blur",
          },
        ],
        announcement: [
          {
            required: true,
            message: "请输入链接地址",
            trigger: "blur",
          },
        ],
      },
    };
  },
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
      this.$api.System.Announcement.Store(this.form)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$emit("close");
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>