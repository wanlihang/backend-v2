<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="添加电子书"></back-bar>
    <div class="float-left">
      <div class="form-box broder-top-left-radius">
        <el-form ref="form" :model="course" :rules="rules" label-width="200px">
          <el-form-item prop="cid" label="分类">
            <div class="d-flex">
              <div>
                <el-select v-model="course.cid">
                  <el-option
                    v-for="(item, index) in categories"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="书名" prop="name">
            <el-input v-model="course.name" class="w-100"></el-input>
          </el-form-item>
           <el-form-item prop="thumb" label="封面">
            <upload-image
              v-model="course.thumb"
              helper="长宽比4:3，建议尺寸：400x300像素"
              width="400"
              height="300"
              name="上传封面"
            ></upload-image>
          </el-form-item>
          <el-form-item label="价格" prop="charge">
            <el-input
              type="number"
              placeholder="单位：元"
              v-model="course.charge"
              class="w-200px"
            ></el-input>
          </el-form-item>
 <el-form-item label="订阅人数" prop="count">
            <el-input
              v-model="course.user_count"
              class="w-200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="上架时间" prop="published_at">
            <el-date-picker
              v-model="course.published_at"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="请选择日期"
              :picker-options="expireTimeOption"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="显示" prop="is_show">
            <el-switch
              v-model="course.is_show"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="会员免费" prop="is_show">
            <el-switch
              v-model="course.is_vip_free"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
         
          <el-form-item prop="short_desc" label="简短介绍">
            <el-input
              class="w-100"
              type="textarea"
              v-model="course.short_desc"
            ></el-input>
          </el-form-item>
          <el-form-item prop="original_desc" label="详细介绍">
            <wang-editor
              class="w-100"
              v-model="course.original_desc"
            ></wang-editor>
          </el-form-item>
          <el-form-item label="SEO描述">
            <el-input
              class="w-100"
              type="textarea"
              v-model="course.seo_description"
            ></el-input>
          </el-form-item>
          <el-form-item label="SEO关键字">
            <el-input
              class="w-100"
              type="textarea"
              v-model="course.seo_keywords"
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
            <el-button @click="$router.push({ name: 'Meedubook' })">取消</el-button>
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
      course: {
        published_at: null,
        is_show: 0,
        charge: null,
        name: null,
        cid: null,
        is_vip_free: 0,
        thumb: null,
        short_desc: null,
        original_desc: null,
        render_desc: null,
        user_count:null,
        seo_description: "",
        seo_keywords: "",
      },
      rules: {
        cid: [
          {
            required: true,
            message: "分类不能为空",
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
        published_at: [
          {
            required: true,
            message: "上架时间不能为空",
            trigger: "blur",
          },
        ],
        is_show: [
          {
            required: true,
            message: "请选择显示",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "书名不能为空",
            trigger: "blur",
          },
        ],
        is_vip_free: [
          {
            required: true,
            message: "请选择会员免费",
            trigger: "blur",
          },
        ],
        thumb: [
          {
            required: true,
            message: "请上传封面",
            trigger: "blur",
          },
        ],
        short_desc: [
          {
            required: true,
            message: "简短介绍不能为空",
            trigger: "blur",
          },
        ],
        original_desc: [
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
      categories: [],
      loading: false,
    };
  },
  mounted() {
    this.params();
  },
  methods: {
    params() {
      this.$api.Meedubook.Book.Create().then((res) => {
        this.categories = res.data.categories;
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
      this.course.render_desc = this.course.original_desc;
      this.$api.Meedubook.Book.Store(this.course)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$router.push({ name: "Meedubook" });
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>