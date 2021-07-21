<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="添加电子书分类"></back-bar>
    <div class="float-left">
      <el-form ref="form" :model="user" :rules="rules" label-width="200px">
        <el-form-item label="分类名" prop="name">
          <el-input v-model="user.name" class="w-200px"></el-input>
        </el-form-item>

        <el-form-item label="升序" prop="sort">
          <div class="d-flex">
            <div>
              <el-input
                type="number"
                v-model="user.sort"
                class="w-200px"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text
                text="请输入整数。小数靠前，大数靠后。"
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
          <el-button @click="$router.back()"> 取消 </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        sort: null,
        name: null,
      },
      rules: {
        sort: [
          {
            required: true,
            message: "升序不能为空",
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
      this.$api.Meedubook.Book.Categories.Store(this.user)
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