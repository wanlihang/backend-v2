<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="创建优惠码"></back-bar>
    <div class="float-left">
      <el-form
        ref="form"
        class="float-left"
        :model="course"
        :rules="rules"
        label-width="200px"
      >
        <el-form-item label="优惠码" prop="code">
          <el-input
            v-model="course.code"
            placeholder="请勿使用U或者u开头"
          ></el-input>
        </el-form-item>
        <el-form-item label="到期时间" prop="expired_at">
          <el-date-picker
            v-model="course.expired_at"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
            placeholder="请选择日期"
            :picker-options="expireTimeOption"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="抵扣金额" prop="invited_user_reward">
          <el-input
            type="number"
            v-model="course.invited_user_reward"
            placeholder="要求：整数。单位：元"
          ></el-input>
        </el-form-item>
        <el-form-item label="可使用次数" prop="use_times">
          <el-input
            type="number"
            v-model="course.use_times"
            placeholder="0=不限制"
          ></el-input>
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
  name: "Create_code",
  data() {
    return {
      loading: false,
      course: {
        code: null,
        expired_at: null,
        invited_user_reward: null,
        use_times: null,
      },
      rules: {
        code: [
          {
            required: true,
            message: "优惠码不能为空",
            trigger: "blur",
          },
        ],
        expired_at: [
          {
            required: true,
            message: "到期时间不能为空",
            trigger: "blur",
          },
        ],
        invited_user_reward: [
          {
            required: true,
            message: "抵扣金额不能为空",
            trigger: "blur",
          },
        ],
        use_times: [
          {
            required: true,
            message: "可使用次数不能为空",
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
      this.$api.Order.PromoCode.Create(this.course)
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
