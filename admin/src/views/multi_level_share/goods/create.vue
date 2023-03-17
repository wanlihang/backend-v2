<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="添加分销课程"></back-bar>

    <div class="float-left">
      <el-form
        ref="form"
        class="float-left"
        :model="form"
        :rules="rules"
        label-width="200px"
      >
        <el-form-item prop="goods_id" label="课程">
          <div class="d-flex">
            <div>
              <el-button type="primary" @click="showSelectResWin = true">
                <span>选择课程</span>
                <span v-if="form.goods_title"
                  >已选择课程「{{ form.goods_title }}」</span
                >
              </el-button>
              <select-resource
                :show="showSelectResWin"
                @change="change"
                @close="showSelectResWin = false"
                enabled-resource="vod,video,live,book,topic,paper,practice,learnPath,vip"
              ></select-resource>
            </div>
          </div>
        </el-form-item>

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
import SelectResource from "@/components/select-resources/index";

export default {
  components: {
    UploadImage,
    SelectResource,
  },
  data() {
    return {
      showSelectResWin: false,
      filter: {
        type: null,
      },
      form: {
        reward: null,
        reward2: null,
        reward3: null,
        goods_title: null,
        goods_thumb: null,
        goods_charge: null,
        goods_id: null,
        goods_type: null,
      },
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
        goods_id: [
          {
            required: true,
            message: "请选择商品",
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
  methods: {
    change(data) {
      this.form.goods_id = data.id;
      this.form.goods_title = data.title;
      this.form.goods_charge = data.original_charge;
      this.form.goods_thumb = data.thumb;
      this.form.goods_type = data.resource_type;

      this.showSelectResWin = false;
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
      this.$api.Multishare.Goods.Store(this.form)
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