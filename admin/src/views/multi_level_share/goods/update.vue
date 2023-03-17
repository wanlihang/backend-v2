<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑分销课程"></back-bar>

    <div class="float-left" v-if="form">
      <el-form
        ref="form"
        class="float-left"
        :model="form"
        :rules="rules"
        label-width="200px"
      >
        <el-form-item label="商品名" prop="goods_title">
          <el-input v-model="form.goods_title" class="w-600px"></el-input>
        </el-form-item>

        <el-form-item label="商品价格" prop="goods_charge">
          <el-input
            type="number"
            placeholder="单位：元"
            v-model="form.goods_charge"
            class="w-200px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="goods_thumb" label="商品封面">
          <upload-image
            v-model="form.goods_thumb"
            width="120"
            height="90"
          ></upload-image>
        </el-form-item>
        <el-form-item label="一级奖励" prop="reward">
          <div class="d-flex">
            <div>
              <el-input
                type="number"
                placeholder="一级分销奖励"
                v-model="form.reward"
                class="w-200px"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text text="最小单位：元。不支持小数。"></helper-text>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="二级奖励" prop="reward2">
          <div class="d-flex">
            <div>
              <el-input
                type="number"
                placeholder="二级分销奖励"
                v-model="form.reward2"
                class="w-200px"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text text="最小单位：元。不支持小数。"></helper-text>
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="reward3" label="三级奖励">
          <div class="d-flex">
            <div>
              <el-input
                type="number"
                placeholder="三级分销奖励"
                class="w-200px"
                v-model="form.reward3"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text text="最小单位：元。不支持小数。"></helper-text>
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
import UploadImage from "@/components/upload-image";

export default {
  components: {
    UploadImage,
  },
  data() {
    return {
      id: this.$route.query.id,
      form: null,
      rules: {
        goods_type: [
          {
            required: true,
            message: "类型不能为空",
            trigger: "blur",
          },
        ],
        reward: [
          {
            required: true,
            message: "一级奖励不能为空",
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
        goods_charge: [
          {
            required: true,
            message: "商品价格不能为空",
            trigger: "blur",
          },
        ],
        reward2: [
          {
            required: true,
            message: "二级奖励不能为空",
            trigger: "blur",
          },
        ],
        reward3: [
          {
            required: true,
            message: "三级奖励不能为空",
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
      },
      loading: false,
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$api.Multishare.Goods.Detail(this.id).then((res) => {
        this.form = res.data;
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
      this.$api.Multishare.Goods.Update(this.id, this.form)
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