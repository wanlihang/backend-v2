<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="添加商品"></back-bar>

    <div class="center-tabs mb-30">
      <div>
        <el-tabs v-model="tab.active">
          <el-tab-pane
            :label="item.name"
            :name="item.key"
            v-for="(item, index) in tab.list"
            :key="index"
          ></el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="float-left">
      <el-form ref="form" :model="course" :rules="rules" label-width="200px">
        <div class="float-left" v-show="tab.active === 'base'">
          <el-form-item label="是否虚拟商品">
            <el-switch
              v-model="course.is_v"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="虚拟商品类型" v-if="course.is_v === 1">
            <el-select v-model="course.v_type">
              <el-option
                v-for="(item, index) in types"
                :key="index"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="虚拟商品"
            v-if="course.is_v === 1 && course.v_type"
          >
            <el-button type="primary" @click="showSelectResWin = true">
              <span>选择商品</span>
              <span v-if="course.v_id">已选择「{{ course.title }}」</span>
            </el-button>
          </el-form-item>
          <el-form-item label="商品名" prop="title">
            <el-input v-model="course.title" class="w-500px"></el-input>
          </el-form-item>
          <el-form-item prop="thumb" label="商品封面">
            <upload-image
              v-model="course.thumb"
              width="400"
              height="400"
              :contain-box="true"
              name="上传封面"
            ></upload-image>
          </el-form-item>

          <el-form-item label="价格" prop="charge">
            <div class="d-flex">
              <div>
                <el-input
                  type="number"
                  placeholder="单位：积分"
                  v-model="course.charge"
                  class="w-200px"
                ></el-input>
              </div>
              <div class="ml-15">
                <helper-text
                  text="价格最小单位为：积分，不支持小数。"
                ></helper-text>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="desc" label="介绍">
            <quill-editor :height="400" v-model="course.desc"></quill-editor>
          </el-form-item>
          <el-form-item label="库存" prop="charge">
            <el-input
              type="number"
              placeholder="商品库存数量"
              v-model="course.stock_count"
              class="w-200px"
            ></el-input>
          </el-form-item>
        </div>

        <div class="float-left" v-show="tab.active === 'dev'">
          <el-form-item label="显示" prop="is_show">
            <div class="d-flex">
              <div>
                <el-switch
                  v-model="course.is_show"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </div>
              <div class="ml-15">
                <div class="helper-text">
                  <helper-text text="控制用户是否能看到该商品。"></helper-text>
                </div>
              </div>
            </div>
          </el-form-item>
        </div>
      </el-form>

      <div class="bottom-menus">
        <div class="bottom-menus-box">
          <div>
            <el-button @click="formValidate" :loading="loading" type="primary">
              确认
            </el-button>
          </div>
          <div class="ml-24">
            <el-button @click="$router.back()">取消</el-button>
          </div>
        </div>
      </div>
    </div>
    <select-resource
      v-bind:show="showSelectResWin"
      @change="change"
      @close="showSelectResWin = false"
      :enabled-resource="course.v_type"
    ></select-resource>
  </div>
</template>
<script>
import QuillEditor from "@/components/quill-editor";
import UploadImage from "@/components/upload-image";
import SelectResource from "@/components/select-resources/newIndex";

export default {
  components: {
    QuillEditor,
    UploadImage,
    SelectResource,
  },
  data() {
    return {
      showSelectResWin: false,
      tab: {
        active: "base",
        list: [
          {
            name: "基础信息",
            key: "base",
          },
          {
            name: "可选信息",
            key: "dev",
          },
        ],
      },
      course: {
        is_show: 1,
        is_v: 0,
        charge: null,
        title: null,
        v_id: null,
        v_type: null,
        thumb: null,
        desc: null,
        stock_count: null,
      },
      rules: {
        charge: [
          {
            required: true,
            message: "价格不能为空",
            trigger: "blur",
          },
        ],
        stock_count: [
          {
            required: true,
            message: "商品库存不能为空",
            trigger: "blur",
          },
        ],
        title: [
          {
            required: true,
            message: "商品名不能为空",
            trigger: "blur",
          },
        ],
        thumb: [
          {
            required: true,
            message: "请上传商品封面",
            trigger: "blur",
          },
        ],
        desc: [
          {
            required: true,
            message: "介绍不能为空",
            trigger: "blur",
          },
        ],
      },
      comments: [
        {
          id: 0,
          name: "关闭评论",
        },
        {
          id: 1,
          name: "所有人均可评论",
        },
        {
          id: 2,
          name: "购买后可评论",
        },
      ],
      types: [],
      loading: false,
    };
  },
  mounted() {
    this.params();
  },
  methods: {
    change(data) {
      this.course.v_id = data.id;
      this.course.title = data.title;
      this.course.thumb = data.thumb;
      this.showSelectResWin = false;
    },
    params() {
      this.$api.CreditMall.Goods.Create().then((res) => {
        this.types = res.data.types;
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
      if (this.course.is_v === 0) {
        this.course.v_type = null;
        this.course.v_id = null;
      }
      if (this.course.is_v === 1 && !this.course.v_type) {
        this.$message.error("请选择虚拟商品类型");
      }
      if (this.course.is_v === 1 && this.course.v_type && !this.course.v_id) {
        this.$message.error("请选择虚拟商品");
      }
      this.$api.CreditMall.Goods.Store(this.course)
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
