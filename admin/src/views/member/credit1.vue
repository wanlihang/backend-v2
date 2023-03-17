<template>
  <div class="meedu-main-body" v-if="user">
    <back-bar class="mb-30" title="积分变动"></back-bar>

    <div class="form-box broder-top-left-radius">
      <el-form ref="form" :rules="rules" :model="form" label-width="200px">
        <el-form-item prop="credit1">
          <template slot="label">
            <form-label
              text="变动额度"
              helper="正数增加积分，负数减少积分"
            ></form-label>
          </template>
          <el-input v-model="form.credit1" class="w-200px"></el-input>
        </el-form-item>

        <el-form-item label="变动说明" prop="remark">
          <el-input
            type="textarea"
            v-model="form.remark"
            style="width: 300px"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="bottom-menus">
      <div class="bottom-menus-box">
        <div>
          <el-button @click="formValidate" :loading="loading" type="primary">
            确认
          </el-button>
        </div>
        <div class="ml-24">
          <el-button @click="$router.back()">取消 </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: null,
      user: null,
      form: {
        credit1: null,
        remark: null,
      },
      rules: {
        credit1: [
          {
            required: true,
            message: "请输入变动额度",
            trigger: "blur",
          },
        ],
        remark: [
          {
            required: true,
            message: "请输入变动说明",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  mounted() {
    this.id = this.$route.params.userId;

    this.getUser();
  },
  methods: {
    getUser() {
      this.$api.Member.Edit(this.id).then((res) => {
        this.user = res.data;
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
      let data = { user_id: this.id };
      Object.assign(data, this.form);
      this.$api.Member.Credit1Change(data)
        .then(() => {
          this.$message.success(this.$t("common.success"));

          this.loading = false;

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