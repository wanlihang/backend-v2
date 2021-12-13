<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="添加课程附件"></back-bar>

    <div class="float-left">
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="附件" prop="file">
          <div class="d-flex">
            <div>
              <el-button type="primary" @click="$refs['file'].click()">
                <span>上传附件</span>
                <span class="ml-10" v-if="file.name">{{ file.name }}</span>
              </el-button>
              <div style="display: none">
                <input
                  type="file"
                  ref="file"
                  accept="image/gif,image/jpeg,image/jpg,image/png,.csv,.doc,.txt,.pdf,.md,.zip,"
                  @change="fileChange"
                />
              </div>
            </div>
            <div class="ml-10">
              <helper-text
                text="支持zip,pdf,jpeg,jpg,gif,png,md,doc,txt,csv格式文件，上传附件大小不能超过10M"
              ></helper-text>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="附件名" prop="name">
          <el-input v-model="form.name" class="w-300px"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="bottom-menus">
      <div class="bottom-menus-box">
        <div>
          <el-button @click="formValidate" :loading="loading" type="primary">
            保存
          </el-button>
        </div>
        <div class="ml-15">
          <el-button @click="$router.back()">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        course_id: this.$route.query.course_id,
        name: null,
      },
      box: null,
      rules: {
        name: [
          {
            required: true,
            message: "附件名不能为空",
            trigger: "blur",
          },
        ],
      },
      loading: false,
      file: {
        name: null,
      },
    };
  },
  methods: {
    fileChange(e) {
      if (e.target.files.length === 0) {
        return;
      }
      if (e.target.files[0].size > 10240000) {
        this.$message.error("上传附件大小不能超过10MB");
        return;
      }
      this.form.name = this.file.name = e.target.files[0].name;
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
      const formData = new FormData();
      formData.append("file", this.$refs["file"].files[0]);
      formData.append("name", this.form.name);
      formData.append("course_id", this.form.course_id);

      this.$api.Course.Vod.Attach.Store(formData)
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
