<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑分类"></back-bar>
    <div class="float-left" v-if="form">
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="分类名" prop="name">
          <el-input v-model="form.name" class="w-200px"></el-input>
        </el-form-item>

        <el-form-item label="排序" prop="sort">
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
export default {
  data() {
    return {
      id: this.$route.query.id,
      form: null,
      rules: {
        sort: [
          {
            required: true,
            message: "排序不能为空",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "分类名不能为空",
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
      this.$api.Wenda.Question.Cate.Detail(this.id).then((res) => {
        this.form = res.data.data;
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
      this.$api.Wenda.Question.Cate.Update(this.id, this.form)
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