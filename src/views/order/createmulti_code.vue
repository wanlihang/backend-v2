<template>
  <el-container>
    <el-header>
      <h1>创建</h1>
    </el-header>
    <!-- el-form表单 -->
    <el-form
      :model="addForm"
      :rules="UserRules"
      ref="UserRef"
      label-width="100px"
    >
      <div class="row">
        <el-form-item label="统一前缀" prop="prefix">
          <el-input v-model="addForm.prefix"></el-input>
        </el-form-item>
        <el-form-item label="生成数量" prop="num">
          <el-input type="number" v-model="addForm.num"></el-input>
        </el-form-item>
        <el-form-item label="到期时间" prop="expired_at">
          <el-date-picker
            v-model="addForm.expired_at"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
            placeholder="请选择日期"
            :picker-options="expireTimeOption"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="面值" prop="money">
          <el-input type="number" v-model="addForm.money"></el-input>
        </el-form-item>
      </div>
    </el-form>

    <el-footer>
      <el-button @click="dialogClose()"> 取消 </el-button>
      <el-button type="primary" @click="addUserForm()">确认生成</el-button>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  name: "Create_code",
  data() {
    return {
      loading: false,
      addForm: {
        prefix: "",
        expired_at: "",
        money: "",
        num: "",
      },
      UserRules: {
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
    //清空表单
    clearForm() {
      this.addForm.prefix = "";
      this.addForm.expired_at = "";
      this.addForm.money = "";
      this.addForm.num = "";
    },
    //关闭按钮
    dialogClose() {
      this.clearForm();
      this.$router.push({ name: "Promocode" });
    },
    //确定
    addUserForm() {
      this.$refs.UserRef.validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        const { data: res } = await this.$api.Order.PromoCode.CreateMulti(
          this.addForm
        ).then((resp) => {
          if (resp.status == 0) {
            this.$message.success("添加成功");
            this.$router.push({ name: "Promocode" });
            this.clearForm();
          } else {
            this.$message(resp.message);
          }
          this.loading = false;
        });
      });
    },
  },
};
</script>
<style  lang="less" scoped>
.el-form-item__label {
  text-align: left;
}
.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-left: 0px;
  box-sizing: border-box;
  .el-input {
    width: 190px;
    margin-right: 12px;
  }
  span {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
}
.el-switch {
  margin: 20px;
}
.el-textarea__inner {
  position: relative;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #eee;
  line-height: 1.5;
  font-size: 14px;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  font-family: inherit;
  vertical-align: top;
  outline: none;
  width: 750px;
  height: 120px;
}
.el-footer {
  margin-top: 20px;
}
</style>