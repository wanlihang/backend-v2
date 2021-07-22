<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="批量生成优惠码"></back-bar>
    <div class="float-left">
      <el-form
        ref="form"
        class="float-left"
        :model="course"
        :rules="rules"
        label-width="200px"
      >
        <el-form-item label="统一前缀" prop="prefix">
          <el-input class="w-200px" v-model="course.prefix"></el-input>
        </el-form-item>
        <el-form-item label="生成数量" prop="num">
          <el-input
            class="w-200px"
            type="number"
            v-model="course.num"
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
        <el-form-item label="面值" prop="money">
          <el-input
            class="w-200px"
            type="number"
            v-model="course.money"
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
        prefix: "",
        expired_at: "",
        money: "",
        num: "",
      },
      rules: {
        prefix: [
          {
            required: true,
            message: "统一前缀不能为空",
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
        money: [
          {
            required: true,
            message: "面值不能为空",
            trigger: "blur",
          },
        ],
        num: [
          {
            required: true,
            message: "生成数量不能为空",
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
      this.$api.Order.PromoCode.CreateMulti(this.course)
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
