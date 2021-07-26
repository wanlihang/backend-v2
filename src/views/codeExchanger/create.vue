<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="添加兑换商品"></back-bar>

    <div class="float-left">
      <el-form ref="form" :model="course" :rules="rules" label-width="200px">
        <el-form-item prop="goods_id" label="商品">
          <div class="d-flex">
            <div>
              <el-button @click="showSelectResWin = true">
                <span>选择商品</span>
                <span class="ml-10" v-if="course.title"
                  >「{{ course.title }}」</span
                >
              </el-button>
              <select-resource
                :show="showSelectResWin"
                @change="change"
                @close="showSelectResWin = false"
                enabled-resource="vod,video,live,book,paper,practice"
              ></select-resource>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="商品名" prop="goods_title">
          <el-input
            v-model="course.goods_title"
            class="w-600px"
            placeholder="请输入商品名"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品原价" prop="goods_charge">
          <el-input
            type="number"
            placeholder="单位：元"
            v-model="course.goods_charge"
            class="w-200px"
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
import SelectResource from "@/components/select-resources/index";

export default {
  components: {
    SelectResource,
  },
  data() {
    return {
      showSelectResWin: false,
      filter: {
        goods_type: "",
      },
      msg: false,
      course: {
        other_id: null,
        goods_title: null,
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
        goods_id: [
          {
            required: true,
            message: "请选择商品",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  methods: {
    change(data) {
      this.course.goods_id = data.id;
      this.course.goods_type = data.resource_type;
      this.course.goods_title = data.title;
      this.course.goods_charge = data.original_charge;

      if (data.resource_type === "vod") {
        this.course.goods_type = "course";
      } else {
        this.course.goods_type = data.resource_type;
      }

      // 关闭窗口
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
      this.$api.CodeExchanger.Store(this.course)
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