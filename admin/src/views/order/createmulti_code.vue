<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="优惠码批量生成"></back-bar>

    <div class="float-left">
      <el-form
        ref="form"
        class="float-left"
        :model="form"
        :rules="rules"
        label-width="200px"
      >
        <el-form-item label="统一前缀" prop="prefix">
          <el-input
            class="w-200px"
            placeholder="前缀"
            v-model="form.prefix"
          ></el-input>
        </el-form-item>

        <el-form-item label="生成数量" prop="num">
          <div class="d-flex">
            <div>
              <el-input
                class="w-200px"
                type="number"
                v-model="form.num"
                placeholder="生成数量"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text
                text="请输入整数。为防止系统卡顿导致生成失败，请勿输入超过1000的数字。"
              ></helper-text>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="到期时间" prop="expired_at">
          <div class="d-flex">
            <div>
              <el-date-picker
                v-model="form.expired_at"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="请选择日期"
                :picker-options="expireTimeOption"
              >
              </el-date-picker>
            </div>
            <div class="ml-10">
              <helper-text
                text="该字段决定优惠码的有效期限，到了选定的时间就无法使用了。"
              ></helper-text>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="面值" prop="money">
          <div class="d-flex">
            <div>
              <el-input
                class="w-200px"
                type="number"
                v-model="form.money"
                placeholder="面值"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text
                text="请输入整数。不支持小数。面值是学员使用该码在收银台可抵扣的金额。"
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
  name: "Create_code",
  data() {
    return {
      loading: false,
      form: {
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
      this.$api.Order.PromoCode.CreateMulti(this.form)
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
