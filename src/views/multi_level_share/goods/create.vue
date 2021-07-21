<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="创建分销商品"></back-bar>
    <div class="float-left">
      <div class="form-box broder-top-left-radius">
        <el-form ref="form" :model="course" :rules="rules" label-width="200px">
          <el-form-item prop="goods_id" label="商品">
            <div class="d-flex">
              <div>
                <el-button @click="selgoods"> 选择商品 </el-button>
                <span
                  v-if="this.course.goods_id"
                  style="color: red; margin-left: 4px"
                  >已选择</span
                >
                <select-resource
                  v-bind:show="msg"
                  @change="change"
                  :enabled-resource="types"
                ></select-resource>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="商品名" prop="goods_title">
            <el-input v-model="course.goods_title" class="w-100"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_charge">
            <el-input
              type="number"
              placeholder="单位：元"
              v-model="course.goods_charge"
              class="w-200px"
            ></el-input>
          </el-form-item>
          <el-form-item prop="goods_thumb" label="商品封面">
            <upload-image
              v-model="course.goods_thumb"
              helper="长宽比4:3，建议尺寸：400x300像素"
              width="400"
              height="300"
              name="上传封面"
            ></upload-image>
          </el-form-item>
          <el-form-item label="一级奖励" prop="reward">
            <el-input
              type="number"
              placeholder="单位：元"
              v-model="course.reward"
              class="w-200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="二级奖励" prop="reward2">
            <el-input
              type="number"
               placeholder="单位：元"
              v-model="course.reward2"
              class="w-200px"
            ></el-input>
          </el-form-item>
          <el-form-item prop="reward3" label="三级奖励">
            <el-input  type="number"  placeholder="单位：元" class="w-200px" v-model="course.reward3"></el-input>
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
            <el-button @click="$router.back()"
              >取消</el-button
            >
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
      filter: {
        type: "",
      },
      msg: false,
      course: {
        reward: null,
        reward2: null,
        goods_title: null,
        goods_thumb: null,
        goods_charge: null,
        goods_id: null,
        goods_type: null,
        reward3: null,
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
      expireTimeOption: {
        disabledDate(date) {
          // 当天可选：date.getTime() < Date.now() - 24 * 60 * 60 * 1000
          //超过此刻可选
          return date.getTime() < Date.now();
        },
      },
      types: null,
      loading: false,
    };
  },
  mounted() {
    this.params();
  },
  methods: {
    change(v1) {
      var data = v1;
      this.course.goods_id = data.id;
      this.course.goods_type = data.resource_type;
      this.course.goods_title = data.title;
      this.course.goods_charge = data.original_charge;
      this.course.goods_thumb = data.thumb;
      this.msg = false;
    },
    params() {
      this.$api.Multishare.Goods.Create(this.filter).then((res) => {
        var data = res.data.types;
        var typeids = "";
        for (var i = 0; i < data.length; i++) {
          typeids = typeids + data[i].value + ",";
        }
        this.types = typeids;
      });
    },
    selgoods() {
      this.msg = true;
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
      this.$api.Multishare.Goods.Store(this.course)
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