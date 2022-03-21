<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑秒杀商品"></back-bar>
    <div class="float-left" v-if="course">
      <el-form ref="form" :model="course" :rules="rules" label-width="200px">
        <el-form-item label="秒杀价" prop="charge">
          <div class="d-flex">
            <div>
              <el-input
                type="number"
                v-model="course.charge"
                class="w-200px"
                placeholder="秒杀价"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text text="最小单位：元。不支持小数。"></helper-text>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="活动时间" prop="started_at">
          <div class="d-flex">
            <div>
              <el-date-picker
                v-model="course.started_at"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="开始时间"
                :picker-options="expireTimeOption"
              >
              </el-date-picker>
            </div>
            <div class="mx-10">
              <span class="helper-text">至</span>
            </div>
            <div>
              <el-date-picker
                v-model="course.end_at"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="结束时间"
                :picker-options="expireTimeOption"
              >
              </el-date-picker>
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
      id: this.$route.query.id,
      course: null,
      rules: {
        goods_type: [
          {
            required: true,
            message: "类型不能为空",
            trigger: "blur",
          },
        ],
        charge: [
          {
            required: true,
            message: "价格不能为空",
            trigger: "blur",
          },
        ],
        goods_title: [
          {
            required: true,
            message: "商品名不能为空",
            trigger: "blur",
          },
        ],
        original_charge: [
          {
            required: true,
            message: "商品原价不能为空",
            trigger: "blur",
          },
        ],
        goods_id: [
          {
            required: true,
            message: "请选择商品",
            trigger: "blur",
          },
        ],
        goods_thumb: [
          {
            required: true,
            message: "请上传商品封面",
            trigger: "blur",
          },
        ],
        started_at: [
          {
            required: true,
            message: "请选择开始时间",
            trigger: "blur",
          },
        ],
        end_at: [
          {
            required: true,
            message: "请选择开始时间",
            trigger: "blur",
          },
        ],
      },
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        },
      },
      loading: false,
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$api.Miaosha.Goods.Detail(this.id).then((res) => {
        this.course = res.data;
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
      if (this.course.original_charge < 0) {
        this.$message.error("请输入正确的商品原价");
        return;
      }
      if (this.course.charge < 0) {
        this.$message.error("请输入正确的秒杀价");
        return;
      }
      this.loading = true;
      this.$api.Miaosha.Goods.Update(this.id, this.course)
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
