<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑兑换商品"></back-bar>
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
                  :selectedIds="this.course.goods_id"
                  :enabled-resource="types"
                ></select-resource>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="商品名" prop="goods_title">
            <el-input v-model="course.goods_title" class="w-100"></el-input>
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
      </div>

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
      filter: {
        goods_type: "",
      },
      msg: false,
      course: {
        id: this.$route.query.id,
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
      types: "",
      loading: false,
    };
  },
  mounted() {
    this.params();
    this.detail();
  },
  methods: {
    change(v1) {
      var data = v1;
      this.course.goods_id = data.id;
      this.course.goods_type = data.resource_type;
      this.course.goods_title = data.title;
      this.course.goods_charge = data.original_charge;
      this.msg = false;
    },
    params() {
      this.$api.CodeExchanger.Create(this.filter).then((res) => {
        var data = res.data.types;
        var typeids = "";
        for (var i = 0; i < data.length; i++) {
          if (data[i].key == "course") {
            data[i].key = "vod";
          }
          typeids = typeids + data[i].value + ",";
        }
        this.types = typeids;
      });
    },
    selgoods() {
      this.msg = true;
    },
    detail() {
      this.$api.CodeExchanger.Detail(this.course.id).then((res) => {
        var data = res.data;
        this.course.goods_id = data.goods_id;
        this.course.goods_type = data.goods_type;
        this.course.goods_title = data.goods_title;
        this.course.goods_charge = data.goods_charge;
      });
    },
    getgoods(item) {},
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
      if (this.course.goods_type == "vod") {
        this.course.goods_type = "course";
      }
      this.$api.CodeExchanger.Update(this.course.id, this.course)
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