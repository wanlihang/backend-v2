<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="添加学员标签"></back-bar>

    <div class="float-left">
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="标签名" prop="name">
          <el-input v-model="form.name" class="w-200px"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="bottom-menus">
      <div class="bottom-menus-box">
        <div>
          <el-button @click="formValidate" :loading="loading" type="primary">
            添加
          </el-button>
        </div>
        <div class="ml-24">
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
        name: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入标签名",
            trigger: "blur",
          },
        ],
      },
      loading: false,
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
      this.$api.Member.Tag.Store(this.form)
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
