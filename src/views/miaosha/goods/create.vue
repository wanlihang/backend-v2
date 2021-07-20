<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="创建秒杀商品"></back-bar>
    <div class="float-left">
      <div class="form-box broder-top-left-radius">
        <el-form ref="form" :model="course" :rules="rules" label-width="200px">
          <el-form-item prop="type" label="类型">
            <div class="d-flex">
              <div>
                <el-select
                  v-model="course.goods_type"
                  @change="getgoods(course.goods_type)"
                >
                  <el-option
                    v-for="(item, index) in types"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="goods_id" label="商品">
            <div class="d-flex">
              <div>
                <el-select
                  v-model="course.goods_id"
                  @change="selgoods(course.goods_id)"
                >
                  <el-option
                    v-for="(item, index) in goods"
                    :key="index"
                    :label="item.title"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
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
          <el-form-item prop="goods_thumb" label="商品封面">
            <upload-image
              v-model="course.goods_thumb"
              helper="长宽比4:3，建议尺寸：400x300像素"
              width="400"
              height="300"
              name="上传封面"
            ></upload-image>
          </el-form-item>
          <el-form-item prop="desc" label="详细介绍">
            <wang-editor class="w-100" v-model="course.desc"></wang-editor>
          </el-form-item>
          <el-form-item label="秒杀价格" prop="charge">
            <el-input
              type="number"
              v-model="course.charge"
              class="w-200px"
            ></el-input>
            <div class="helper ml-30">单位：元，只能设置为整数。</div>
          </el-form-item>
          <el-form-item label="秒杀数量" prop="num">
            <el-input
              type="number"
              v-model="course.num"
              class="w-200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="开始时间" prop="started_at">
            <el-date-picker
              v-model="course.started_at"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="请选择日期"
              :picker-options="expireTimeOption"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="end_at">
            <el-date-picker
              v-model="course.end_at"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="请选择日期"
              :picker-options="expireTimeOption"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item prop="page_title" label="秒杀页面标题">
            <el-input class="w-100" v-model="course.page_title"></el-input>
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
            <el-button @click="$router.push({ name: 'MiaoshaGoods' })"
              >取消</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import WangEditor from "@/components/wangeditor";
import UploadImage from "@/components/upload-image";

export default {
  components: {
    WangEditor,
    UploadImage,
  },
  data() {
    return {
      filter: {
        type: "",
      },
      course: {
        started_at: null,
        end_at: null,
        goods_title: null,
        goods_thumb: null,
        charge: null,
        goods_charge: null,
        goods_id: null,
        goods_type: null,
        page_title: null,
        desc: null,
        num: null,
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
        goods_charge: [
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
        num: [
          {
            required: true,
            message: "秒杀数量不能为空",
            trigger: "blur",
          },
        ],
        page_title: [
          {
            required: true,
            message: "秒杀页面标题不能为空",
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
        desc: [
          {
            required: true,
            message: "详细介绍不能为空",
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
      types: [],
      goods: [],
      loading: false,
    };
  },
  mounted() {
    this.params();
  },
  methods: {
    params() {
      this.$api.Miaosha.Goods.Create(this.filter).then((res) => {
        this.types = res.data.types;
      });
    },
    getgoods(item) {
      this.filter.type = item;
      this.$api.Miaosha.Goods.Create(this.filter).then((res) => {
        this.goods = res.data.data;
      });
    },
    selgoods(item) {
      var data = this.goods;
      for (var i = 0; i < data.length; i++) {
        if (data[i].id == item) {
          this.course.goods_title = data[i].title;
          this.course.goods_charge = data[i].charge;
          this.course.goods_thumb = data[i].thumb;
        }
      }
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
      this.$api.Miaosha.Goods.Store(this.course)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$router.push({ name: "MiaoshaGoods" });
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>