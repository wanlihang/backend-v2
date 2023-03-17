<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="添加学习步骤"></back-bar>
    <div class="float-left">
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="步骤名" prop="name">
          <el-input v-model="form.name" class="w-500px"></el-input>
        </el-form-item>
        <el-form-item prop="desc" label="描述">
          <div class="d-flex">
            <div>
              <el-input
                v-model="form.desc"
                type="textarea"
                rows="4"
                maxlength="150"
                class="w-500px"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text
                text="该值会在学习步骤列表显示，建议不要超过150个字。"
              ></helper-text>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="升序" prop="sort">
          <div class="d-flex">
            <div>
              <el-input
                type="number"
                v-model="form.sort"
                class="w-200px"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text
                text="请输入整数。小数排在前，大数排在后。"
              ></helper-text>
            </div>
          </div>
        </el-form-item>
      </el-form>

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
      form: {
        name: null,
        path_id: this.$route.query.path_id,
        sort: null,
        decs: "",
        desc: null,
      },
      categories: [],
      rules: {
        name: [
          {
            required: true,
            message: "步骤名不能为空",
            trigger: "blur",
          },
        ],
        sort: [
          {
            required: true,
            message: "升序不能为空",
            trigger: "blur",
          },
        ],
        desc: [
          {
            required: true,
            message: "描述不能为空",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  mounted() {
    this.params();
  },
  methods: {
    params() {
      this.$api.Course.LearnPath.Step.Create().then((res) => {
        this.categories = res.data.paths;
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
      this.$api.Course.LearnPath.Step.Store(this.form)
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